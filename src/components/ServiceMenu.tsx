import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronDown, ChevronUp, Clock, Leaf } from 'lucide-react';
import { Service } from '../types';
import { SERVICES } from '../data';
import buddhaStatueSrc from '../assets/images/buddha_statue_1779999449396.png';

interface ServiceMenuProps {
  onAddServiceToCart: (service: Service, duration: number) => void;
}

export default function ServiceMenu({ onAddServiceToCart }: ServiceMenuProps) {
  const [selectedDurations, setSelectedDurations] = useState<Record<string, number>>({
    'classic-relaxation': 90,
    'deep-tissue': 90,
    'thai-fusion': 90,
    'ocean-wave-lomi': 90
  });
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [addedItemFeedback, setAddedItemFeedback] = useState<Record<string, boolean>>({});

  const filteredServices = SERVICES.filter((s) => s.category === 'massage');

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDurationChange = (serviceId: string, duration: number) => {
    setSelectedDurations((prev) => ({ ...prev, [serviceId]: duration }));
  };

  const handleAddToCart = (service: Service) => {
    const duration = selectedDurations[service.id] || service.durations[0];
    onAddServiceToCart(service, duration);

    // Provide instant feedback
    const feedbackKey = `${service.id}-${duration}`;
    setAddedItemFeedback((prev) => ({ ...prev, [feedbackKey]: true }));
    setTimeout(() => {
      setAddedItemFeedback((prev) => ({ ...prev, [feedbackKey]: false }));
    }, 1500);
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-spa-cream/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-spa-gold block mb-3">
            Buddha House Therapy
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-spa-charcoal leading-tight">
            Our <span className="italic">Bodywork Menu</span>
          </h2>
          <div className="flex justify-center items-center gap-3 my-4">
            <div className="w-16 h-[1px] bg-spa-sage/30" />
            <img src={buddhaStatueSrc} alt="Golden Buddha separator" className="w-12 h-12 object-contain opacity-80 select-none pointer-events-none" referrerPolicy="no-referrer" />
            <div className="w-16 h-[1px] bg-spa-sage/30" />
          </div>
          <p className="font-sans text-sm text-spa-clay leading-relaxed">
            Every ritual is conducted by hand-selected, licensed clinicians combining 
            pure organic cold-pressed botanicals, high-frequency energy flow, and absolute clinical precision.
          </p>
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => {
              const currentDuration = selectedDurations[service.id] || service.durations[0];
              const price = service.basePriceByDuration[currentDuration] || service.price;
              const isExpanded = !!expandedCards[service.id];
              const isAdded = !!addedItemFeedback[`${service.id}-${currentDuration}`];

              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-spa-sage/10 hover:shadow-md transition-shadow group flex flex-col h-full"
                >
                  {/* Thumbnail Banner */}
                  <div className="relative h-44 sm:h-52 overflow-hidden bg-spa-cream/50">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 font-sans text-[9px] uppercase tracking-wider bg-white/90 backdrop-blur-md text-spa-sage-dark font-bold px-3 py-1 rounded-full border border-spa-sage/15">
                      {service.category === 'massage' ? 'Massage' : service.category === 'facials' ? 'Facial' : service.category === 'body' ? 'Therapy' : 'Ritual Bundle'}
                    </span>
                  </div>

                  {/* Body Column */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <h3 className="font-serif text-xl md:text-2xl font-semibold text-spa-charcoal tracking-wide leading-snug">
                        {service.name}
                      </h3>
                      <div className="text-right">
                        <p className="font-serif text-xl font-bold text-spa-gold leading-none">
                          ${price}
                        </p>
                      </div>
                    </div>

                    <p className="font-sans text-[13px] md:text-sm text-spa-clay leading-relaxed mb-6 font-light">
                      {service.description}
                    </p>

                    {/* Durations list selectors if multiple options */}
                    {service.durations.length > 1 && (
                      <div className="mb-6 bg-spa-cream/40 p-2.5 rounded-2xl flex items-center justify-between border border-spa-sage/5">
                        <span className="font-sans text-xs text-spa-clay font-medium flex items-center gap-1.5 pl-1">
                          <Clock className="w-4.5 h-4.5 text-spa-sage" />
                          Session Length:
                        </span>
                        <div className="flex items-center gap-1.5">
                          {service.durations.map((duration) => (
                            <button
                              key={duration}
                              onClick={() => handleDurationChange(service.id, duration)}
                              className={`px-3 py-1.5 rounded-xl font-sans text-[11px] font-bold tracking-wider cursor-pointer focus:outline-none ${
                                currentDuration === duration
                                  ? 'bg-spa-sage text-white'
                                  : 'bg-white text-spa-clay hover:bg-spa-sage-light border border-spa-sage/5'
                              }`}
                              id={`duration-btn-${service.id}-${duration}`}
                            >
                              {duration} Min
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Single default item duration banner */}
                    {service.durations.length === 1 && (
                      <div className="mb-6 bg-spa-cream/40 px-3 py-2.5 rounded-2xl flex items-center justify-between border border-spa-sage/5 text-xs text-spa-clay font-medium">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4.5 h-4.5 text-spa-sage" />
                          Treatment Duration
                        </span>
                        <span className="font-mono text-xs font-semibold bg-white px-3 py-1 rounded-xl border border-spa-sage/10 text-spa-sage-dark">
                          {service.durations[0]} Minutes
                        </span>
                      </div>
                    )}

                    {/* Expanded custom details Panel (Benefits & Clinician features) */}
                    <div className="border-t border-spa-sage/10 pt-4 mt-auto">
                      <button
                        onClick={() => toggleExpand(service.id)}
                        className="w-full flex items-center justify-between text-left font-sans text-[11px] font-bold uppercase tracking-wider text-spa-sage hover:text-spa-sage-dark transition-colors cursor-pointer focus:outline-none"
                        id={`expand-btn-${service.id}`}
                      >
                        {isExpanded ? 'Hide Holistic Details' : 'Show Holistic Details'}
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ intensity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans leading-relaxed">
                              <div>
                                <h4 className="font-semibold text-spa-charcoal tracking-wide mb-1.5 flex items-center gap-1 text-[11px] uppercase">
                                  Therapeutic Benefits
                                </h4>
                                <ul className="space-y-1 text-[11px] text-spa-clay pl-0">
                                  {service.benefits.map((ben, i) => (
                                    <li key={i} className="flex items-start gap-1">
                                      <Check className="w-3.5 h-3.5 text-spa-gold shrink-0 mt-0.5" />
                                      {ben}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-semibold text-spa-charcoal tracking-wide mb-1.5 flex items-center gap-1 text-[11px] uppercase">
                                  Incidental Elements
                                </h4>
                                <ul className="space-y-1 text-[11px] text-spa-clay pl-0">
                                  {service.features.map((fea, i) => (
                                    <li key={i} className="flex items-start gap-1">
                                      <span className="w-1.5 h-1.5 bg-spa-sage rounded-full shrink-0 mt-1.5 block" />
                                      {fea}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Book Experience Button */}
                    <div className="pt-6">
                      <button
                        onClick={() => handleAddToCart(service)}
                        disabled={isAdded}
                        className={`w-full py-3 px-6 rounded-2xl font-sans text-xs font-bold uppercase tracking-widest transition-all focus:outline-none cursor-pointer flex items-center justify-center gap-2 ${
                          isAdded
                            ? 'bg-spa-gold text-white border-none shadow'
                            : 'bg-spa-sage hover:bg-spa-sage-dark text-white shadow-sm hover:shadow-md'
                        }`}
                        id={`book-btn-${service.id}`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4 text-white animate-bounce" />
                            Added to Booking Summary
                          </>
                        ) : (
                          'Add to Booking Summary'
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
