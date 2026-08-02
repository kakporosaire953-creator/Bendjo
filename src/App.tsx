import React, { useState, useEffect } from 'react';
import { PageView, Product, CartItem } from './types';
import { BENDJO_PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { BrewTimerModal } from './components/BrewTimerModal';
import { B2BCalculatorModal } from './components/B2BCalculatorModal';
import { AdminModal } from './components/AdminModal';
import { AuthenticPhotoGalleryModal } from './components/AuthenticPhotoGallery';
import { WellnessQuizModal } from './components/WellnessQuizModal';
import { BenDjoChatbot } from './components/BenDjoChatbot';

import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ServicesView } from './views/ServicesView';
import { InfusionsView } from './views/InfusionsView';
import { ContactView } from './views/ContactView';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Système d'accès admin sécurisé - Desktop: clavier, Mobile: triple-tap
  useEffect(() => {
    let keySequence = '';
    const secretCode = 'admin2026';
    let tapCount = 0;
    let tapTimer: NodeJS.Timeout;

    // Desktop: détection par clavier
    const handleKeyPress = (e: KeyboardEvent) => {
      keySequence += e.key.toLowerCase();
      if (keySequence.length > secretCode.length) {
        keySequence = keySequence.slice(-secretCode.length);
      }
      if (keySequence === secretCode) {
        setIsAdminModalOpen(true);
        keySequence = '';
      }
    };

    // Mobile: détection par triple-tap en bas à droite
    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      
      // Zone de tap: 20% en bas à droite de l'écran
      const isInBottomRight = 
        touch.clientY > windowHeight * 0.8 && 
        touch.clientX > windowWidth * 0.8;

      if (isInBottomRight) {
        tapCount++;
        clearTimeout(tapTimer);
        
        if (tapCount === 3) {
          setIsAdminModalOpen(true);
          tapCount = 0;
        }
        
        tapTimer = setTimeout(() => {
          tapCount = 0;
        }, 1000);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
      window.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(tapTimer);
    };
  }, []);

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('bendjo_products_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved products', e);
      }
    }
    return BENDJO_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('bendjo_products_v2', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  const [cart, setCart] = useState<CartItem[]>([
    {
      product: BENDJO_PRODUCTS[0],
      quantity: 1,
    },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [isBrewTimerOpen, setIsBrewTimerOpen] = useState(false);
  const [isB2BCalculatorOpen, setIsB2BCalculatorOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [chatbotQuery, setChatbotQuery] = useState<string | undefined>(undefined);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product: Product, quantityToAdd: number = 1) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += quantityToAdd;
        return updated;
      } else {
        return [...prevCart, { product, quantity: quantityToAdd }];
      }
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF6F0] text-[#1F2421] font-sans selection:bg-[#2D5A36] selection:text-white overflow-x-hidden max-w-full">
      {/* Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBrewTimer={() => setIsBrewTimerOpen(true)}
        onOpenB2BCalculator={() => setIsB2BCalculatorOpen(true)}
        onOpenGallery={() => setIsGalleryOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            setCurrentView={setCurrentView}
            products={products}
            onAddToCart={handleAddToCart}
            onOpenProductDetail={setSelectedProductDetail}
            onOpenB2BCalculator={() => setIsB2BCalculatorOpen(true)}
            onOpenBrewTimer={() => setIsBrewTimerOpen(true)}
            onOpenQuiz={() => setIsQuizOpen(true)}
          />
        )}

        {currentView === 'about' && (
          <AboutView setCurrentView={setCurrentView} />
        )}

        {currentView === 'services' && (
          <ServicesView
            setCurrentView={setCurrentView}
            onOpenB2BCalculator={() => setIsB2BCalculatorOpen(true)}
          />
        )}

        {currentView === 'infusions' && (
          <InfusionsView
            products={products}
            onAddToCart={handleAddToCart}
            onOpenProductDetail={setSelectedProductDetail}
            onOpenBrewTimer={() => setIsBrewTimerOpen(true)}
          />
        )}

        {currentView === 'contact' && (
          <ContactView setCurrentView={setCurrentView} />
        )}
      </main>

      {/* Footer */}
      <Footer
        setCurrentView={setCurrentView}
      />

      {/* Cart Slide-over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductDetail}
        onClose={() => setSelectedProductDetail(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Interactive Brew Timer Modal */}
      <BrewTimerModal
        isOpen={isBrewTimerOpen}
        onClose={() => setIsBrewTimerOpen(false)}
      />

      {/* B2B Estimator Calculator Modal */}
      <B2BCalculatorModal
        isOpen={isB2BCalculatorOpen}
        onClose={() => setIsB2BCalculatorOpen(false)}
      />

      {/* Admin Management Modal */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        products={products}
        setProducts={setProducts}
      />

      {/* Authentic Photo Gallery Modal */}
      <AuthenticPhotoGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />

      {/* Wellness Quiz Diagnostic Modal */}
      <WellnessQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddToCart={handleAddToCart}
        onOpenBrewTimer={() => setIsBrewTimerOpen(true)}
        onOpenChatWithQuery={(query) => {
          setChatbotQuery(query);
        }}
      />

      {/* BenDjo AI Chatbot Assistant */}
      <BenDjoChatbot
        onOpenBrewTimer={() => setIsBrewTimerOpen(true)}
        onOpenB2BCalculator={() => setIsB2BCalculatorOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onNavigate={(view) => setCurrentView(view)}
        externalQuery={chatbotQuery}
      />
    </div>
  );
}
