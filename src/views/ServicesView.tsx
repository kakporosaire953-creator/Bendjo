import React from 'react';
import { PageView, ServiceItem } from '../types';
import { BENDJO_SERVICES } from '../data/services';
import { TestimonialsCarousel } from '../components/TestimonialsCarousel';
import { motion } from 'motion/react';
import {
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Building2,
  Sparkles,
  Coffee,
  Check,
  Calendar
} from 'lucide-react';

interface ServicesViewProps {
  setCurrentView: (view: PageView) => void;
  onOpenB2BCalculator: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  setCurrentView,
  onOpenB2BCalculator,
}) => {
  return (
    <div className="pt-28 pb-16 space-y-16 overflow-x-hidden">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-b from-[#FFF7ED] via-[#FAF6F0] to-[#FAF6F0] py-16 border-b border-[#EA580C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EA580C]/30 text-[#EA580C] text-xs font-extrabold uppercase tracking-wider shadow-xs">
            <Building2 className="w-3.5 h-3.5" />
            <span>Offres Particuliers & Corporate B2B</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#1F2421] max-w-3xl mx-auto leading-tight">
            Des services sur mesure pour vos pauses & événements
          </h1>
          <p className="text-xs sm:text-sm text-stone-700 max-w-2xl mx-auto leading-relaxed">
            De la vente d'infusions individuelles à 1500 FCFA aux abonnements de petits-déjeuners d'entreprise et prestations traiteur à Cotonou et Abomey-Calavi.
          </p>

          <div className="pt-2 flex justify-center">
            <button
              onClick={onOpenB2BCalculator}
              className="px-6 py-3.5 rounded-full bg-[#2D5A36] text-white font-extrabold text-xs hover:bg-[#204228] shadow-md flex items-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#F97316]" />
              <span>Simulateur de Devis Petit-Déjeuner B2B</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Render each service */}
        {BENDJO_SERVICES.map((srv, index) => (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            key={srv.id}
            id={srv.id}
            className="p-6 sm:p-10 rounded-3xl bg-white border border-[#EA580C]/20 shadow-sm space-y-8 scroll-mt-32"
          >
            {/* Header / Badge */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-6">
              <div className="space-y-1">
                <span className="text-xs font-extrabold text-[#EA580C] uppercase tracking-widest block">
                  Pôle 0{index + 1} • {srv.badge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#1F2421]">
                  {srv.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#EA580C] font-extrabold">
                  {srv.tagline}
                </p>
              </div>

              {srv.id === 'petit-dejeuner-b2b' && (
                <div className="px-4 py-2 rounded-2xl bg-[#FFF7ED] border border-[#EA580C]/30 text-[#EA580C] text-xs font-extrabold shrink-0 flex items-center gap-2">
                  <Coffee className="w-4 h-4" />
                  <span>Présent dans 50+ entreprises à Cotonou</span>
                </div>
              )}
            </div>

            {/* Description & Image */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-stone-500">
                  Description du service
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {srv.description}
                </p>

                {/* Benefits List */}
                <div className="pt-2 space-y-2">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#EA580C] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Bénéfices clés</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                    {srv.benefits.map((b, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-[#FFF7ED] border border-[#EA580C]/10">
                        <Check className="w-3.5 h-3.5 text-[#EA580C] shrink-0 mt-0.5" />
                        <span className="font-semibold">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <img
                  src={srv.image}
                  alt={srv.title}
                  className="w-full h-72 object-cover rounded-2xl shadow-md border-2 border-white"
                />
              </div>
            </div>

            {/* Process / Steps */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1F2421]">
                Comment procéder (Déroulement)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {srv.steps.map((step) => (
                  <div
                    key={step.number}
                    className="p-4 rounded-2xl bg-[#FFF7ED] border border-[#EA580C]/15 space-y-1.5 relative"
                  >
                    <span className="text-xl font-black font-heading text-[#EA580C]">
                      {step.number}
                    </span>
                    <h4 className="text-xs font-extrabold text-[#1F2421] font-heading">
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-stone-600 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FFF7ED] p-6 rounded-2xl border border-[#EA580C]/20">
              <div>
                <div className="text-xs font-extrabold text-[#1F2421]">
                  Intéressé par cette prestation BenDjo ?
                </div>
                <div className="text-[11px] text-stone-600">
                  Échangez directement avec notre équipe à Cotonou via WhatsApp.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                {srv.id === 'infusions-catalogue' && (
                  <button
                    onClick={() => {
                      setCurrentView('infusions');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#EA580C] hover:bg-[#d94e02] text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>Consulter le Catalogue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {srv.id === 'petit-dejeuner-b2b' && (
                  <button
                    onClick={onOpenB2BCalculator}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#2D5A36] text-white font-extrabold text-xs hover:bg-[#204228] transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Sparkles className="w-4 h-4 text-[#F97316]" />
                    <span>Simuler Tarif Entreprise</span>
                  </button>
                )}

                <a
                  href={`https://wa.me/22962014161?text=Bonjour%20BenDjo%2C%20je%20souhaite%20m'informer%20sur%20votre%20service%20:%20${encodeURIComponent(
                    srv.title
                  )}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] text-white font-extrabold text-xs hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <i className="fa-brands fa-whatsapp text-base"></i>
                  <span>Contacter sur WhatsApp (+229 62 01 41 61)</span>
                </a>
              </div>
            </div>
          </motion.section>
        ))}

        {/* Témoignages clients authentiques */}
        <TestimonialsCarousel variant="minimal" />
      </div>
    </div>
  );
};

