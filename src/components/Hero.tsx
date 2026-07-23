import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Leaf } from 'lucide-react';
import heroImageSrc from '../assets/images/bh_table.jpeg';

interface HeroProps {
  onExploreServices: () => void;
  onCustomPlanner: () => void;
}

export default function Hero({ onExploreServices, onCustomPlanner }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-4 md:py-8 lg:py-12 bg-gradient-to-b from-spa-cream/60 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-spa-charcoal text-white shadow-xl min-h-[480px] sm:min-h-[500px] md:aspect-[16/7] lg:aspect-[21/9] md:min-h-[450px] lg:min-h-[520px] flex flex-col justify-center">
          {/* Background image & overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroImageSrc}
              alt="Buddha House Massage Sanctuary"
              className="w-full h-full object-cover object-center opacity-95 transition-transform duration-[12000ms] hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-spa-charcoal/70 via-spa-charcoal/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-spa-charcoal/40 via-transparent to-transparent opacity-40" />
          </div>

          {/* Core Content */}
          <div className="relative z-10 w-full py-12 px-6 sm:px-12 md:px-16 lg:px-20 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 md:space-y-6"
            >


              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight md:leading-[1.1] tracking-tight text-white">
                The path to bliss begins <span className="italic block sm:inline text-spa-gold">on the table.</span>
              </h1>

              <p className="font-sans text-xs sm:text-sm md:text-base text-white/80 font-light leading-relaxed max-w-lg">
                Step into a world of calm, comfort and relaxation with our uniquely-crafted massage therapies. Experience a journey of mindful stillness, organic aromatherapy, and complete nervous system restoration.
              </p>

              {/* Responsive CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
                <button
                  onClick={onExploreServices}
                  className="bg-spa-gold hover:bg-spa-gold/90 text-spa-charcoal font-sans text-xs font-bold uppercase tracking-widest py-3.5 px-6 sm:px-8 rounded-full shadow transition-all hover:shadow-lg active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 focus:outline-none"
                  id="hero-explore-btn"
                >
                  Bodywork Menu
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onCustomPlanner}
                  className="bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-sm font-sans text-xs font-semibold uppercase tracking-widest py-3.5 px-6 sm:px-8 rounded-full transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center focus:outline-none"
                  id="hero-custom-btn"
                >
                  Design Custom Massage
                </button>
              </div>
            </motion.div>
          </div>

          {/* Quick Badges in Corner */}
          <div className="absolute right-6 bottom-6 hidden lg:flex items-center gap-6 bg-spa-charcoal/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-xs font-medium text-white/90">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-spa-sage/20 flex items-center justify-center text-spa-sage">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="font-bold text-[11px] leading-tight text-white">Certified Therapists</p>
                <p className="text-[10px] text-white/60">Licensed Experts</p>
              </div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-spa-gold/20 flex items-center justify-center text-spa-gold">
                <Leaf className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="font-bold text-[11px] leading-tight text-white">100% Organic</p>
                <p className="text-[10px] text-white/60">Botanical Oils Only</p>
              </div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-spa-sage-light/20 flex items-center justify-center text-spa-sage-light">
                <Heart className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="font-bold text-[11px] leading-tight text-white">Somatic Care</p>
                <p className="text-[10px] text-white/60">Holistic Wellness</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
