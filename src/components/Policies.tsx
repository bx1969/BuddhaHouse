import { ShieldCheck, CalendarX, Clock, Award, HeartHandshake } from 'lucide-react';

export default function Policies() {
  const policiesList = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-spa-gold" />,
      title: "Somatic Code of Conduct",
      desc: "Buddha House is an ultra-professional, therapeutic healing sanctuary. Under no circumstances will sexual, inappropriate, or disrespectful behavior or speech be tolerated. Any misconduct will result in immediate termination of the session with 100% payment due, and a permanent ban from our sanctuary."
    },
    {
      icon: <CalendarX className="w-6 h-6 text-spa-gold" />,
      title: "Cancellation & Rescheduling",
      desc: "We respect your time and reserve your slot exclusively for you. We kindly ask for at least 24 hours' notice for any cancellations or schedule modifications. Appointments cancelled or rescheduled with less than 24 hours' notice are subject to a fee equal to 100% of the scheduled treatment rate."
    },
    {
      icon: <Clock className="w-6 h-6 text-spa-gold" />,
      title: "Late Arrivals",
      desc: "We strive to remain strictly on schedule. If you arrive late, your session will still conclude at the originally scheduled time so that the guest immediately following is not kept waiting. The full cost of the treatment still applies."
    },
    {
      icon: <Award className="w-6 h-6 text-spa-gold" />,
      title: "Gratuity & Appreciation",
      desc: "Gratuity is never required but is highly appreciated as a direct reflection of your satisfaction. A standard gratuity of 15% to 20% of the service price is customary in boutique wellness practices and goes directly to support your dedicated somatic therapist."
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-spa-gold" />,
      title: "Health & Intake Disclosures",
      desc: "Your safety is paramount. Guests must fill out an intake form disclosing any acute injuries, chronic medical conditions, localized skin issues, or pregnancy prior to the session. This enables us to tailor or safely adapt our modalities for your well-being."
    }
  ];

  return (
    <section id="policies" className="py-16 md:py-24 bg-spa-cream/30 border-t border-b border-spa-sage/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-light text-spa-charcoal leading-tight">
            Massage Etiquette & <span className="italic">Policy</span>
          </h2>
          <div className="w-16 h-[1px] bg-spa-sage/30 mx-auto my-5" />
          <p className="font-sans text-sm text-spa-clay leading-relaxed">
            Our guidelines exist to protect the safety of our guests, maintain high-end therapeutic excellence, and support our certified specialists.
          </p>
        </div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {policiesList.map((policy, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-6 md:p-8 border border-spa-sage/10 shadow-sm transition-all duration-300 hover:shadow-md ${
                idx === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-spa-cream flex items-center justify-center mb-5 shrink-0">
                {policy.icon}
              </div>
              <h3 className="font-serif text-lg md:text-xl font-bold text-spa-charcoal tracking-wide mb-3">
                {policy.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-spa-clay leading-relaxed font-light">
                {policy.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
