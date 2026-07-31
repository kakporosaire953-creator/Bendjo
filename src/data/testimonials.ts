export interface Testimonial {
  id: string;
  content: string;
  tag: string;
  highlight: string;
  rating: number;
  badge: string;
}

export const EXACT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'testi-1',
    content: "J'ai commencé bendjo sans trop y croire, mais waouh... ça m'a tellement aidée 🥺. Moins de douleurs, moins de fatigue, je me sens juste bien. Merci pour ce petit miracle naturel",
    tag: "Cliente fidélisée",
    highlight: "Moins de douleurs & de fatigue",
    rating: 5,
    badge: "Avis vérifié"
  },
  {
    id: 'testi-2',
    content: "Le truc là m'a sauvé 😭🔥. J'avais toujours le ventre lourd après manger, maintenant je digère tranquille, je me sens légère. Franchement merci pour Benjo 🙏",
    tag: "Consommatrice régulière",
    highlight: "Digestion apaisée & légèreté",
    rating: 5,
    badge: "Avis vérifié"
  },
  {
    id: 'testi-3',
    content: "J'prenais Bendjo juste pour tester 😅, mais j'ai vu que je suis plus concentrée en cours et j'ai plus de migraines. Je capte mieux maintenant, c'est trop fort 😭🔥",
    tag: "Étudiante à Cotonou",
    highlight: "Concentration & fin des migraines",
    rating: 5,
    badge: "Avis vérifié"
  },
  {
    id: 'testi-4',
    content: "Honnêtement hein, j'étais sceptique au début 😅. Mais depuis que je prends BenDjo chaque matin, j'ai la forme ! Même mes règles me fatiguent plus comme avant. Je suis choquée 😭💚",
    tag: "Consommatrice quotidienne",
    highlight: "Vitalité matinale & confort",
    rating: 5,
    badge: "Avis vérifié"
  },
  {
    id: 'testi-5',
    content: "Franchement, je ne sais pas ce qu'il y a dans votre thé là, mais ça m'a vraiment soulagée 😭. souffre trop, mais cette fois c'était différent. Moins de douleurs, plus de calme. Merci vraiment 🙏💚",
    tag: "Cliente satisfaite",
    highlight: "Soulagement naturel intense",
    rating: 5,
    badge: "Avis vérifié"
  },
  {
    id: 'testi-6',
    content: "Heyyy franchement j'étais obligée de te dire ça 😅 ! J'ai pris bendjo pendant mes règles et j'étais choquée ! Pas de grosses douleurs comme d'habitude j'étais trop bien même détendue. Ce thé là c'est quelque chose. Je prends cette fois le pack de 6 stp",
    tag: "Commande du Pack de 6",
    highlight: "Absence de fortes douleurs & relaxation",
    rating: 5,
    badge: "Avis vérifié"
  }
];
