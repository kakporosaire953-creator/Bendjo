import { ServiceItem } from '../types';
import catalogueImg from '../assets/images/bendjo_authentic_06.webp';
import cateringImg from '../assets/images/bendjo_authentic_07.webp';
import standImg from '../assets/images/bendjo_authentic_08.webp';

export const BENDJO_SERVICES: ServiceItem[] = [
  {
    id: 'infusions-catalogue',
    title: 'Infusions Naturelles 100% Béninoises',
    tagline: 'Vente directe & distribution aux particuliers et professionnels',
    badge: 'Produits du Terroir',
    description: 'Des sachets d\'infusions individuels conditionnés dans des étuis colorés et soignés sous emballage éco-responsable. Zéro arôme artificiel, zéro conservateur synthétique, uniquement la pureté des plantes du Bénin.',
    benefits: [
      'Sachets fraîcheur individuellement scellés pour une conservation optimale des huiles essentielles',
      'Plantes récoltées localement et séchées selon les traditions artisanales',
      'Boîtes colorées et esthétiques idéales pour les cadeaux et les comptoirs de bureau',
      'Commande rapide et livraison directe à domicile ou sur le lieu de travail'
    ],
    steps: [
      {
        number: '01',
        title: 'Consultation du Catalogue',
        detail: 'Découvrez nos variétés (Hibiscus, Basilic, Citronnelle & Girofle, Laurier) et leurs bienfaits nutritionnels.'
      },
      {
        number: '02',
        title: 'Sélection & Panier',
        detail: 'Ajoutez vos boîtes ou coffrets au panier virtuel avec les quantités souhaitées.'
      },
      {
        number: '03',
        title: 'Validation WhatsApp Directe',
        detail: 'En un clic, un message pré-rempli s\'ouvre dans WhatsApp avec votre récapitulatif complet.'
      },
      {
        number: '04',
        title: 'Livraison & Réception',
        detail: 'Réceptionnez votre commande à Cotonou, Abomey-Calavi ou expédition sous 24-48h.'
      }
    ],
    image: catalogueImg,
    ctaText: 'Commander nos infusions'
  },
  {
    id: 'petit-dejeuner-b2b',
    title: 'Service Petit-Déjeuner en Entreprise',
    tagline: 'Déjà plus de 50 entreprises partenaires à Cotonou & Abomey-Calavi',
    badge: 'Offre B2B & Corporate',
    description: 'Offrez à vos collaborateurs une pause matin gourmande, équilibrée et revigorante. Un service clé en main qui livre chaque matin des infusions chaudes/glacées BenDjo, accompagnées de mignardises et viennoiseries locales de premier choix.',
    benefits: [
      'Amélioration de la qualité de vie au travail et du bien-être des équipes',
      'Boost d\'énergie naturel sans le "crash" de caféine industrielle',
      'Flexibilité totale : formule quotidienne, hebdomadaire ou ponctuelle',
      'Installation propre, thermos isothermes et réassort quotidien garanti à heure fixe'
    ],
    steps: [
      {
        number: '01',
        title: 'Prise de Contact & Audit',
        detail: 'Évaluation du nombre de collaborateurs et de la fréquence souhaitée (Cotonou, Abomey-Calavi).'
      },
      {
        number: '02',
        title: 'Dégustation Offerte en Entreprise',
        detail: 'Nous venons dans vos locaux faire découvrir nos infusions et formules à votre équipe.'
      },
      {
        number: '03',
        title: 'Abonnement sur Mesure',
        detail: 'Choix de la formule (Infusions seules ou Formule Complète Petit-Déjeuner).'
      },
      {
        number: '04',
        title: 'Livraison & Restauration Quotidienne',
        detail: 'Chaque matin avant 08h00, vos boissons chaudes et pauses gourmandes sont installées.'
      }
    ],
    image: cateringImg,
    ctaText: 'Demander une dégustation entreprise'
  },
  {
    id: 'traiteur-evenements',
    title: 'Service Traiteur & Événements',
    tagline: 'Animation de bars à infusions & pauses fraîches pour vos lancements',
    badge: 'Événementiel & Prestige',
    description: 'Sublimez vos événements professionnels, lancements de produits, conférences ou séminaires grâce à notre Bar à Infusions interactif chaud & glacé. Une expérience authentique, esthétique et mémorable.',
    benefits: [
      'Bar mobile élégant en bois et kraft aux couleurs chaleureuses de BenDjo',
      'Dégustation guidée par nos baristas passionnés du terroir',
      'Cocktails non alcoolisés signature à base d\'Hibiscus et de Citronnelle glacée',
      'Présentation raffinée qui reflète le dynamisme et le prestige de votre marque'
    ],
    steps: [
      {
        number: '01',
        title: 'Brief Événementiel',
        detail: 'Transmission de la date, du lieu, du nombre d\'invités et du thème de votre événement.'
      },
      {
        number: '02',
        title: 'Proposition Scénographique & Menu',
        detail: 'Création d\'une carte personnalisée de boissons chaudes et verres rafraîchissants.'
      },
      {
        number: '03',
        title: 'Installation & Mise en Place',
        detail: 'Notre équipe déploie le bar à infusions 1 heure avant l\'arrivée de vos convives.'
      },
      {
        number: '04',
        title: 'Service & Animation',
        detail: 'Service fluide et dynamique assurant une expérience VIP inoubliable.'
      }
    ],
    image: standImg,
    ctaText: 'Réserver un bar à infusions'
  }
];
