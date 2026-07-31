import React from 'react';
import { PageView } from '../types';
import { Leaf, MapPin, Phone, Mail, MessageCircle, ExternalLink, Heart, Sparkles, ShieldCheck, Lock } from 'lucide-react';
import bendjoMonogramLogo from '../assets/images/logo_authentic.webp';

interface FooterProps {
  setCurrentView: (view: PageView) => void;
  onOpenAdminModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView, onOpenAdminModal }) => {
  return (
    <footer className="bg-[#1C261D] text-[#FAF6F0] pt-16 pb-12 border-t-2 border-[#D96123]/30 relative overflow-hidden">
      {/* Background ambient lighting accents */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#D96123]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#2D5A36]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white p-1 shadow-md border border-stone-300 flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src={bendjoMonogramLogo}
                  alt="BenDjo Monogramme JB Logo"
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
              <div>
                <span className="font-heading font-extrabold text-2xl tracking-tight text-white block leading-none">
                  Ben<span className="text-[#D96123]">Djo</span>
                </span>
                <span className="text-xs text-amber-200/90 font-extrabold tracking-wider uppercase block mt-0.5">
                  UN PUR RÉGAL • THÉ NATUREL
                </span>
              </div>
            </div>
            <p className="text-amber-200 text-lg sm:text-xl font-chic italic leading-snug font-normal max-w-sm my-1">
              « Le thé qui vous reconnecte à vos origines »
            </p>
            <p className="text-sm text-stone-300 leading-relaxed">
              Fondée à Cotonou (Bénin), BenDjo valorise le terroir béninois à travers des infusions 100% naturelles (Basilic, Hibiscus, Citronnelle, Laurier, Clou de Girofle) et un service de restauration & petit-déjeuner sain en entreprise.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/22997000000?text=Bonjour%20BenDjo%2C%20je%20souhaite%20commander"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white text-sm font-extrabold hover:bg-[#20bd5a] transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Commandes WhatsApp</span>
              </a>
              <span className="text-sm font-extrabold px-3 py-1.5 rounded-full bg-[#D96123]/20 border border-[#D96123]/40 text-amber-200">
                1500 FCFA / Paquet
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-[#D96123]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D96123] transition-colors"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D96123] transition-colors"
                >
                  À propos (Notre Histoire)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D96123] transition-colors"
                >
                  Services & Offre B2B
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('infusions');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D96123] transition-colors"
                >
                  Nos Infusions (1500 F)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D96123] transition-colors"
                >
                  Contact & Point de Vente
                </button>
              </li>
            </ul>
          </div>

          {/* Nos Infusions */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-[#D96123]">
              Saveurs du Terroir
            </h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D96123]" />
                <span>Basilic Apaisant</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D64545]" />
                <span>Hibiscus Intense (Bissap)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Citronnelle & Clou de Girofle</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Feuilles de Laurier</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                <span>Pack Dégustation</span>
              </li>
            </ul>
          </div>

          {/* Coordonnées, Réseaux & Admin Panel Button */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-[#D96123]">
              Contacts & Admin
            </h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D96123] shrink-0 mt-0.5" />
                <span>Cotonou, Bénin (Livraison Cotonou & Calavi)</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D96123] shrink-0" />
                <span>+229 01 62 01 20 / +229 01 53 ...</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D96123] shrink-0" />
                <span>contact@bendjo.bj</span>
              </li>
            </ul>

            {/* Admin Panel Button & Social Links */}
            <div className="pt-2 space-y-3">
              {onOpenAdminModal && (
                <button
                  onClick={onOpenAdminModal}
                  className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-[#D96123] text-amber-100 hover:text-white border border-white/20 transition-all text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-200" />
                  <span>Espace Admin • Gestion Produits</span>
                </button>
              )}

              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-bold text-stone-300 block uppercase tracking-wider">
                  Suivez-nous :
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href="https://facebook.com/BenDjoBenin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-[#1877F2] text-white transition-all flex items-center justify-center w-9 h-9"
                    title="Facebook BenDjo"
                  >
                    <i className="fa-brands fa-facebook-f text-sm"></i>
                  </a>
                  <a
                    href="https://linkedin.com/company/bendjo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-[#0A66C2] text-white transition-all flex items-center justify-center w-9 h-9"
                    title="LinkedIn BenDjo Entreprise"
                  >
                    <i className="fa-brands fa-linkedin-in text-sm"></i>
                  </a>
                  <a
                    href="https://linkedin.com/in/b%C3%A9n%C3%A9dite-lovi-5bb16b22a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-[#0A66C2] text-white transition-all flex items-center gap-1.5 text-xs font-bold"
                    title="LinkedIn Bénédite Lovi (Fondatrice)"
                  >
                    <i className="fa-brands fa-linkedin-in text-xs"></i>
                    <span className="text-xs">Bénédite Lovi</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clean copyright section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-stone-300">
          <div className="flex items-center gap-1.5">
            <span>© 2026 BenDjo. Un Pur Régal.</span>
          </div>

          <div className="flex items-center gap-4 text-stone-300 text-xs sm:text-sm">
            <span className="text-amber-200 font-bold">100% Naturel • Sans Additifs</span>
            <span>•</span>
            <span>Cotonou, Bénin</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

