import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wind, Eye, Compass, Activity } from 'lucide-react';
import buddhaStatueSrc from '../assets/images/buddha_statue_1779999449396.png';

export default function RelaxAndRelief() {
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathSeconds, setBreathSeconds] = useState(4);
  const [activeGuidedMode, setActiveGuidedMode] = useState<boolean>(true);

  // Sophisticated Breath-work Pacing Loop
  useEffect(() => {
    if (!activeGuidedMode) return;
    
    let interval: NodeJS.Timeout;
    
    const tick = () => {
      setBreathSeconds((prev) => {
        if (prev <= 1) {
          // Change phase
          if (breathPhase === 'inhale') {
            setBreathPhase('hold');
            return 4; // 4 seconds hold
          } else if (breathPhase === 'hold') {
            setBreathPhase('exhale');
            return 4; // 4 seconds exhale
          } else {
            setBreathPhase('inhale');
            return 4; // 4 seconds inhale
          }
        }
        return prev - 1;
      });
    };

    interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [breathPhase, activeGuidedMode]);

  return (
    <section id="relief" className="py-16 md:py-24 bg-gradient-to-b from-white to-spa-cream/20 border-t border-spa-sage/10 relative overflow-hidden">
      {/* Decorative radial blur gradient rings */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-spa-sage/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-spa-gold/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Title and separator */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-light text-spa-charcoal leading-tight">
            Relax and get <span className="italic">relief</span>
          </h2>
          
          <div className="flex justify-center items-center gap-4 my-5">
            <div className="w-16 h-[1px] bg-spa-sage/25" />
            {/* The separator is 50% bigger: normal is w-12 h-12, so bigger is w-18 h-18 */}
            <img 
              src={buddhaStatueSrc} 
              alt="Golden Buddha separator" 
              className="w-18 h-18 object-contain opacity-90 select-none pointer-events-none drop-shadow-sm filter brightness-105" 
              referrerPolicy="no-referrer" 
            />
            <div className="w-16 h-[1px] bg-spa-sage/25" />
          </div>
          
          <p className="font-sans text-sm text-spa-clay leading-relaxed">
            Pause for a moment to sync your breath with a moment of peace, accompanied by our atmospheric visual
          </p>
        </div>

        {/* Presentation Stack */}
        <div className="flex flex-col items-center">
          
          {/* Companion Interactive Somatic Guide Card */}
          <div className="w-full max-w-2xl space-y-6">
            <div className="bg-white border border-spa-sage/10 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 relative overflow-hidden">
              {/* Subtle line decoration background */}
              <div className="absolute top-0 right-0 w-32 h-32 text-spa-gold/5 pointer-events-none select-none">
                <Wind className="w-full h-full" />
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-spa-sage-light text-spa-sage-dark text-[10px] font-sans font-bold uppercase tracking-wider mb-3">
                  <Wind className="w-3.5 h-3.5" />
                  Somatic Breathwork Syncer
                </div>
                <h3 className="font-serif text-2xl font-light text-spa-charcoal">
                  Synchronize and Restore
                </h3>
                <p className="font-sans text-xs text-spa-clay leading-relaxed mt-2">
                  Follow this gentle visual guide to reset your autonomic nervous system and restore systemic balance.
                </p>
              </div>

              {/* Guided Breath visualizer card */}
              {activeGuidedMode ? (
                <div className="bg-spa-cream/40 rounded-2xl p-5 border border-spa-sage/5 relative flex flex-col items-center justify-center min-h-[180px]">
                  {/* Expanding ring visual indicator depending on breathing phase */}
                  <div className="relative flex items-center justify-center w-28 h-28 mb-4">
                    {/* Pulsing glow background rings */}
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={breathPhase}
                        initial={{ scale: 0.8, opacity: 0.3 }}
                        animate={{
                          scale: breathPhase === 'inhale' ? 1.4 : breathPhase === 'hold' ? 1.4 : 0.8,
                          opacity: breathPhase === 'hold' ? 0.35 : 0.15,
                        }}
                        transition={{
                          duration: 4,
                          ease: breathPhase === 'hold' ? 'linear' : 'easeInOut',
                        }}
                        className={`absolute inset-0 rounded-full border-2 ${
                          breathPhase === 'inhale' ? 'border-spa-gold bg-spa-gold/5' :
                          breathPhase === 'hold' ? 'border-spa-sage bg-spa-sage/5' :
                          'border-spa-clay bg-spa-clay/5'
                        }`}
                      />
                    </AnimatePresence>

                    {/* Core central action button representing the lungs */}
                    <div className="absolute w-16 h-16 rounded-full bg-white border border-spa-sage/10 shadow-sm flex flex-col items-center justify-center z-10">
                      <Wind className={`w-6 h-6 ${
                        breathPhase === 'inhale' ? 'text-spa-gold animate-bounce' :
                        breathPhase === 'hold' ? 'text-spa-sage-dark' : 'text-spa-clay'
                      }`} />
                      <span className="font-mono text-[10px] font-bold mt-1 text-spa-charcoal select-none">
                        {breathSeconds}s
                      </span>
                    </div>
                  </div>

                  {/* Text descriptions */}
                  <div className="text-center">
                    <p className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-spa-sage-dark">
                      {breathPhase === 'inhale' && '🌬️ Breathe In Slowly...'}
                      {breathPhase === 'hold' && '⏳ Suspend Breath & Rest'}
                      {breathPhase === 'exhale' && '🍃 Exhale Long & Release'}
                    </p>
                    <p className="font-sans text-[11px] text-spa-clay mt-1.5 max-w-xs mx-auto px-4">
                      {breathPhase === 'inhale' && 'Allow fresh, nourishing oxygen to fill your lower diaphragm.'}
                      {breathPhase === 'hold' && 'Rest in silence. Visualize somatic pathways healing.'}
                      {breathPhase === 'exhale' && 'Release physical tension, stress, and toxic energy.'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-spa-cream/20 rounded-2xl p-5 border border-spa-sage/5 flex flex-col items-center justify-center min-h-[190px] text-center space-y-3.5">
                  <Compass className="w-8 h-8 text-spa-sage/40" />
                  <p className="font-sans text-[11px] tracking-wider font-semibold text-spa-clay">
                    Breathing guide is currently minimized.
                  </p>
                  <button
                    onClick={() => setActiveGuidedMode(true)}
                    className="px-4 py-2 bg-spa-sage hover:bg-spa-sage-dark text-white rounded-xl font-sans text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Activate Breathing Helper
                  </button>
                </div>
              )}

              {/* Preset buttons */}
              <div className="pt-2 border-t border-spa-sage/5 flex items-center justify-between">
                <button
                  onClick={() => setActiveGuidedMode(!activeGuidedMode)}
                  className="font-sans text-[10px] font-bold uppercase tracking-wider text-spa-sage hover:text-spa-sage-dark flex items-center gap-1 px-1.5 py-1 rounded transition-colors cursor-pointer"
                  id="breathing-toggle-btn"
                >
                  <Activity className="w-3.5 h-3.5" />
                  {activeGuidedMode ? 'Disable Guide' : 'Enable Guide'}
                </button>


              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
