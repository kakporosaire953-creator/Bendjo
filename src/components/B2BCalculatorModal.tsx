import React, { useState } from 'react';
import { X, Building2, Users, Calendar, Sparkles, MessageCircle, CheckCircle, ArrowRight } from 'lucide-react';

interface B2BCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const B2BCalculatorModal: React.FC<B2BCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [companyName, setCompanyName] = useState('');
  const [employeeCount, setEmployeeCount] = useState(15);
  const [formula, setFormula] = useState<'infusions' | 'complete'>('complete');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const [location, setLocation] = useState('Cotonou');

  if (!isOpen) return null;

  // Price calculations (indicative B2B rates for Cotonou)
  const costPerPersonPerDay = formula === 'infusions' ? 600 : 1800; // FCFA
  const daysPerMonth = frequency === 'daily' ? 20 : 8;
  const estimatedMonthlyFcfa = employeeCount * costPerPersonPerDay * daysPerMonth;
  const estimatedMonthlyEur = estimatedMonthlyFcfa / 655.957;

  const handleSendQuoteWhatsApp = () => {
    let msg = `🏢 *DEMANDE DE DEVIS PETIT-DÉJEUNER B2B BENDJO*\n`;
    msg += `─────────────────────────\n`;
    if (companyName.trim()) msg += `🏢 *Entreprise :* ${companyName.trim()}\n`;
    msg += `👥 *Nombre de collaborateurs :* ${employeeCount} personnes\n`;
    msg += `📍 *Zone d'implantation :* ${location}\n`;
    msg += `☕ *Formule choisie :* ${
      formula === 'complete'
        ? 'Formule Complète (Infusions chaudes/glacées + Viennoiseries & Produits locaux)'
        : 'Formule Infusions Pures (Bar à infusions seul)'
    }\n`;
    msg += `📅 *Fréquence :* ${
      frequency === 'daily'
        ? 'Quotidienne (5j/7 - Du Lundi au Vendredi)'
        : 'Bi-hebdomadaire (2 fois par semaine)'
    }\n`;
    msg += `─────────────────────────\n`;
    msg += `💰 *Estimation Mensuelle : ~${estimatedMonthlyFcfa.toLocaleString(
      'fr-FR'
    )} FCFA* (~${estimatedMonthlyEur.toFixed(2)} €)\n\n`;
    msg += `Bonjour l'équipe BenDjo ! Nous aimerions organiser une séance de dégustation gratuite dans nos locaux à ${location}.`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/22962014161?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-[#FAF6F0] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#C89B6B]/30 z-10 space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white text-gray-600 hover:text-black flex items-center justify-center shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4B7F52]/10 text-[#4B7F52] text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Offre B2B & Entreprises Cotonou</span>
          </div>
          <h3 className="text-2xl font-extrabold font-heading text-[#1F2421]">
            Simulateur Petit-Déjeuner
          </h3>
          <p className="text-xs text-gray-600">
            Estimez le budget mensuel pour offrir une pause saine du terroir à vos équipes (Déjà +50 structures à Cotonou).
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Nom de votre entreprise / Structure
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="ex. Banque d'Afrique, Cabinet Orphée, StartUp Bénin..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#4B7F52] bg-white"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#4B7F52]" />
                <span>Nombre de collaborateurs :</span>
              </label>
              <span className="text-xs font-extrabold text-[#4B7F52] font-heading">
                {employeeCount} personnes
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={employeeCount}
              onChange={(e) => setEmployeeCount(Number(e.target.value))}
              className="w-full accent-[#4B7F52]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Formule souhaitée
              </label>
              <select
                value={formula}
                onChange={(e) => setFormula(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#4B7F52] bg-white"
              >
                <option value="complete">Formule Complète (Infusions + Restauration)</option>
                <option value="infusions">Bar à Infusions Pures seul</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Fréquence
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#4B7F52] bg-white"
              >
                <option value="daily">Quotidienne (Du lundi au vendredi)</option>
                <option value="weekly">Bi-hebdomadaire (2 fois / semaine)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Localisation
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#4B7F52] bg-white"
            >
              <option value="Cotonou (Haie Vive / Akpakpa)">Cotonou (Haie Vive, Akpakpa, Ganhi...)</option>
              <option value="Abomey-Calavi">Abomey-Calavi</option>
              <option value="Porto-Novo">Porto-Novo</option>
            </select>
          </div>
        </div>

        {/* Live Calculation Output */}
        <div className="p-5 rounded-2xl bg-white border border-[#C89B6B]/30 space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#C89B6B]">
            Budget Mensuel Estimé
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-[#2D5A36] font-heading">
              ~{estimatedMonthlyFcfa.toLocaleString('fr-FR')} FCFA
            </span>
            <span className="text-xs font-medium text-gray-500">
              (~{estimatedMonthlyEur.toFixed(2)} € / mois)
            </span>
          </div>
          <p className="text-[11px] text-gray-500">
            *Inclus la livraison quotidienne avant 08h00, les thermos isothermes et une séance de dégustation offerte.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSendQuoteWhatsApp}
          className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Solliciter une Dégustation Offerte en Entreprise</span>
          <ArrowRight className="w-4 h-4 ml-auto" />
        </button>

        <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500">
          <CheckCircle className="w-3.5 h-3.5 text-[#4B7F52]" />
          <span>Réponse garantie sous 2 heures ouvrées</span>
        </div>
      </div>
    </div>
  );
};
