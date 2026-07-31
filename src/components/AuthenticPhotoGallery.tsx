import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Maximize2,
  Sparkles,
  Award,
  CheckCircle2,
  Camera,
  Share2,
  Download,
  Filter,
  Eye,
  Heart
} from 'lucide-react';
import hibiscusImg from '../assets/images/bendjo_hibiscus_tea_1785483925996.jpg';
import basilicImg from '../assets/images/bendjo_basilic_tea_1785483940225.jpg';
import citronnelleImg from '../assets/images/bendjo_citronnelle_tea_1785484352457.jpg';
import laurierImg from '../assets/images/bendjo_laurier_tea_1785484365853.jpg';
import coffretImg from '../assets/images/bendjo_coffret_prestige_1785484392625.jpg';
import founderImg from '../assets/images/benedicte_lovi_authentic.webp';
import standImg from '../assets/images/bendjo_authentic_01.webp';
import cateringImg from '../assets/images/bendjo_b2b_catering_1785484404621.jpg';
import heroImg from '../assets/images/hero_authentic.webp';

import authentic01 from '../assets/images/bendjo_authentic_01.webp';
import authentic02 from '../assets/images/bendjo_authentic_02.webp';
import authentic03 from '../assets/images/bendjo_authentic_03.webp';
import authentic04 from '../assets/images/bendjo_authentic_04.webp';
import authentic05 from '../assets/images/bendjo_authentic_05.webp';
import authentic06 from '../assets/images/bendjo_authentic_06.webp';
import authentic07 from '../assets/images/bendjo_authentic_07.webp';
import authentic08 from '../assets/images/bendjo_authentic_08.webp';
import authentic09 from '../assets/images/bendjo_authentic_09.webp';
import authentic10 from '../assets/images/bendjo_authentic_10.webp';
import authentic11 from '../assets/images/bendjo_authentic_11.webp';
import authentic12 from '../assets/images/bendjo_authentic_12.webp';
import authentic13 from '../assets/images/bendjo_authentic_13.webp';
import authentic14 from '../assets/images/bendjo_authentic_14.webp';
import authentic15 from '../assets/images/bendjo_authentic_15.webp';

export interface GalleryImage {
  id: string;
  title: string;
  category: 'product' | 'founder' | 'event' | 'b2b';
  categoryLabel: string;
  src: string;
  description: string;
  details: string;
  badge: string;
  badgeColor: string;
}

