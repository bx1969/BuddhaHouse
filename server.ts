import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import Stripe from 'stripe';

// Lazy load stripe to avoid crashing if key is not defined at boot
let stripeInstance: Stripe | null = null;
function getStripeInstance() {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return null;
  }
  if (!stripeInstance) {
    stripeInstance = new Stripe(secret);
  }
  return stripeInstance;
}

const app = express();
const PORT = 3000;

app.use(express.json());

// API: Health probe
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// API: Create Stripe Payment Intent for the $30 deposit
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amountInCents } = req.body;
    const stripe = getStripeInstance();
    
    if (!stripe) {
      console.warn('STRIPE_SECRET_KEY is missing. Operating in local sandbox/simulation mode.');
      return res.json({
        mock: true,
        clientSecret: 'mock_stripe_client_secret_' + Math.random().toString(36).slice(2),
        message: 'Sandbox mode active. Enter your Stripe Secret Key in secrets to capture actual cards.'
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents || 3000, // defaults to $30.00 (3000 cents)
      currency: 'usd',
      metadata: { description: 'Buddha House Somatic Treatment Reservation Deposit' }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id
    });
  } catch (error: any) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message || 'Payment intent generation failed' });
  }
});

// API: Booking dispatch notification (MMS Text to 2105523344@vzwpix.com + Mail to client)
app.post('/api/notify-booking', async (req, res) => {
  const { voucher, clientName, email, phone, treatments, grandTotal, specialNotes, therapistName } = req.body;

  console.log(`[Notification Dispatch] Processing booking inquiry ${voucher} for ${clientName}`);

  // 1. Compile ultra-short optimized text
  const mmsSubject = `New Inquiry ${voucher.split('-').pop()}`;
  const mmsBodyText = [
    `Buddha House Booking Inquiry!`,
    `Ref: ${voucher}`,
    `Client: ${clientName}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Therapist: ${therapistName || 'Jackie'}`,
    `Services: ${treatments}`,
    `Total: $${grandTotal}`,
    `Notes: ${specialNotes || 'None'}`
  ].join('\n');

  // 2. Fetch email credentials from env
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || 'jackieq34@gmail.com';

  const smtpOk = !!(smtpHost && smtpUser && smtpPass);

  if (!smtpOk) {
    const logMsg = [
      `=================== SMTP SANDBOX NOTIFICATION ===================`,
      `To Text/MMS: 2105523344@vzwpix.com`,
      `To Email: jackieq34@gmail.com`,
      `CC Guest: ${email}`,
      `Subject: ${mmsSubject}`,
      `----------------- Body -----------------`,
      mmsBodyText,
      `================================================================`
    ].join('\n');
    console.info(logMsg);

    return res.json({
      success: true,
      delivered: false,
      message: 'Notification logged in server sandbox. To send real texts/emails, populate SMTP credentials in the Secrets panel.'
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort || '587', 10),
      secure: smtpPort === '465',
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    // Send text to Jackie via Verizon MMS gateway (vzwpix supports long texts)
    await transporter.sendMail({
      from: smtpFrom,
      to: '2105523344@vzwpix.com',
      subject: mmsSubject,
      text: mmsBodyText
    });

    // Send detailed confirmation to jackieq34@gmail.com and CC guest email
    try {
      await transporter.sendMail({
        from: smtpFrom,
        to: 'jackieq34@gmail.com',
        cc: email,
        subject: `New Buddha House Booking Inquiry: ${voucher}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
            <h2 style="color: #7d3b7d; border-bottom: 2px solid #c5a880; padding-bottom: 10px;">Buddha House Somatic Studio</h2>
            <p>A new booking inquiry has been received from the website.</p>
            <div style="background-color: #fcfbf9; border: 1px solid #c5a880; border-radius: 10px; padding: 15px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #444; font-size: 14px; text-transform: uppercase;">Inquiry Summary</h3>
              <ul style="list-style-type: none; padding-left: 0; font-size: 13px; line-height: 1.6;">
                <li><strong>Inquiry Reference:</strong> ${voucher}</li>
                <li><strong>Guest Name:</strong> ${clientName}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Phone:</strong> ${phone}</li>
                <li><strong>Therapist:</strong> ${therapistName || 'Jackie'}</li>
                <li><strong>Selected Treatments:</strong> ${treatments}</li>
                <li><strong>Est. Full Value:</strong> $${grandTotal}</li>
                <li><strong>Special Notes:</strong> ${specialNotes || 'None'}</li>
              </ul>
            </div>
            <p style="font-size: 13px; line-height: 1.5; color: #666;">
              Please send a follow-up text message to the client at <strong>${phone}</strong> to coordinate booking and scheduling next steps.
            </p>
            <p style="font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 10px; margin-top: 30px;">
              Buddha House Restorative Massage Studio • Tel: (210) 552-3344 • San Antonio, TX
            </p>
          </div>
        `
      });
    } catch (guestMailErr) {
      console.error('Failed to send confirmation to guest email:', guestMailErr);
    }

    res.json({
      success: true,
      delivered: true,
      message: 'Notification successfully delivered to Verizon Gateway and jackieq34@gmail.com.'
    });
  } catch (err: any) {
    console.error('Nodemailer transmission crash:', err);
    res.json({
      success: true,
      delivered: false,
      message: 'Voucher registered successfully, but notification dispatch failed: ' + err.message
    });
  }
});

// Configure Vite preview integration or production static serving
async function setupApp() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server executing successfully on port ${PORT}`);
  });
}

setupApp();
