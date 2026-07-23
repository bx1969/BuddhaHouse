import { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Blend, Star, Calendar, ShieldCheck, Heart } from 'lucide-react';
import { Therapist } from '../types';
import { THERAPISTS } from '../data';
import buddhaStatueSrc from '../assets/images/buddha_statue_1779999449396.png';

interface TherapistsProps {
  onSelectTherapist: (therapist: Therapist) => void;
  selectedTherapistId?: string;
  onViewAboutMe?: () => void;
}

export default function Therapists({ onSelectTherapist, selectedTherapistId, onViewAboutMe }: TherapistsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="therapists" className="py-20 md:py-24 bg-spa-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-light text-spa-charcoal leading-tight">
            Our Licensed <span className="italic">Specialist</span>
          </h2>
          <div className="flex justify-center items-center gap-3 my-4">
            <div className="w-16 h-[1px] bg-spa-sage/30" />
            <img src={buddhaStatueSrc} alt="Golden Buddha separator" className="w-12 h-12 object-contain opacity-80 select-none pointer-events-none" referrerPolicy="no-referrer" />
            <div className="w-16 h-[1px] bg-spa-sage/30" />
          </div>
          <p className="font-sans text-sm text-spa-clay leading-relaxed">
            Every treatment is guided by certified practitioners who are dedicated 
            to anatomical precision, natural botany, and personalized nervous system restoration.
          </p>
        </div>

        {/* Content Container */}
        <div className="max-w-4xl mx-auto">
          {THERAPISTS.map((therapist) => {
            const isSelected = selectedTherapistId === therapist.id;

            return (
              <motion.div
                key={therapist.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`bg-spa-cream rounded-3xl overflow-hidden shadow-xl border transition-all md:flex ${
                  isSelected
                    ? 'border-spa-gold ring-1 ring-spa-gold/30 shadow-spa-gold/5'
                    : 'border-spa-sage/10'
                }`}
                id={`therapist-[${therapist.id}]`}
              >
                {/* Photo (Left/Top side) */}
                <div className="md:w-2/5 relative min-h-[300px] md:min-h-full aspect-[4/5] bg-spa-cream overflow-hidden">
                  <img
                    src={therapist.imageUrl}
                    alt={therapist.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Verified Rating Tag */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm border border-spa-sage/10">
                    <Star className="w-3.5 h-3.5 text-spa-gold fill-spa-gold" />
                    <span className="font-mono text-[11px] font-bold text-spa-charcoal">{therapist.rating}</span>
                    <span className="font-sans text-[10px] text-spa-clay font-medium">({therapist.reviewsCount} verified clients)</span>
                  </div>

                  {isSelected && (
                    <div className="absolute top-4 right-4 bg-spa-gold text-white font-sans text-[9px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow border border-white/20">
                      Primary Specialist Selected
                    </div>
                  )}
                </div>

                {/* Content Details (Right side) */}
                <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-between text-spa-charcoal">
                  <div>
                    <div className="flex flex-wrap items-baseline gap-2.5 mb-2">
                      <h3 className="font-serif text-2xl md:text-3xl font-light tracking-wide text-spa-charcoal">
                        {therapist.name}
                      </h3>
                      <span className="font-sans text-[11px] text-spa-gold font-bold uppercase tracking-wider">
                        {therapist.title}
                      </span>
                    </div>
                    
                    <div className="w-12 h-[1px] bg-spa-gold/50 my-4" />

                    <p className="font-sans text-sm text-spa-clay leading-relaxed font-light mb-6">
                      {therapist.bio}
                    </p>

                    {/* Specialties Tag block */}
                    <div className="mb-6">
                      <p className="font-sans text-[10px] text-spa-clay font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-spa-gold" />
                        Somatic Restoration Specialties:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {therapist.specialty.map((spec, i) => (
                          <span
                            key={i}
                            className="bg-white text-spa-sage-dark text-[11px] px-3 py-1 rounded-xl border border-spa-sage/10 font-sans font-medium"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Schedule block */}
                    <div className="pt-4 border-t border-spa-sage/10 flex flex-wrap items-center justify-between text-xs text-spa-clay font-sans gap-2 mb-8">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Calendar className="w-4 h-4 text-spa-sage" />
                        In-Studio Restorative Availability:
                      </span>
                      <span className="font-mono font-bold bg-white px-3 py-1 rounded-lg border border-spa-sage/10 text-spa-sage-dark">
                        {therapist.availability.join(', ')}
                      </span>
                    </div>
                  </div>

                  {onViewAboutMe && (
                    <button
                      onClick={onViewAboutMe}
                      className="w-full py-3.5 rounded-xl font-sans text-xs font-bold uppercase tracking-widest bg-[#143213] hover:bg-[#0e240e] text-white transition-all shadow-sm hover:shadow duration-300 focus:outline-none cursor-pointer text-center"
                      id="view-about-me-btn"
                    >
                      Read Jackie's Full Story & Certifications
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
