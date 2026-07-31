import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import { ShoppingBag, Menu, X, Timer, Sparkles, MessageCircle, Leaf, Flame, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import bendjoMonogramLogo from '../assets/images/bendjo_monogram_jb_logo_1785486826868.jpg';

interface HeaderProps {
  currentView: PageView;
  setCurrentView: (view: PageView) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenBrewTimer: () => void;
  onOpenB2BCalculator: () => void;
  onOpenGallery?: () => void;
  onOpenQuiz?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  cartCount,
  onOpenCart,
  onOpenBrewTimer,
  onOpenB2BCalculator,
  onOpenGallery,
  onOpenQuiz,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { view: PageView; label: string }[] = [
    { view: 'home', label: 'Accueil' },
    { view: 'about', label: 'À propos' },
    { view: 'services', label: 'Services' },
    { view: 'infusions', label: 'Nos Infusions' },
    { view: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (view: PageView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF6F0]/95 backdrop-blur-md shadow-md border-b border-[#D96123]/20 py-2.5'
            : 'bg-[#FAF6F0]/80 backdrop-blur-sm py-3.5 border-b border-stone-200/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo with JB Monogram */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 sm:gap-3 group text-left focus:outline-none"
              id="brand-logo-btn"
            >
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white border border-stone-200 shadow-md p-1 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-[#D96123] transition-colors"
              >
                <img
                  src={bendjoMonogramLogo}
                  alt="BenDjo Monogramme JB Logo"
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </motion.div>
              <div>
                <span className="font-heading font-extrabold text-2xl tracking-tight text-[#1F2421] block leading-none">
                  Ben<span className="text-[#D96123]">Djo</span>
                </span>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[10px] text-[#2D5A36] font-extrabold tracking-wider uppercase block">
                    THÉ NATUREL
                  </span>
                  <span className="font-brittany text-base text-[#D96123] font-normal leading-none ml-0.5">
                    — Un Pur Régal
                  </span>
                </div>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-white/90 p-1.5 rounded-full border border-stone-200 backdrop-blur-sm shadow-xs">
              {navItems.map((item) => {
                const active = currentView === item.view;
                return (
                  <button
                    key={item.view}
                    onClick={() => handleNavClick(item.view)}
                    id={`nav-link-${item.view}`}
                    className={`relative px-4 py-2 rounded-full text-xs font-extrabold transition-all duration-200 ${
                      active
                        ? 'bg-[#2D5A36] text-white shadow-xs'
                        : 'text-[#1F2421] hover:text-[#D96123] hover:bg-[#FFF8F0]'
                    }`}
                  >
                    {item.label}
                    {active && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 bg-[#2D5A36] rounded-full -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Cart Button */}
              <button
                onClick={onOpenCart}
                id="header-cart-btn"
                className="relative p-2.5 rounded-full bg-white border border-stone-200 text-[#1F2421] hover:border-[#D96123] hover:text-[#D96123] transition-all shadow-xs flex items-center justify-center"
                aria-label="Voir le panier"
              >
                <i className="fa-solid fa-basket-shopping text-base text-[#2D5A36]"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D96123] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Direct WhatsApp Quick Order */}
              <a
                href="https://wa.me/22997000000?text=Bonjour%20BenDjo%2C%20je%20souhaite%20commander%20des%20infusions%20naturelles%20ou%20me%20renseigner%20sur%20vos%20services."
                target="_blank"
                rel="noopener noreferrer"
                id="whatsapp-header-direct-link"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-extrabold hover:bg-[#20bd5a] transition-all shadow-sm hover:shadow-md"
              >
                <i className="fa-brands fa-whatsapp text-sm"></i>
                <span>WhatsApp</span>
              </a>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                id="mobile-menu-toggle"
                className="md:hidden p-2 rounded-2xl bg-white border border-stone-200 text-[#1F2421] flex items-center justify-center"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? (
                  <i className="fa-solid fa-xmark text-lg text-[#D96123]"></i>
                ) : (
                  <i className="fa-solid fa-bars text-lg text-[#2D5A36]"></i>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu with AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#FAF6F0] border-b border-[#D96123]/20 px-6 py-6 shadow-2xl space-y-4 overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const active = currentView === item.view;
                  return (
                    <button
                      key={item.view}
                      onClick={() => handleNavClick(item.view)}
                      className={`text-left px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
                        active
                          ? 'bg-[#2D5A36] text-white shadow-md'
                          : 'text-[#1F2421] hover:bg-[#FFF8F0]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-stone-200 flex flex-col gap-3">
                {onOpenQuiz && (
                  <button
                    onClick={() => {
                      onOpenQuiz();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-3 px-4 rounded-2xl bg-[#1C3A27] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md"
                  >
                    <i className="fa-solid fa-notes-medical text-amber-300 text-sm"></i>
                    <span>Quiz Diagnostic Bien-Être Sur-Mesure</span>
                  </button>
                )}

                {onOpenGallery && (
                  <button
                    onClick={() => {
                      onOpenGallery();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-3 px-4 rounded-2xl bg-[#D64545] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md"
                  >
                    <i className="fa-solid fa-camera text-amber-200 text-sm"></i>
                    <span>Galerie Photos Réelles BenDjo</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    onOpenBrewTimer();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-[#FFF8F0] text-[#D96123] border border-[#D96123]/30 font-extrabold text-xs flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-stopwatch text-[#D96123] text-sm"></i>
                  <span>Minuteur d'Infusion Parfaite</span>
                </button>

                <button
                  onClick={() => {
                    onOpenB2BCalculator();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-[#2D5A36]/10 text-[#2D5A36] border border-[#2D5A36]/20 font-extrabold text-xs flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-briefcase text-[#D96123] text-sm"></i>
                  <span>Devis Petit-Déjeuner Entreprise B2B</span>
                </button>

                <a
                  href="https://wa.me/22997000000?text=Bonjour%20BenDjo%2C%20je%20souhaite%20commander%20des%20infusions%20naturelles."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <i className="fa-brands fa-whatsapp text-sm"></i>
                  <span>Commander sur WhatsApp</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

