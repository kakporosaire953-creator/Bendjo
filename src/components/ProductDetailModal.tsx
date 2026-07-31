import React, { useState } from 'react';
import { Product } from '../types';
import { MediaDisplay } from './MediaDisplay';
import { X, ShoppingBag, Flame, Clock, Sparkles, Heart, Check, ShieldCheck } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-[#FAF6F0] rounded-3xl shadow-2xl overflow-hidden border border-[#C89B6B]/30 z-10 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-700 flex items-center justify-center shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image/Video & Quick Attributes */}
          <div className="relative min-h-[300px] md:min-h-[450px] bg-stone-900">
            <MediaDisplay
              src={product.image}
              alt={product.name}
              mediaType={product.mediaType}
              controls={true}
              className="w-full h-full opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Badge overlay */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${product.badgeColor}`}>
                100% Naturel Bénin
              </span>
              {product.comingSoon && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#4B7F52] text-white">
                  Édition Limitée
                </span>
              )}
            </div>

            {/* Taste Notes Overlay */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-md text-[#1F2421] space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#C89B6B]">
                Profil Gustatif
              </div>
              <p className="text-xs font-medium italic">"{product.tasteNotes}"</p>
            </div>
          </div>

          {/* Product Info & Cart Action */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-[#4B7F52] uppercase tracking-wider block mb-1">
                  {product.format}
                </span>
                <h2 className="text-2xl font-extrabold font-heading text-[#1F2421]">
                  {product.name}
                </h2>
                <p className="text-xs text-[#D96123] font-semibold mt-1">
                  {product.subtitle}
                </p>
              </div>

              {/* Taste notes handwritten badge */}
              <div className="px-3.5 py-2 rounded-2xl bg-[#FFF8F0] border border-[#D96123]/25 flex items-center justify-between gap-2 shadow-xs">
                <span className="text-[10px] font-extrabold uppercase text-[#2D5A36] tracking-wider shrink-0">
                  Note d'Arôme :
                </span>
                <span className="font-brittany text-xl text-[#D96123] font-normal leading-none truncate">
                  {product.tasteNotes}
                </span>
              </div>

              <p className="text-xs text-gray-700 leading-relaxed">
                {product.description}
              </p>

              {/* Brewing Params */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-white border border-[#C89B6B]/20 text-xs">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#D64545]" />
                  <div>
                    <span className="text-[10px] text-gray-500 block">Température</span>
                    <span className="font-bold text-[#1F2421]">{product.brewingTemp}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#E08A2E]" />
                  <div>
                    <span className="text-[10px] text-gray-500 block">Temps d'infusion</span>
                    <span className="font-bold text-[#1F2421]">{product.brewingTime}</span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#1F2421] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#4B7F52]" />
                  <span>Bienfaits & Nutriments</span>
                </h4>
                <ul className="space-y-1 text-xs text-gray-700">
                  {product.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#4B7F52] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vitamins & Minerals Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {product.vitamins.map((v, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full bg-[#4B7F52]/10 text-[#4B7F52] text-[10px] font-bold"
                  >
                    {v}
                  </span>
                ))}
                {product.minerals.map((m, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full bg-[#C89B6B]/15 text-[#3D271D] text-[10px] font-bold"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Price & Quantity Add */}
            <div className="pt-4 border-t border-[#C89B6B]/20 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-black text-[#2D5A36] font-heading">
                    {product.priceFcfa.toLocaleString('fr-FR')} FCFA
                  </span>
                  <span className="text-xs text-gray-500 block">
                    (~{product.priceEur.toFixed(2)} €)
                  </span>
                </div>

                {!product.comingSoon && (
                  <div className="flex items-center border border-gray-300 rounded-full bg-white px-2 py-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2 text-sm font-bold text-gray-600 hover:text-black"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-bold text-[#1F2421]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2 text-sm font-bold text-gray-600 hover:text-black"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>

              {!product.comingSoon ? (
                <button
                  onClick={handleAdd}
                  disabled={addedSuccess}
                  className={`w-full py-3.5 px-6 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all ${
                    addedSuccess
                      ? 'bg-[#4B7F52] text-white'
                      : 'bg-[#2D5A36] hover:bg-[#1f3f26] text-white'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Ajouté au panier avec succès !</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Ajouter au panier ({(product.priceFcfa * quantity).toLocaleString('fr-FR')} FCFA)</span>
                    </>
                  )}
                </button>
              ) : (
                <div className="p-3 rounded-2xl bg-[#4B7F52]/10 text-[#4B7F52] text-xs text-center font-bold">
                  Bientôt disponible en commande directe
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
