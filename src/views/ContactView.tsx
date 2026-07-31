import React, { useState } from 'react';
import { PageView, ContactFormData } from '../types';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { motion } from 'motion/react';
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle,
  ExternalLink,
  Clock,
  Globe2,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactViewProps {
  setCurrentView: (view: PageView) => void;
}

export const ContactView: React.FC<ContactViewProps> = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'Infusions Particulier',
    message: '',
    preferredChannel: 'whatsapp',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.message) return;

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    setSubmitted(true);

    // Also offer direct WhatsApp option
    if (formData.preferredChannel === 'whatsapp') {
      let waText = `📩 *MESSAGE FORMULAIRE CONTACT BENDJO*\n`;
      waText += `─────────────────────────\n`;
      waText += `👤 *Nom :* ${formData.name}\n`;
      waText += `📞 *Téléphone :* ${formData.phone}\n`;
      if (formData.email) waText += `📧 *Email :* ${formData.email}\n`;
      if (formData.company) waText += `🏢 *Entreprise :* ${formData.company}\n`;
      waText += `📌 *Sujet :* ${formData.subject}\n`;
      waText += `💬 *Message :* ${formData.message}\n`;

      const encoded = encodeURIComponent(waText);
      setTimeout(() => {
        window.open(`https://wa.me/22962014161?text=${encoded}`, '_blank');
      }, 1000);
    }
  };

  return (
    <div className="pt-28 pb-16 space-y-16 overflow-x-hidden">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-b from-[#FFF7ED] via-[#FAF6F0] to-[#FAF6F0] py-16 border-b border-[#EA580C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EA580C]/30 text-[#EA580C] text-xs font-extrabold uppercase tracking-wider shadow-xs">
            <Mail className="w-3.5 h-3.5" />
            <span>Nous écrire & Nous rendre visite à Cotonou</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#1F2421] max-w-3xl mx-auto leading-tight">
            Restons en contact pour vos commandes & projets B2B
          </h1>
          <p className="text-xs sm:text-sm text-stone-700 max-w-2xl mx-auto leading-relaxed">
            Notre équipe est basée à Cotonou (Bénin). Nous répondons rapidement par téléphone, formulaire ou WhatsApp direct.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-white border border-[#EA580C]/20 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#EA580C]">
                Formulaire de Contact
              </span>
              <h2 className="text-2xl font-extrabold font-heading text-[#1F2421] mt-1">
                Envoyer un message à BenDjo
              </h2>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-[#FFF7ED] border border-[#EA580C]/30 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#EA580C] text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold font-heading text-[#1F2421]">
                  Message transmis avec succès !
                </h3>
                <p className="text-xs text-stone-700 max-w-md mx-auto">
                  Merci <strong>{formData.name}</strong>. Votre demande a bien été enregistrée. Notre équipe à Cotonou vous recontactera très rapidement.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-[#EA580C] hover:bg-[#d94e02] text-white text-xs font-extrabold shadow-xs"
                >
                  Envoyer un autre message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Nom & Prénom <span className="text-[#EA580C]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="ex. Bénédite Lovi"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Numéro Téléphone / WhatsApp <span className="text-[#EA580C]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="ex. +229 97 00 00 00"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Adresse Email (Facultatif)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contact@exemple.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Entreprise / Structure (Facultatif)
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Nom de votre structure"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Sujet de votre demande
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#EA580C] bg-white"
                  >
                    <option value="Infusions Particulier">Achat d'Infusions (Paquets 1500 FCFA)</option>
                    <option value="Petit-déjeuner B2B">Petit-déjeuner en Entreprise (B2B)</option>
                    <option value="Traiteur Evénement">Bar à Infusions & Traiteur Événementiel</option>
                    <option value="Partenariat">Partenariat / Distribution</option>
                    <option value="Autre">Autre demande</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Votre message <span className="text-[#EA580C]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Précisez votre besoin, vos quantités ou la date de votre événement..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#EA580C] resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-xs font-semibold text-stone-700">
                    <span>Réponse préférée via :</span>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="preferredChannel"
                        checked={formData.preferredChannel === 'whatsapp'}
                        onChange={() => setFormData({ ...formData, preferredChannel: 'whatsapp' })}
                        className="accent-[#25D366]"
                      />
                      <span>WhatsApp</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="preferredChannel"
                        checked={formData.preferredChannel === 'email'}
                        onChange={() => setFormData({ ...formData, preferredChannel: 'email' })}
                        className="accent-[#EA580C]"
                      />
                      <span>Email</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#EA580C] hover:bg-[#d94e02] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Envoyer le message</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Contact details & Map Coverage */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EA580C]/20 shadow-xs space-y-6">
              <h3 className="text-xl font-extrabold font-heading text-[#1F2421]">
                Coordonnées BenDjo
              </h3>

              <ul className="space-y-4 text-xs text-stone-700">
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#EA580C]/10 text-[#EA580C] flex items-center justify-center shrink-0 font-extrabold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-[#1F2421] text-sm">Siège & Atelier</div>
                    <div>Cotonou, République du Bénin</div>
                    <div className="text-[11px] text-stone-500">Service de livraison directe</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                    <i className="fa-brands fa-whatsapp text-xl"></i>
                  </div>
                  <div>
                    <div className="font-extrabold text-[#1F2421] text-sm">Téléphone & WhatsApp Direct</div>
                    <a href="tel:+22962014161" className="hover:text-[#25D366] transition-colors font-bold">+229 62 01 41 61</a>
                    <div className="text-[11px] text-stone-500">Disponible du Lundi au Samedi (08h00 - 18h00)</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#EA580C]/10 text-[#EA580C] flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-envelope text-lg"></i>
                  </div>
                  <div>
                    <div className="font-extrabold text-[#1F2421] text-sm">Email Officiel</div>
                    <a href="mailto:bendjobenin@gmail.com" className="hover:text-[#EA580C] transition-colors">bendjobenin@gmail.com</a>
                  </div>
                </li>
              </ul>

              {/* Direct WhatsApp button */}
              <a
                href="https://wa.me/22962014161?text=Bonjour%20BenDjo%2C%20je%20souhaite%20commander%20des%20infusions%20ou%20demander%20un%20devis."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md hover:bg-[#20bd5a] transition-all"
              >
                <i className="fa-brands fa-whatsapp text-lg"></i>
                <span>Ouvrir un tchat WhatsApp direct</span>
              </a>
            </div>

            {/* Zone de Couverture Visual Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1F2421] to-[#2D5A36] text-white shadow-md space-y-3 border border-[#EA580C]/30">
              <div className="flex items-center gap-2 text-[#EA580C]">
                <Globe2 className="w-5 h-5" />
                <h4 className="text-sm font-extrabold font-heading">Zone de Livraison & Service</h4>
              </div>
              <ul className="space-y-2 text-xs text-stone-200">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
                  <span><strong>Cotonou :</strong> Livraison quotidienne & restauration B2B</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
                  <span><strong>Abomey-Calavi :</strong> Paquets d'infusions & petits-déjeuners</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
                  <span><strong>Porto-Novo & Villes du Bénin :</strong> Expédition sous 24h</span>
                </li>
              </ul>
            </div>

            {/* Google Map Cotonou Bénin */}
            <div className="rounded-3xl overflow-hidden border border-[#EA580C]/20 shadow-md">
              <div className="bg-[#1F2421] px-4 py-3 flex items-center gap-2">
                <i className="fa-solid fa-location-dot text-[#EA580C] text-sm"></i>
                <span className="text-white font-extrabold text-xs uppercase tracking-wider">BenDjo — Cotonou, Bénin</span>
              </div>
              <iframe
                title="BenDjo Localisation Cotonou Bénin"
                src="https://www.openstreetmap.org/export/embed.html?bbox=2.3683%2C6.3354%2C2.4683%2C6.3954&layer=mapnik&marker=6.3654%2C2.4183"
                width="100%"
                height="240"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              />
              <div className="bg-white px-4 py-2 flex items-center justify-between">
                <span className="text-xs text-stone-500 font-semibold">Cotonou, République du Bénin</span>
                <a
                  href="https://www.openstreetmap.org/?mlat=6.3654&mlon=2.4183#map=14/6.3654/2.4183"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#EA580C] font-extrabold hover:underline flex items-center gap-1"
                >
                  <i className="fa-solid fa-up-right-from-square text-[10px]"></i>
                  Agrandir la carte
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Témoignages clients authentiques */}
        <TestimonialsSection />
      </div>
    </div>
  );
};

