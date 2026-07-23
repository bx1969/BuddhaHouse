import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RelaxAndRelief from './components/RelaxAndRelief';
import SomaticVideo from './components/SomaticVideo';
import ServiceMenu from './components/ServiceMenu';
import SessionCustomizer from './components/SessionCustomizer';
import Therapists from './components/Therapists';
import Testimonials from './components/Testimonials';
import BookingSystem from './components/BookingSystem';
import Footer from './components/Footer';
import FAQs from './components/FAQs';
import Policies from './components/Policies';
import ProfessionalConduct from './components/ProfessionalConduct';
import BodyworkMenuPage from './components/BodyworkMenuPage';
import AboutMePage from './components/AboutMePage';
import Packages from './components/Packages';
import { motion, AnimatePresence } from 'motion/react';

import { Service, Therapist, Review, CartItem } from './types';
import { SERVICES, THERAPISTS, REVIEWS } from './data';

export default function App() {
  // Page routing state
  const [currentPage, setCurrentPage] = useState<'home' | 'bodywork-menu' | 'faqs' | 'about-me'>('home');

  // Booking / Cart States
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(THERAPISTS[0]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Review states
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);

  // Viewport Active section tracking
  const [activeSection, setActiveSection] = useState('hero');

  // Set up IntersectionObserver to update navbar highlights dynamically on scroll
  useEffect(() => {
    const sections = ['services', 'packages', 'faqs', 'policies', 'owner', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // triggers when section dominates screen center
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  // Handler: Add a standard service to the booking list
  const handleAddServiceToCart = (service: Service, duration: number) => {
    const price = service.basePriceByDuration[duration] || service.price;
    
    const item: CartItem = {
      id: `${service.id}-${duration}-${Date.now()}`,
      isCustom: false,
      serviceId: service.id,
      name: `${service.name} (${duration} min)`,
      price,
      duration,
      therapistId: selectedTherapist?.id,
      therapistName: selectedTherapist?.name
    };

    setCartItems((prev) => [...prev, item]);
    
    // Automatically trigger cart open overlay to prompt scheduling
    setTimeout(() => {
      setIsCartOpen(true);
    }, 600);
  };

  // Handler: Add custom session planner configuration
  const handleAddCustomSessionToCart = (customItem: CartItem) => {
    const updatedItem = {
      ...customItem,
      therapistId: selectedTherapist?.id || customItem.therapistId,
      therapistName: selectedTherapist?.name || customItem.therapistName
    };
    
    setCartItems((prev) => [...prev, updatedItem]);

    // Slide open drawer
    setTimeout(() => {
      setIsCartOpen(true);
    }, 600);
  };

  // Handler: Add prepaid bodywork package to cart
  const handleAddPackageToCart = (packageItem: Omit<CartItem, 'id'>) => {
    const itemWithId: CartItem = {
      ...packageItem,
      id: `pkg-${Date.now()}`
    };
    setCartItems((prev) => [...prev, itemWithId]);
    setTimeout(() => {
      setIsCartOpen(true);
    }, 600);
  };

  // Handler: Delete cart item
  const handleRemoveCartItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Handler: Clear entire cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Handler: Select therapist pre-requisite
  const handleSelectTherapist = (therapist: Therapist) => {
    setSelectedTherapist((prev) => (prev?.id === therapist.id ? null : therapist));
  };

  // Handler: Dynamically add user reviews list
  const handleAddReview = (newReview: Review) => {
    setReviewsList((prev) => [newReview, ...prev]);
  };

  const handleScrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-spa-bg relative text-spa-charcoal selection:bg-spa-gold/30 selection:text-spa-charcoal">

      {/* Sticky, floating glass navigation header */}
      <Navbar
        cartItemsCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        currentPage={currentPage}
        onChangePage={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0 });
        }}
        onScrollToSection={handleScrollToId}
      />

      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <motion.div
            key="home-page"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Somatic ambient visualization top section */}
            <SomaticVideo />

            {/* Hero Welcome banner */}
            <div id="hero">
              <Hero
                onExploreServices={() => {
                  setCurrentPage('bodywork-menu');
                  window.scrollTo({ top: 0 });
                }}
                onCustomPlanner={() => handleScrollToId('customizer')}
              />
            </div>

            <main className="relative">
              {/* Curated menu card teaser section */}
              <section id="services" className="py-20 bg-[#f4f7f3]/50 border-b border-[#143213]/5 relative overflow-hidden">
                {/* Decorative green bamboo illustration on the right side */}
                <div className="absolute right-0 top-0 bottom-0 w-48 md:w-80 pointer-events-none select-none z-0 opacity-25 md:opacity-40 text-[#143213]/25 flex items-center justify-end">
                  <svg viewBox="0 0 100 200" className="h-full w-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    {/* Main bamboo stalk */}
                    <path d="M 75,200 Q 73,150 71,100 C 70.5,88 70,75 70,60 Q 70,30 71,0" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                    {/* Ring Nodes */}
                    <ellipse cx="73.5" cy="150" rx="3" ry="0.8" transform="rotate(-5 73.5 150)" />
                    <ellipse cx="71" cy="100" rx="2.5" ry="0.7" transform="rotate(-5 71 100)" />
                    <ellipse cx="70" cy="60" rx="2.2" ry="0.6" transform="rotate(-5 70 60)" />
                    
                    {/* Secondary bamboo stalk, crossing slightly */}
                    <path d="M 95,200 Q 88,140 82,80 C 79,50 78,30 79,-10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                    <ellipse cx="88.5" cy="140" rx="2.4" ry="0.6" transform="rotate(-10 88.5 140)" />
                    <ellipse cx="82" cy="80" rx="2" ry="0.5" transform="rotate(-10 82 80)" />

                    {/* Left branches and leaf clusters */}
                    <path d="M 71,100 Q 55,90 40,82" stroke="currentColor" strokeWidth="0.8" fill="none" />
                    <path d="M 40,82 Q 22,76 12,81 C 20,85 30,87 40,82 Z" />
                    <path d="M 45,84 Q 30,74 20,68 C 26,76 35,81 45,84 Z" />
                    <path d="M 50,86 Q 40,96 32,104 C 38,96 46,92 50,86 Z" />

                    <path d="M 70,60 Q 52,52 35,42" stroke="currentColor" strokeWidth="0.7" fill="none" />
                    <path d="M 35,42 Q 18,36 8,40 C 15,44 25,46 35,42 Z" />
                    <path d="M 40,44 Q 24,34 14,28 C 21,36 30,41 40,44 Z" />

                    <path d="M 82,80 Q 65,72 50,65" stroke="currentColor" strokeWidth="0.7" fill="none" />
                    <path d="M 50,65 Q 32,59 22,64 C 29,68 39,70 50,65 Z" />
                    <path d="M 55,67 Q 39,57 29,51 C 36,59 45,64 55,67 Z" />

                    {/* High branches and leaf clusters */}
                    <path d="M 70,30 Q 55,20 42,10" stroke="currentColor" strokeWidth="0.6" fill="none" />
                    <path d="M 42,10 Q 25,4 15,8 C 22,12 32,14 42,10 Z" />
                    <path d="M 46,12 Q 32,2 22,-4 C 28,4 37,9 46,12 Z" />
                  </svg>
                </div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                  <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-spa-gold block mb-3">Buddha House Services</span>
                  <h2 className="font-serif text-3xl md:text-4xl font-light text-[#143213] mb-6">Explore our Full <span className="italic font-normal">Bodywork Menu</span></h2>
                  <p className="font-sans text-sm text-[#486247] leading-relaxed max-w-xl mx-auto mb-8 font-light">
                    View our newly formatted clinical treatments, customized length schedules (60, 90, & 120 Mins), and specific holistic benefits on our dedicated separate bodywork page.
                  </p>
                  <button 
                    onClick={() => {
                      setCurrentPage('bodywork-menu');
                      window.scrollTo({ top: 0 });
                    }}
                    className="px-8 py-3.5 bg-[#143213] hover:bg-[#0e240e] text-white rounded-2xl font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    explore bodywork rituals
                  </button>
                </div>
              </section>

              {/* Somatic breathing helper section */}
              <RelaxAndRelief />

              {/* Dynamic customized session configurator section */}
              <SessionCustomizer onAddCustomSessionToCart={handleAddCustomSessionToCart} />

              {/* Premium Tibetan-Japandi Packages Section */}
              <Packages onAddPackageToCart={handleAddPackageToCart} />

              {/* Clinical therapists showcase card layout context */}
              <Therapists
                onSelectTherapist={handleSelectTherapist}
                selectedTherapistId={selectedTherapist?.id}
                onViewAboutMe={() => {
                  setCurrentPage('about-me');
                  window.scrollTo({ top: 0 });
                }}
              />

              {/* Verified reviews, aggregates, and inline review form panel section */}
              <Testimonials
                reviews={reviewsList}
                onAddReview={handleAddReview}
              />

              {/* Professional Conduct and Zero-Tolerance warning banner */}
              <ProfessionalConduct />

              {/* Massage Etiquette & Policy section */}
              <Policies />
            </main>
          </motion.div>
        ) : currentPage === 'bodywork-menu' ? (
          <motion.div
            key="bodywork-menu-page"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <BodyworkMenuPage
              onAddServiceToCart={handleAddServiceToCart}
              onBackToHome={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0 });
              }}
            />
          </motion.div>
        ) : currentPage === 'about-me' ? (
          <motion.div
            key="about-me-page"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <AboutMePage
              onBackToHome={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0 });
              }}
              onBookSession={() => {
                setCurrentPage('home');
                setTimeout(() => {
                  handleScrollToId('customizer');
                }, 200);
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="faqs-page"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <FAQs
              onBackToHome={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0 });
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Classy and informative footer system */}
      <Footer />

      {/* Overlapping sliding drawer booking coordinator */}
      <BookingSystem
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        selectedTherapist={selectedTherapist}
        onSelectTherapist={(therapist) => setSelectedTherapist(therapist)}
      />
    </div>
  );
}
