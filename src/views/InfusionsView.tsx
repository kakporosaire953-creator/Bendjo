import React, { useState } from 'react';
import { PageView, Product } from '../types';
import { TestimonialsCarousel } from '../components/TestimonialsCarousel';
import { MediaDisplay } from '../components/MediaDisplay';
import { BenDjoRealVideo } from '../components/BenDjoRealVideo';
import { motion } from 'framer-motion';
import {
  Leaf,
  ShoppingBag,
  Sparkles,
  Search,
  Filter,
  Flame,
  Clock,
  Check,
  Timer,
  HeartHandshake,
  ShieldCheck,
  Award
} from 'lucide-react';

interface InfusionsViewProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenProductDetail: (product: Product) => void;
  onOpenBrewTimer: () => void;
}

export const InfusionsView: React.FC<InfusionsViewProps> = ({
  products,
  onAddToCart,
  onOpenProductDetail,
  onOpenBrewTimer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.vitamins.some((v) => v.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-28 pb-16 space-y-16 overflow-x-hidden">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-b from-[#FFF8F0] via-[#FAF6F0] to-[#FAF6F0] py-16 border-b border-[#D96123]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#2D5A36]/30 text-[#2D5A36] text-xs font-extrabold uppercase tracking-wider shadow-xs">
            <Leaf className="w-3.5 h-3.5 text-[#D96123]" />
            <span>Nos Infusions • 1500 FCFA le Paquet</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#1F2421] max-w-3xl mx-auto leading-tight">
            Des infusions pures aux vertus révélées du terroir béninois
          </h1>
          <p className="text-xs sm:text-sm text-stone-700 max-w-2xl mx-auto leading-relaxed">
            Plongez dans l'univers de la phytothérapie artisanale. Nos tisanes en sachets individuellement scellés au tarif unique de <strong>1500 FCFA</strong> (12 sachets) : Basilic, Hibiscus, Citronnelle & Girofle.
          </p>

          <div className="pt-2 flex justify-center">
            <button
              onClick={onOpenBrewTimer}
              className="px-6 py-3.5 rounded-full bg-[#2D5A36] hover:bg-[#224429] text-white font-extrabold text-xs shadow-md flex items-center gap-2 transition-all"
            >
              <Timer className="w-4 h-4 text-[#D96123]" />
              <span>Minuteur d'Infusion Parfaite (5 Min)</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 1. PARTIE ÉDUCATIVE SUR L'INFUSION */}
        <section className="p-6 sm:p-10 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-8">
          <div className="border-b border-stone-100 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#D64545]">
              Guide & Savoir-Faire • Tout sur l'infusion
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#1F2421] mt-1">
              Comprendre le pouvoir d'une véritable tisane naturelle
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Definition */}
            <div className="p-6 rounded-2xl bg-[#FFF8F0] border border-[#D64545]/20 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D5A36]/10 text-[#2D5A36] flex items-center justify-center font-extrabold">
                <Leaf className="w-5 h-5 text-[#D64545]" />
              </div>
              <h3 className="font-heading font-extrabold text-base text-[#1F2421]">
                Qu'est-ce qu'une infusion naturelle ?
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed">
                Une extraction délicate à l'eau frémissante préservant toutes les huiles essentielles et principes actifs des plantes fraîches béninoises, sans aucune théine ni produit chimique.
              </p>
            </div>

            {/* Card 2: Health Benefits */}
            <div className="p-6 rounded-2xl bg-[#FFF8F0] border border-[#E895A3]/40 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E895A3]/20 text-[#2D5A36] flex items-center justify-center font-extrabold">
                <Sparkles className="w-5 h-5 text-[#D64545]" />
              </div>
              <h3 className="font-heading font-extrabold text-base text-[#1F2421]">
                Ses bienfaits au quotidien
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed">
                Elle procure une hydratation profonde et apporte un concentré naturel de vitamines (C, A) et d'antioxydants. Idéal pour remplacer les sodas et boissons artificielles sucrées.
              </p>
            </div>

            {/* Card 3: Why BenDjo */}
            <div className="p-6 rounded-2xl bg-[#FFF8F0] border border-[#D64545]/20 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D5A36]/10 text-[#2D5A36] flex items-center justify-center font-extrabold">
                <Award className="w-5 h-5 text-[#D64545]" />
              </div>
              <h3 className="font-heading font-extrabold text-base text-[#1F2421]">
                Pourquoi choisir BenDjo ?
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed">
                Ancrage local fort à Cotonou : nos plantes sont cultivées au Bénin, séchées naturellement et conditionnées en sachets individuellement scellés pour une conservation irréprochable.
              </p>
            </div>
          </div>
        </section>

        {/* 2. VIDÉO BEN DJO - IDENTITÉ VISUELLE & GALERIE DES INFUSIONS */}
        <section className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#D96123]">
              Découverte Visuelle
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#1F2421]">
              Nos Infusions en Action
            </h2>
          </div>
          
          <BenDjoRealVideo
            videoSrc="/videos/video1.mp4"
            title="Le Processus Artisanal BenDjo"
            subtitle="De la plante fraîche au sachet parfaitement dosé"
          />
        </section>

        {/* 2. CATALOGUE PRODUITS */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#D96123]">
                Gamme Officielle BenDjo
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#1F2421]">
                Nos Variétés & Packagings
              </h2>
            </div>

            {/* Search Bar & Filter */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[220px]">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher (Basilic, Hibiscus...)"
                  className="w-full pl-9 pr-4 py-2 rounded-full border border-stone-300 text-xs bg-white focus:outline-none focus:border-[#D96123]"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-full border border-stone-300 text-xs bg-white focus:outline-none focus:border-[#D96123]"
              >
                <option value="all">Toutes les catégories</option>
                <option value="hibiscus">Hibiscus</option>
                <option value="basilic">Basilic</option>
                <option value="citronnelle">Citronnelle & Girofle</option>
                <option value="laurier">Feuilles de Laurier</option>
                <option value="coffret">Coffrets Dégustation</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <motion.div
                whileHover={{ y: -4 }}
                key={product.id}
                className="p-6 rounded-3xl bg-white border border-stone-200 hover:border-[#D96123] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="relative h-56 rounded-2xl overflow-hidden bg-stone-100">
                    <MediaDisplay
                      src={product.image}
                      alt={product.name}
                      mediaType={product.mediaType}
                      className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold shadow-xs bg-[#D96123] text-white">
                      {product.priceFcfa} F CFA • {product.format}
                    </span>
                    {product.comingSoon && (
                      <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-[10px] font-extrabold bg-[#2D5A36] text-white">
                        Lancement Prochain
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-extrabold font-heading text-[#1F2421]">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#2D5A36] font-semibold">
                      {product.subtitle}
                    </p>
                    <p className="text-xs text-stone-600 line-clamp-2 pt-1">
                      {product.description}
                    </p>
                  </div>

                  {/* Brewing Quick Spec */}
                  <div className="flex items-center gap-4 text-[11px] text-stone-500 pt-1">
                    <span className="flex items-center gap-1 font-semibold">
                      <Flame className="w-3.5 h-3.5 text-[#D96123]" />
                      {product.brewingTemp}
                    </span>
                    <span className="flex items-center gap-1 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-[#D96123]" />
                      {product.brewingTime}
                    </span>
                  </div>

                  {/* Vitamins & Minerals Tags */}
                  <div className="flex flex-wrap gap-1">
                    {product.vitamins.map((v, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-full bg-[#FFF8F0] text-[#D96123] text-[10px] font-extrabold border border-[#D96123]/20"
                      >
                        {v}
                      </span>
                    ))}
                    {product.minerals.map((m, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-bold"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Price & Add */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-extrabold text-[#D96123] font-heading">
                      {product.priceFcfa} FCFA
                    </span>
                    <span className="text-[10px] text-stone-500 block">
                      {product.format}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenProductDetail(product)}
                      className="px-3.5 py-2 rounded-xl text-xs font-extrabold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors"
                    >
                      Fiche Détaillée
                    </button>

                    {!product.comingSoon && (
                      <button
                        onClick={() => onAddToCart(product, 1)}
                        className="p-2.5 rounded-xl bg-[#2D5A36] hover:bg-[#224429] text-white transition-all shadow-xs"
                        title="Ajouter au panier"
                      >
                        <ShoppingBag className="w-4 h-4 text-[#D96123]" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Témoignages clients authentiques */}
        <TestimonialsCarousel variant="compact" />
      </div>
    </div>
  );
};