export const AUTHENTIC_GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'hero-1',
    title: 'Bannière Immersion Terroir BenDjo',
    category: 'product',
    categoryLabel: 'Produits',
    src: heroImg,
    description: 'Présentation officielle de la gamme d\'infusions pures BenDjo et théière traditionnelle.',
    details: '100% plantes béninoises séchées sans produits chimiques.',
    badge: 'Image Officielle',
    badgeColor: 'bg-[#D64545] text-white'
  },
  {
    id: 'founder-1',
    title: 'Bénédicte Lovi — Fondatrice BenDjo',
    category: 'founder',
    categoryLabel: 'Direction & Vision',
    src: founderImg,
    description: 'Portrait authentique de Bénédicte Lovi, créatrice et innovatrice de BenDjo au Bénin.',
    details: 'Pionnière de l\'agro-alimentaire bio et des tisanes haut de gamme du terroir.',
    badge: 'Fondatrice',
    badgeColor: 'bg-[#2D5A36] text-white'
  },
  {
    id: '1',
    title: 'Infusion BenDjo Hibiscus (1500 FCFA)',
    category: 'product',
    categoryLabel: 'Produits',
    src: hibiscusImg,
    description: 'Boîte éco-conçue Kraft avec sachets scellés d\'infusion d\'Hibiscus (Bissap) 100% naturelle.',
    details: 'Calices d\'hibiscus pur récoltés à la main au Bénin. Couleur pourpre éclatante et goût acidulé.',
    badge: 'Meilleure Vente',
    badgeColor: 'bg-[#D64545] text-white'
  },
  {
    id: '2',
    title: 'Infusion BenDjo Basilic (1500 FCFA)',
    category: 'product',
    categoryLabel: 'Produits',
    src: basilicImg,
    description: 'Étui Kraft avec touche pastel rose. Feuilles de basilic frais séchées artisanalement.',
    details: 'Vertus digestives et apaisantes pour le stress. Zéro théine ni caféine.',
    badge: '100% Bio Local',
    badgeColor: 'bg-[#E895A3] text-stone-900'
  },
  {
    id: '3',
    title: 'Infusion Citronnelle & Girofle (1500 FCFA)',
    category: 'product',
    categoryLabel: 'Produits',
    src: citronnelleImg,
    description: 'Emballage Kraft étiquette jaune dorée. Alliance rafraîchissante de citronnelle et girofle.',
    details: 'Tonifiant et purifiant naturel, idéal pour les baisses de tonus et réveils difficiles.',
    badge: 'Formule Tonique',
    badgeColor: 'bg-[#E08A2E] text-white'
  },
  {
    id: '4',
    title: 'Infusion Feuilles de Laurier (1500 FCFA)',
    category: 'product',
    categoryLabel: 'Produits',
    src: laurierImg,
    description: 'Nouveauté de la gamme BenDjo. Feuilles de laurier béninois soigneusement sélectionnées.',
    details: 'Effet détoxifiant et soutien de la circulation sanguine.',
    badge: 'Nouveauté',
    badgeColor: 'bg-[#4B7F52] text-white'
  },
  {
    id: '5',
    title: 'Coffret Prestige Dégustation 30 Sachets',
    category: 'product',
    categoryLabel: 'Produits',
    src: coffretImg,
    description: 'Coffret cadeau artisanal réunissant les 3 recettes iconiques BenDjo.',
    details: '30 sachets scellés fraîcheur sous boîte sérigraphiée. Cadeau d\'entreprise privilégié.',
    badge: 'Coffret Cadeau B2B',
    badgeColor: 'bg-[#C89B6B] text-white'
  },
  {
    id: 'real-01',
    title: 'Présentation des Paquets BenDjo',
    category: 'product',
    categoryLabel: 'Produits',
    src: authentic01,
    description: 'Photo authentique des sachets et emballages d\'infusion BenDjo prêts pour la livraison.',
    details: 'Conditionnement scellé préservant toutes les propriétés organoleptiques des plantes.',
    badge: 'Photo Réelle',
    badgeColor: 'bg-emerald-700 text-white'
  },
  {
    id: 'real-02',
    title: 'Gamme BenDjo & Infusions Préparées',
    category: 'product',
    categoryLabel: 'Produits',
    src: authentic02,
    description: 'Focus sur les emballages authentiques et les tasses d\'infusions naturelles.',
    details: 'Préparation artisanale sans additifs.',
    badge: 'Photo Réelle',
    badgeColor: 'bg-amber-600 text-white'
  },
  {
    id: 'real-03',
    title: 'Dégustation & Stand BenDjo',
    category: 'event',
    categoryLabel: 'Événements',
    src: authentic03,
    description: 'Événement de dégustation des thés BenDjo lors des salons et expositions au Bénin.',
    details: 'Rencontre directe avec les clients et dégustation des recettes chaudes et glacées.',
    badge: 'Événement',
    badgeColor: 'bg-blue-600 text-white'
  },
  {
    id: 'real-04',
    title: 'Stand d\'Exposition & Animation',
    category: 'event',
    categoryLabel: 'Événements',
    src: authentic04,
    description: 'Stand BenDjo animé par l\'équipe lors d\'une foire locale.',
    details: 'Mise en valeur du savoir-faire béninois.',
    badge: 'Forums & Salons',
    badgeColor: 'bg-blue-600 text-white'
  },
  {
    id: 'real-05',
    title: 'Conditionnement & Paquets d\'Infusion',
    category: 'product',
    categoryLabel: 'Produits',
    src: authentic05,
    description: 'Vue rapprochée des étuis colorés d\'infusion (1500 FCFA).',
    details: 'Design soigné et protecteur de la fraîcheur.',
    badge: 'Photo Réelle',
    badgeColor: 'bg-emerald-700 text-white'
  },
  {
    id: 'real-06',
    title: 'Sachets Individuels Scellés',
    category: 'product',
    categoryLabel: 'Produits',
    src: authentic06,
    description: 'Gros plan sur l\'étanchéité et la qualité de conservation des sachets BenDjo.',
    details: 'Hygiène irréprochable et praticité pour le bureau ou la maison.',
    badge: 'Qualité Certifiée',
    badgeColor: 'bg-emerald-800 text-white'
  },
  {
    id: 'real-07',
    title: 'Service Petit-Déjeuner Entreprise B2B',
    category: 'b2b',
    categoryLabel: 'Services B2B',
    src: authentic07,
    description: 'Service de restauration et pause thé installée en entreprise à Cotonou.',
    details: 'Livraison clé en main pour booster l\'énergie et le bien-être des collaborateurs.',
    badge: 'Offre B2B',
    badgeColor: 'bg-purple-700 text-white'
  },
  {
    id: 'real-08',
    title: 'Pause Santé & Bien-Être en Entreprise',
    category: 'b2b',
    categoryLabel: 'Services B2B',
    src: authentic08,
    description: 'Installation des thermos et boîtes BenDjo pour les pauses café corporate.',
    details: 'Boissons saines chaudes et glacées adaptées à l\'environnement professionnel.',
    badge: 'Partenaire B2B',
    badgeColor: 'bg-purple-700 text-white'
  },
  {
    id: 'real-09',
    title: 'Composition Botanique & Plantes Séchées',
    category: 'product',
    categoryLabel: 'Produits',
    src: authentic09,
    description: 'Ingrédients de première fraîcheur issus des coopératives agricoles du Bénin.',
    details: 'Hibiscus pourpre, basilic odorant et verveine/citronnelle locale.',
    badge: 'Plantes Pur',
    badgeColor: 'bg-[#2D5A36] text-white'
  },
  {
    id: 'real-10',
    title: 'Coffret Cadeau & Packs Dégustation',
    category: 'product',
    categoryLabel: 'Produits',
    src: authentic10,
    description: 'Assemblage des boîtes d\'infusions BenDjo en packs cadeaux.',
    details: 'Idéal pour offrir une expérience sensorielle du terroir béninois.',
    badge: 'Idée Cadeau',
    badgeColor: 'bg-[#C89B6B] text-white'
  },
  {
    id: 'real-11',
    title: 'Présentation sur Stand BenDjo',
    category: 'event',
    categoryLabel: 'Événements',
    src: authentic11,
    description: 'Mise en scène des produits sur les tables d\'exposition.',
    details: 'Contact chaleureux et démonstration de préparation d\'infusion.',
    badge: 'Exposition',
    badgeColor: 'bg-blue-600 text-white'
  },
  {
    id: 'real-12',
    title: 'Service Traiteur & Buffet Événementiel',
    category: 'b2b',
    categoryLabel: 'Services B2B',
    src: authentic12,
    description: 'Buffet d\'infusions naturelles et rafraîchissements lors d\'une conférence à Cotonou.',
    details: 'Une touche d\'authenticité locale pour vos séminaires et réceptions.',
    badge: 'Traiteur VIP',
    badgeColor: 'bg-purple-700 text-white'
  },
  {
    id: 'real-13',
    title: 'Infusion Glacée & Fraîcheur BenDjo',
    category: 'product',
    categoryLabel: 'Produits',
    src: authentic13,
    description: 'Dégustation d\'infusion glacée Hibiscus et Citronnelle pour se désaltérer.',
    details: 'Boisson rafraîchissante et désaltérante sans sucres raffinés.',
    badge: 'Formule Glacée',
    badgeColor: 'bg-cyan-700 text-white'
  },
  {
    id: 'real-14',
    title: 'L\'Art du Thé au Bénin',
    category: 'founder',
    categoryLabel: 'Direction & Vision',
    src: authentic14,
    description: 'Mise en avant de l\'éthique et de l\'authenticité de la marque BenDjo.',
    details: 'Valorisation des talents locaux et de la biodiversité béninoise.',
    badge: 'Vision Terroir',
    badgeColor: 'bg-[#2D5A36] text-white'
  },
  {
    id: 'real-15',
    title: 'Livraisons & Expéditions BenDjo',
    category: 'product',
    categoryLabel: 'Produits',
    src: authentic15,
    description: 'Préparation des commandes destinées aux clients de Cotonou, Abomey-Calavi et sous-région.',
    details: 'Service rapide et suivi rigoureux de chaque colis.',
    badge: 'Livraison 24h/48h',
    badgeColor: 'bg-emerald-700 text-white'
  }
];

