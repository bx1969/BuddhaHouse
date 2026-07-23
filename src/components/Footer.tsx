import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { CONTACT_INFO, OPERATING_HOURS } from '../data';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#143213] text-white pt-16 md:pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      
      {/* Decorative vectors light background */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-spa-sage/5 rounded-tl-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Upper grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Col 1: Bio Branding (left 6 columns) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-left">
              <div className="w-[54px] h-[54px] rounded-full border border-[#143213]/30 bg-[#143213] flex items-center justify-center text-white shadow-sm shadow-[#143213]/25">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[36px] h-[36px]">
                  <circle cx="50" cy="18" r="1.5" fill="currentColor" />
                  <path d="M 6,21 C 18,9 33,11 43,26 C 45,29 44.5,36 44.5,48 C 44.5,58 41,61 37.5,61 C 34.5,61 35.5,65 40.5,65 C 44,65 45.5,61 45.5,55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 94,21 C 82,9 67,11 57,26 C 55,28 55.5,36 55.5,48 C 55.5,58 59,61 62.5,61 C 65.5,61 64.5,65 59.5,65 C 56,65 54.5,61 54.5,55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 10,29 C 17,21 27,21 34,29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 12,33 C 18,36 26,36 32,33" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M 90,29 C 83,21 73,21 66,29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 88,33 C 82,36 74,36 68,33" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M 48.5,70 C 48.5,72 51.5,72 51.5,70" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M 32,77 C 42,75 46,77 50,76 C 54,77 58,75 68,77" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 35,76 C 42,71 47,75 50,74 C 53,75 58,71 65,76" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M 37,81 C 45,86 55,86 63,81" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-wide block leading-[1.1]">
                  Buddha House
                </span>
                <span className="font-sans text-[8px] uppercase tracking-[0.25em] text-spa-gold font-bold block leading-[1]">
                  massage therapy
                </span>
              </div>
            </div>
            <p className="font-sans text-xs text-white/60 leading-relaxed font-light">
              Buddha House is a studio of restorative somatic-inspired bodywork. We operate daily, combining skilled myofascial release, fluid forearm mechanics mimicking ocean tides, thai stretches, and warm botanicals to guide the nervous system into absolute stillness.
            </p>
            <div className="flex items-center gap-4 text-spa-gold pt-2">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider block">EST. 2025</span>
              <span className="text-white/20">|</span>
              <span className="text-[10px] font-sans font-bold tracking-wider block uppercase">Start your health journey today</span>
            </div>
          </div>

          {/* Col 2: Operating Hours (3 columns) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-spa-gold flex items-center gap-1.5 uppercase">
              <Clock className="w-4 h-4 text-spa-gold" />
              Business Hours
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-white/70 pl-0">
              <li className="flex justify-between items-center border-b border-white/5 pb-1.5">
                <span>Everyday:</span>
                <span className="font-medium font-mono text-white">{OPERATING_HOURS.everyday}</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Coordinates Contact Direct (3 columns) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-spa-gold flex items-center gap-1.5 uppercase">
              <MapPin className="w-4 h-4 text-spa-gold" />
              Our Location
            </h4>
            <ul className="space-y-3 font-sans text-xs text-white/70 pl-0">
              <li className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 text-spa-gold shrink-0 mt-0.5" />
                <span className="leading-relaxed font-light">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone className="w-4 h-4 text-spa-gold shrink-0" />
                <span className="font-mono">{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex gap-2 items-center">
                <Mail className="w-4 h-4 text-spa-gold shrink-0" />
                <span className="font-mono text-white/60 hover:text-white transition-colors">{CONTACT_INFO.email}</span>
              </li>
            </ul>
            
            {/* Clickable Mini Map showing location */}
            <div className="pt-2">
              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(CONTACT_INFO.address)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="block group relative rounded-xl overflow-hidden border border-white/10 hover:border-spa-gold/30 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="aspect-[16/9] w-full bg-white/5 relative">
                  <iframe 
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(CONTACT_INFO.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full border-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                    title="Buddha House Map Location"
                  ></iframe>
                  {/* Invisible/Transparent overlay to capture clicks and redirect */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300 flex flex-col justify-end p-2 cursor-pointer">
                    <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-white bg-[#143213]/90 backdrop-blur-xs px-2 py-1 rounded self-start flex items-center gap-1 border border-white/10 group-hover:border-spa-gold/30 transition-colors">
                      <MapPin className="w-2.5 h-2.5 text-spa-gold" />
                      View on Google Maps
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Footer legalities */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[10px] text-white/40">
          <p>© 2026 Buddha House Massage Therapy. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">Somatic Licensure Certification #SPA-2026-90210</span>
            <span>|</span>
            <span className="hover:text-white transition-colors cursor-pointer">HIPAA Compliant Client Data Protection</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
