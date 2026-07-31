import React, { useState } from 'react';
import { CartItem } from '../types';
import { MediaDisplay } from './MediaDisplay';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('Cotonou');
  const [customerNotes, setCustomerNotes] = useState('');

  if (!isOpen) return null;

  const totalFcfa = cart.reduce(
    (sum, item) => sum + item.product.priceFcfa * item.quantity,
    0
  );
  const totalEur = cart.reduce(
    (sum, item) => sum + item.product.priceEur * item.quantity,
    0
  );

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4B7F52', '#D64545', '#E08A2E', '#C89B6B'],
      });
    } catch {
      // ignore
    }

    // Build WhatsApp message
    let message = `🌿 *COMMANDE D'INFUSIONS BENDJO*\n`;
    message += `─────────────────────────\n`;
    if (customerName.trim()) {
      message += `👤 *Client(e) :* ${customerName.trim()}\n`;
    }
    message += `📍 *Ville de livraison :* ${deliveryCity}\n\n`;
    message += `📦 *PRODUITS SÉLECTIONNÉS :*\n`;

    cart.forEach((item, index) => {
      const itemTotal = item.product.priceFcfa * item.quantity;
      message += `${index + 1}. *${item.product.name}*\n`;
      message += `   • Format : ${item.product.format}\n`;
      message += `   • Quantité : ${item.quantity}\n`;
      message += `   • Sous-total : ${itemTotal.toLocaleString('fr-FR')} FCFA (~${(
        item.product.priceEur * item.quantity
      ).toFixed(2)} €)\n\n`;
    });

    message += `─────────────────────────\n`;
    message += `💰 *TOTAL COMMANDE : ${totalFcfa.toLocaleString(
      'fr-FR'
    )} FCFA* (~${totalEur.toFixed(2)} €)\n`;

    if (customerNotes.trim()) {
      message += `📝 *Notes/Précisions :* ${customerNotes.trim()}\n`;
    }

    message += `\nMerci BenDjo ! Je souhaite valider cette commande.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/22997000000?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF6F0] shadow-2xl flex flex-col border-l border-[#C89B6B]/30 relative">
          {/* Header */}
          <div className="p-6 bg-white border-b border-[#C89B6B]/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#4B7F52]/10 text-[#4B7F52] flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold font-heading text-[#1F2421]">
                  Votre Panier BenDjo
                </h2>
                <p className="text-xs text-[#C89B6B] font-medium">
                  {cart.length === 0
                    ? 'Panier vide'
                    : `${cart.reduce((s, i) => s + i.quantity, 0)} sachet(s) / boîte(s)`}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              id="close-cart-btn"
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          {cart.length === 0 ? (
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#C89B6B]/15 text-[#C89B6B] flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-[#1F2421] mb-2 font-heading">
                Votre panier est vide
              </h3>
              <p className="text-xs text-gray-600 max-w-xs mb-6">
                Découvrez nos infusions pures (Hibiscus, Basilic, Citronnelle) du terroir béninois et ajoutez-les à votre commande.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-full bg-[#4B7F52] text-white font-bold text-xs hover:bg-[#2D5A36] transition-all"
              >
                Explorer le Catalogue
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Product list */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <div className="p-4 rounded-2xl bg-white border border-[#C89B6B]/20 flex items-center gap-4 shadow-xs">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-900 shrink-0 border border-[#C89B6B]/10">
                      <MediaDisplay
                        src={item.product.image}
                        alt={item.product.name}
                        mediaType={item.product.mediaType}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-[#1F2421] truncate font-heading">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-gray-500 truncate mb-1">
                        {item.product.format}
                      </p>
                      <div className="text-xs font-bold text-[#4B7F52]">
                        {item.product.priceFcfa.toLocaleString('fr-FR')} FCFA{' '}
                        <span className="text-[10px] text-gray-400 font-normal">
                          (~{item.product.priceEur.toFixed(2)} €)
                        </span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-gray-400 hover:text-[#D64545] p-1 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center border border-gray-200 rounded-full bg-gray-50">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="p-1 text-gray-600 hover:text-black"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="p-1 text-gray-600 hover:text-black"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear cart action */}
              <div className="flex justify-end">
                <button
                  onClick={onClearCart}
                  className="text-xs text-gray-500 hover:text-[#D64545] underline"
                >
                  Vider le panier
                </button>
              </div>

              {/* Delivery Details Form */}
              <div className="p-4 rounded-2xl bg-white/80 border border-[#C89B6B]/20 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#4B7F52] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Informations de Livraison</span>
                </h4>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Votre Nom & Prénom (Facultatif)
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="ex. Koffi Aïko"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#4B7F52] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Ville de Livraison
                  </label>
                  <select
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#4B7F52] bg-white"
                  >
                    <option value="Cotonou">Cotonou (Livraison Express)</option>
                    <option value="Abomey-Calavi">Abomey-Calavi</option>
                    <option value="Porto-Novo">Porto-Novo</option>
                    <option value="Ouidah">Ouidah / Parakou / Autre ville du Bénin</option>
                    <option value="International">Expédition Internationale</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Notes ou instructions spéciales
                  </label>
                  <textarea
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    rows={2}
                    placeholder="Quartier, heure de livraison préférée..."
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#4B7F52] bg-white resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Footer Total & WhatsApp Action */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#C89B6B]/20 space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs text-gray-600">
                  <span>Sous-total</span>
                  <span>{totalFcfa.toLocaleString('fr-FR')} FCFA</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-600">
                  <span>Frais de livraison</span>
                  <span className="text-[#4B7F52] font-semibold">
                    Confirmés sur WhatsApp
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100 text-base font-extrabold text-[#1F2421]">
                  <span>Total estimé</span>
                  <div className="text-right">
                    <div className="text-[#4B7F52]">
                      {totalFcfa.toLocaleString('fr-FR')} FCFA
                    </div>
                    <div className="text-[11px] font-normal text-gray-500">
                      (~{totalEur.toFixed(2)} €)
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleWhatsAppOrder}
                id="whatsapp-cart-submit"
                className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Commander via WhatsApp</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500">
                <CheckCircle className="w-3.5 h-3.5 text-[#4B7F52]" />
                <span>Aucun paiement en ligne requis • Validation directe</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
