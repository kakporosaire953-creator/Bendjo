export type PageView = 'home' | 'about' | 'services' | 'infusions' | 'contact';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  benefits: string[];
  vitamins: string[];
  minerals: string[];
  format: string;
  priceFcfa: number;
  priceEur: number;
  category: 'hibiscus' | 'basilic' | 'citronnelle' | 'laurier' | 'coffret';
  colorAccent: string; // Tailwind color class or hex
  badgeColor: string;
  image: string;
  mediaType?: 'image' | 'video';
  brewingTemp: string;
  brewingTime: string;
  tasteNotes: string;
  inStock: boolean;
  comingSoon?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  description: string;
  benefits: string[];
  steps: {
    number: string;
    title: string;
    detail: string;
  }[];
  image: string;
  ctaText: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
  preferredChannel: 'whatsapp' | 'email' | 'call';
}
