import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sliders, Sparkles, Plus, Clock, Music, Info, HelpCircle, Check } from 'lucide-react';
import { CustomSessionConfig, CartItem } from '../types';
import { FOCUS_AREAS, ADD_ONS, SOUNDSCAPES, THERAPISTS } from '../data';
import buddhaStatueSrc from '../assets/images/buddha_statue_1779999449396.png';

interface SessionCustomizerProps {
  onAddCustomSessionToCart: (item: CartItem) => void;
}

export default function SessionCustomizer({ onAddCustomSessionToCart }: SessionCustomizerProps) {
  // Config state
  const [baseStyle, setBaseStyle] = useState<string>('Classic Relaxation');
  const [duration, setDuration] = useState<number>(90);
  const [pressure, setPressure] = useState<'light' | 'medium' | 'deep'>('medium');
  const [selectedFocus, setSelectedFocus] = useState<string[]>(['Shoulders & Rotator Cuff', 'Neck & Cervical Spine']);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [soundscape, setSoundscape] = useState<string>(SOUNDSCAPES[2]); // Zen Flute

  // Calculated variables
  const [totalPrice, setTotalPrice] = useState<number>(180);
  const [totalDuration, setTotalDuration] = useState<number>(90);
  const [recommendedTherapists, setRecommendedTherapists] = useState<string[]>([]);
  const [isAdded, setIsAdded] = useState(false);

  const styles = [
    { name: 'Classic Relaxation', base60: 140, base90: 180, base120: 240, desc: 'A calming, nervous-system reset using slow, flowing strokes.' },
    { name: 'Deep Tissue', base60: 140, base90: 180, base120: 240, desc: 'Firm pressure to break up muscle knots and chronic pain.' },
    { name: 'THAI FUSION & STRETCHING', base60: 140, base90: 180, base120: 240, desc: 'Dynamic assisted stretching and bodywork to restore flexibility.' },
    { name: 'Lomi Lomi', base60: 140, base90: 180, base120: 240, desc: 'Hawaiian-based massage mimicking fluid ocean waves using forearms.' }
  ];

  // Dynamic calculations
  useEffect(() => {
    // 1. Calculate base price
    const currentStyle = styles.find(s => s.name === baseStyle) || styles[0];
    let basePrice = currentStyle.base90;
    if (duration === 60) basePrice = currentStyle.base60;
    else if (duration === 120) basePrice = currentStyle.base120;

    // 2. Add-ons pricing & duration addition
    let extraPrice = 0;
    let extraDuration = 0;
    selectedAddOns.forEach(addOnName => {
      const match = ADD_ONS.find(a => a.name === addOnName);
      if (match) {
        extraPrice += match.price;
        extraDuration += match.duration;
      }
    });

    setTotalPrice(basePrice + extraPrice);
    setTotalDuration(duration + extraDuration);

    // 3. Therapist Recommendation
    const matching: string[] = ['Jackie'];
    setRecommendedTherapists(matching);
  }, [baseStyle, duration, pressure, selectedAddOns]);

  const handleToggleFocus = (area: string) => {
    setSelectedFocus(prev =>
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
  };

  const handleToggleAddOn = (addOnName: string) => {
    setSelectedAddOns(prev =>
      prev.includes(addOnName) ? prev.filter(name => name !== addOnName) : [...prev, addOnName]
    );
  };

  const handleBuildSession = () => {
    const config: CustomSessionConfig = {
      baseStyle,
      duration,
      pressure,
      focusAreas: selectedFocus,
      addOns: selectedAddOns,
      soundscape
    };

    const cartItem: CartItem = {
      id: `custom-${Date.now()}`,
      isCustom: true,
      name: `Customized ${baseStyle} Ritual`,
      price: totalPrice,
      duration: totalDuration,
      customDetails: config,
      therapistName: recommendedTherapists[0] // assign default recommendation
    };

    onAddCustomSessionToCart(cartItem);

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <section id="customizer" className="py-20 bg-gradient-to-br from-spa-cream via-white to-spa-sage-light/30 border-y border-spa-sage/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-serif text-3xl md:text-5xl font-light text-spa-charcoal leading-tight">
            Design Your <span className="italic">Perfect Massage</span>
          </h2>
          <div className="flex justify-center items-center gap-3 my-4">
            <div className="w-16 h-[1px] bg-spa-sage/30" />
            <img src={buddhaStatueSrc} alt="Golden Buddha separator" className="w-12 h-12 object-contain opacity-80 select-none pointer-events-none" referrerPolicy="no-referrer" />
            <div className="w-16 h-[1px] bg-spa-sage/30" />
          </div>
          <p className="font-sans text-sm text-spa-clay leading-relaxed">
            Rather than standard menu packages, formulate your own sequence. Toggle the parameters below 
            to preview your estimated quote and specialist compatibility immediately.
          </p>
        </div>

        {/* Builder Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (left 7 cols) */}
          <div className="lg:col-span-7 space-y-8 bg-white border border-spa-sage/15 rounded-3xl p-6 md:p-8 shadow-sm">
            
            {/* Step 1: Base Massage Style */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-spa-sage-light text-spa-sage-dark flex items-center justify-center font-mono text-xs font-bold font-semibold">1</span>
                <h3 className="font-serif text-lg font-semibold text-spa-charcoal tracking-wide">Select Base Core Style</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {styles.map((style) => (
                  <button
                    key={style.name}
                    onClick={() => setBaseStyle(style.name)}
                    className={`p-4 rounded-2xl text-left border transition-all cursor-pointer focus:outline-none ${
                      baseStyle === style.name
                        ? 'border-spa-sage bg-spa-sage-light/40 shadow-sm'
                        : 'border-spa-sage/10 hover:border-spa-sage/30 hover:bg-spa-cream/10'
                    }`}
                    id={`style-btn-${style.name.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    <p className={`font-serif text-sm font-bold tracking-wide ${baseStyle === style.name ? 'text-spa-sage-dark' : 'text-spa-charcoal'}`}>
                      {style.name}
                    </p>
                    <p className="font-sans text-xs text-spa-clay/90 mt-1 font-light leading-snug">
                      {style.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Duration */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-spa-sage-light text-spa-sage-dark flex items-center justify-center font-mono text-xs font-bold font-semibold">2</span>
                <h3 className="font-serif text-lg font-semibold text-spa-charcoal tracking-wide">Massage Duration</h3>
              </div>
               <div className="flex gap-3">
                {[60, 90, 120].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => setDuration(mins)}
                    className={`flex-1 py-3 px-4 rounded-2xl border transition-all font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer focus:outline-none ${
                      duration === mins
                        ? 'border-spa-sage bg-spa-sage text-white shadow-md shadow-spa-sage/10'
                        : 'border-spa-sage/10 bg-spa-cream/20 text-spa-clay hover:bg-spa-sage-light/30'
                    }`}
                    id={`custom-duration-btn-${mins}`}
                  >
                    {mins} Min Session
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Intensity / Pressure */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-spa-sage-light text-spa-sage-dark flex items-center justify-center font-mono text-xs font-bold font-semibold">3</span>
                <h3 className="font-serif text-lg font-semibold text-spa-charcoal tracking-wide">Pressure Depth preference</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(['light', 'medium', 'deep'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setPressure(lvl)}
                    className={`py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer font-sans text-xs font-semibold capitalize tracking-wider focus:outline-none ${
                      pressure === lvl
                        ? 'border-spa-gold bg-spa-gold/10 text-spa-clay font-bold'
                        : 'border-spa-sage/10 bg-spa-cream/15 text-spa-clay hover:bg-spa-cream/40'
                    }`}
                    id={`pressure-btn-${lvl}`}
                  >
                    {lvl === 'light' && 'Gentle Light'}
                    {lvl === 'medium' && 'Moderate Medium'}
                    {lvl === 'deep' && 'Deep Penetration'}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Muscle Focus Areas */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-spa-sage-light text-spa-sage-dark flex items-center justify-center font-mono text-xs font-bold font-semibold">4</span>
                  <h3 className="font-serif text-lg font-semibold text-spa-charcoal tracking-wide">Specific Core Focus Areas</h3>
                </div>
                <span className="font-sans text-[10px] text-spa-clay font-medium uppercase tracking-wider bg-spa-cream/50 px-2.5 py-1 rounded-lg">
                  Selected: {selectedFocus.length}
                </span>
              </div>
              <p className="font-sans text-xs text-spa-clay font-light leading-relaxed mb-4">
                Select your targeted focus regions. Clinicians will adjust stroke coordinates and spend additional attention on these areas.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 flex-wrap">
                {FOCUS_AREAS.map((area) => {
                  const isChecked = selectedFocus.includes(area);
                  return (
                    <button
                      key={area}
                      onClick={() => handleToggleFocus(area)}
                      className={`py-2 px-3 text-left rounded-xl border text-[11px] font-sans font-medium transition-all cursor-pointer focus:outline-none flex items-center gap-1.5 ${
                        isChecked
                          ? 'border-spa-sage bg-spa-sage/5 text-spa-sage-dark font-bold'
                          : 'border-spa-sage/10 hover:border-spa-sage/35 text-spa-clay'
                      }`}
                      id={`focus-btn-${area.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <span className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 border ${
                        isChecked ? 'bg-spa-sage border-spa-sage text-white' : 'border-spa-sage/30 bg-white'
                      }`}>
                        {isChecked && <Check className="w-2.5 h-2.5 stroke-[3px]" />}
                      </span>
                      <span className="truncate">{area.split(' & ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Sensory Upgrades */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-spa-sage-light text-spa-sage-dark flex items-center justify-center font-mono text-xs font-bold font-semibold">5</span>
                <h3 className="font-serif text-lg font-semibold text-spa-charcoal tracking-wide">Add-On Elevations</h3>
              </div>
              <div className="space-y-2">
                {ADD_ONS.map((addon) => {
                  const isChecked = selectedAddOns.includes(addon.name);
                  return (
                    <button
                      key={addon.name}
                      onClick={() => handleToggleAddOn(addon.name)}
                      className={`w-full p-3.5 rounded-2xl text-left border transition-all cursor-pointer focus:outline-none flex gap-3 items-center ${
                        isChecked
                          ? 'border-spa-sage bg-spa-sage-light/20 shadow-inner'
                          : 'border-spa-sage/10 bg-spa-cream/5 hover:border-spa-sage/20'
                      }`}
                      id={`addon-btn-${addon.name.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border ${
                        isChecked ? 'bg-spa-sage border-spa-sage text-white' : 'border-spa-sage/30 bg-white'
                      }`}>
                        {isChecked && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                      <div className="flex-1">
                        <div className="flex justify-between items-baseline gap-2">
                          <p className="font-serif text-sm font-bold text-spa-charcoal leading-none">
                            {addon.name}
                          </p>
                          <span className="font-semibold text-xs text-spa-gold shrink-0">
                            {addon.price === 0 ? 'Free' : `+$${addon.price}`}
                          </span>
                        </div>
                        <p className="font-sans text-[11px] text-spa-clay font-light leading-relaxed mt-1">
                          {addon.description} {addon.duration > 0 && `(Adds ${addon.duration} min)`}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>



          </div>

          {/* Pricing Preview Ticket Column (right 5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-spa-cream border border-spa-emerald/5 rounded-3xl p-6 shadow-md border-t-4 border-t-spa-gold relative overflow-hidden">
              
              {/* Confetti element decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-spa-gold/15 to-transparent rounded-bl-full pointer-events-none" />

              <div className="flex items-center gap-1.5 text-spa-gold font-bold text-[10px] uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Somatic Itinerary Ticket
              </div>

              <h3 className="font-serif text-2xl font-semibold text-spa-charcoal mb-4">
                Your Customized Session
              </h3>

              {/* Specs summary block list */}
              <div className="space-y-4 border-b border-spa-sage/15 pb-6 text-xs font-sans">
                
                <div className="flex justify-between items-baseline">
                  <span className="text-spa-clay text-[11px] uppercase tracking-wider">Base Massage:</span>
                  <span className="font-bold text-spa-charcoal text-right font-serif">{baseStyle} ({duration}m)</span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-spa-clay text-[11px] uppercase tracking-wider">Pressure Deepness:</span>
                  <span className="font-semibold text-spa-charcoal capitalize">{pressure}</span>
                </div>

                {selectedFocus.length > 0 && (
                  <div>
                    <span className="text-spa-clay text-[11px] uppercase tracking-wider block mb-1">Cranial Focus Coordinates:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedFocus.map((f, idx) => (
                        <span key={idx} className="bg-white px-2 py-0.5 rounded-lg border border-spa-sage/10 text-[10px] text-spa-sage-dark font-medium font-semibold whitespace-nowrap">
                          🎯 {f.split(' & ')[0]}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedAddOns.length > 0 && (
                  <div>
                    <span className="text-spa-clay text-[11px] uppercase tracking-wider block mb-1">Aromatic Infusions:</span>
                    <ul className="space-y-1 text-spa-charcoal font-medium pl-0">
                      {selectedAddOns.map((addon, idx) => (
                        <li key={idx} className="flex justify-between items-center bg-white/50 px-2 py-1 rounded-lg text-[10px] border border-spa-sage/5">
                          <span>✨ {addon}</span>
                          <span className="font-mono text-[9px] text-spa-gold font-semibold">
                            {ADD_ONS.find(a => a.name === addon)?.price === 0 ? 'Free' : `+$${ADD_ONS.find(a => a.name === addon)?.price}`}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}



              </div>

              {/* Estimated Quote block */}
              <div className="py-6 border-b border-spa-sage/15 flex justify-between items-center text-spa-charcoal">
                <div>
                  <p className="font-sans text-[11px] text-spa-clay uppercase tracking-[0.15em] font-bold">TOTAL DURATION</p>
                  <p className="font-mono text-xl font-bold mt-1.5 text-spa-sage-dark flex items-center gap-1.5 leading-none">
                    <Clock className="w-4.5 h-4.5 text-spa-sage" />
                    {totalDuration} Min
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-sans text-[11px] text-spa-clay uppercase tracking-[0.15em] font-bold">ESTIMATED RATE</p>
                  <p className="font-serif text-3xl font-bold mt-1 text-spa-gold leading-none lining-nums">
                    ${totalPrice}
                  </p>
                </div>
              </div>

              {/* AI clinician recommendations matching */}
              <div className="py-5 text-xs font-sans text-spa-clay">
                <p className="font-bold uppercase tracking-wider text-[10px] text-spa-clay mb-2 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-spa-gold shrink-0" />
                  Clinician Affinity Matching
                </p>
                <p className="font-light leading-relaxed mb-3">
                  Based on your configured pressure level ({pressure}) and focus criteria, we recommend requesting:
                </p>
                <div className="flex items-center gap-2">
                  {recommendedTherapists.map((name, i) => {
                    const match = THERAPISTS.find(t => t.name === name);
                    return (
                      <div key={i} className="flex-1 bg-white border border-spa-sage/10 rounded-xl p-2.5 flex items-center gap-2">
                        {match && (
                          <img
                            src={match.imageUrl}
                            alt={match.name}
                            className="w-8 h-8 rounded-full object-cover border border-spa-sage/20"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-spa-charcoal text-[11px] leading-tight truncate">{name}</p>
                          <p className="text-[9px] text-spa-sage font-medium truncate">Matched Specialist</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reserve button */}
              <div className="pt-4">
                <button
                  onClick={handleBuildSession}
                  disabled={isAdded}
                  className={`w-full py-4 rounded-2xl font-sans text-xs font-bold uppercase tracking-widest transition-all focus:outline-none cursor-pointer flex items-center justify-center gap-2 ${
                    isAdded
                      ? 'bg-spa-gold text-white shadow'
                      : 'bg-spa-sage-dark hover:bg-spa-charcoal text-white shadow-lg'
                  }`}
                  id="add-custom-session-btn"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-white animate-pulse" />
                      Session Confirmed & Saved
                    </>
                  ) : (
                    'Add Custom Session to Booking'
                  )}
                </button>
                <p className="text-center font-sans text-[10px] text-spa-clay/70 font-light mt-3">
                  No credit card required to register appointment times. Fully cancelable.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
