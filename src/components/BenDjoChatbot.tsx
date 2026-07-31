import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  Clock,
  ShoppingBag,
  Briefcase,
  HelpCircle,
  Leaf,
  ChevronRight,
  CheckCircle2,
  ExternalLink,
  Flame
} from 'lucide-react';
import bendjoMonogramLogo from '../assets/images/bendjo_monogram_jb_logo_1785486826868.jpg';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  actionType?: 'cart' | 'brew_timer' | 'b2b' | 'quiz' | 'whatsapp';
  actionData?: any;
}

interface BenDjoChatbotProps {
  onOpenBrewTimer: () => void;
  onOpenB2BCalculator: () => void;
  onOpenQuiz?: () => void;
  onNavigate: (view: any) => void;
  externalQuery?: string;
}

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome-1',
  sender: 'bot',
  text: `Bonjour et bienvenue chez **BenDjo** ! 🌿✨

Je suis votre conseiller virtuel expert en **infusions naturelles et saines du Bénin**.

Comment puis-je vous aider aujourd'hui ?
- 🩺 Faire le Quiz Diagnostic Bien-Être sur-mesure
- 🍵 Choisir l'infusion idéale selon vos vertus recherchées
- ⏱️ Conseils de préparation et temps d'infusion
- 💼 Organiser un petit-déjeuner d'entreprise à Cotonou
- 📦 Tarifs (boîtes à 1500 FCFA & Coffret Prestige)`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

const SUGGESTIONS = [
  { label: '🩺 Quiz Diagnostic Santé', text: 'Je souhaite faire le Quiz Diagnostic Bien-Être pour trouver l\'infusion adaptée à mes besoins.' },
  { label: '🌿 Quelle infusion choisir ?', text: 'Quelle infusion me conseilles-tu selon mes besoins de santé ou de relaxation ?' },
  { label: '⏱️ Temps d\'infusion idéal', text: 'Comment bien préparer et infuser les thés et tisanes BenDjo ?' },
  { label: '💼 Devis Petit-Déjeuner B2B', text: 'Je souhaite des informations sur le service petit-déjeuner d\'entreprise à Cotonou.' },
  { label: '💰 Tarifs et livraisons', text: 'Quels sont les prix des boîtes et les modalités de livraison au Bénin ?' }
];

