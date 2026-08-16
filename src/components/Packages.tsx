import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Check, ShoppingBag, Leaf, Flame, HelpCircle } from 'lucide-react';
import { CartItem } from '../types';

import waterfallImg from '../assets/images/buddhist_waterfall_1783082965162.jpg';
import orchidImg from '../assets/images/purple_orchid_1783082978116.jpg';
import candlesImg from '../assets/images/candles_towels_1783082991942.jpg';

interface PackagesProps {
  onAddPackageToCart: (item: Omit<CartItem, 'id'>) => void;
}

export default function Packages({ onAddPackageToCart }: PackagesProps) {
  const [selectedDuration, setSelectedDuration] = useState<60 | 90 | 120>(60);
  const [addedFeedback, setAddedFeedback] = useState<Record<string, boolean>>({});

  const baseRate = selectedDuration === 60 ? 135 : selectedDuration === 90 ? 180 : 240;

  const packagePlans = [
    {
      id: 'pkg-4',
      quantity: 4,
      name: 'Sadhana Path',
      subtitle: 'Ideal for bi-weekly somatic maintenance',
      discount: 0.10,
      badge: '10% OFF Restorative',
      icon: <Leaf className="w-5 h-5 text-spa-gold" />,
      tagline: 'Establish your healing rhythm with foundational restorative sessions.'
    },
    {
      id: 'pkg-8',
      quantity: 8,
      name: 'Eternal Knot',
      subtitle: 'Our recommended somatic alignment path',
      discount: 0.15,
      badge: '15% OFF Preferred',
      icon: <Sparkles className="w-5 h-5 text-spa-gold" />,
      tagline: 'Deepen nervous-system regulation with consistent regular clinical work.'
    },
    {
      id: 'pkg-10',
      quantity: 10,
      name: 'Dharma Wheel',
      subtitle: 'The ultimate luxury wellness integration',
      discount: 0.20,
      badge: '20% OFF Ultimate',
      icon: <Flame className="w-5 h-5 text-spa-gold" />,
      tagline: 'Complete transformation. Maximum clinical savings for lifelong wellness.'
    }
  ];

  const handleAddPackage = (plan: typeof packagePlans[0]) => {
    const singleOriginal = baseRate;
    const discountedRate = singleOriginal * (1 - plan.discount);
    const totalPrice = Math.round(discountedRate * plan.quantity);

    const packageItem: Omit<CartItem, 'id'> = {
      isCustom: false,
      name: `Buddha House Package: ${plan.name} (${plan.quantity}x ${selectedDuration}m Sessions)`,
      price: totalPrice,
      duration: selectedDuration * plan.quantity, // cumulative duration
      serviceId: `package-${plan.id}-${selectedDuration}`,
      // Add visual tracking or details for the cart
    };

    onAddPackageToCart(packageItem);

    const feedbackKey = `${plan.id}-${selectedDuration}`;
    setAddedFeedback((prev) => ({ ...prev, [feedbackKey]: true }));
    setTimeout(() => {
      setAddedFeedback((prev) => ({ ...prev, [feedbackKey]: false }));
    }, 2000);
  };

  return (
    <section id="packages" className="py-20 md:py-28 bg-[#faf9f6] border-b border-[#143213]/5 relative overflow-hidden">
      {/* Decorative organic background line art */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] opacity-[0.02] pointer-events-none select-none">
        <svg viewBox="0 0 100 100" fill="none" stroke="#143213" className="w-full h-full">
          <circle cx="50" cy="50" r="45" strokeWidth="0.2" />
          <circle cx="50" cy="50" r="40" strokeWidth="0.1" strokeDasharray="1,2" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Tibetan-Japandi Minimal Typography */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#143213] leading-tight mb-6">
            Clinical Restorative <span className="italic font-normal">Packages</span>
          </h2>
          <div className="flex justify-center items-center gap-3 my-4">
            <div className="w-12 h-[1px] bg-spa-sage/30" />
            <span className="text-[11px] font-sans text-spa-sage-dark uppercase tracking-widest font-medium">Tibetan Philosophy · Japandi Stillness</span>
            <div className="w-12 h-[1px] bg-spa-sage/30" />
          </div>
          <p className="font-sans text-sm text-[#486247] leading-relaxed font-light">
            Commit to ongoing wellness and secure premium somatic care. Buddha House packages offer dedicated access to Jackie’s custom-tailored clinical bodywork, with progressive savings designed for consistent therapeutic alignment.
          </p>
        </div>


        {/* Elegant Duration Selector Toggle */}
        <div className="flex flex-col items-center mb-12">
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#486247] mb-3">
            Select Session Base Duration
          </span>
          <div className="inline-flex flex-wrap justify-center bg-[#143213]/5 p-1.5 rounded-2xl border border-[#143213]/5 shadow-inner gap-1">
            <button
              onClick={() => setSelectedDuration(60)}
              className={`px-5 py-2.5 rounded-xl font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedDuration === 60
                  ? 'bg-[#143213] text-white shadow'
                  : 'text-[#486247] hover:text-[#143213]'
              }`}
            >
              60-Minute Rituals
            </button>
            <button
              onClick={() => setSelectedDuration(90)}
              className={`px-5 py-2.5 rounded-xl font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedDuration === 90
                  ? 'bg-[#143213] text-white shadow'
                  : 'text-[#486247] hover:text-[#143213]'
              }`}
            >
              90-Minute Rituals
            </button>
            <button
              onClick={() => setSelectedDuration(120)}
              className={`px-5 py-2.5 rounded-xl font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedDuration === 120
                  ? 'bg-[#143213] text-white shadow'
                  : 'text-[#486247] hover:text-[#143213]'
              }`}
            >
              120-Minute Rituals
            </button>
          </div>
        </div>

        {/* Interactive Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packagePlans.map((plan) => {
            const singleOriginal = baseRate;
            const singleDiscounted = singleOriginal * (1 - plan.discount);
            const totalOriginalPrice = singleOriginal * plan.quantity;
            const totalPrice = Math.round(singleDiscounted * plan.quantity);
            const totalSavings = totalOriginalPrice - totalPrice;
            const isAdded = addedFeedback[`${plan.id}-${selectedDuration}`];

            return (
              <div
                key={plan.id}
                id={`package-card-${plan.id}`}
                className="relative bg-white rounded-3xl border border-[#143213]/10 shadow-sm p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-[#143213]/25 group"
              >
                {/* Deluxe badge */}
                <div className="absolute -top-3.5 left-8 bg-[#143213] text-white px-4 py-1.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest shadow-sm">
                  {plan.badge}
                </div>

                <div>
                  {/* Top Header */}
                  <div className="flex justify-between items-start mb-4 pt-2">
                    <div>
                      <h3 className="font-serif text-2xl font-light text-[#143213] mb-1">
                        {plan.name}
                      </h3>
                      <p className="font-sans text-xs text-spa-sage-dark font-light">
                        {plan.subtitle}
                      </p>
                    </div>
                    <div className="p-2.5 bg-spa-cream/30 rounded-xl">
                      {plan.icon}
                    </div>
                  </div>

                  <hr className="border-t border-spa-cream my-4 opacity-50" />

                  {/* Pricing breakdown */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-serif text-4xl font-light text-[#143213]">
                        ${totalPrice}
                      </span>
                      <span className="font-sans text-sm text-[#889988] line-through">
                        ${totalOriginalPrice}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-spa-gold font-sans font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      Save ${totalSavings} instantly ({plan.discount * 100}% off)
                    </div>
                    <p className="font-sans text-xs text-[#5a7359] mt-3 font-light">
                      Just <span className="font-semibold text-[#143213]">${Math.round(singleDiscounted)}</span> per session (regularly ${singleOriginal})
                    </p>
                  </div>

                  {/* Tagline */}
                  <p className="font-sans text-xs text-[#5a7359] italic mb-6 font-light leading-relaxed">
                    "{plan.tagline}"
                  </p>

                  {/* Highlights list */}
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-spa-gold mt-0.5 shrink-0" />
                      <span className="font-sans text-xs text-spa-charcoal font-light leading-snug">
                        Valid for <span className="font-medium text-[#143213]">all styles</span> (Classic, Deep, Thai Fusion, Lomi)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-spa-gold mt-0.5 shrink-0" />
                      <span className="font-sans text-xs text-spa-charcoal font-light leading-snug">
                        Fully <span className="font-medium text-[#143213]">transferable</span> to loved ones
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-spa-gold mt-0.5 shrink-0" />
                      <span className="font-sans text-xs text-spa-charcoal font-light leading-snug">
                        Complimentary premium add-ons included
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-spa-gold mt-0.5 shrink-0" />
                      <span className="font-sans text-xs text-spa-charcoal font-light leading-snug">
                        No expiration date — heal at your own pace
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Elegant Luxury CTA Button */}
                <button
                  onClick={() => handleAddPackage(plan)}
                  className={`w-full py-3.5 rounded-2xl font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 focus:outline-none cursor-pointer flex items-center justify-center gap-2 ${
                    isAdded
                      ? 'bg-spa-gold text-white shadow'
                      : 'bg-[#143213] hover:bg-[#0e240e] text-white shadow-sm hover:shadow-md'
                  }`}
                  id={`purchase-pkg-${plan.id}-${selectedDuration}`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added to Sanctuary Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      Add to Booking Cart
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Informative fine-print block */}
        <div className="mt-12 bg-white/40 border border-[#143213]/5 rounded-2xl p-6 text-center max-w-2xl mx-auto">
          <p className="font-sans text-[11px] text-[#5a7359] leading-relaxed font-light">
            * <strong>Scheduling Flexibility:</strong> Once purchased, sessions can be booked online individually or all at once. Simply select "Prepaid Package Holder" on your therapist booking request form. Package sales are secure, non-refundable, and act as a beautiful gift of health to yourself or others.
          </p>
        </div>

      </div>
    </section>
  );
}
