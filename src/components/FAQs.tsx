import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp, Search, Calendar, Phone, ArrowLeft, BookOpen, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO } from '../data';

interface FAQItem {
  question: string;
  answer: string;
  category: 'booking' | 'prep' | 'treatments';
}

interface FAQsProps {
  onBackToHome?: () => void;
}

export default function FAQs({ onBackToHome }: FAQsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'booking' | 'prep' | 'treatments'>('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs: FAQItem[] = [
    {
      category: "booking",
      question: "How do I book an appointment?",
      answer: "All appointments must be scheduled at least one day in advance. We operate strictly by appointment only and do not accommodate same-day appointments or walk-ins. You can book your treatment instantly online via our Booksy widget, or call/text us directly at 210-552-3344 to check for open slots."
    },
    {
      category: "booking",
      question: "What are your hours of operation?",
      answer: "We are open from 9:00 AM to 6:00 PM, seven days a week (all week long). Because we are highly dedicated to each guest's somatic healing, sessions are carefully scheduled to ensure ample transition time between appointments."
    },
    {
      category: "booking",
      question: "What is your cancellation and rescheduling policy?",
      answer: "We respect your time and reserve your slot exclusively for you. We kindly ask for at least 24 hours' notice for any cancellations or schedule modifications. Appointments cancelled, modified, or rescheduled with less than 24 hours' notice are subject to a fee equal to 100% of the scheduled treatment rate."
    },
    {
      category: "booking",
      question: "Where is your studio located and is there parking?",
      answer: "Our healing sanctuary is located at 11230 West Avenue, Suite #3105, San Antonio, Texas 78213, in the Commons West Professional Offices. Ample free parking is available directly within the complex for our guests."
    },
    {
      category: "booking",
      question: "Do you accept health insurance?",
      answer: "We do not accept insurance directly. However, we are happy to provide a detailed clinical receipt/superbill upon request that you may submit to your HSA (Health Savings Account), FSA (Flexible Spending Account), or health insurance provider for potential self-reimbursement."
    },
    {
      category: "prep",
      question: "How early should I arrive for my session?",
      answer: "We recommend arriving 10 to 15 minutes before your scheduled appointment time. This gives you ample opportunity to settle in, enjoy a cup of warm organic tea, fill out or update your intake forms, and comfortably discuss your therapeutic goals with your licensed somatic therapist."
    },
    {
      category: "prep",
      question: "What happens if I arrive late to my appointment?",
      answer: "To ensure that the guest immediately following you is not kept waiting, all treatments must conclude at their scheduled times. If you arrive late, your session will be shortened accordingly, and the full treatment fee still applies."
    },
    {
      category: "prep",
      question: "Should I tip my therapist, and what is customary?",
      answer: "Gratuity is never required but is highly appreciated as a direct reflection of your satisfaction. A standard gratuity of 15% to 20% of the service price is customary in boutique wellness practices and goes entirely to support your dedicated therapist."
    },
    {
      category: "prep",
      question: "How should I prepare for my massage, and what should I wear?",
      answer: "For oil/somatic massages (Swedish Relaxation, Hawaiian Lomi Lomi, Deep Tissue), you may undress to your comfort level. You will remain fully covered and professionally draped with pristine linen sheets at all times, with only the specific muscle area being worked on uncovered. For dry or active stretching treatments like Thai Fusion and Bowen Therapy, please wear or bring loose, flexible, comfortable athletic clothing."
    },
    {
      category: "treatments",
      question: "Can I get a massage if I am pregnant?",
      answer: "Yes, we offer specialized prenatal-safe modifications. Please disclose your pregnancy on your intake form and notify us when booking so we can take all proper precautions, adapt our modalities, and ensure you are positioned comfortably and safely."
    },
    {
      category: "treatments",
      question: "Can I customize the pressure during my massage?",
      answer: "Absolutely. Therapeutic bodywork is a collaborative partnership. Whether you request light, moderate, or deep pressure, you are encouraged to speak up at any point. Your comfort, safe therapeutic threshold, and respiratory relaxation are our top priorities."
    },
    {
      category: "treatments",
      question: "How do I choose the right session length (90 vs. 120 minutes)?",
      answer: "A 90-minute session is our recommended standard baseline; it allows for a comprehensive, head-to-toe full-body reset with deep focused attention on 1-2 major tension spots. A 120-minute session is highly recommended for anyone seeking true, profound somatic release, as it allows our therapists to thoroughly work through complex fascial lines and stubborn muscle blockages without rushing."
    },
    {
      category: "treatments",
      question: "What is Bowen Therapy?",
      answer: "Bowen Therapy is an innovative, gentle neuromuscular modality that utilizes light, precise rolling moves over muscles, tendons, and connective tissue. By incorporating frequent pauses, it triggers the autonomic nervous system to self-regulate, calm stress patterns, relieve pain, and restore systemic balance."
    },
    {
      category: "treatments",
      question: "What is Hawaiian Lomi Lomi?",
      answer: "Traditional Hawaiian Lomi Lomi is a sacred restorative art featuring continuous, long, flowing, fluid strokes using the palms, forearms, and elbows. It mimics the gentle, rolling waves of the Pacific, deeply soothing the nervous system and dissolving deep muscular tension."
    },
    {
      category: "treatments",
      question: "What is Chinese Pai Da?",
      answer: "Pai Da is an ancient Chinese wellness practice involving rhythmic patting or tapping of specific skin areas and meridian channels. This technique stimulates microcirculation, opens up energetic blockages, expels stagnant heat, and triggers the body's natural cellular repair."
    }
  ];

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'booking', label: 'Appointments & Booking' },
    { id: 'prep', label: 'Preparation & Arrival' },
    { id: 'treatments', label: 'Treatments & Modalities' }
  ] as const;

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="py-24 md:py-32 bg-spa-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Header */}
        <div className="mb-12">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-spa-sage-dark hover:text-spa-gold transition-colors font-sans text-xs font-bold uppercase tracking-widest cursor-pointer group mb-8 focus:outline-none"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Sanctuary Home
            </button>
          )}

          <div className="text-center max-w-2xl mx-auto">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-spa-gold block mb-3">
              Frequently Asked Questions
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-light text-spa-charcoal leading-tight">
              Knowledge & <span className="italic">Clarity</span>
            </h1>
            <div className="w-16 h-[1px] bg-spa-sage/30 mx-auto my-6" />
            <p className="font-sans text-sm text-spa-clay leading-relaxed">
              Everything you need to know about preparing for your therapeutic journey, booking policies, and our healing modalities.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-[32px] border border-spa-sage/10 p-4 md:p-6 shadow-sm mb-10 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-spa-clay/50 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, keyword, or treatment..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-spa-cream/30 border border-spa-sage/10 font-sans text-sm text-spa-charcoal placeholder:text-spa-clay/50 focus:outline-none focus:border-spa-gold/50 focus:bg-white transition-all duration-300"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-spa-sage/5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl font-sans text-xs font-semibold tracking-wider transition-all cursor-pointer focus:outline-none ${
                  selectedCategory === cat.id
                    ? 'bg-spa-gold text-spa-charcoal shadow-sm'
                    : 'bg-spa-cream/20 text-spa-clay hover:bg-spa-cream/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const globalIndex = faqs.findIndex(f => f.question === faq.question);
                const isExpanded = expandedIndex === globalIndex;
                return (
                  <motion.div
                    layout
                    key={faq.question}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white rounded-2xl border border-spa-sage/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <button
                      onClick={() => toggleExpand(globalIndex)}
                      className="w-full py-5 px-6 md:px-8 text-left flex justify-between items-center gap-4 cursor-pointer focus:outline-none group"
                    >
                      <div className="flex items-start gap-4">
                        <HelpCircle className="w-5 h-5 text-spa-gold shrink-0 mt-0.5 group-hover:scale-115 transition-transform" />
                        <span className="font-serif text-base md:text-lg font-bold text-spa-charcoal tracking-wide leading-snug">
                          {faq.question}
                        </span>
                      </div>
                      <div className="shrink-0 p-1.5 rounded-full bg-spa-cream/30 text-spa-clay group-hover:text-spa-gold transition-colors">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div className="px-6 md:px-8 pb-6 border-t border-spa-sage/5 pt-4 text-sm font-sans text-spa-clay leading-relaxed font-light">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white rounded-3xl border border-spa-sage/10 p-8"
              >
                <p className="font-serif text-lg text-spa-clay italic mb-2">No matching questions found</p>
                <p className="font-sans text-xs text-spa-clay/70">Try using simpler keywords or browse another category tab above.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA Banner Section */}
        <div className="mt-16 bg-spa-sage-dark text-white rounded-[36px] p-8 md:p-12 border border-spa-sage/10 shadow-lg text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 translate-x-12 -translate-y-12">
            <BookOpen className="w-64 h-64" />
          </div>
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-spa-gold block mb-3">
            Still Have Questions?
            </span>
          <h2 className="font-serif text-2xl md:text-4xl font-light text-spa-bg leading-snug mb-4">
            We are here to <span className="italic text-spa-gold">support your healing</span>
          </h2>
          <p className="font-sans text-sm text-spa-bg/80 leading-relaxed max-w-xl mx-auto mb-8 font-light">
            If your question is not listed, or if you require customized somatic adjustments, please don't hesitate to reach out directly to our San Antonio studio.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-spa-cream text-spa-charcoal rounded-xl font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md"
            >
              <Phone className="w-4 h-4 text-spa-gold" />
              Call / Text {CONTACT_INFO.phone}
            </a>
            <button
              onClick={onBackToHome}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent hover:bg-white/10 text-white rounded-xl font-sans text-xs font-bold uppercase tracking-widest border border-white/25 transition-all duration-300"
            >
              <Calendar className="w-4 h-4 text-spa-gold" />
              Return Home
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
