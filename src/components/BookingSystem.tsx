import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Calendar, Clock, Trash2, CheckCircle, ShieldCheck, Printer, ArrowRight, CreditCard, Lock } from 'lucide-react';
import { CartItem, Therapist } from '../types';
import { THERAPISTS } from '../data';
import { 
  initAuth, 
  googleSignIn, 
  createCalendarEvent, 
  parseDateTimeWithDuration,
  logout
} from '../lib/firebase';

interface BookingSystemProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  selectedTherapist: Therapist | null;
  onSelectTherapist: (therapist: Therapist) => void;
}

export default function BookingSystem({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onClearCart,
  selectedTherapist,
  onSelectTherapist
}: BookingSystemProps) {
  // Navigation inside booking drawer
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Review, 2: Info & Schedule, 3: Receipt

  // Schedulers
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Info details
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Processing indicator for submission
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Receipt booking number
  const [receiptNumber, setReceiptNumber] = useState('');

  // Google Integration States
  const [googleUser, setGoogleUser] = useState<any>(null);
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [googleSyncEnabled, setGoogleSyncEnabled] = useState(true);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isSchedulingWithGoogle, setIsSchedulingWithGoogle] = useState(false);
  const [schedulingError, setSchedulingError] = useState('');
  const [scheduledSuccessfully, setScheduledSuccessfully] = useState(false);

  // Date generators (next 7 days starting today)
  const [availableDates, setAvailableDates] = useState<{ dayName: string; dateStr: string; labelStr: string }[]>([]);
  const timeSlots = ['09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM', '03:00 PM', '04:30 PM', '06:00 PM'];

  // Initialize dates
  useEffect(() => {
    const dates = [];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // start with tomorrow or today
    const tomorrow = new Date();
    for (let i = 1; i <= 7; i++) {
      const d = new Date(tomorrow);
      d.setDate(tomorrow.getDate() + i);
      const dayName = days[d.getDay()];
      const labelStr = `${months[d.getMonth()]} ${d.getDate()}`;
      const dateStr = d.toISOString().split('T')[0];
      dates.push({ dayName, dateStr, labelStr });
    }
    setAvailableDates(dates);
    setSelectedDate(dates[0].dateStr);
    setSelectedTime(timeSlots[1]); // default to 10:30 AM
  }, []);

  // Sync Google auth connection
  useEffect(() => {
    if (isOpen) {
      const unsubscribe = initAuth(
        (user, token) => {
          setGoogleUser(user);
          setGoogleToken(token);
        },
        () => {
          setGoogleUser(null);
          setGoogleToken(null);
        }
      );
      return () => unsubscribe();
    }
  }, [isOpen]);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setSchedulingError('');
    try {
      const result = await googleSignIn();
      if (result) {
        setGoogleUser(result.user);
        setGoogleToken(result.accessToken);
      }
    } catch (err: any) {
      console.error(err);
      setSchedulingError('Failed to link account. Please accept popup scopes.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleSignOut = async () => {
    try {
      await logout();
      setGoogleUser(null);
      setGoogleToken(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Calculate pricing
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const serviceCharge = 0;
  const grandTotal = subtotal;

  // Submit checkout booking form
  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!firstName.trim()) errors.firstName = 'First name is required';
    if (!lastName.trim()) errors.lastName = 'Last name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errors.email = 'Valid email is required';
    if (!phone.trim() || phone.length < 8) errors.phone = 'Valid phone is required';
    if (!agreeTerms) errors.agreeTerms = 'You must authorize treatments and terms';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setSchedulingError('');
    setScheduledSuccessfully(false);
    setIsProcessingPayment(true);

    try {
      // Generate simulated serial receipt/inquiry number
      const rand = Math.floor(100000 + Math.random() * 900000);
      const voucherNumber = `RENEW-2026-${rand}`;
      setReceiptNumber(voucherNumber);

      // Transmit instant SMS alerts & voucher notifications to Jackie and customer
      const itemsListed = cartItems.map((item) => {
        let details = `${item.name} (${item.duration}m)`;
        if (item.isCustom && item.customDetails) {
          if (item.customDetails.addOns && item.customDetails.addOns.length > 0) {
            details += ` + Upgrades: ${item.customDetails.addOns.join(', ')}`;
          }
          if (item.customDetails.focusAreas && item.customDetails.focusAreas.length > 0) {
            details += ` [Focus: ${item.customDetails.focusAreas.join(', ')}]`;
          }
          if (item.customDetails.pressure) {
            details += ` [Pressure: ${item.customDetails.pressure}]`;
          }
          if (item.customDetails.soundscape) {
            details += ` [Soundscape: ${item.customDetails.soundscape}]`;
          }
        }
        return details;
      }).join('; ');

      const notifyRes = await fetch('/api/notify-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          voucher: voucherNumber,
          clientName: `${firstName} ${lastName}`,
          email,
          phone,
          treatments: itemsListed || 'Restorative Treatment Session',
          grandTotal: grandTotal,
          specialNotes: specialNotes || 'None',
          therapistName: selectedTherapist?.name || 'Jackie'
        })
      });
      const notifyData = await notifyRes.json();
      console.log('Notification delivery log:', notifyData);
      
      setScheduledSuccessfully(true);
      setStep(3);
    } catch (err) {
      console.error('Checkout sequence error:', err);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const resetBookingForm = () => {
    onClearCart();
    setStep(1);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setSpecialNotes('');
    setAgreeTerms(false);
    setSchedulingError('');
    setScheduledSuccessfully(false);
  };


  // Handle printing/saving voucher simulation
  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="booking-drawer-wrapper">
          {/* Dark overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-spa-charcoal"
          />

          {/* Core Panel Container sliding from right */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-spa-bg flex flex-col shadow-2xl relative border-l border-spa-sage/10 h-full"
            >
              {/* Header Box */}
              <div className="px-6 py-5 bg-white border-b border-spa-sage/10 flex justify-between items-center shrink-0">
                <div>
                  <h2 className="font-serif text-xl font-bold text-spa-charcoal">
                    {step === 3 ? 'Sanctuary Registration Successful' : 'Your Day Spa Itinerary'}
                  </h2>
                  <p className="font-sans text-[11px] text-spa-clay font-medium uppercase tracking-wider block mt-1">
                    {step === 1 && 'Step 1: Review Core treatments'}
                    {step === 2 && 'Step 2: Schedule & guest coordinates'}
                    {step === 3 && 'Step 3: Printable Booking Confirmation'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2.5 rounded-full hover:bg-spa-cream transition-colors text-spa-clay hover:text-spa-charcoal cursor-pointer focus:outline-none"
                  aria-label="Close panel"
                  id="close-drawer-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* STAGES CONTAINER */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                
                {/* ----------------- STEP 1 REVIEW CART ----------------- */}
                {step === 1 && (
                  <>
                    {cartItems.length === 0 ? (
                      <div className="h-96 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-spa-cream border border-spa-sage/10 flex items-center justify-center text-spa-sage-dark mb-2">
                          <ShoppingBag className="w-7 h-7" />
                        </div>
                        <h4 className="font-serif text-lg font-bold text-spa-charcoal">Your booking list is vacant</h4>
                        <p className="font-sans text-xs text-spa-clay max-w-xs leading-relaxed">
                          Please browse our curated treatment catalog or custom session configurator 
                          to arrange your luxury day spa experiences.
                        </p>
                        <button
                          onClick={onClose}
                          className="bg-spa-sage hover:bg-spa-sage-dark text-white font-sans text-xs font-semibold uppercase tracking-widest py-2.5 px-6 rounded-xl transition-all cursor-pointer focus:outline-none"
                        >
                          Browse Experiences
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Cart Items list */}
                        <div className="space-y-4">
                          {cartItems.map((item) => (
                            <div
                              key={item.id}
                              className="bg-white border border-spa-sage/10 rounded-2xl p-4 md:p-5 flex gap-4 transition-all hover:border-spa-sage/20 shadow-sm relative"
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start gap-2">
                                  <h4 className="font-serif text-sm font-bold text-spa-charcoal truncate">
                                    {item.name}
                                  </h4>
                                  <span className="font-serif text-sm font-bold text-spa-gold shrink-0">
                                    ${item.price}
                                  </span>
                                </div>
                                
                                <span className="font-sans text-[10px] text-spa-clay font-medium bg-spa-cream px-2 py-0.5 rounded-lg border border-spa-sage/5 block w-max mt-2">
                                  ⏱️ {item.duration} Mins
                                </span>

                                {/* Custom details summary block nested inside customized lists */}
                                {item.isCustom && item.customDetails && (
                                  <div className="mt-3 pt-3 border-t border-spa-sage/10 space-y-1.5 text-[10px] text-spa-clay font-sans">
                                    <p><span className="font-bold text-spa-charcoal uppercase text-[9px] tracking-wider block mb-0.5">Focus areas:</span> {item.customDetails.focusAreas.join(', ')}</p>
                                    <p><span className="font-semibold text-spa-charcoal">Pressure:</span> {item.customDetails.pressure}</p>
                                    {item.customDetails.addOns.length > 0 && (
                                      <p><span className="font-semibold text-spa-charcoal">Upgrades:</span> {item.customDetails.addOns.join(', ')}</p>
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* trash trigger */}
                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="p-2 text-spa-clay hover:text-red-500 rounded-lg hover:bg-red-50 border border-transparent hover:border-red-100 transition-all cursor-pointer self-start focus:outline-none"
                                aria-label="Delete item"
                                id={`delete-cart-item-${item.id}`}
                              >
                                <Trash2 className="w-4.5 h-4.5" />
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Preferred Therapist matching selector inside reviews */}
                        <div className="bg-white border border-spa-sage/10 rounded-2xl p-4 md:p-5 space-y-3">
                          <h4 className="font-serif text-sm font-bold text-spa-charcoal flex items-center gap-2">
                            👤 Treatment Specialist Assignment
                          </h4>
                          <p className="font-sans text-[11px] text-spa-clay font-light leading-relaxed">
                            Request a specific practitioner to handle your therapeutic treatments. Jackie is currently our head specialist and founder.
                          </p>
                          <select
                            value={selectedTherapist?.id || THERAPISTS[0].id}
                            onChange={(e) => {
                              const picked = THERAPISTS.find(t => t.id === e.target.value);
                              if (picked) onSelectTherapist(picked);
                            }}
                            className="w-full bg-spa-cream border border-spa-sage/20 rounded-xl px-3 py-2.5 font-sans text-xs text-spa-charcoal focus:outline-none focus:border-spa-sage"
                            id="therapist-picker-select"
                          >
                            {THERAPISTS.map((t) => (
                              <option key={t.id} value={t.id}>
                                {t.name} — {t.title}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Checkout Ledger Billing breakdown */}
                        <div className="bg-spa-cream border border-spa-sage/5 rounded-2xl p-5 space-y-3 font-sans text-xs text-spa-clay">
                          <h4 className="font-semibold text-spa-charcoal text-[11px] uppercase tracking-wider border-b border-spa-sage/10 pb-2">
                            Session Statement Overview
                          </h4>
                          <div className="flex justify-between">
                            <span>Treatments Subtotal ({cartItems.length} items):</span>
                            <span className="font-semibold text-spa-charcoal font-mono">${subtotal}</span>
                          </div>
                          <div className="flex justify-between text-sm text-spa-charcoal font-bold border-t border-spa-sage/10 pt-2.5">
                            <span className="text-spa-sage-dark font-serif font-bold">Estimated Treatment Value:</span>
                            <span className="font-serif text-base text-spa-gold font-bold">${grandTotal}</span>
                          </div>
                          <p className="text-[10px] text-spa-clay/80 leading-relaxed font-light italic mt-1.5 pt-1.5 border-t border-spa-sage/5">
                            * Note: No payment is taken online. Final payment and appointment calendar scheduling will be completed entirely outside of this site with our concierge.
                          </p>
                        </div>

                        {/* Continue trigger */}
                        <button
                          onClick={() => setStep(2)}
                          className="w-full py-4 rounded-2xl bg-spa-sage hover:bg-spa-sage-dark text-white font-sans text-xs font-bold uppercase tracking-widest shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 focus:outline-none"
                          id="continue-to-step-2-btn"
                        >
                          Proceed to Scheduling & Inquiry
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </>
                )}

                {/* ----------------- STEP 2 GUEST DETAILS & SCHEDULE ----------------- */}
                {step === 2 && (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                    {/* Offline Scheduling Coordination Status */}
                    <div className="bg-gradient-to-br from-spa-sage/5 to-spa-cream border border-spa-sage/15 rounded-2xl p-4 md:p-5 space-y-3 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="bg-spa-sage/10 p-2.5 rounded-xl text-spa-sage-dark shrink-0">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-serif text-sm font-bold text-spa-charcoal">
                            Offline Scheduling Policy
                          </h4>
                          <p className="font-sans text-[11.5px] text-spa-clay leading-relaxed">
                            To ensure personalized care, all calendar scheduling and outstanding service balances are coordinated after submission. All appointments are made at least one day in advance. No walk-ins, no same day. Be sure your info is correct so we can contact you to schedule your booking.
                          </p>
                          <p className="font-sans text-[11px] text-spa-clay/90 font-medium leading-relaxed italic bg-white/70 p-2 rounded-xl border border-spa-sage/5 mt-2">
                            ✨ Our concierge will reach you at your email or phone below within 24 hours of receiving your registration to secure your desired time slot. No payment info or deposit is required today!
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Guest registration coordinates form fields */}
                    <div className="bg-white border border-spa-sage/10 rounded-2xl p-4 md:p-5 space-y-4">
                      <h4 className="font-serif text-sm font-bold text-spa-charcoal">
                        Guest Credentials Registration
                      </h4>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-sans uppercase tracking-wider text-spa-clay font-bold mb-1.5">First name *</label>
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full bg-spa-cream border border-spa-sage/25 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-spa-sage text-spa-charcoal"
                            id="firstName"
                          />
                          {formErrors.firstName && <p className="text-[10px] text-red-500 font-sans mt-1">{formErrors.firstName}</p>}
                        </div>
                        <div>
                          <label className="block text-[10px] font-sans uppercase tracking-wider text-spa-clay font-bold mb-1.5">Last name *</label>
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full bg-spa-cream border border-spa-sage/25 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-spa-sage text-spa-charcoal"
                            id="lastName"
                          />
                          {formErrors.lastName && <p className="text-[10px] text-red-500 font-sans mt-1">{formErrors.lastName}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-sans uppercase tracking-wider text-spa-clay font-bold mb-1.5">Email *</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-spa-cream border border-spa-sage/25 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-spa-sage text-spa-charcoal"
                          id="email"
                        />
                        {formErrors.email && <p className="text-[10px] text-red-500 font-sans mt-1">{formErrors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-[10px] font-sans uppercase tracking-wider text-spa-clay font-bold mb-1.5">Phone *</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(210) 552-3344"
                          className="w-full bg-spa-cream border border-spa-sage/25 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-spa-sage text-spa-charcoal"
                          id="phone"
                        />
                        {formErrors.phone && <p className="text-[10px] text-red-500 font-sans mt-1">{formErrors.phone}</p>}
                      </div>

                      <div>
                        <label className="block text-[10px] font-sans uppercase tracking-wider text-spa-clay font-bold mb-1.5">Somatic medical notes / preferences</label>
                        <textarea
                          value={specialNotes}
                          onChange={(e) => setSpecialNotes(e.target.value)}
                          placeholder="List allergies, body injuries, pressure requirements, or ambient temperature comforts..."
                          rows={3}
                          className="w-full bg-spa-cream border border-spa-sage/25 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-spa-sage text-spa-charcoal resize-none leading-relaxed"
                          id="specialNotes"
                        />
                      </div>

                      {/* Authorize checkbox */}
                      <label className="flex items-start gap-3 pt-2 select-none cursor-pointer">
                        <input
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded border-spa-sage/30 text-spa-sage focus:ring-spa-sage"
                          id="agreeTerms"
                        />
                        <span className="text-[11px] text-spa-clay font-light leading-relaxed">
                          I authorize therapists to conduct the programmed massage sequences. I understand 24-hr cancellation terms apply. *
                        </span>
                      </label>
                      {formErrors.agreeTerms && <p className="text-[10px] text-red-500 font-sans">{formErrors.agreeTerms}</p>}
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-1/3 py-3.5 rounded-2xl bg-white hover:bg-spa-cream text-spa-clay border border-spa-sage/15 transition-all text-xs font-bold uppercase tracking-wider cursor-pointer focus:outline-none"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isProcessingPayment}
                        className="flex-1 py-3.5 rounded-2xl bg-spa-gold hover:bg-spa-gold/90 text-white font-sans text-xs font-extrabold uppercase tracking-widest shadow transition-all cursor-pointer focus:outline-none flex items-center justify-center gap-2"
                        id="submit-checkout-btn"
                      >
                        {isProcessingPayment ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                            <span>Sending Inquiry...</span>
                          </>
                        ) : (
                          <span>Submit Booking Inquiry</span>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {/* ----------------- STEP 3 CONFIRMATION RECEIPT ----------------- */}
                {step === 3 && (
                  <div className="space-y-6">
                    {/* Visual Success card */}
                    <div className="text-center bg-emerald-50 border border-emerald-100/50 rounded-3xl p-6 relative overflow-hidden space-y-3.5">
                      <CheckCircle className="w-11 h-11 text-emerald-600 mx-auto" />
                      <div>
                        <h3 className="font-serif text-lg font-bold text-emerald-800">Booking Inquiry Sent</h3>
                        <p className="font-sans text-[11px] text-emerald-600/90 font-medium leading-relaxed max-w-xs mx-auto mt-1.5">
                          Your treatment selection and inquiry details have been successfully transmitted.
                        </p>
                      </div>

                      <div className="bg-white/80 border border-emerald-200 p-3 rounded-2xl text-[10.5px] font-sans text-emerald-950 text-left space-y-1.5 max-w-sm mx-auto shadow-sm">
                        <p className="font-bold text-emerald-800 flex items-center gap-1.5 justify-center">
                          <span>📅 Next Steps Follow-up</span>
                        </p>
                        <p className="text-center text-emerald-700/95 leading-relaxed font-medium">
                          Your information has been successfully sent. Please look for a follow-up text message from us about booking and scheduling your next steps!
                        </p>
                      </div>
                    </div>

                    {/* VOUCHER DESIGN BOX */}
                    <div className="bg-white border-2 border-dashed border-spa-sage/30 rounded-3xl p-6 md:p-8 space-y-6 relative shadow-sm" id="voucher-pass">
                      
                      {/* Receipt top branding */}
                      <div className="text-center font-sans border-b border-spa-sage/10 pb-5">
                        <span className="font-serif text-xl font-extrabold text-spa-charcoal block">Buddha House</span>
                        <span className="text-[9px] uppercase tracking-[0.25em] text-spa-sage font-bold block mt-1">Holistic Studio Voucher</span>
                        <p className="text-[10px] text-spa-clay mt-3 font-semibold font-mono bg-spa-cream py-1 px-3 rounded-lg border border-spa-sage/5 inline-block">
                          {receiptNumber}
                        </p>
                      </div>

                      {/* Ticket specifications */}
                      <div className="space-y-3 font-sans text-xs text-spa-charcoal pb-5 border-b border-spa-sage/10">
                        <div className="flex justify-between items-baseline text-[11px]">
                          <span className="text-spa-clay uppercase tracking-wider text-[10px]">Guest Name:</span>
                          <span className="font-bold">{firstName} {lastName}</span>
                        </div>
                        <div className="flex justify-between items-baseline text-[11px]">
                          <span className="text-spa-clay uppercase tracking-wider text-[10px]">Email:</span>
                          <span className="font-medium font-mono">{email}</span>
                        </div>
                        <div className="flex justify-between items-baseline text-[11px]">
                          <span className="text-spa-clay uppercase tracking-wider text-[10px]">Phone contact:</span>
                          <span className="font-medium font-mono">{phone}</span>
                        </div>
                        <div className="flex justify-between items-baseline text-[11px]">
                          <span className="text-spa-clay uppercase tracking-wider text-[10px]">Assigned Specialist:</span>
                          <span className="font-bold flex items-center gap-1">
                            👤 {selectedTherapist?.name || 'Jackie'}
                          </span>
                        </div>
                        <div className="flex justify-between items-baseline text-[11px]">
                          <span className="text-spa-clay uppercase tracking-wider text-[10px]">Date & Time Slot:</span>
                          <span className="font-bold text-spa-sage-dark bg-spa-cream/60 py-0.5 px-2 rounded border border-spa-sage/5">
                            📞 Coordinated Offline
                          </span>
                        </div>
                      </div>

                      {/* Voucher Treatments catalog list list */}
                      <div>
                        <h4 className="font-sans font-bold uppercase tracking-wider text-[10px] text-spa-clay mb-3">
                          Reserved Treatments:
                        </h4>
                        <ul className="space-y-2 text-xs font-sans pl-0">
                          {cartItems.map((item, idx) => (
                            <li key={idx} className="flex justify-between items-center bg-spa-cream/50 p-2.5 rounded-xl border border-spa-sage/5">
                              <div>
                                <p className="font-bold text-spa-charcoal">{item.name}</p>
                                <p className="text-[10px] text-spa-clay mt-0.5">Duration: {item.duration} Min Session</p>
                              </div>
                              <span className="font-bold text-spa-gold font-mono shrink-0">${item.price}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Financial wrap-up */}
                      <div className="bg-spa-cream rounded-2xl p-4 font-sans text-xs text-spa-clay space-y-2 border border-spa-sage/5">
                        <div className="flex justify-between">
                          <span>Treatments Service Rate:</span>
                          <span>${subtotal}</span>
                        </div>
                        <div className="flex justify-between border-t border-dashed border-spa-sage/10 pt-2 text-spa-charcoal">
                          <span>Estimated Treatment Value:</span>
                          <span className="font-bold font-mono">${grandTotal}</span>
                        </div>
                        <div className="flex justify-between text-emerald-700 font-bold border-t border-spa-sage/5 pt-2">
                          <span>Due Online Today:</span>
                          <span>$0.00</span>
                        </div>
                        <div className="flex justify-between font-serif text-sm text-spa-charcoal font-bold border-t border-spa-sage/15 pt-2 mt-1">
                          <span>Estimated Balance Due Offline:</span>
                          <span className="font-bold text-spa-sage-dark">${grandTotal}</span>
                        </div>
                      </div>

                      {/* Barcode graphic visualization */}
                      <div className="pt-4 text-center select-none bg-spa-cream/30 p-3 rounded-2xl border border-spa-sage/5">
                        <p className="font-mono text-[14px] text-spa-charcoal tracking-[0.3em] font-normal leading-none mb-1.5">
                          ||||| ||| |||| || ||| || |||||| | |||| ||
                        </p>
                        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-spa-clay font-bold">
                          {receiptNumber.replace(/-/g, '')}
                        </p>
                      </div>

                    </div>

                    {/* VOUCHER ACTION BUTTONS */}
                    <div className="flex flex-col gap-2 pt-2">
                      <button
                        onClick={handlePrint}
                        className="w-full py-3.5 rounded-2xl bg-spa-charcoal hover:bg-spa-clay text-white font-sans text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer focus:outline-none"
                        id="print-voucher-btn"
                      >
                        <Printer className="w-4 h-4" />
                        Print Somatic Pass
                      </button>
                      <button
                        onClick={resetBookingForm}
                        className="w-full py-3 rounded-2xl bg-white hover:bg-spa-cream text-spa-sage-dark border border-spa-sage/15 transition-all text-xs font-bold uppercase tracking-widest cursor-pointer focus:outline-none text-center"
                        id="rebook-reset-btn"
                      >
                        Arrange Another Booking
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Secure Booking footer credentials */}
              {step !== 3 && (
                <div className="p-4 bg-white border-t border-spa-sage/10 text-center text-[11px] text-spa-clay font-sans shrink-0 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-spa-gold shrink-0" />
                  Secured & verified by Buddha House Studio Concierge.
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