export const BenDjoChatbot: React.FC<BenDjoChatbotProps> = ({
  onOpenBrewTimer,
  onOpenB2BCalculator,
  onOpenQuiz,
  onNavigate,
  externalQuery
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (externalQuery) {
      setIsOpen(true);
      handleSendMessage(externalQuery);
    }
  }, [externalQuery]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Local fallback response engine in case server backend is unreachable
  const getFallbackBotResponse = (userMsg: string): { text: string; actionType?: 'cart' | 'brew_timer' | 'b2b' | 'quiz' | 'whatsapp' } => {
    const q = userMsg.toLowerCase();

    if (q.includes('quiz') || q.includes('diagnostic') || q.includes('test') || q.includes('routine') || q.includes('recommander')) {
      return {
        text: `🩺 **Quiz Diagnostic Bien-Être Sur-Mesure :**

Vous pouvez passer notre quiz interactif en 4 étapes pour obtenir votre routine personnalisée de plantes béninoises (tension, digestion, tonus, détox) !`,
        actionType: 'quiz'
      };
    }

    if (q.includes('prix') || q.includes('tarif') || q.includes('combien') || q.includes('coûte') || q.includes('livraison')) {
      return {
        text: `**Nos Tarifs Officiels BenDjo :**

• **Toutes nos boîtes d'infusion (Hibiscus, Basilic, Citronnelle, Laurier) :** **1 500 FCFA** (10 sachets scellés fraîcheur).
• **Coffret Prestige Dégustation :** **4 500 FCFA** (30 sachets assortis).

🚚 **Livraison :**
• Express sous 24h à Cotonou, Abomey-Calavi et Porto-Novo.
• Expédition disponible dans tout le Bénin et à l'international.`,
        actionType: 'cart'
      };
    }

    if (q.includes('préparer') || q.includes('infus') || q.includes('temps') || q.includes('degré') || q.includes('eau') || q.includes('chaud')) {
      return {
        text: `⏱️ **Conseils de Préparation BenDjo :**

1. Versez de l'eau frémissante à **90°C - 95°C**.
2. Laissez infuser **1 sachet par tasse** pendant :
   - 🌺 Hibiscus : **5 à 7 min**
   - 🌿 Basilic : **6 à 8 min**
   - 🍋 Citronnelle : **6 à 8 min**
   - 🍃 Laurier : **5 à 7 min**
3. Savourez chaud ou laissez refroidir avec des glaçons pour une boisson glacée détox !`,
        actionType: 'brew_timer'
      };
    }

    if (q.includes('entreprise') || q.includes('b2b') || q.includes('petit-déjeuner') || q.includes('pause') || q.includes('traiteur') || q.includes('cotonou') || q.includes('devis')) {
      return {
        text: `💼 **Services Entreprises BenDjo B2B :**

Nous livrons chaque matin aux entreprises de Cotonou & Calavi :
• **Thermos d'infusions bien chaudes** (Hibiscus, Basilic, Citronnelle).
• **Corbeilles de viennoiseries & fruits locaux**.
• **Bars à infusions interactifs** pour salons et séminaires.

Vous pouvez utiliser notre simulateur de devis B2B instantané !`,
        actionType: 'b2b'
      };
    }

    if (q.includes('hibiscus') || q.includes('bissap') || q.includes('tension') || q.includes('rouge') || q.includes('hypertension')) {
      return {
        text: `🌺 **Infusion Hibiscus (Bissap pourpre) - 1 500 FCFA**

• **Bienfaits :** Riche en antioxydants, régule la tension artérielle (hypertension), favorise le tonus.
• **Saveur :** Acidulée, fruitée et désaltérante.
• **Conseil :** Excellente chaude le matin ou glacée en journée !`,
        actionType: 'cart'
      };
    }

    if (q.includes('basilic') || q.includes('diges') || q.includes('stress') || q.includes('sommeil') || q.includes('ballonnement')) {
      return {
        text: `🌿 **Infusion Basilic Apaisant - 1 500 FCFA**

• **Bienfaits :** Soulage les ballonnements, facilite la digestion après les repas et apaise l'esprit (anti-stress & sommeil).
• **Saveur :** Herbécée douce et réconfortante.
• **Conseil :** Idéale après le déjeuner ou avant le coucher.`,
        actionType: 'cart'
      };
    }

    if (q.includes('citronnelle') || q.includes('fatigue') || q.includes('energie') || q.includes('réveil') || q.includes('tonique')) {
      return {
        text: `🍋 **Infusion Citronnelle & Girofle - 1 500 FCFA**

• **Bienfaits :** Tonifiant naturel anti-fatigue, purifiant et stimulant réveil (0% théine).
• **Saveur :** Zestée, chaleureuse et subtilement poivrée.`,
        actionType: 'cart'
      };
    }

    if (q.includes('laurier') || q.includes('detox') || q.includes('rein') || q.includes('circulation') || q.includes('jambe')) {
      return {
        text: `🍃 **Infusion Laurier Détox - 1 500 FCFA**

• **Bienfaits :** Action purifiante hépatique et rénale, soulage la sensation de jambes lourdes et draine les toxines.
• **Saveur :** Boisée et équilibrée.`,
        actionType: 'cart'
      };
    }

    if (q.includes('fondat') || q.includes('bénédite') || q.includes('qui') || q.includes('histoire') || q.includes('marque')) {
      return {
        text: `👩‍🌾 **L'Histoire BenDjo :**

Fondée à Cotonou par **Bénédite Lovi** (diplômée de l'INSTI et titulaire d'un Master en Data Science & IA), BenDjo valorise les plantes aromatiques et médicinales béninoises en soutenant les coopératives agricoles locales.`
      };
    }

    return {
      text: `Merci pour votre question ! 🌿 

Nos infusions **Hibiscus, Basilic, Citronnelle et Laurier** sont 100% naturelles, cultivées au Bénin et sans additifs. 

Que souhaitez-vous faire ?
- 🩺 Lancer le Quiz Diagnostic Santé
- 🛒 Découvrir nos produits et commander
- ⏱️ Lancer le chrono d'infusion`,
      actionType: 'quiz'
    };
  };

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      // Try sending request to backend server
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.sender,
            content: m.text
          }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.text) {
          const botMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            text: data.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages((prev) => [...prev, botMessage]);
          setIsTyping(false);
          return;
        }
      }
      
      // Fallback if backend API responds with error or missing key
      throw new Error('Fallback logic engaged');
    } catch (err) {
      // Use local fallback
      setTimeout(() => {
        const fallback = getFallbackBotResponse(queryText);
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: fallback.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionType: fallback.actionType
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 600);
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_WELCOME_MESSAGE]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="relative group flex items-center gap-3 px-4 py-3 rounded-full bg-[#1C3A27] text-white shadow-2xl border-2 border-[#D96123] hover:bg-[#275037] transition-all"
              id="open-chatbot-btn"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-white p-0.5 flex items-center justify-center overflow-hidden">
                  <img src={bendjoMonogramLogo} alt="Logo BenDjo" className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#1C3A27] animate-pulse" />
              </div>

              <div className="text-left hidden sm:block">
                <div className="text-xs font-extrabold font-heading text-white flex items-center gap-1">
                  Conseiller BenDjo
                  <Sparkles className="w-3 h-3 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
                </div>
                <div className="text-xs text-stone-300">Poser une question</div>
              </div>

              <div className="p-1.5 rounded-full bg-[#D96123] text-white">
                <MessageSquare className="w-4 h-4" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Window Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[590px] max-h-[90vh] rounded-3xl bg-white shadow-2xl border border-stone-200 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-[#1C3A27] text-white flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-2xl bg-white p-1 border border-stone-200 shadow-md flex items-center justify-center shrink-0">
                  <img src={bendjoMonogramLogo} alt="Logo Monogramme BenDjo" className="w-full h-full object-contain mix-blend-multiply" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#1C3A27]" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-sm text-white flex items-center gap-1.5">
                    Conseiller BenDjo
                    <span className="px-1.5 py-0.5 rounded-full bg-emerald-700/80 text-xs font-bold text-emerald-100 uppercase tracking-wider">
                      En Ligne
                    </span>
                  </h3>
                  <p className="text-xs text-emerald-200/80">
                    Infusions 100% béninoises & conseils santé
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Réinitialiser la conversation"
                  className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-stone-50">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-xl bg-[#1C3A27] text-white flex items-center justify-center text-xs shrink-0 shadow-xs mt-1">
                      <Leaf className="w-3.5 h-3.5 text-amber-300" />
                    </div>
                  )}

                  <div className={`max-w-[84%] space-y-2`}>
                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs whitespace-pre-line ${
                        msg.sender === 'user'
                          ? 'bg-[#D96123] text-white rounded-br-xs font-medium'
                          : 'bg-white text-stone-800 border border-stone-200/80 rounded-bl-xs'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Dynamic Action Buttons inside Bot Answers */}
                    {msg.sender === 'bot' && msg.actionType && (
                      <div className="pt-1 flex flex-wrap gap-2">
                        {msg.actionType === 'cart' && (
                          <button
                            onClick={() => {
                              onNavigate('products');
                              setIsOpen(false);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-[#1C3A27] text-white text-[11px] font-bold flex items-center gap-1.5 shadow-xs hover:bg-[#264d35] transition-all"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                            <span>Voir le catalogue & commander</span>
                          </button>
                        )}

                        {msg.actionType === 'brew_timer' && (
                          <button
                            onClick={() => {
                              onOpenBrewTimer();
                              setIsOpen(false);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-[#D96123] text-white text-[11px] font-bold flex items-center gap-1.5 shadow-xs hover:bg-[#c4531b] transition-all"
                          >
                            <Clock className="w-3.5 h-3.5 text-amber-200" />
                            <span>Lancer le chrono d'infusion</span>
                          </button>
                        )}

                        {msg.actionType === 'b2b' && (
                          <button
                            onClick={() => {
                              onOpenB2BCalculator();
                              setIsOpen(false);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-amber-700 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-xs hover:bg-amber-800 transition-all"
                          >
                            <Briefcase className="w-3.5 h-3.5 text-amber-200" />
                            <span>Simuler devis petit-déjeuner</span>
                          </button>
                        )}

                        {msg.actionType === 'quiz' && onOpenQuiz && (
                          <button
                            onClick={() => {
                              onOpenQuiz();
                              setIsOpen(false);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-[#D96123] text-white text-[11px] font-bold flex items-center gap-1.5 shadow-xs hover:bg-[#c4531b] transition-all"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                            <span>Lancer le Quiz Diagnostic Santé</span>
                          </button>
                        )}
                      </div>
                    )}

                    <div className={`text-xs text-stone-400 ${msg.sender === 'user' ? 'text-right mr-1' : 'ml-1'}`}>
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-xl bg-[#D96123] text-white flex items-center justify-center text-xs shrink-0 shadow-xs mt-1">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2.5 items-center">
                  <div className="w-7 h-7 rounded-xl bg-[#1C3A27] text-white flex items-center justify-center text-xs shrink-0">
                    <Leaf className="w-3.5 h-3.5 text-amber-300" />
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-stone-200 text-xs text-stone-500 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '0.4s' }} />
                    <span className="ml-1 text-xs font-medium text-stone-400">Rédaction du conseil...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            <div className="px-3 py-2 bg-stone-100 border-t border-stone-200 overflow-x-auto flex gap-1.5 shrink-0 scrollbar-none">
              {SUGGESTIONS.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(sug.text)}
                  className="px-2.5 py-1 rounded-full bg-white border border-stone-300 hover:border-[#D96123] text-stone-700 hover:text-[#D96123] text-xs font-bold whitespace-nowrap transition-all shadow-2xs shrink-0"
                >
                  {sug.label}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-stone-200 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question sur nos infusions..."
                className="flex-1 px-3.5 py-2.5 rounded-2xl bg-stone-100 border border-stone-300 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1C3A27] focus:bg-white transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2.5 rounded-2xl bg-[#1C3A27] text-white hover:bg-[#285338] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
