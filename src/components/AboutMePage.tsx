import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Award, Heart, CheckCircle, Quote, Sparkles, BookOpen } from 'lucide-react';
import { THERAPISTS } from '../data';
import buddhaStatueSrc from '../assets/images/buddha_statue_1779999449396.png';

interface AboutMePageProps {
  onBackToHome: () => void;
  onBookSession: () => void;
}

export default function AboutMePage({ onBackToHome, onBookSession }: AboutMePageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const jackie = THERAPISTS[0];

  return (
    <div className="py-12 md:py-20 bg-[#fbfcfb] min-h-screen relative overflow-hidden" id="about-me-page">
      {/* Decorative background gradients and subtle indicators */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-spa-cream/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-spa-sage-light/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
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

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-spa-gold block mb-4">
            Meet the Founder & Therapist
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-[#143213] leading-tight tracking-wide">
            About <span className="font-normal">J</span><span className="italic font-normal">ackie</span>
          </h1>
          <div className="flex justify-center items-center gap-4 my-5">
            <div className="w-16 h-[1px] bg-spa-sage/20" />
            <img 
              src={buddhaStatueSrc} 
              alt="Golden Buddha separator" 
              className="w-12 h-12 object-contain opacity-85 select-none pointer-events-none" 
              referrerPolicy="no-referrer" 
            />
            <div className="w-16 h-[1px] bg-spa-sage/20" />
          </div>
          <p className="font-sans text-sm md:text-base text-[#486247] leading-relaxed max-w-2xl mx-auto font-light">
            Dedicated to deep healing, clinical precision, and mindful restoration. Over 4 years of somatic practice tailored to reset your nervous system and release structural tension.
          </p>
        </div>

        {/* Grid: Photo & Biography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Photo & Quick Stats (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-[32px] overflow-hidden bg-white border border-spa-sage/15 p-3.5 shadow-xl">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-spa-cream">
                <img
                  src={jackie.imageUrl}
                  alt={jackie.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Overlapping badge */}
              <div className="absolute -bottom-4 -right-2 bg-spa-gold text-spa-charcoal font-sans text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-xl shadow-lg border border-white/20">
                4+ Years of Healing
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-spa-sage/10 p-5 rounded-2xl text-center">
                <p className="font-mono text-xl md:text-2xl font-bold text-[#143213]">400+</p>
                <p className="font-sans text-[10px] text-spa-clay font-medium uppercase tracking-wider mt-1">5★ Reviews</p>
              </div>
              <div className="bg-white border border-spa-sage/10 p-5 rounded-2xl text-center">
                <p className="font-mono text-xl md:text-2xl font-bold text-[#143213]">100%</p>
                <p className="font-sans text-[10px] text-spa-clay font-medium uppercase tracking-wider mt-1">Licensed Clinical LMT</p>
              </div>
            </div>
          </div>

          {/* Detailed Biography, Vision & Philisophy (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Short Bio Intro */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-spa-gold">
                <Sparkles className="w-5 h-5" />
                <span className="font-sans text-[11px] font-bold uppercase tracking-widest">{jackie.title}</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-light text-spa-charcoal">
                My Calling is to Guide You Into <span className="italic">Deep Stillness</span>
              </h2>
              <div className="w-12 h-[1px] bg-spa-gold/60 my-2" />
              <p className="font-sans text-sm md:text-base text-spa-clay leading-relaxed font-light">
                {jackie.bio}
              </p>
            </div>

            {/* Clinical & Somatic Education */}
            <div className="bg-white/70 border border-spa-sage/10 rounded-2xl p-6 space-y-4">
              <h3 className="font-serif text-lg font-medium text-spa-charcoal flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-spa-gold" />
                Education & Advanced Certifications
              </h3>
              <ul className="space-y-3 font-sans text-xs md:text-sm text-spa-clay pl-0">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#143213] shrink-0 mt-0.5" />
                  <span>Licensed Massage Therapist (LMT) – Texas Medical Board Licensure</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#143213] shrink-0 mt-0.5" />
                  <span>Board Certified in Therapeutic Massage and Bodywork (BCTMB)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#143213] shrink-0 mt-0.5" />
                  <span>Traditional Thai Medical & Stretching Massage Certification – Wat Po (Bangkok)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#143213] shrink-0 mt-0.5" />
                  <span>Lomi Lomi Nui Hawaiian Lineage Bodywork Certification – Maui, Hawaii</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#143213] shrink-0 mt-0.5" />
                  <span>Myofascial Trigger Point and Orthopedic Pain Release Clinical Specialization</span>
                </li>
              </ul>
            </div>

            {/* Core Values / Philosophy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-spa-sage/10 bg-spa-cream/40 space-y-2">
                <h4 className="font-serif text-sm font-bold text-[#143213] flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-spa-gold" />
                  Compassionate Care
                </h4>
                <p className="font-sans text-[11px] text-spa-clay leading-relaxed font-light">
                  Treatment begins with structural and physiological presence. I hold a secure, non-judgmental container of deep somatic safety for everyone who steps into Buddha House.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-spa-sage/10 bg-spa-cream/40 space-y-2">
                <h4 className="font-serif text-sm font-bold text-[#143213] flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-spa-gold" />
                  Anatomical Precision
                </h4>
                <p className="font-sans text-[11px] text-spa-clay leading-relaxed font-light">
                  Restoration isn't just about relaxation. Utilizing clinical palpation, I localize tight fascia, myofascial trigger points, and muscle guarding to restore orthopedic wellness.
                </p>
              </div>
            </div>

            {/* Letter from Jackie Block */}
            <div className="relative p-6 sm:p-8 bg-white border border-spa-sage/10 rounded-2xl shadow-sm overflow-hidden">
              <div className="absolute top-4 right-4 text-spa-gold/15">
                <Quote className="w-14 h-14" />
              </div>
              <p className="font-serif text-sm md:text-base italic text-spa-clay leading-relaxed relative z-10 mb-4">
                "Massage therapy is more than just a luxury; it is a sacred clinical modality that bridges the mind and body. At Buddha House, my purpose is to help you discharge the constant static of modern life, unwind deep physical holding patterns, and help you return home to yourself."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-spa-gold" />
                <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-spa-gold">Jackie, Founder</p>
              </div>
            </div>

            {/* Book Now Action Card */}
            <div className="p-6 md:p-8 bg-[#143213] text-white rounded-3xl text-center md:text-left md:flex justify-between items-center gap-6">
              <div className="space-y-2 mb-6 md:mb-0">
                <h4 className="font-serif text-xl font-light">Ready to experience deep renewal?</h4>
                <p className="font-sans text-xs text-white/70 leading-relaxed font-light max-w-md">
                  Reserve a session with Jackie today. You can select standard traditional treatments, or use our interactive planner to fully customize your session variables.
                </p>
              </div>
              <button
                onClick={onBookSession}
                className="bg-spa-gold hover:bg-spa-gold/90 text-spa-charcoal font-sans text-xs font-semibold uppercase tracking-widest py-3 px-6 rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer shrink-0"
              >
                Reserve Space
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
