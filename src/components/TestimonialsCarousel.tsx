import React, { useState, useEffect } from 'react';
import { EXACT_TESTIMONIALS } from '../data/testimonials';
import { Star, Quote, CheckCircle2, MessageCircle, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TestimonialsCarouselProps {
  variant?: 'hero' | 'compact' | 'minimal' | 'side';
}

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({ variant = 'hero' }) => {
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

  // Variante HERO (page d'accueil)
  if (variant === 'hero') {
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
  }

  // Variante COMPACT (2 colonnes côte à côte)
  if (variant === 'compact') {
    return (
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-[#1F2421]">
            Avis Clients
          </h3>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-[#FAF6F0] to-white border border-[#C89B6B]/20 shadow-md"
            >
              <div className="flex items-center gap-1 mb-3 text-[#E08A2E]">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-sm text-gray-800 italic leading-relaxed mb-4">
                « {currentTestimonial.content} »
              </p>

              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#2D5A36]">{currentTestimonial.highlight}</span>
                <span className="px-2 py-1 rounded-full bg-[#4B7F52]/10 text-[#4B7F52] font-bold">
                  {currentTestimonial.badge}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-4">
            <button onClick={goToPrevious} className="p-2 rounded-full hover:bg-stone-100 transition-colors">
              <ChevronLeft className="w-5 h-5 text-[#4B7F52]" />
            </button>
            <div className="flex gap-1.5">
              {EXACT_TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAutoplay(false);
                    setCurrentIndex(index);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentIndex ? 'w-6 bg-[#4B7F52]' : 'w-1.5 bg-[#C89B6B]/40'
                  }`}
                />
              ))}
            </div>
            <button onClick={goToNext} className="p-2 rounded-full hover:bg-stone-100 transition-colors">
              <ChevronRight className="w-5 h-5 text-[#4B7F52]" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Variante MINIMAL (très compact, focus sur le texte)
  if (variant === 'minimal') {
    return (
      <section className="py-8 bg-[#FAF6F0]/50 rounded-2xl">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-1 mb-4 text-[#E08A2E]">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-base sm:text-lg text-gray-800 italic leading-relaxed font-serif mb-4">
                « {currentTestimonial.content} »
              </p>

              <div className="text-sm font-bold text-[#2D5A36]">
                {currentTestimonial.highlight}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-2 mt-6">
            {EXACT_TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoplay(false);
                  setCurrentIndex(index);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex ? 'w-6 bg-[#4B7F52]' : 'w-1.5 bg-[#C89B6B]/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Variante SIDE (carte avec image de côté)
  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4B7F52]/10 text-[#4B7F52] text-xs font-bold">
          <MessageCircle className="w-3 h-3" />
          <span>Témoignages</span>
        </div>
        <h3 className="text-xl sm:text-3xl font-extrabold font-heading text-[#1F2421]">
          Paroles de Clients
        </h3>
      </div>

      <div className="relative max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="p-6 rounded-2xl bg-white border border-[#C89B6B]/20 shadow-md"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4B7F52] to-[#2D5A36] flex items-center justify-center">
                  <Quote className="w-8 h-8 text-white" />
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-1 text-[#E08A2E]">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm text-gray-800 italic leading-relaxed">
                  « {currentTestimonial.content} »
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                  <span className="text-xs font-bold text-[#2D5A36]">{currentTestimonial.highlight}</span>
                  <span className="px-2 py-1 rounded-full bg-[#4B7F52]/10 text-[#4B7F52] text-xs font-bold">
                    {currentTestimonial.badge}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-4">
          <button onClick={goToPrevious} className="p-2 rounded-full bg-white border border-[#4B7F52] hover:bg-[#4B7F52] hover:text-white transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-1.5">
            {EXACT_TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoplay(false);
                  setCurrentIndex(index);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex ? 'w-6 bg-[#4B7F52]' : 'w-1.5 bg-[#C89B6B]/40'
                }`}
              />
            ))}
          </div>

          <button onClick={goToNext} className="p-2 rounded-full bg-white border border-[#4B7F52] hover:bg-[#4B7F52] hover:text-white transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
