import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  CheckCircle2,
  Leaf,
  Clock,
  ShoppingBag,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Flame,
  HeartPulse,
  Smile,
  Zap,
  ShieldCheck,
  MessageCircle,
  Share2,
  Check
} from 'lucide-react';
import bendjoMonogramLogo from '../assets/images/logo_authentic.webp';
import { Product } from '../types';
import { BENDJO_PRODUCTS } from '../data/products';

interface WellnessQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenBrewTimer: () => void;
  onOpenChatWithQuery?: (query: string) => void;
}

interface QuizAnswers {
  objective: string;
  symptom: string;
  flavor: string;
  moment: string;
}

export const WellnessQuizModal: React.FC<WellnessQuizModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onOpenBrewTimer,
  onOpenChatWithQuery
}) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    objective: '',
    symptom: '',
    flavor: '',
    moment: ''
  });
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleSelect = (key: keyof QuizAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({
      objective: '',
      symptom: '',
      flavor: '',
      moment: ''
    });
  };

  // Logic to calculate the perfect BenDjo match
  const getRecommendation = () => {
    const obj = answers.objective;
    const sym = answers.symptom;

    let primaryId = 'hibiscus-antioxydant';
    let secondaryId = 'basilic-soothing';
    let title = 'Rituel Équilibre & Vitalité BenDjo';
    let explanation = 'Un programme sur-mesure combinant tonus le matin et digestion apaisée le soir.';

    if (obj === 'tension' || sym === 'tension') {
      primaryId = 'hibiscus-classic';
      secondaryId = 'laurier-terroir';
      title = 'Rituel Santé & Tension Artérielle';
      explanation = 'L\'Hibiscus (Bissap pourpre) est reconnu pour ses vertus hypotensives et antioxydantes majeures. Associé au Laurier, il favorise la purification vasculaire.';
    } else if (obj === 'digestion' || sym === 'digestion') {
      primaryId = 'basilic-soothing';
      secondaryId = 'laurier-terroir';
      title = 'Rituel Confort Digestif & Sommeil Sérénité';
      explanation = 'Le Basilic béninois rééquilibre la flore intestinale, apaise les spasmes et élimine les ballonnements après le repas du soir.';
    } else if (obj === 'energie' || sym === 'fatigue') {
      primaryId = 'citronnelle-girofle';
      secondaryId = 'basilic-soothing';
      title = 'Rituel Vitalité & Énergie Naturelle';
      explanation = 'La Citronnelle infusée aux éclats de Girofle offre un boost tonifiant immédiat au réveil sans théine ni nervosité.';
    } else if (obj === 'detox' || sym === 'retention') {
      primaryId = 'laurier-terroir';
      secondaryId = 'hibiscus-classic';
      title = 'Rituel Détox Profonde & Circulation';
      explanation = 'Le Laurier purifie les toxines hépatiques et rénales tout en luttant contre la sensation de lourdeur.';
    } else if (obj === 'prestige') {
      primaryId = 'coffret-prestige';
      secondaryId = 'basilic-soothing';
      title = 'Rituel Dégustation Complète BenDjo';
      explanation = 'Le Coffret Prestige rassemble les plantes médicinales du Bénin pour adapter votre tasse à chaque besoin de la journée.';
    }

    const primaryProduct = BENDJO_PRODUCTS.find((p) => p.id === primaryId) || BENDJO_PRODUCTS[0];
    const secondaryProduct = BENDJO_PRODUCTS.find((p) => p.id === secondaryId) || BENDJO_PRODUCTS[1];

    return { primaryProduct, secondaryProduct, title, explanation };
  };

  const rec = getRecommendation();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F2421]/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-stone-200 overflow-hidden my-6"
        >
          {/* Header */}
          <div className="bg-[#1C3A27] text-white p-5 sm:p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-stone-300 hover:text-white hover:bg-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white p-1 border border-stone-200 flex items-center justify-center shrink-0">
                <img src={bendjoMonogramLogo} alt="Logo BenDjo" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#D96123] text-white text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Diagnostic Santé & Infusion
                </span>
                <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white mt-1">
                  Quiz Diagnostic Bien-Être Sur-Mesure
                </h2>
              </div>
            </div>

            {/* Progress Bar */}
            {step <= 4 && (
              <div className="mt-5">
                <div className="flex justify-between text-xs text-emerald-200 font-semibold mb-1.5">
                  <span>Étape {step} sur 4</span>
                  <span>{step === 1 ? '25%' : step === 2 ? '50%' : step === 3 ? '75%' : '100%'}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-400 to-[#D96123]"
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / 4) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Modal Content Steps */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* STEP 1: Main Goal */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div className="text-center sm:text-left">
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#1F2421]">
                    1. Quel est votre objectif prioritaire de santé ?
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Sélectionnez la préoccupation principale que vous souhaitez traiter naturellement.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      id: 'tension',
                      icon: HeartPulse,
                      color: 'text-rose-600 bg-rose-50 border-rose-200',
                      title: 'Tension Artérielle & Coeur',
                      desc: 'Réguler la pression sanguine et faire le plein d\'antioxydants.'
                    },
                    {
                      id: 'digestion',
                      icon: Smile,
                      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
                      title: 'Digestion & Sommeil',
                      desc: 'Éliminer les ballonnements, réduire le stress et mieux dormir.'
                    },
                    {
                      id: 'energie',
                      icon: Zap,
                      color: 'text-amber-600 bg-amber-50 border-amber-200',
                      title: 'Énergie & Anti-Fatigue',
                      desc: 'Boost de tonus au réveil et clarté mentale sans caféine.'
                    },
                    {
                      id: 'detox',
                      icon: ShieldCheck,
                      color: 'text-teal-700 bg-teal-50 border-teal-200',
                      title: 'Détox Profonde & Rein',
                      desc: 'Purifier l\'organisme, éliminer les toxines et la rétention.'
                    },
                    {
                      id: 'prestige',
                      icon: Sparkles,
                      color: 'text-purple-700 bg-purple-50 border-purple-200',
                      title: 'Découverte Équilibrée',
                      desc: 'Profiter d\'un assortiment complet pour chaque moment de la journée.'
                    }
                  ].map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = answers.objective === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelect('objective', opt.id)}
                        className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                          isSelected
                            ? 'border-[#1C3A27] bg-[#1C3A27]/5 ring-2 ring-[#1C3A27] shadow-sm'
                            : 'border-stone-200 hover:border-[#D96123] bg-white'
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl ${opt.color} shrink-0`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-heading font-extrabold text-sm text-[#1F2421]">
                            {opt.title}
                          </div>
                          <div className="text-xs text-stone-500 mt-0.5 leading-snug">
                            {opt.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Symptoms */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div className="text-center sm:text-left">
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#1F2421]">
                    2. Quel inconfort ressentez-vous le plus au quotidien ?
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Cela nous aide à doser la synergie idéale des plantes béninoises.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {[
                    { id: 'tension', text: 'Pression artérielle élevée ou antécédents de circulation' },
                    { id: 'digestion', text: 'Lenteur digestive, flatulences ou lourdeur après les repas' },
                    { id: 'fatigue', text: 'Coup de fatigue dès le matin ou baisse de vigilance vers 14h' },
                    { id: 'retention', text: 'Sensation d\'organisme surchargé, gonflement ou jambes lourdes' },
                    { id: 'stress', text: 'Stress mental, nervosité ou difficulté à lâcher prise le soir' }
                  ].map((symptom) => {
                    const isSelected = answers.symptom === symptom.id;
                    return (
                      <button
                        key={symptom.id}
                        onClick={() => handleSelect('symptom', symptom.id)}
                        className={`w-full p-4 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-[#1C3A27] bg-[#1C3A27] text-white shadow-md'
                            : 'border-stone-200 hover:border-[#D96123] bg-white text-stone-700'
                        }`}
                      >
                        <span>{symptom.text}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Taste Preference */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div className="text-center sm:text-left">
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#1F2421]">
                    3. Quelles notes de dégustation préférez-vous ?
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Nos infusions sont 100% naturelles, sans arôme artificiel ni sucre ajouté.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'acidule', label: '🌺 Acidulée & Fruité (Hibiscus Bissap)', desc: 'Rappelant les baies rouges et le bissap frais' },
                    { id: 'herbal', label: '🌿 Douce & Herbacée (Basilic Apaisant)', desc: 'Riche en huiles essentielles relaxantes' },
                    { id: 'zeste', label: '🍋 Zestée & Épicée (Citronnelle Girofle)', desc: 'Fraîcheur vive d\'agrumes et clou de girofle' },
                    { id: 'noble', label: '🍃 Boisée & Détox (Laurier Noble)', desc: 'Subtiles notes aromatiques méditerranéennes' }
                  ].map((flav) => {
                    const isSelected = answers.flavor === flav.id;
                    return (
                      <button
                        key={flav.id}
                        onClick={() => handleSelect('flavor', flav.id)}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'border-[#D96123] bg-[#D96123]/5 ring-2 ring-[#D96123]'
                            : 'border-stone-200 hover:border-stone-400 bg-white'
                        }`}
                      >
                        <div className="font-heading font-extrabold text-sm text-[#1F2421]">
                          {flav.label}
                        </div>
                        <div className="text-xs text-stone-500 mt-1">
                          {flav.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 4: Moment of Day */}
            {step === 4 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div className="text-center sm:text-left">
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#1F2421]">
                    4. À quel moment préférez-vous savourer votre infusion ?
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Nous adapterons la recommandation de préparation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'matin', label: '🌅 Au Réveil / Matin', desc: 'Pour éveiller l\'organisme' },
                    { id: 'apres_repas', label: '☀️ Après le Déjeuner', desc: 'Pour faciliter la digestion' },
                    { id: 'soir', label: '🌙 Le Soir / Coucher', desc: 'Pour une détente optimale' }
                  ].map((mom) => {
                    const isSelected = answers.moment === mom.id;
                    return (
                      <button
                        key={mom.id}
                        onClick={() => handleSelect('moment', mom.id)}
                        className={`p-4 rounded-2xl border text-center transition-all ${
                          isSelected
                            ? 'border-[#1C3A27] bg-[#1C3A27] text-white'
                            : 'border-stone-200 hover:border-stone-400 bg-white text-stone-700'
                        }`}
                      >
                        <div className="font-heading font-extrabold text-sm">
                          {mom.label}
                        </div>
                        <div className={`text-[11px] mt-1 ${isSelected ? 'text-emerald-100' : 'text-stone-500'}`}>
                          {mom.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 5: RESULTS SCREEN */}
            {step === 5 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                <div className="p-4 rounded-2xl bg-[#1C3A27]/5 border border-[#1C3A27]/20 text-center sm:text-left flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#1C3A27] text-amber-300 flex items-center justify-center shrink-0 shadow-md">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="px-2.5 py-0.5 rounded-full bg-emerald-800 text-white text-[10px] font-extrabold uppercase tracking-wider inline-block">
                      Recommandation BenDjo Certifiée
                    </div>
                    <h3 className="font-heading font-extrabold text-xl text-[#1F2421] mt-1">
                      {rec.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {rec.explanation}
                    </p>
                  </div>
                </div>

                {/* Recommended Product Card */}
                <div className="p-5 rounded-2xl border border-stone-200 bg-white shadow-sm flex flex-col sm:flex-row items-center gap-5">
                  <img
                    src={rec.primaryProduct.image}
                    alt={rec.primaryProduct.name}
                    className="w-28 h-28 object-cover rounded-2xl border border-stone-100 shadow-xs shrink-0"
                  />

                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <h4 className="font-heading font-extrabold text-lg text-[#1F2421]">
                        {rec.primaryProduct.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded-md bg-[#D96123] text-white text-xs font-bold">
                        {(rec.primaryProduct.priceFcfa || 1500).toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>

                    <p className="text-xs text-stone-500 italic">
                      "{rec.primaryProduct.subtitle}"
                    </p>

                    <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start pt-1">
                      {rec.primaryProduct.benefits.slice(0, 2).map((b, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Secondary Routine Support */}
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs text-stone-700">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-[#2D5A36]" />
                    <span><strong>Complément conseillé :</strong> {rec.secondaryProduct.name} ({(rec.secondaryProduct.priceFcfa || 1500).toLocaleString('fr-FR')} FCFA)</span>
                  </div>
                  <button
                    onClick={() => onAddToCart(rec.secondaryProduct, 1)}
                    className="px-2.5 py-1 rounded-lg bg-[#2D5A36] text-white font-bold hover:bg-[#204227] transition-all text-[11px]"
                  >
                    Ajouter +
                  </button>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => {
                      onAddToCart(rec.primaryProduct, 1);
                      onClose();
                    }}
                    className="w-full py-3 px-4 rounded-2xl bg-[#D96123] hover:bg-[#c4531b] text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Ajouter la routine au panier</span>
                  </button>

                  <button
                    onClick={() => {
                      onOpenBrewTimer();
                      onClose();
                    }}
                    className="w-full py-3 px-4 rounded-2xl bg-[#1C3A27] hover:bg-[#275037] text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <Clock className="w-4 h-4 text-amber-300" />
                    <span>Chrono d'infusion conseillé</span>
                  </button>
                </div>

                {/* Ask AI Chatbot or WhatsApp */}
                <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-xs text-stone-500">
                  <button
                    onClick={() => {
                      if (onOpenChatWithQuery) {
                        onOpenChatWithQuery(`Je viens d'obtenir le diagnostic ${rec.title}. Peux-tu me donner des détails supplémentaires sur ${rec.primaryProduct.name} ?`);
                      }
                      onClose();
                    }}
                    className="text-[#1C3A27] font-bold hover:underline flex items-center gap-1"
                  >
                    <MessageCircle className="w-4 h-4 text-[#D96123]" />
                    <span>Poser une question au Conseiller BenDjo</span>
                  </button>

                  <button
                    onClick={resetQuiz}
                    className="text-stone-400 hover:text-stone-600 flex items-center gap-1 font-medium"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Refaire le quiz</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Controls for Steps 1-4 */}
          {step <= 4 && (
            <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
              {step > 1 ? (
                <button
                  onClick={prevStep}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-200 transition-all flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Précédent
                </button>
              ) : <div />}

              {step < 4 ? (
                <button
                  onClick={nextStep}
                  disabled={
                    (step === 1 && !answers.objective) ||
                    (step === 2 && !answers.symptom) ||
                    (step === 3 && !answers.flavor)
                  }
                  className="px-6 py-2.5 rounded-xl bg-[#1C3A27] hover:bg-[#285338] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-extrabold shadow-md flex items-center gap-1.5 transition-all"
                >
                  <span>Suivant</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setStep(5)}
                  disabled={!answers.moment}
                  className="px-6 py-2.5 rounded-xl bg-[#D96123] hover:bg-[#c3531b] disabled:opacity-40 text-white text-xs font-extrabold shadow-md flex items-center gap-1.5 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Obtenir mon diagnostic</span>
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
