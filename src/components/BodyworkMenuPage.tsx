import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Clock, ArrowLeft, Leaf, Sparkles, ChevronRight, MessageSquare, ShieldCheck } from 'lucide-react';
import { Service } from '../types';
import { SERVICES } from '../data';
import buddhaStatueSrc from '../assets/images/buddha_statue_1779999449396.png';

interface BodyworkMenuPageProps {
  onAddServiceToCart: (service: Service, duration: number) => void;
  onBackToHome: () => void;
}

export default function BodyworkMenuPage({ onAddServiceToCart, onBackToHome }: BodyworkMenuPageProps) {
  const [selectedDurations, setSelectedDurations] = useState<Record<string, number>>({
    'classic-relaxation': 90,
    'deep-tissue': 90,
    'thai-fusion': 90,
    'ocean-wave-lomi': 90
  });
  const [addedItemFeedback, setAddedItemFeedback] = useState<Record<string, boolean>>({});

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const massages = SERVICES.filter((s) => s.category === 'massage');

  const handleDurationChange = (serviceId: string, duration: number) => {
    setSelectedDurations((prev) => ({ ...prev, [serviceId]: duration }));
  };

  const handleAddToCart = (service: Service) => {
    const duration = selectedDurations[service.id] || service.durations[0];
    onAddServiceToCart(service, duration);

    const feedbackKey = `${service.id}-${duration}`;
    setAddedItemFeedback((prev) => ({ ...prev, [feedbackKey]: true }));
    setTimeout(() => {
      setAddedItemFeedback((prev) => ({ ...prev, [feedbackKey]: false }));
    }, 1500);
  };

  return (
    <div className="py-12 md:py-20 bg-[#fbfcfb] min-h-screen relative overflow-hidden">
      {/* Decorative accent background circles */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-spa-cream/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-spa-sage-light/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-10 md:mb-14">
          <button
            onClick={onBackToHome}
            className="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-spa-sage/10 bg-white hover:bg-[#f4f7f3] hover:border-spa-sage/30 text-spa-sage transition-all duration-300 font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-300" />
            Back to Home
          </button>
        </div>

        {/* Page Header Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-spa-gold block mb-4">
            Curated Restorative Somatics
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-light text-[#143213] leading-tight tracking-wide">
            The Bodywork <span className="italic font-normal">Menu</span>
          </h1>
          <div className="flex justify-center items-center gap-4 my-6">
            <div className="w-24 h-[1px] bg-spa-sage/20" />
            <img 
              src={buddhaStatueSrc} 
              alt="Golden Buddha separator" 
              className="w-14 h-14 object-contain opacity-90 select-none pointer-events-none" 
              referrerPolicy="no-referrer" 
            />
            <div className="w-24 h-[1px] bg-spa-sage/20" />
          </div>
          <p className="font-sans text-base text-[#486247] leading-relaxed max-w-2xl mx-auto font-light">
            Every session is a customized somatic journey led by exceptional licensed clinicians. 
            Select your preferred treatment, length, and let us restore harmony to your nervous system.
          </p>
        </div>

        {/* Services List Block */}
        <div className="space-y-16 md:space-y-24">
          {massages.map((service, idx) => {
            const currentDuration = selectedDurations[service.id] || service.durations[0];
            const price = service.basePriceByDuration[currentDuration] || service.price;
            const isAdded = !!addedItemFeedback[`${service.id}-${currentDuration}`];
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-stretch"
              >
                {/* Image panel (takes 5 cols, swaps sides for alternating rhythm) */}
                <div className={`lg:col-span-5 relative rounded-3xl overflow-hidden shadow-md group min-h-[300px] lg:min-h-[440px] ${!isEven && 'lg:order-last'}`}>
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#143213]/40 via-transparent to-transparent" />
                </div>

                {/* Content detail panel (takes 7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between py-2">
                  <div>
                    {/* Title and Price */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-spa-sage/10 pb-4 mb-6">
                      <h2 className="font-serif text-2xl md:text-3xl font-light text-[#143213] tracking-wide">
                        {service.name}
                      </h2>
                      <div className="flex items-baseline gap-2">
                        <span className="font-sans text-xs text-[#486247] uppercase tracking-wider">Starting at</span>
                        <span className="font-serif text-2xl md:text-3xl font-bold text-spa-gold">
                          ${price}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="font-sans text-sm md:text-base text-[#486247] leading-relaxed mb-8 font-light">
                      {service.description}
                    </p>

                    {/* Dynamic Session Length Selector */}
                    <div className="mb-8 bg-white p-4 rounded-3xl border border-spa-sage/10 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#143213] flex items-center gap-2">
                          <Clock className="w-4 h-4 text-spa-gold" />
                          Select Session Length:
                        </span>
                        
                        <div className="flex flex-wrap items-center gap-2">
                          {service.durations.map((dur) => {
                            const activePrice = service.basePriceByDuration[dur] || 180;
                            const isSelected = currentDuration === dur;
                            return (
                              <button
                                key={dur}
                                onClick={() => handleDurationChange(service.id, dur)}
                                className={`px-4 py-2.5 rounded-2xl font-sans text-xs font-bold tracking-wider transition-all duration-300 cursor-pointer focus:outline-none flex items-center gap-1.5 ${
                                  isSelected
                                    ? 'bg-[#143213] text-white shadow-md'
                                    : 'bg-[#f4f7f3] text-[#486247] hover:bg-spa-sage-light/40 border border-spa-sage/5'
                                }`}
                                id={`page-duration-btn-${service.id}-${dur}`}
                              >
                                {dur} Min
                                <span className={`text-[10px] font-normal ${isSelected ? 'text-spa-gold' : 'text-[#486247]/70'}`}>
                                  (${activePrice})
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Holistic Benefits & Accents */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 bg-[#f4f7f3]/30 p-6 rounded-3xl border border-[#143213]/5">
                      <div>
                        <h4 className="font-sans text-xs font-bold text-[#143213] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-spa-gold rounded-full" />
                          Therapeutic Benefits
                        </h4>
                        <ul className="space-y-2 text-xs text-[#486247] font-light">
                          {service.benefits.map((benefit, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-spa-gold shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-sans text-xs font-bold text-[#143213] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-[#143213] rounded-full" />
                          Session Accents
                        </h4>
                        <ul className="space-y-2 text-xs text-[#486247] font-light">
                          {service.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-[#143213]/40 rounded-full shrink-0 mt-1.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart CTA */}
                  <div>
                    <button
                      onClick={() => handleAddToCart(service)}
                      disabled={isAdded}
                      className={`w-full sm:w-auto px-10 py-4 rounded-2xl font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 focus:outline-none cursor-pointer flex items-center justify-center gap-3 shadow-sm ${
                        isAdded
                          ? 'bg-spa-gold text-white shadow-md'
                          : 'bg-[#143213] hover:bg-[#0e240e] text-white hover:shadow-md'
                      }`}
                      id={`page-book-btn-${service.id}`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 text-white animate-bounce" />
                          Added to Booking Summary
                        </>
                      ) : (
                        <>
                          <span>Book {service.name} ({currentDuration} min)</span>
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Holistic Reassurance footer block */}
        <div className="mt-24 md:mt-32 bg-gradient-to-br from-[#143213] to-[#0e240e] text-white p-8 md:p-12 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-spa-gold mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">Licensed Clinicians</h3>
              <p className="font-sans text-xs text-white/70 leading-relaxed font-light">
                Every therapist at Buddha House is meticulously vetted, licensed, and highly experienced in specialized restoratives.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-spa-gold mb-4">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">Organic Botanicals</h3>
              <p className="font-sans text-xs text-white/70 leading-relaxed font-light">
                We formulate our custom cold-pressed signature oils utilizing pure therapeutic organic extracts and essential botanicals.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-spa-gold mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">Tailored Sequences</h3>
              <p className="font-sans text-xs text-white/70 leading-relaxed font-light">
                We do not believe in template massages. Each session is refined and adjusted in real-time based on your physical tension.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
