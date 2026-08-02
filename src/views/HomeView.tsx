import React from 'react';
import { PageView, Product } from '../types';
import { BENDJO_SERVICES } from '../data/services';
import { TestimonialsCarousel } from '../components/TestimonialsCarousel';
import { FaqSection } from '../components/FaqSection';
import { MediaDisplay } from '../components/MediaDisplay';
import { BenDjoRealVideo } from '../components/BenDjoRealVideo';
import founderImg from '../assets/images/benedicte_lovi_authentic.webp';
import heroBannerImg from '../assets/images/hero_authentic.webp';
import importantImg1 from '../assets/images/important_authentic_1.webp';
import importantImg2 from '../assets/images/important_authentic_2.webp';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Award,
  Users,
  CheckCircle,
  MessageCircle,
  ShoppingBag,
  Star,
  MapPin,
  Flame,
  Clock
} from 'lucide-react';

interface HomeViewProps {
  setCurrentView: (view: PageView) => void;
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenProductDetail: (product: Product) => void;
  onOpenB2BCalculator: () => void;
  onOpenBrewTimer: () => void;
  onOpenQuiz?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentView,
  products,
  onAddToCart,
  onOpenProductDetail,
  onOpenB2BCalculator,
  onOpenBrewTimer,
  onOpenQuiz,
}) => {
  const [homeCategory, setHomeCategory] = React.useState<string>('all');
  const [addedNoticeId, setAddedNoticeId] = React.useState<string | null>(null);

  const displayedProducts = products.filter(
    (p) => homeCategory === 'all' || p.category === homeCategory
  );
  const sectionVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 overflow-x-hidden">
      {/* 1. HERO SECTION WITH BALANCED TERRACOTTA ORANGE & HERBAL GREEN */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#FFF8F0] via-[#FAF6F0] to-[#FAF6F0]"
      >
        {/* Soft ambient background glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[450px] bg-gradient-to-r from-[#D96123]/15 via-[#FACC15]/15 to-[#2D5A36]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white border border-[#2D5A36]/20 shadow-xs mb-2">
                <span className="w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 rounded-full bg-[#2D5A36] animate-pulse shrink-0" />
                <span className="text-[9px] sm:text-xs font-extrabold text-[#2D5A36] uppercase tracking-wider whitespace-nowrap">
                  100% Naturel Béninois
                </span>
                <span className="font-brittany text-xs sm:text-xl text-[#D96123] font-normal leading-none whitespace-nowrap">
                  — Un Pur Régal
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-chic font-bold text-[#1F2421] leading-[1.15] tracking-tight">
                Le thé qui vous{' '}
                <span className="text-[#D96123] font-semibold">reconnecte à vos</span>{' '}
                <span className="italic font-normal">origines</span>
              </h1>

              <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                Dégustez nos infusions artisanales aux saveurs pures du terroir béninois : <strong>Basilic</strong>, <strong>Hibiscus</strong>, <strong>Citronnelle & Clou de Girofle</strong>. Disponibles en sachets individuellement scellés pour votre bien-être quotidien.
              </p>

              {/* Price Tag Highlight Banner */}
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-[#FFF8F0] to-white border border-[#D96123]/30 shadow-xs">
                <div className="px-3.5 py-1.5 rounded-xl bg-[#D96123] text-white font-extrabold text-sm shadow-xs">
                  1500 F CFA
                </div>
                <div className="text-xs text-stone-800 text-left">
                  <div className="font-extrabold text-[#1F2421]">Le Paquet Individuel (12 sachets)</div>
                  <div className="text-[11px] text-[#2D5A36] font-semibold">Basilic • Hibiscus • Citronnelle & Girofle</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setCurrentView('infusions');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  id="hero-primary-cta"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#2D5A36] hover:bg-[#224429] text-white font-extrabold text-sm flex items-center justify-center gap-3 shadow-lg shadow-[#2D5A36]/20 transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D96123]" />
                  <span>Commander à 1500 FCFA</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setCurrentView('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  id="hero-secondary-cta"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-stone-50 text-[#1F2421] border border-[#D96123]/30 font-extrabold text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#D96123]" />
                  <span>Offre Entreprises & Traiteur B2B</span>
                </motion.button>
              </div>

              {/* Quick Trust badges */}
              <div className="pt-6 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#D96123]/10 text-[#D96123] flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1F2421]">100% Pur Terroir</div>
                    <div className="text-[10px] text-stone-500">Sans additifs chimiques</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#2D5A36]/10 text-[#2D5A36] flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1F2421]">50+ Partenaires</div>
                    <div className="text-[10px] text-stone-500">Entreprises à Cotonou</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <div className="w-9 h-9 rounded-full bg-[#D96123]/10 text-[#D96123] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1F2421]">Livraison Express</div>
                    <div className="text-[10px] text-stone-500">Cotonou & Calavi</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Visual Composition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                  <img
                    src={heroBannerImg}
                    alt="BenDjo Infusions Naturelles Bénin"
                    className="w-full h-[380px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Floating Price Tag Pill */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    className="absolute top-4 right-4 bg-[#D96123] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl font-heading font-extrabold text-xs sm:text-sm shadow-xl border border-white/30 flex items-center gap-1.5"
                  >
                    <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-amber-200 fill-current" />
                    <span>1500 FCFA</span>
                  </motion.div>

                  {/* Floating Footer Card on Image */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/98 border border-stone-200 shadow-xl space-y-0.5 sm:space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] sm:text-[10px] font-extrabold text-[#D96123] uppercase tracking-wider">
                        Les Saveurs Principales
                      </span>
                      <div className="flex items-center gap-1 text-[#2D5A36]">
                        <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current text-amber-500" />
                        <span className="text-[10px] sm:text-xs font-bold">Avis 5/5</span>
                      </div>
                    </div>
                    <div className="font-heading font-extrabold text-xs sm:text-sm text-[#1F2421]">
                      Basilic • Hibiscus • Citronnelle & Girofle
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-stone-600 hidden sm:block">
                      Boîte de 12 sachets de 2g (24g) • Reconnectez-vous à vos origines
                    </p>
                  </div>
                </div>

                {/* Floating Interactive Brew Timer Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onOpenBrewTimer}
                  className="hidden sm:flex absolute -top-4 -left-2 sm:-left-4 p-3.5 rounded-2xl bg-white border-2 border-[#D96123]/30 shadow-2xl text-left items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#2D5A36] text-white flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 animate-pulse text-[#D96123]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-extrabold text-[#D96123] uppercase">
                      Rituel Infusion
                    </div>
                    <div className="text-xs font-extrabold text-[#1F2421]">
                      Minuteur 5 min
                    </div>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* INTERACTIVE WELLNESS QUIZ DIAGNOSTIC BANNER */}
      {onOpenQuiz && (
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="relative rounded-3xl bg-gradient-to-r from-[#1C261D] via-[#233325] to-[#1C261D] text-white p-6 sm:p-12 shadow-xl border border-emerald-600/30 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D96123]/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="lg:col-span-8 space-y-3 sm:space-y-4 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-400/30 text-emerald-200 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="leading-tight">Module Interactif Santé</span>
                </div>

                <h2 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-4xl text-white leading-tight">
                  Quel est le meilleur thé BenDjo pour votre santé ?
                </h2>

                <p className="text-xs sm:text-sm lg:text-base text-emerald-100/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Faites notre <strong>Quiz Diagnostic Bien-Être en 4 étapes</strong>. Identifiez en 1 minute la synergie de tisanes béninoises idéale pour votre <strong>hypertension, digestion, sommeil, tonus ou détox</strong>.
                </p>

                <div className="pt-2 flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={onOpenQuiz}
                    id="home-quiz-banner-btn"
                    className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#D96123] hover:bg-[#c4531b] text-white font-extrabold text-xs sm:text-sm shadow-lg flex items-center gap-2 sm:gap-2.5 transition-all"
                  >
                    <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-200" />
                    <span>Lancer le Quiz Gratuit</span>
                    <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  </motion.button>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="p-4 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center space-y-2 sm:space-y-3 max-w-xs">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-5 sm:w-6 h-5 sm:h-6" />
                  </div>
                  <div className="font-heading font-extrabold text-sm sm:text-base text-white">
                    Diagnostic Certifié
                  </div>
                  <p className="text-[10px] sm:text-xs text-emerald-200/90 leading-relaxed">
                    Basé sur les propriétés médicinales traditionnelles de l'Hibiscus, du Basilic, de la Citronnelle et du Laurier du Bénin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* FEATURED QUALITY & AUTHENTIC HARVEST SHOWCASE */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1C261D] via-[#233325] to-[#1C261D] text-white border border-[#2D5A36]/40 shadow-2xl space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D96123]/20 border border-[#D96123]/40 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Engagement Qualité & Authenticité Terroir</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
              De la terre béninoise à votre tasse : La garantie d'une pureté absolue
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Chez <strong>BenDjo</strong>, chaque sachet d'infusion est le fruit d'une récolte exigeante et d'un séchage artisanal préservant l'intégralité des principes actifs et huiles essentielles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Visual Card 1 */}
            <div className="group relative rounded-2xl overflow-hidden border border-white/15 shadow-xl bg-stone-900">
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={importantImg1}
                  alt="Processus de sélection et conditionnement BenDjo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#2D5A36] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                  Plantes Pures du Bénin
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-heading font-extrabold text-base text-white">
                  Sélection & Récolte Éthique
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Plantes cultivées sans engrais chimiques ni arômes de synthèse. Un respect strict du cycle naturel des récoltes à Cotonou et dans les coopératives rurales.
                </p>
              </div>
            </div>

            {/* Visual Card 2 */}
            <div className="group relative rounded-2xl overflow-hidden border border-white/15 shadow-xl bg-stone-900">
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={importantImg2}
                  alt="Présentation authentique des étuis BenDjo 1500 FCFA"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#D96123] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                  Sachets Scellés Fraîcheur
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-heading font-extrabold text-base text-white">
                  Conditionnement Éco-Responsable
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Des étuis Kraft soignés et des sachets individuellement scellés pour offrir une expérience gustative et aromatique exceptionnelle à chaque tasse.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2. APERÇU À PROPOS AVEC FONT-IN FADE ANIMATION */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-stone-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-80 sm:h-96 border-2 border-[#2D5A36]/30">
              <img
                src={founderImg}
                alt="Bénédite Lovi - Co-fondatrice de BenDjo"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="font-brittany text-3xl text-amber-200 font-normal leading-none mb-1">
                  Bénédite Lovi
                </div>
                <div className="font-heading font-extrabold text-[11px] uppercase tracking-wider text-white/90">
                  Co-fondatrice & Dirigeante BenDjo
                </div>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 px-4 py-2 rounded-xl bg-[#2D5A36] text-white text-xs font-extrabold shadow-md">
              Cotonou, Bénin
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4 text-left">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#D96123]">
              Notre Histoire • L'Esprit BenDjo
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#1F2421]">
              Un savoir-faire artisanal dédié aux plantes du Bénin
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              Née à Cotonou, la marque <strong>BenDjo</strong> réinvente l'art des boissons naturelles en Afrique de l'Ouest. Portée par la passion de sa co-fondatrice <strong>Bénédite Lovi</strong>, l'entreprise sélectionne avec rigueur les meilleures feuilles de basilic, calices d'hibiscus et tiges de citronnelle locales pour offrir des tisanes saines, savoureuses et apaisantes.
            </p>

            <div className="p-4 rounded-2xl bg-[#FFF8F0] border border-[#D96123]/20 space-y-2">
              <div className="font-heading font-extrabold text-xs text-[#D96123]">
                L'Engagement Qualité BenDjo :
              </div>
              <ul className="text-xs text-stone-700 space-y-1">
                <li>• Sélection rigoureuse auprès des coopératives agricoles locales.</li>
                <li>• Séchage doux préservant toutes les vitamines et antioxydants.</li>
                <li>• Zéro colorant synthétique, zéro conservateur artificiel.</li>
              </ul>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setCurrentView('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF6F0] border border-stone-300 text-[#1F2421] font-bold text-xs hover:border-[#D96123] hover:text-[#D96123] hover:bg-[#FFF8F0] transition-all"
              >
                <span>Découvrir toute notre histoire</span>
                <ArrowRight className="w-4 h-4 text-[#D96123]" />
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. APERÇU SERVICES */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#D96123]">
            Nos Offres & Services
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#1F2421]">
            Pour Particuliers & Entreprises
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Du paquet de thé à 1500 FCFA pour vos pauses cocooning à la livraison de petit-déjeuner complet pour votre personnel à Cotonou.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BENDJO_SERVICES.map((srv) => (
            <motion.div
              whileHover={{ y: -5 }}
              key={srv.id}
              className="p-6 rounded-3xl bg-white border border-stone-200 hover:border-[#2D5A36] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full bg-[#FFF8F0] text-[#D96123] text-[10px] font-extrabold uppercase tracking-wider border border-[#D96123]/30">
                  {srv.badge}
                </span>
                <h3 className="text-lg font-extrabold font-heading text-[#1F2421]">
                  {srv.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <button
                onClick={() => {
                  setCurrentView('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-3 rounded-2xl bg-[#FFF8F0] hover:bg-[#2D5A36] text-[#2D5A36] hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-stone-200"
              >
                <span>S'informer sur ce service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={onOpenB2BCalculator}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#2D5A36] text-white font-extrabold text-xs hover:bg-[#224429] shadow-md transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#D96123]" />
            <span>Calculer un devis Petit-Déjeuner d'Entreprise</span>
          </button>
        </div>
      </motion.section>

      {/* 4. GALERIE DES INFUSIONS (Dynamic Products & Premium Motion) */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200/80 pb-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#D96123]">
              Sélection Produits • Terroir Bénin
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#1F2421]">
              Nos Infusions Médicinales à 1500 F CFA
            </h2>
          </div>

          <button
            onClick={() => {
              setCurrentView('infusions');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-extrabold text-[#D96123] hover:underline self-start md:self-end"
          >
            <span>Voir la gamme complète ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'all', label: 'Toutes les tisanes', icon: 'fa-solid fa-leaf' },
            { id: 'hibiscus', label: 'Hibiscus (Tension/Coeur)', icon: 'fa-solid fa-heart-pulse' },
            { id: 'citronnelle', label: 'Citronnelle (Énergie/Vitalité)', icon: 'fa-solid fa-bolt' },
            { id: 'basilic', label: 'Basilic (Digestion/Sommeil)', icon: 'fa-solid fa-spa' },
            { id: 'laurier', label: 'Laurier (Détox/Toxines)', icon: 'fa-solid fa-wand-magic-sparkles' },
            { id: 'coffret', label: 'Coffret Prestige', icon: 'fa-solid fa-[#1F2421]' },
          ].map((cat) => (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              key={cat.id}
              onClick={() => setHomeCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-extrabold flex items-center gap-2 transition-all shrink-0 ${
                homeCategory === cat.id
                  ? 'bg-[#2D5A36] text-white shadow-md'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-[#2D5A36]/40'
              }`}
            >
              <i className={`${cat.icon} text-xs ${homeCategory === cat.id ? 'text-amber-300' : 'text-[#D96123]'}`}></i>
              <span>{cat.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Product Cards Grid with Framer Motion AnimatePresence */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedProducts.slice(0, 6).map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -15 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                key={product.id}
                className="p-5 rounded-3xl bg-white border border-stone-200 hover:border-[#D96123] transition-all shadow-xs hover:shadow-xl flex flex-col justify-between space-y-4 group relative overflow-hidden"
              >
                {/* Added to cart toast feedback badge */}
                {addedNoticeId === product.id && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-2 right-2 left-2 z-20 bg-[#2D5A36] text-white text-xs font-extrabold py-2 px-3 rounded-2xl text-center shadow-lg flex items-center justify-center gap-1.5"
                  >
                    <i className="fa-solid fa-[#1F2421] text-amber-300"></i>
                    <span>Ajouté au panier !</span>
                  </motion.div>
                )}

                <div className="relative h-52 rounded-2xl overflow-hidden bg-stone-100">
                  <MediaDisplay
                    src={product.image}
                    alt={product.name}
                    mediaType={product.mediaType}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold shadow-sm bg-[#D96123] text-white flex items-center gap-1">
                    <i className="fa-solid fa-tag text-[9px]"></i>
                    <span>{product.priceFcfa} FCFA</span>
                  </span>

                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-xl text-[10px] font-bold bg-black/60 backdrop-blur-md text-white">
                    {product.format}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-extrabold font-heading text-[#1F2421] group-hover:text-[#D96123] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#2D5A36] font-semibold line-clamp-1">
                    {product.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {product.vitamins.map((v, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-full bg-[#FFF8F0] text-[#D96123] text-[10px] font-bold border border-[#D96123]/20"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-extrabold text-[#D96123] font-heading block leading-none">
                      {product.priceFcfa} FCFA
                    </span>
                    <span className="text-[10px] text-stone-500 font-semibold">
                      En stock • Cotonou
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenProductDetail(product)}
                      className="px-3 py-2 rounded-xl text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors"
                    >
                      Détails
                    </button>
                    <motion.button
                      whileTap={{ scale: 0.88 }}
                      onClick={() => {
                        onAddToCart(product, 1);
                        setAddedNoticeId(product.id);
                        setTimeout(() => setAddedNoticeId(null), 2000);
                      }}
                      className="p-2.5 rounded-xl bg-[#2D5A36] hover:bg-[#224429] text-white transition-all shadow-md flex items-center justify-center gap-1"
                      title="Ajouter au panier"
                    >
                      <i className="fa-solid fa-cart-plus text-xs text-amber-200"></i>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.section>

      {/* 5. IMMERSION VIDÉO & SAVOIR-FAIRE BEN DJO */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#D96123]">
            Immersion Vidéo • Découvrez BenDjo
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#1F2421]">
            L'Art des Infusions Béninoises en Images
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BenDjoRealVideo
            videoSrc="/videos/video1.mp4"
            title="Notre Savoir-Faire"
            subtitle="De la récolte à votre tasse"
          />
          
          <BenDjoRealVideo
            videoSrc="/videos/video2.mp4"
            title="Processus Artisanal"
            subtitle="Séchage traditionnel & conditionnement"
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <BenDjoRealVideo
            videoSrc="/videos/video3.mp4"
            title="Les Infusions BenDjo"
            subtitle="Basilic • Hibiscus • Citronnelle & Girofle"
            className="lg:h-[500px]"
          />
        </div>
      </motion.section>

      {/* 6. INTERACTIVE FAQ SECTION */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <FaqSection />
      </motion.section>

      {/* 6. TÉMOIGNAGES CLIENTS */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <TestimonialsCarousel />
      </motion.section>

      {/* 7. BLOC DE RÉASSURANCE BENDJO */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1C261D] via-[#2D5A36] to-[#1C261D] text-white shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border border-[#D96123]/30">
          <div className="space-y-2 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#D96123]/20 border border-[#D96123]/40 flex items-center justify-center text-amber-200 mx-auto sm:mx-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-base font-extrabold font-heading text-amber-100">100% Terroir Béninois</h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Plantes pures récoltées localement par nos partenaires agricoles au Bénin.
            </p>
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#D96123]/20 border border-[#D96123]/40 flex items-center justify-center text-amber-200 mx-auto sm:mx-0">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-base font-extrabold font-heading text-amber-100">0 Additif Chimique</h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Formulation 100% naturelle, sans arômes synthétiques ni conservateurs.
            </p>
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#D96123]/20 border border-[#D96123]/40 flex items-center justify-center text-amber-200 mx-auto sm:mx-0">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="text-base font-extrabold font-heading text-amber-100">50+ Entreprises Clients</h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Service de petits-déjeuners d'entreprises actif à Cotonou et Calavi.
            </p>
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#D96123]/20 border border-[#D96123]/40 flex items-center justify-center text-amber-200 mx-auto sm:mx-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-extrabold font-heading text-amber-100">Commande WhatsApp Instantanée</h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Commande directe sans inscription, réponse rapide garantie.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 8. APPEL À L'ACTION FINAL */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#FFF8F0] via-[#FAF6F0] to-[#FFF8F0] border border-[#D96123]/30 shadow-md text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#D96123]">
              Passez Commande
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#1F2421]">
              Goûtez la différence du thé naturel BenDjo
            </h2>
            <p className="text-xs sm:text-sm text-stone-700">
              Commandez vos paquets d'infusions à 1500 FCFA ou demandez une cotation pour le petit-déjeuner de votre équipe à Cotonou.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                setCurrentView('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#2D5A36] hover:bg-[#224429] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>Page Contact & Points de Vente</span>
              <ArrowRight className="w-4 h-4 text-[#D96123]" />
            </button>

            <a
              href="https://wa.me/22962014161?text=Bonjour%20BenDjo%2C%20je%20souhaite%20commander%20des%20paquets%20d%27infusions."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <i className="fa-brands fa-whatsapp text-base"></i>
              <span>Commander sur WhatsApp (+229 62 01 41 61)</span>
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
