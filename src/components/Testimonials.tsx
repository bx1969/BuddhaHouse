import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../types';
import buddhaStatueSrc from '../assets/images/buddha_statue_1779999449396.png';

interface TestimonialsProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export default function Testimonials({ reviews, onAddReview }: TestimonialsProps) {
  return (
    <section id="reviews" className="py-20 md:py-24 bg-spa-cream/25 border-t border-spa-sage/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-light text-spa-charcoal leading-tight">
            Voices of Buddha House <span className="italic">Therapy</span>
          </h2>
          <div className="flex justify-center items-center gap-3 my-4">
            <div className="w-16 h-[1px] bg-spa-sage/30" />
            <img src={buddhaStatueSrc} alt="Golden Buddha separator" className="w-12 h-12 object-contain opacity-80 select-none pointer-events-none" referrerPolicy="no-referrer" />
            <div className="w-16 h-[1px] bg-spa-sage/30" />
          </div>
          <p className="font-sans text-sm text-spa-clay leading-relaxed">
            Read authentic stories and feedback shared by our wonderful guests about their therapeutic journeys.
          </p>
        </div>

        {/* Embedded Testimonial Builder Container */}
        <div className="bg-white border border-spa-sage/15 rounded-3xl p-4 sm:p-6 shadow-sm overflow-hidden max-w-4xl mx-auto">
          <iframe 
            frameBorder="0" 
            src="https://www.vocalreferences.com/weebly/index/byUser?weebly_user_id=136500761&weebly_site_id=288372194831161872" 
            id="TestimonialBuilder" 
            scrolling="no" 
            style={{ border: 'none', width: '100%', height: '320px', overflow: 'hidden' }}
            title="Somatic Sanctuary Testimonials Collection"
          />
        </div>

      </div>
    </section>
  );
}
