import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Menu, X, ShoppingBag, Clock, Phone } from 'lucide-react';
import { CONTACT_INFO } from '../data';

interface NavbarProps {
  cartItemsCount: number;
  onOpenCart: () => void;
  activeSection: string;
  currentPage: 'home' | 'bodywork-menu' | 'faqs' | 'about-me';
  onChangePage: (page: 'home' | 'bodywork-menu' | 'faqs' | 'about-me') => void;
  onScrollToSection: (id: string) => void;
}

export default function Navbar({
  cartItemsCount,
  onOpenCart,
  activeSection,
  currentPage,
  onChangePage,
  onScrollToSection
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Bodywork Menu', target: 'services' },
    { label: 'Packages', target: 'packages' },
    { label: 'About Me', target: 'about-me' },
    { label: 'FAQs', target: 'faqs' },
    { label: 'Massage Etiquette & Policy', target: 'policies' },
  ];

  const handleScrollTo = (id: string) => {
    // 1. Immediately trigger the menu closure to start transition
    setIsOpen(false);

    if (id === 'services') {
      onChangePage('bodywork-menu');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'faqs') {
      onChangePage('faqs');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'about-me') {
      onChangePage('about-me');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onChangePage('home');
      // 2. Allow a tiny delay for layout shift to settle, ensuring highly accurate scroll calculation
      setTimeout(() => {
        onScrollToSection(id);
      }, 200);
    }
  };

  return (
    <>
      {/* Top Banner Alert Bar */}
      <div className="bg-spa-sage-dark text-spa-bg/95 py-2 px-4 text-xs font-sans tracking-wider flex justify-between items-center z-50 relative">
        <div className="flex items-center gap-4 mx-auto md:mx-0">
          <span className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-spa-gold" />
            Business Hours: 9 AM - 6 PM
          </span>
          <span className="hidden md:inline text-spa-bg/60">|</span>
          <span className="hidden md:flex items-center gap-1.5 focus:outline-none">
            <Phone className="w-3.5 h-3.5 text-spa-gold" />
            Call or text to book: {CONTACT_INFO.phone}
          </span>
        </div>
      </div>

      <nav
        className={`sticky top-0 z-40 transition-all duration-300 border-b border-spa-sage/20 shadow-md ${
          scrolled ? 'py-3' : 'py-5'
        }`}
        style={{
          backgroundColor: '#f7edd9',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo Brand */}
            <button
              onClick={() => {
                onChangePage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 group cursor-pointer text-left focus:outline-none"
              id="navbar-logo-btn"
            >
              <div className="w-[60px] h-[60px] rounded-full border border-[#703275]/20 overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105 duration-300 shadow-md shadow-black/30 bg-[#703275] p-1">
                <img
                  src="/bh_face.jpg"
                  alt="Buddha House Logo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-extrabold text-[#143213] tracking-widest block leading-[1.1] drop-shadow-sm">
                  BUDDHA <span className="italic">House</span>
                </span>
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-spa-gold font-bold block leading-[1]">
                  massage therapy
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {menuItems.map((item) => {
                const isActive = currentPage === 'faqs'
                  ? item.target === 'faqs'
                  : currentPage === 'bodywork-menu'
                  ? item.target === 'services'
                  : currentPage === 'about-me'
                  ? item.target === 'about-me'
                  : activeSection === item.target;
                return (
                  <button
                    key={item.target}
                    onClick={() => handleScrollTo(item.target)}
                    className={`font-sans text-xs font-semibold uppercase tracking-widest relative py-1 transition-colors cursor-pointer focus:outline-none ${
                      isActive ? 'text-spa-gold font-bold' : 'text-[#143213]/80 hover:text-[#143213]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-spa-gold rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Action Group */}
            <div className="flex items-center gap-3">
              {/* Cart booking trigger */}
              <button
                onClick={onOpenCart}
                className="relative p-2.5 rounded-full bg-[#143213]/10 hover:bg-[#143213]/20 border border-[#143213]/20 transition-colors cursor-pointer text-[#143213] focus:outline-none"
                aria-label="Open booking cart"
                id="cart-trigger-btn"
              >
                <ShoppingBag className="w-5 h-5 text-spa-gold" />
                {cartItemsCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-spa-gold text-white text-[10px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#f7edd9]"
                  >
                    {cartItemsCount}
                  </motion.div>
                )}
              </button>

              <button
                onClick={() => handleScrollTo('services')}
                className="hidden sm:inline-flex bg-spa-gold hover:bg-spa-gold/90 text-spa-charcoal font-sans text-xs font-semibold uppercase tracking-widest py-2.5 px-6 rounded-full shadow-sm transition-all hover:shadow hover:-translate-y-0.5 cursor-pointer focus:outline-none"
              >
                Reserve Space
              </button>

              {/* Mobile menu panel trigger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-full hover:bg-[#143213]/10 text-[#143213]/80 focus:outline-none cursor-pointer"
                aria-label="Toggle menu"
                id="mobile-menu-trigger-btn"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mobile-nav-panel border-b border-spa-sage/20"
              style={{
                backgroundColor: '#f7edd9',
              }}
            >
              <div className="px-4 pt-2 pb-6 space-y-3 shadow-inner">
                {menuItems.map((item) => {
                  const isActive = currentPage === 'faqs'
                    ? item.target === 'faqs'
                    : currentPage === 'bodywork-menu'
                    ? item.target === 'services'
                    : currentPage === 'about-me'
                    ? item.target === 'about-me'
                    : activeSection === item.target;
                  return (
                    <button
                      key={item.target}
                      onClick={() => handleScrollTo(item.target)}
                      className={`block w-full text-left py-3 px-4 rounded-lg font-sans text-[13px] font-semibold uppercase tracking-wider transition-colors hover:bg-black/5 ${
                        isActive
                          ? 'text-spa-gold bg-black/5 font-bold'
                          : 'text-[#143213]/80 hover:text-[#143213]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
                <div className="pt-4 border-t border-[#143213]/10 px-4 flex flex-col gap-3">
                  <div className="text-xs text-[#143213]/70 font-medium space-y-1">
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-spa-gold" />
                      Studio: {CONTACT_INFO.address}
                    </p>
                    <p className="flex items-center gap-1.5 pt-1">
                      <Phone className="w-3.5 h-3.5 text-spa-gold" />
                      Appointments: {CONTACT_INFO.phone}
                    </p>
                  </div>
                  <button
                    onClick={() => handleScrollTo('customizer')}
                    className="w-full bg-spa-gold hover:bg-spa-gold/90 text-spa-charcoal text-center font-sans text-xs font-semibold uppercase tracking-wider py-3 rounded-xl transition-all cursor-pointer focus:outline-none"
                  >
                    Design Custom Session
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
