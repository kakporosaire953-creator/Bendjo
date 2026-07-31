import React, { useState } from 'react';
import { Product } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  Trash2,
  Lock,
  ShieldCheck,
  Leaf,
  Sparkles,
  Image as ImageIcon,
  CheckCircle,
  RefreshCw,
  Upload,
  Film,
  Video,
  AlertCircle,
  Play
} from 'lucide-react';
import { MediaDisplay } from './MediaDisplay';
import { BENDJO_PRODUCTS } from '../data/products';
import hibiscusImg from '../assets/images/bendjo_hibiscus_tea_1785483925996.jpg';
import basilicImg from '../assets/images/bendjo_basilic_tea_1785483940225.jpg';
import citronnelleImg from '../assets/images/bendjo_citronnelle_tea_1785484352457.jpg';
import laurierImg from '../assets/images/bendjo_laurier_tea_1785484365853.jpg';
import coffretImg from '../assets/images/bendjo_coffret_prestige_1785484392625.jpg';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const PRESET_TEA_IMAGES = [
  { label: 'Infusion Rouge / Hibiscus', url: hibiscusImg, type: 'image' as const },
  { label: 'Infusion Rose / Basilic', url: basilicImg, type: 'image' as const },
  { label: 'Infusion Jaune / Citronnelle', url: citronnelleImg, type: 'image' as const },
  { label: 'Infusion Verte / Laurier', url: laurierImg, type: 'image' as const },
  { label: 'Coffret Cadeau / Prestige', url: coffretImg, type: 'image' as const },
];

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  products,
  setProducts,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinCode, setPinCode] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'add' | 'list'>('add');

  // Form state
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [priceFcfa, setPriceFcfa] = useState<number>(1500);
  const [format, setFormat] = useState('Boîte de 12 sachets individuellement scellés');
  const [category, setCategory] = useState<'citronnelle' | 'basilic' | 'hibiscus' | 'laurier' | 'coffret'>('citronnelle');
  const [image, setImage] = useState(PRESET_TEA_IMAGES[0].url);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [brewingTemp, setBrewingTemp] = useState('90°C');
  const [brewingTime, setBrewingTime] = useState('5 min');
  const [vitaminsInput, setVitaminsInput] = useState('Vitamine C, Antioxydants');
  const [mineralsInput, setMineralsInput] = useState('Calcium, Magnésium');
  const [benefitsInput, setBenefitsInput] = useState('Soutient le bien-être, Vitalité naturelle');
  const [tasteNotes, setTasteNotes] = useState('Douce, parfumée et réconfortante');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCode.trim() === 'BenDjo229') {
      setIsAuthenticated(true);
      setPinError(null);
    } else {
      setPinError('Code de sécurité incorrect. Veuillez saisir BenDjo229.');
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file) return;

    const isVideo = file.type.startsWith('video');
    const isImage = file.type.startsWith('image');

    if (!isVideo && !isImage) {
      setSuccessMessage('Veuillez sélectionner un fichier image (JPG, PNG, WEBP) ou vidéo (MP4, WEBM).');
      setTimeout(() => setSuccessMessage(null), 4000);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setImage(dataUrl);
        setMediaType(isVideo ? 'video' : 'image');
        setSuccessMessage(`Fichier ${isVideo ? 'Vidéo' : 'Image'} "${file.name}" importé avec succès !`);
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleSubmitNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: name.trim(),
      subtitle: subtitle.trim() || 'Tisane artisanale du Bénin',
      description: description.trim() || 'Infusion 100% naturelle récoltée au Bénin.',
      benefits: benefitsInput.split(',').map((b) => b.trim()).filter(Boolean),
      vitamins: vitaminsInput.split(',').map((v) => v.trim()).filter(Boolean),
      minerals: mineralsInput.split(',').map((m) => m.trim()).filter(Boolean),
      format: format.trim() || 'Boîte de 12 sachets',
      priceFcfa: Number(priceFcfa) || 1500,
      priceEur: Math.round(((Number(priceFcfa) || 1500) / 655.957) * 100) / 100,
      category,
      colorAccent: '#D96123',
      badgeColor: 'bg-[#D96123] text-white',
      image: image || PRESET_TEA_IMAGES[0].url,
      mediaType,
      brewingTemp: brewingTemp || '90°C',
      brewingTime: brewingTime || '5 min',
      tasteNotes: tasteNotes || 'Aromatique & naturelle',
      inStock: true,
    };

    setProducts((prev) => [newProduct, ...prev]);
    setSuccessMessage(`Produit "${newProduct.name}" enregistré dans la base de données BenDjo !`);
    setTimeout(() => setSuccessMessage(null), 4000);

    // Reset form fields
    setName('');
    setSubtitle('');
    setDescription('');
    setPriceFcfa(1500);
    setActiveTab('list');
  };

  // Search filter for catalog tab
  const filteredCatalogProducts = products.filter(p =>
    p.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(catalogSearch.toLowerCase()) ||
    p.format.toLowerCase().includes(catalogSearch.toLowerCase())
  );

  const handleDeleteProduct = (productId: string, productName: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setConfirmDeleteId(null);
    setSuccessMessage(`Le produit "${productName}" a été supprimé du catalogue avec succès.`);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  const handleResetDefaultProducts = () => {
    setProducts(BENDJO_PRODUCTS);
    setConfirmReset(false);
    setSuccessMessage('Catalogue réinitialisé avec la sélection d\'origine BenDjo.');
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#D96123]/30 overflow-hidden my-8"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1C261D] via-[#2D5A36] to-[#1C261D] text-white p-6 sm:p-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#D96123] text-white flex items-center justify-center font-bold shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-200 block">
                  Espace Administration BenDjo
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
                  Gestion du Catalogue & Médias (Photos/Vidéos)
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {!isAuthenticated ? (
              <form onSubmit={handleUnlock} className="text-center py-10 max-w-sm mx-auto space-y-5">
                <div className="w-16 h-16 rounded-3xl bg-[#FFF8F0] border-2 border-[#D96123]/30 text-[#D96123] flex items-center justify-center mx-auto shadow-inner">
                  <Lock className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-extrabold font-heading text-[#1F2421]">
                    Accès Sécurisé Administrateur
                  </h4>
                  <p className="text-xs text-stone-600 mt-1">
                    Veuillez entrer le code de sécurité de l'entreprise BenDjo pour accéder au panneau d'importation.
                  </p>
                </div>

                {pinError && (
                  <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold flex items-center justify-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{pinError}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <input
                    type="password"
                    value={pinCode}
                    onChange={(e) => {
                      setPinCode(e.target.value);
                      setPinError(null);
                    }}
                    placeholder="Code de sécurité (ex: BenDjo229)"
                    autoFocus
                    className="w-full px-4 py-3 rounded-2xl border border-stone-300 text-center font-mono font-bold text-base tracking-wider focus:outline-none focus:border-[#D96123] shadow-xs"
                  />

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-[#D96123] hover:bg-[#c8551a] text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Valider & Déverrouiller</span>
                  </button>
                </div>

                <div className="pt-2 text-[11px] text-stone-400">
                  Aide : Le code par défaut de l'entreprise est <strong className="text-stone-700 font-mono">BenDjo229</strong>
                </div>
              </form>
            ) : (
              <>
                {/* Admin Tabs */}
                <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('add')}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all ${
                        activeTab === 'add'
                          ? 'bg-[#D96123] text-white shadow-md'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                      <span>Ajouter Produit & Média</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('list')}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all ${
                        activeTab === 'list'
                          ? 'bg-[#2D5A36] text-white shadow-md'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      <Leaf className="w-4 h-4" />
                      <span>Catalogue ({products.length} Produits)</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setIsAuthenticated(false);
                      setPinCode('');
                    }}
                    className="text-xs text-stone-500 hover:text-stone-800 underline flex items-center gap-1"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Verrouiller</span>
                  </button>
                </div>

                {/* Success message */}
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-[#FFF8F0] border border-[#D96123]/30 text-[#D96123] text-xs font-bold flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5 shrink-0 text-[#D96123]" />
                    <span>{successMessage}</span>
                  </motion.div>
                )}

                {/* TAB 1: ADD PRODUCT & MEDIA */}
                {activeTab === 'add' && (
                  <form onSubmit={handleSubmitNewProduct} className="space-y-5 max-h-[65vh] overflow-y-auto pr-2">
                    {/* Media Upload Area (Gallery Import - Images & Videos) */}
                    <div className="p-5 rounded-3xl bg-[#FAF6F0] border-2 border-dashed border-[#D96123]/40 space-y-3 text-center">
                      <div className="flex items-center justify-between text-left border-b border-stone-200/80 pb-2">
                        <div className="flex items-center gap-2">
                          <Upload className="w-4 h-4 text-[#D96123]" />
                          <span className="text-xs font-extrabold text-[#1F2421]">
                            Importation Médias Galerie (Images & Vidéos)
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-[#D96123] uppercase bg-[#FFF8F0] px-2.5 py-1 rounded-full border border-[#D96123]/20">
                          {mediaType === 'video' ? 'Vidéo Importée' : 'Image Importée'}
                        </span>
                      </div>

                      {/* Drop Zone / Preview */}
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragOver(true);
                        }}
                        onDragLeave={() => setIsDragOver(false)}
                        onDrop={handleDrop}
                        className={`relative rounded-2xl overflow-hidden border transition-all ${
                          isDragOver ? 'border-[#D96123] bg-[#FFF8F0]' : 'border-stone-200 bg-white'
                        }`}
                      >
                        {image ? (
                          <div className="relative h-48 sm:h-56 bg-stone-900 group">
                            <MediaDisplay
                              src={image}
                              alt={name || 'Aperçu du produit'}
                              mediaType={mediaType}
                              controls={true}
                              className="w-full h-full"
                            />
                            <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                              <label
                                htmlFor="gallery-file-input"
                                className="px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-stone-800 text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                              >
                                {mediaType === 'video' ? <Film className="w-3.5 h-3.5 text-[#D96123]" /> : <ImageIcon className="w-3.5 h-3.5 text-[#D96123]" />}
                                <span>Changer le fichier</span>
                              </label>
                            </div>
                          </div>
                        ) : (
                          <div className="p-8 text-center space-y-2">
                            <div className="w-12 h-12 rounded-2xl bg-[#FFF8F0] text-[#D96123] flex items-center justify-center mx-auto">
                              <Upload className="w-6 h-6" />
                            </div>
                            <p className="text-xs font-bold text-stone-700">
                              Glissez-déposez ici votre image ou vidéo depuis votre galerie
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                        <label
                          htmlFor="gallery-file-input"
                          className="px-5 py-2.5 rounded-2xl bg-[#D96123] hover:bg-[#c8551a] text-white text-xs font-extrabold shadow-sm cursor-pointer flex items-center gap-2 transition-all"
                        >
                          <Upload className="w-4 h-4" />
                          <span>Parcourir la Galerie Téléphone/PC</span>
                        </label>
                        <input
                          id="gallery-file-input"
                          type="file"
                          accept="image/*,video/*"
                          onChange={handleFileInputChange}
                          className="hidden"
                        />
                        <span className="text-[11px] text-stone-500 font-semibold">
                          Formats acceptés: JPG, PNG, WEBP, MP4, WEBM, MOV
                        </span>
                      </div>

                      {/* Presets alternative */}
                      <div className="pt-2 text-left">
                        <span className="text-[11px] font-bold text-stone-600 block mb-1.5">
                          Ou choisir une image de démonstration :
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                          {PRESET_TEA_IMAGES.map((preset, idx) => (
                            <button
                              type="button"
                              key={idx}
                              onClick={() => {
                                setImage(preset.url);
                                setMediaType('image');
                              }}
                              className={`p-1.5 rounded-xl border text-[10px] text-center flex flex-col items-center gap-1 transition-all ${
                                image === preset.url
                                  ? 'border-[#D96123] bg-[#FFF8F0] ring-2 ring-[#D96123]/30 font-bold'
                                  : 'border-stone-200 hover:border-stone-400 bg-white'
                              }`}
                            >
                              <img src={preset.url} alt={preset.label} className="w-full h-10 object-cover rounded-lg" />
                              <span className="line-clamp-1">{preset.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Product Metadata Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Nom du Produit / Tisane <span className="text-[#D96123]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="ex. Infusion Gingembre & Citronnelle"
                          className="w-full px-3.5 py-2.5 rounded-2xl border border-stone-300 text-xs focus:outline-none focus:border-[#D96123]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Sous-titre / Accroche
                        </label>
                        <input
                          type="text"
                          value={subtitle}
                          onChange={(e) => setSubtitle(e.target.value)}
                          placeholder="ex. La fraîcheur tonique du terroir béninois"
                          className="w-full px-3.5 py-2.5 rounded-2xl border border-stone-300 text-xs focus:outline-none focus:border-[#D96123]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Prix en FCFA <span className="text-[#D96123]">*</span>
                        </label>
                        <input
                          type="number"
                          required
                          value={priceFcfa}
                          onChange={(e) => setPriceFcfa(Number(e.target.value))}
                          placeholder="1500"
                          className="w-full px-3.5 py-2.5 rounded-2xl border border-stone-300 text-xs font-bold text-[#D96123] focus:outline-none focus:border-[#D96123]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Format & Conditionnement
                        </label>
                        <input
                          type="text"
                          value={format}
                          onChange={(e) => setFormat(e.target.value)}
                          placeholder="Boîte de 12 sachets individuels"
                          className="w-full px-3.5 py-2.5 rounded-2xl border border-stone-300 text-xs focus:outline-none focus:border-[#D96123]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Catégorie
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value as any)}
                          className="w-full px-3.5 py-2.5 rounded-2xl border border-stone-300 text-xs focus:outline-none focus:border-[#D96123] bg-white font-semibold text-stone-800"
                        >
                          <option value="citronnelle">Citronnelle & Épices</option>
                          <option value="basilic">Basilic</option>
                          <option value="hibiscus">Hibiscus (Bissap)</option>
                          <option value="laurier">Feuilles de Laurier</option>
                          <option value="coffret">Coffret Assortiment</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Description complète
                      </label>
                      <textarea
                        rows={2}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Décrivez les arômes, les saveurs et les bienfaits de cette recette BenDjo..."
                        className="w-full px-3.5 py-2 rounded-2xl border border-stone-300 text-xs focus:outline-none focus:border-[#D96123] resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Vitamines (séparées par des virgules)
                        </label>
                        <input
                          type="text"
                          value={vitaminsInput}
                          onChange={(e) => setVitaminsInput(e.target.value)}
                          placeholder="Vitamine C, Antioxydants"
                          className="w-full px-3.5 py-2.5 rounded-2xl border border-stone-300 text-xs focus:outline-none focus:border-[#D96123]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Minéraux & Éléments
                        </label>
                        <input
                          type="text"
                          value={mineralsInput}
                          onChange={(e) => setMineralsInput(e.target.value)}
                          placeholder="Calcium, Magnésium, Potassium"
                          className="w-full px-3.5 py-2.5 rounded-2xl border border-stone-300 text-xs focus:outline-none focus:border-[#D96123]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Température d'infusion
                        </label>
                        <input
                          type="text"
                          value={brewingTemp}
                          onChange={(e) => setBrewingTemp(e.target.value)}
                          placeholder="90°C"
                          className="w-full px-3.5 py-2.5 rounded-2xl border border-stone-300 text-xs focus:outline-none focus:border-[#D96123]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Temps d'infusion
                        </label>
                        <input
                          type="text"
                          value={brewingTime}
                          onChange={(e) => setBrewingTime(e.target.value)}
                          placeholder="5 min"
                          className="w-full px-3.5 py-2.5 rounded-2xl border border-stone-300 text-xs focus:outline-none focus:border-[#D96123]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Notes de Dégustation
                        </label>
                        <input
                          type="text"
                          value={tasteNotes}
                          onChange={(e) => setTasteNotes(e.target.value)}
                          placeholder="Herbacée, fraîche, parfumée"
                          className="w-full px-3.5 py-2.5 rounded-2xl border border-stone-300 text-xs focus:outline-none focus:border-[#D96123]"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-200">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-2xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-100"
                      >
                        Annuler
                      </button>

                      <button
                        type="submit"
                        className="px-7 py-3 rounded-2xl bg-[#D96123] hover:bg-[#c8551a] text-white font-extrabold text-xs shadow-md flex items-center gap-2 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Enregistrer le Produit dans la Base</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* TAB 2: CATALOG LIST */}
                {activeTab === 'list' && (
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-50 p-3 rounded-2xl border border-stone-200">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={catalogSearch}
                          onChange={(e) => setCatalogSearch(e.target.value)}
                          placeholder="Rechercher un produit à supprimer ou modifier..."
                          className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#D96123]"
                        />
                        <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs"></i>
                      </div>

                      {confirmReset ? (
                        <div className="flex items-center gap-2 bg-amber-50 p-2 rounded-xl border border-amber-300 text-xs shrink-0">
                          <span className="font-bold text-amber-900 text-[11px]">Réinitialiser tout ?</span>
                          <button
                            type="button"
                            onClick={handleResetDefaultProducts}
                            className="px-2.5 py-1 rounded-lg bg-amber-600 text-white font-extrabold text-[11px] hover:bg-amber-700"
                          >
                            Oui
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmReset(false)}
                            className="px-2.5 py-1 rounded-lg bg-stone-200 text-stone-700 font-bold text-[11px] hover:bg-stone-300"
                          >
                            Annuler
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmReset(true)}
                          title="Réinitialiser les produits par défaut"
                          className="px-3 py-2 rounded-xl bg-amber-100/80 hover:bg-amber-200 text-amber-900 text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 transition-colors"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Réinitialiser</span>
                        </button>
                      )}
                    </div>

                    <p className="text-xs text-stone-600 flex items-center justify-between">
                      <span>Gestion en temps réel du catalogue ({filteredCatalogProducts.length} produits affichés).</span>
                      <span className="text-[10px] text-[#D96123] font-bold">Cliquez sur Supprimer pour retirer un produit du site.</span>
                    </p>

                    {filteredCatalogProducts.length === 0 ? (
                      <div className="p-8 text-center bg-stone-50 rounded-2xl border border-dashed border-stone-300 space-y-2">
                        <i className="fa-solid fa-box-open text-2xl text-stone-400"></i>
                        <p className="text-xs text-stone-600 font-bold">Aucun produit ne correspond à votre recherche.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {filteredCatalogProducts.map((prod) => (
                          <div
                            key={prod.id}
                            className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#D96123]/40 transition-colors shadow-2xs"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-900 shrink-0 border border-stone-200">
                                <MediaDisplay
                                  src={prod.image}
                                  alt={prod.name}
                                  mediaType={prod.mediaType}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-heading font-extrabold text-sm text-[#1F2421] truncate">
                                    {prod.name}
                                  </span>
                                  {prod.mediaType === 'video' && (
                                    <span className="px-2 py-0.5 rounded-full bg-[#D96123] text-white text-[9px] font-extrabold flex items-center gap-1 shrink-0">
                                      <Video className="w-2.5 h-2.5" /> Vidéo
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-stone-500 mt-0.5 truncate">
                                  {prod.format} • <strong className="text-[#D96123] font-extrabold">{prod.priceFcfa} FCFA</strong>
                                </div>
                              </div>
                            </div>

                            {confirmDeleteId === prod.id ? (
                              <div className="flex items-center gap-2 p-2 bg-red-50 rounded-xl border border-red-200 text-xs shrink-0 self-end sm:self-center">
                                <span className="font-extrabold text-red-700 text-xs">Supprimer ?</span>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteProduct(prod.id, prod.name)}
                                  className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-xs"
                                >
                                  Oui, Supprimer
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteId(null)}
                                  className="px-2.5 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold text-xs"
                                >
                                  Annuler
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteId(prod.id)}
                                className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-all flex items-center gap-1.5 text-xs font-extrabold shadow-sm hover:shadow-md shrink-0 self-end sm:self-center"
                                title="Supprimer ce produit"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span>Supprimer</span>
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