interface AuthenticPhotoGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthenticPhotoGalleryModal: React.FC<AuthenticPhotoGalleryProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightBoxImg, setActiveLightBoxImg] = useState<GalleryImage | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const filteredImages = selectedCategory === 'all'
    ? AUTHENTIC_GALLERY_IMAGES
    : AUTHENTIC_GALLERY_IMAGES.filter(img => img.category === selectedCategory);

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-6xl rounded-3xl bg-[#1C261D] text-white border border-[#D64545]/30 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0 bg-stone-900/90">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D64545] text-white flex items-center justify-center shadow-md">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
                  Galerie Photos Relles & Authentiques BenDjo
                </h2>
                <p className="text-xs text-stone-300">
                  Découvrez les vrais emballages, stands, petit-déjeuners d'entreprise et l'équipe dirigeante
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filters Bar */}
          <div className="px-6 py-3 bg-stone-900/50 border-b border-white/10 flex items-center justify-between gap-3 overflow-x-auto shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-400 flex items-center gap-1.5 mr-2 shrink-0">
                <Filter className="w-3.5 h-3.5 text-[#E895A3]" />
                Filtrer par :
              </span>

              {[
                { id: 'all', label: `Toutes les photos (${AUTHENTIC_GALLERY_IMAGES.length})` },
                { id: 'product', label: 'Infusions & Boîtes' },
                { id: 'founder', label: 'Direction (Bénédite Lovi)' },
                { id: 'event', label: 'Stands & Événements' },
                { id: 'b2b', label: 'Restauration B2B' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#D64545] text-white shadow-md'
                      : 'bg-white/10 text-stone-300 hover:bg-white/20'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleCopyShare}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-stone-300 flex items-center gap-1.5 shrink-0"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-300" />
              <span>{copiedLink ? "Lien copié !" : "Partager"}</span>
            </button>
          </div>

          {/* Gallery Content Grid */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((img) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl overflow-hidden bg-stone-900 border border-white/15 shadow-xl flex flex-col justify-between group cursor-pointer"
                  onClick={() => setActiveLightBoxImg(img)}
                >
                  <div className="relative h-56 overflow-hidden bg-black">
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${img.badgeColor} shadow-md`}>
                      {img.badge}
                    </span>

                    <button
                      className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-[#D64545] text-white backdrop-blur-md transition-all opacity-90 group-hover:opacity-100"
                      title="Agrandir la photo"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-heading font-extrabold text-sm text-white group-hover:text-[#E895A3] transition-colors">
                      {img.title}
                    </h3>
                    <p className="text-xs text-stone-300 leading-relaxed line-clamp-2">
                      {img.description}
                    </p>
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-400">
                      <span className="font-semibold text-emerald-400">{img.categoryLabel}</span>
                      <span className="text-[#E895A3] font-extrabold flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        Voir en haute résolution
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer Info Banner */}
          <div className="p-4 bg-stone-900 border-t border-white/10 text-center text-xs text-stone-300 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Toutes ces photos représentent le savoir-faire et les produits réels de BenDjo au Bénin.</span>
            </div>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-[#D64545] hover:bg-[#c33a3a] text-white font-extrabold text-xs shadow-md transition-all"
            >
              Fermer la galerie
            </button>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal view */}
      {activeLightBoxImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
          <div className="relative max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col md:flex-row">
            <button
              onClick={() => setActiveLightBoxImg(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="md:w-3/5 bg-black flex items-center justify-center relative min-h-[300px] md:min-h-[450px]">
              <img
                src={activeLightBoxImg.src}
                alt={activeLightBoxImg.title}
                className="max-h-[80vh] w-full object-contain"
              />
            </div>

            <div className="md:w-2/5 p-6 sm:p-8 space-y-4 text-white flex flex-col justify-between bg-[#1C261D]">
              <div className="space-y-3">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold ${activeLightBoxImg.badgeColor}`}>
                  {activeLightBoxImg.badge}
                </span>

                <h3 className="text-xl font-extrabold font-heading text-white">
                  {activeLightBoxImg.title}
                </h3>

                <p className="text-xs text-stone-300 leading-relaxed">
                  {activeLightBoxImg.description}
                </p>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-stone-200 space-y-1">
                  <div className="font-extrabold text-[#E895A3] uppercase text-[10px]">
                    Détails du Produit / Événement :
                  </div>
                  <div>{activeLightBoxImg.details}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <a
                  href={activeLightBoxImg.src}
                  download="bendjo-photo-authentique.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-[#2D5A36] hover:bg-[#224429] text-white text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Download className="w-4 h-4 text-amber-200" />
                  <span>Télécharger l'image HD</span>
                </a>

                <button
                  onClick={() => setActiveLightBoxImg(null)}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 text-xs font-bold transition-all"
                >
                  Retour à la galerie
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
