import { ShieldAlert } from 'lucide-react';

export default function ProfessionalConduct() {
  return (
    <section className="py-12 bg-[#FAF9F5] border-t border-b border-spa-sage/15 relative overflow-hidden">
      {/* Subtle background overlay to set a serious, professional tone */}
      <div className="absolute inset-0 bg-[radial-gradient(#143213_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-[0.02]" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-white rounded-2xl border border-spa-sage/20 p-6 md:p-8 shadow-sm relative">
          
          {/* Accent Indicator */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-spa-sage-dark text-white p-2.5 rounded-xl shadow-md border border-spa-gold/20">
            <ShieldAlert className="w-5 h-5 text-spa-gold" />
          </div>

          <div className="text-center max-w-xl mx-auto mt-2 mb-6">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-spa-gold block mb-2">
              Professional Conduct Policy
            </span>
            <h2 className="font-serif text-xl md:text-2xl font-light text-spa-charcoal leading-tight">
              Respect <span className="italic">Massage Therapy</span>
            </h2>
            <div className="w-12 h-[1px] bg-spa-sage/30 mx-auto my-3" />
          </div>

          <div className="space-y-4 text-spa-clay font-sans text-xs md:text-sm leading-relaxed font-light text-center">
            <p>
              Massage therapy is an established, professional healthcare practice. We enforce a strict, zero-tolerance policy for any form of inappropriate touch, suggestive remarks, or solicitations.
            </p>

            <div className="p-4 bg-spa-cream/40 rounded-xl border-l-4 border-spa-gold text-left max-w-2xl mx-auto text-xs">
              <p className="font-medium text-spa-charcoal mb-1">Clinic Guidelines & Legal Measures</p>
              <p className="text-spa-clay leading-relaxed">
                Any inappropriate conduct immediately terminates the session with full payment due. All violations are documented and reported directly to local law enforcement, and violators are permanently blacklisted from all clinical booking networks.
              </p>
            </div>

            <p className="font-semibold text-spa-sage-dark text-xs bg-spa-cream/25 py-2.5 px-5 rounded-lg border border-spa-sage/10 inline-block">
              ⚠️ Important: Any inappropriate insinuation will be immediately reported to authorities.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
