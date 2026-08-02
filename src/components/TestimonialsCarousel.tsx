import React, { useState, useEffect } from 'react';
import { EXACT_TESTIMONIALS } from '../data/testimonials';
import { Star, Quote, CheckCircle2, MessageCircle, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % EXACT_TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoplay]);

  const goToPrevious = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev - 1 + EXACT_TESTIMONIALS.length) % EXACT_TESTIMONIALS.length);
  };

  const goToNext = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % EXACT_TESTIMONIALS.length);
  };

  const currentTestimonial = EXACT_TESTIMONIALS[currentIndex];

  return (
    <section className="space-y-8">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4B7F52]/10 text-[#4B7F52] text-xs font-bold uppercase tracking-wider">
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Témoignages Clients Authentiques</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#1F2421]">
          Ce que disent nos consommateur(rice)s
        </h2>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Retours spontanés partagés par nos clients à Cotonou et partout au Bénin.
        </p>
      </div>

      {/* Carrousel */}
      <div className="relative max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-3xl bg-white border-2 border-[#C89B6B]/25 shadow-lg relative overflow-hidden"
          >
            <Quote className="absolute -bottom-2 -right-2 w-32 h-32 text-[#C89B6B]/10 pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#4B7F52]" />
                  <span className="text-base font-bold text-[#1F2421]">{currentTestimonial.tag}</span>
                </div>
                <div className="flex items-center gap-1 bg-[#FAF6F0] px-3 py-1.5 rounded-full border border-[#C89B6B]/20">
                  <CheckCircle2 className="w-4 h-4 text-[#4B7F52]" />
                  <span className="text-sm font-bold text-[#4B7F52]">{currentTestimonial.badge}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[#E08A2E]">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <p className="text-lg text-gray-800 italic leading-relaxed bg-[#FAF6F0]/60 p-6 rounded-2xl border border-stone-200/60 font-serif min-h-[120px]">
                « {currentTestimonial.content} »
              </p>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-bold text-[#2D5A36]">
                  <Sparkles className="w-4 h-4 text-[#E08A2E]" />
                  <span>{currentTestimonial.highlight}</span>
                </span>
                <span className="text-xs text-gray-500">Message WhatsApp</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Boutons navigation */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white border-2 border-[#4B7F52] text-[#4B7F52] hover:bg-[#4B7F52] hover:text-white transition-all shadow-lg flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white border-2 border-[#4B7F52] text-[#4B7F52] hover:bg-[#4B7F52] hover:text-white transition-all shadow-lg flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicateurs */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {EXACT_TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setAutoplay(false);
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-[#4B7F52]'
                  : 'w-2 bg-[#C89B6B]/40 hover:bg-[#C89B6B]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
