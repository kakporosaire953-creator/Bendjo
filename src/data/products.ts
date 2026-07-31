import { Product } from '../types';
import hibiscusImg from '../assets/images/bendjo_authentic_01.webp';
import basilicImg from '../assets/images/bendjo_authentic_02.webp';
import citronnelleImg from '../assets/images/bendjo_authentic_03.webp';
import laurierImg from '../assets/images/bendjo_authentic_04.webp';
import coffretImg from '../assets/images/bendjo_authentic_05.webp';

export const BENDJO_PRODUCTS: Product[] = [
  {
    id: 'hibiscus-classic',
    name: 'Infusion Hibiscus',
    subtitle: 'L\'élixir éclatant du terroir béninois',
    description: 'Une infusion naturelle intense préparée à partir des plus beaux calices d\'hibiscus (Bissap) récoltés à la main au Bénin. Reconnue pour sa couleur pourpre envoûtante et sa saveur acidulée rafraîchissante.',
    benefits: [
      'Tonifie l\'organisme et combat la fatigue',
      'Aide à réguler la pression artérielle',
      'Puissant pouvoir antioxydant naturel',
      'Facilite la digestion et l\'élimination'
    ],
    vitamins: ['Vitamine C', 'Pro-Vitamine A'],
    minerals: ['Calcium', 'Magnésium', 'Potassium', 'Fer'],
    format: 'Boîte de 10 sachets individuels',
    priceFcfa: 3500,
    priceEur: 5.50,
    category: 'hibiscus',
    colorAccent: '#D64545',
    badgeColor: 'bg-[#D64545] text-white',
    image: hibiscusImg,
    brewingTemp: '95°C',
    brewingTime: '5 à 7 min',
    tasteNotes: 'Acidulée, fruité intense, finale rafraîchissante',
    inStock: true
  },
  {
    id: 'basilic-soothing',
    name: 'Infusion Basilic',
    subtitle: 'La douceur apaisante et digestive',
    description: 'Issue des meilleures feuilles de basilic frais cultivé sous le soleil béninois. Une tisane réconfortante aux arômes herbacés délicats qui apaise l\'esprit et rééquilibre l\'organisme après les repas.',
    benefits: [
      'Facilite la digestion et réduit les ballonnements',
      'Propriétés relaxantes et apaisantes contre le stress',
      'Soutient le système immunitaire',
      'Alternative saine sans théine ni caféine'
    ],
    vitamins: ['Vitamine A', 'Vitamine E', 'Vitamine C', 'Vitamine K'],
    minerals: ['Magnésium', 'Manganèse', 'Calcium'],
    format: 'Boîte de 10 sachets individuels',
    priceFcfa: 3500,
    priceEur: 5.50,
    category: 'basilic',
    colorAccent: '#E895A3',
    badgeColor: 'bg-[#E895A3] text-gray-900',
    image: basilicImg,
    brewingTemp: '90°C',
    brewingTime: '4 à 6 min',
    tasteNotes: 'Herbacée douce, légèrement poivrée, arômes subtils',
    inStock: true
  },
  {
    id: 'citronnelle-girofle',
    name: 'Infusion Citronnelle & Clou de Girofle',
    subtitle: 'L\'alliance tonique et purifiante',
    description: 'Une synergie parfaite entre la fraîcheur citronnée de la verveine indienne locale et la chaleur épicée du clou de girofle béninois. Un véritable bouclier naturel vivifiant.',
    benefits: [
      'Apporte une sensation immédiate de fraîcheur',
      'Enzymes digestives et action antispasmodique',
      'Propriétés antiseptiques et purifiantes du clou de girofle',
      'Aide à soulager les maux de tête et la fatigue cérébrale'
    ],
    vitamins: ['Vitamine E', 'Vitamine B6', 'Vitamine C'],
    minerals: ['Magnésium', 'Cuivre', 'Zinc', 'Antioxydants puissants'],
    format: 'Boîte de 10 sachets individuels',
    priceFcfa: 3500,
    priceEur: 5.50,
    category: 'citronnelle',
    colorAccent: '#E08A2E',
    badgeColor: 'bg-[#E08A2E] text-white',
    image: citronnelleImg,
    brewingTemp: '95°C',
    brewingTime: '6 à 8 min',
    tasteNotes: 'Zestée, chaleureuse, notes poivrées et boisées',
    inStock: true
  },
  {
    id: 'laurier-terroir',
    name: 'Infusion Feuilles de Laurier du Terroir',
    subtitle: 'Édition Spéciale — Nouveauté à venir',
    description: 'Infusion traditionnelle aux feuilles de laurier béninois soigneusement séchées à l\'ombre. Connue pour ses vertus détoxifiantes et son pouvoir régulateur sur la glycémie.',
    benefits: [
      'Propriétés détoxifiantes et drainage naturel',
      'Soutient la circulation sanguine',
      'Soulage l\'acidité stomacale',
      'Saveur noble et aromatique'
    ],
    vitamins: ['Vitamine A', 'Vitamine B9', 'Vitamine C'],
    minerals: ['Fer', 'Manganèse', 'Potassium'],
    format: 'Boîte de 10 sachets (Lancement prochain)',
    priceFcfa: 3800,
    priceEur: 6.00,
    category: 'laurier',
    colorAccent: '#4B7F52',
    badgeColor: 'bg-[#4B7F52] text-white',
    image: laurierImg,
    brewingTemp: '95°C',
    brewingTime: '5 à 7 min',
    tasteNotes: 'Aromatique riche, résineuse, légèrement piquante',
    inStock: false,
    comingSoon: true
  },
  {
    id: 'coffret-prestige',
    name: 'Coffret Dégustation Terroir BenDjo',
    subtitle: 'L\'expérience complète des 3 infusions emblématiques',
    description: 'Un magnifique coffret écologique en carton Kraft sérigraphié regroupant nos 3 recettes iconiques : Hibiscus, Basilic et Citronnelle & Clou de Girofle. Idéal pour offrir ou découvrir la gamme.',
    benefits: [
      '30 sachets au total (10 de chaque variété)',
      'Coffret cadeau éco-conçu réutilisable',
      'Carnet d\'infusion et conseils de dégustation inclus',
      'Remise avantageuse par rapport à l\'achat à l\'unité'
    ],
    vitamins: ['Multi-vitamines A, C, E, K'],
    minerals: ['Riche en Calcium, Magnésium, Potassium & Antioxydants'],
    format: 'Coffret de 30 sachets (3 x 10 sachets)',
    priceFcfa: 9500,
    priceEur: 15.00,
    category: 'coffret',
    colorAccent: '#C89B6B',
    badgeColor: 'bg-[#C89B6B] text-white',
    image: coffretImg,
    brewingTemp: '90°C - 95°C',
    brewingTime: '4 à 8 min',
    tasteNotes: 'Panaché complet de saveurs béninoises',
    inStock: true
  }
];
