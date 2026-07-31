import React from 'react';
import { EXACT_TESTIMONIALS } from '../data/testimonials';
import { Star, Quote, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
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
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Retours spontanés partagés par nos clients à Cotonou et partout au Bénin. Tous les retours sont publiés de façon anonyme pour le respect de leur vie privée.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EXACT_TESTIMONIALS.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-3xl bg-white border border-[#C89B6B]/25 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative overflow-hidden group"
          >
            {/* Background decorative watermark quote */}
            <Quote className="absolute -bottom-2 -right-2 w-20 h-20 text-[#C89B6B]/10 pointer-events-none group-hover:text-[#4B7F52]/15 transition-colors" />

            <div className="space-y-3 relative z-10">
              {/* Header Badge & Rating */}
              <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#4B7F52]" />
                  <span className="text-xs font-bold text-[#1F2421]">{item.tag}</span>
                </div>
                <div className="flex items-center gap-1 bg-[#FAF6F0] px-2.5 py-1 rounded-full border border-[#C89B6B]/20">
                  <CheckCircle2 className="w-3 h-3 text-[#4B7F52]" />
                  <span className="text-[10px] font-bold text-[#4B7F52]">{item.badge}</span>
                </div>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 text-[#E08A2E]">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Exact Text Message */}
              <p className="text-xs sm:text-sm text-gray-800 italic leading-relaxed bg-[#FAF6F0]/60 p-4 rounded-2xl border border-stone-200/60 font-serif">
                « {item.content} »
              </p>
            </div>

            {/* Highlight summary */}
            <div className="relative z-10 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] font-bold text-[#2D5A36]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E08A2E]" />
                <span>{item.highlight}</span>
              </span>
              <span className="text-[10px] text-gray-500 font-normal">Message WhatsApp</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
