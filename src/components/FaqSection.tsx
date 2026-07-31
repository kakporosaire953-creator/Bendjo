import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Leaf, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'infusions' | 'b2b' | 'livraison' | 'qualite';
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: '1',
    category: 'infusions',
    question: 'Combien coûte un paquet d\'infusion BenDjo et que contient-il ?',
    answer: 'Chaque paquet d\'infusion BenDjo est vendu au tarif unique de 1 500 FCFA. Il contient 12 sachets d\'infusion individuellement scellés de 2g chacun (soit 24g net), garantissant une fraîcheur et une hygiène irréprochables.',
  },
  {
    id: '2',
    category: 'infusions',
    question: 'Quelles sont les variétés d\'infusions disponibles ?',
    answer: 'Nous proposons actuellement 3 recettes emblématiques : l\'Infusion Basilic (apaisante et digestive), l\'Infusion Hibiscus (Bissap pourpre tonifiant riche en vitamine C), et l\'Infusion Citronnelle & Clou de Girofle (vivifiante et purifiante). Les feuilles de Laurier sont en cours de lancement.',
  },
  {
    id: '3',
    category: 'qualite',
    question: 'D\'où proviennent les plantes utilisées par BenDjo ?',
    answer: 'Nos plantes sont 100% cultivées au Bénin par nos partenaires agricoles locaux. Elles sont récoltées à la main puis séchées délicatement sans aucun arôme artificiel, colorant ou conservateur chimique.',
  },
  {
    id: '4',
    category: 'b2b',
    question: 'Comment fonctionne l\'offre de petit-déjeuner en entreprise (B2B) ?',
    answer: 'BenDjo propose aux entreprises de Cotonou et Abomey-Calavi un service clé en main de petit-déjeuner équilibré. Nous livrons chaque matin ou chaque semaine des thermos de thé chaud préparé avec nos infusions pures, accompagnés de pains artisanaux, fruits frais et encas locaux.',
  },
  {
    id: '5',
    category: 'livraison',
    question: 'Quels sont les délais et zones de livraison à Cotonou ?',
    answer: 'Nous livrons quotidiennement à Cotonou (Haie Vive, Akpakpa, Cadjehoun, Ganhi, St Michel...) et Abomey-Calavi. La livraison pour les particuliers s\'effectue généralement en 2 à 4 heures ou le jour même selon l\'heure de votre commande.',
  },
  {
    id: '6',
    category: 'infusions',
    question: 'Comment préparer au mieux son infusion BenDjo ?',
    answer: 'Laissez infuser 1 sachet dans une tasse d\'eau frémissante (environ 90°C - 95°C) pendant 5 minutes pour libérer tous les arômes et vertus. Vous pouvez déguster votre tisane chaude ou glacée selon la saison.',
  }
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>('1');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredFaqs = activeCategory === 'all'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter((item) => item.category === activeCategory);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8F0] border border-[#D96123]/30 text-[#D96123] text-xs font-extrabold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Questions Fréquentes • FAQ</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#1F2421]">
          Tout ce que vous souhaitez savoir sur BenDjo
        </h2>
        <p className="text-xs sm:text-sm text-stone-600">
          Trouvez rapidement les réponses concernant nos infusions à 1500 FCFA, la qualité de nos plantes du Bénin et nos services B2B.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
            activeCategory === 'all'
              ? 'bg-[#2D5A36] text-white shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          Toutes les questions
        </button>
        <button
          onClick={() => setActiveCategory('infusions')}
          className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
            activeCategory === 'infusions'
              ? 'bg-[#D96123] text-white shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          Infusions & Recettes
        </button>
        <button
          onClick={() => setActiveCategory('b2b')}
          className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
            activeCategory === 'b2b'
              ? 'bg-[#2D5A36] text-white shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          Petits-déjeuners B2B
        </button>
        <button
          onClick={() => setActiveCategory('livraison')}
          className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
            activeCategory === 'livraison'
              ? 'bg-[#D96123] text-white shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          Livraison Cotonou
        </button>
      </div>

      {/* Accordion list */}
      <div className="max-w-3xl mx-auto space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? 'bg-white border-[#D96123]/40 shadow-sm'
                  : 'bg-white/80 border-stone-200 hover:border-stone-300'
              }`}
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold transition-colors ${
                      isOpen
                        ? 'bg-[#D96123] text-white'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    <Leaf className="w-4 h-4" />
                  </div>
                  <span className="font-heading font-extrabold text-sm sm:text-base text-[#1F2421]">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-stone-500 transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 text-[#D96123]' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-700 leading-relaxed border-t border-stone-100 bg-[#FFF8F0]/40">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Need more help direct link */}
      <div className="text-center pt-2">
        <a
          href="https://wa.me/22901620141?text=Bonjour%20BenDjo%2C%20j%27ai%20une%20question%20particuli%C3%A8re."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white font-extrabold text-xs shadow-xs hover:bg-[#20bd5a] transition-all"
        >
          <i className="fa-brands fa-whatsapp text-base"></i>
          <span>Une autre question ? Posez-la sur WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
