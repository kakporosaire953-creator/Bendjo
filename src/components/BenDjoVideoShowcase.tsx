import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  Leaf,
  Clock,
  Award,
  CheckCircle2,
  Tv,
  Film,
  RotateCcw,
  Flame,
  Coffee
} from 'lucide-react';
import hibiscusImg from '../assets/images/bendjo_hibiscus_tea_1785483925996.jpg';
import basilicImg from '../assets/images/bendjo_basilic_tea_1785483940225.jpg';
import standImg from '../assets/images/bendjo_stand_event_1785483952441.jpg';
import founderImg from '../assets/images/bendjo_founder_benedite_1785483963462.jpg';

interface Chapter {
  id: number;
  time: number; // in seconds
  title: string;
  subtitle: string;
  image: string;
  accentColor: string;
  badge: string;
  quote: string;
}

const VIDEO_CHAPTERS: Chapter[] = [
  {
    id: 1,
    time: 0,
    title: "1. Récolte & Terroir Béninois",
    subtitle: "Sélection manuelle des calices d'hibiscus & basilic frais à Cotonou",
    image: standImg,
    accentColor: "#D64545", // Rougehibiscus
    badge: "100% Organique",
    quote: "Nos plantes sont cultivées avec passion au cœur des terres fertiles du Bénin."
  },
  {
    id: 2,
    time: 15,
    title: "2. Séchage Artisanal & Sachets Scellés",
    subtitle: "Conservation optimale des arômes dans un packaging éco-conçu",
    image: basilicImg,
    accentColor: "#E895A3", // Rosebasilic
    badge: "Sachets Scellés 1500 FCFA",
    quote: "Chaque sachet préserve la fraîcheur originelle des huiles essentielles."
  },
  {
    id: 3,
    time: 30,
    title: "3. L'Élixir Hibiscus (#D64545) & Basilic (#E895A3)",
    subtitle: "La magie d'une infusion rouge rubis et d'une tisane apaisante",
    image: hibiscusImg,
    accentColor: "#D64545",
    badge: "Antioxydants & Vitamines",
    quote: "Une robe éclatante, un arôme authentique et des vertus revitalisantes uniques."
  },
  {
    id: 4,
    time: 45,
    title: "4. Service Petit-Déjeuner Corporate & B2B",
    subtitle: "Restauration saine et pauses thé équilibrées pour les entreprises",
    image: founderImg,
    accentColor: "#2D5A36",
    badge: "50+ Entreprises Partenaires",
    quote: "BenDjo transforme les réunions de travail en instants de sérénité et de vitalité."
  }
];

export const BenDjoVideoShowcase: React.FC<{ onOpenBrewTimer?: () => void }> = ({ onOpenBrewTimer }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 60; // 60s total duration
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Video progress timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, duration]);

  // Update chapter based on time
  useEffect(() => {
    const chapterIdx = VIDEO_CHAPTERS.findIndex((chap, i) => {
      const nextTime = VIDEO_CHAPTERS[i + 1]?.time || duration + 1;
      return currentTime >= chap.time && currentTime < nextTime;
    });
    if (chapterIdx !== -1) {
      setActiveChapterIndex(chapterIdx);
    }
  }, [currentTime]);

  const activeChapter = VIDEO_CHAPTERS[activeChapterIndex];

  const handleSeek = (seconds: number) => {
    setCurrentTime(seconds);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section className="p-6 sm:p-10 rounded-3xl bg-[#1C261D] text-white border border-[#D64545]/30 shadow-2xl space-y-8 overflow-hidden relative">
      {/* Background Subtle Gradient Glow */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-1000"
        style={{ backgroundColor: activeChapter.accentColor }}
      />

      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 relative z-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-extrabold uppercase tracking-widest text-[#E895A3]">
            <Film className="w-3.5 h-3.5 text-[#D64545]" />
            <span>Galerie Immersion Vidéo BenDjo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Découvrez l'Histoire & la Fabrication de nos Infusions
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsPlaying(!isPlaying);
            }}
            className="px-5 py-2.5 rounded-full bg-[#D64545] hover:bg-[#c33a3a] text-white font-extrabold text-xs shadow-lg transition-all flex items-center gap-2"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isPlaying ? "Mettre en Pause" : "Lancer le Film (60s)"}</span>
          </button>
        </div>
      </div>

      {/* Main Video Screen Container */}
      <div
        ref={containerRef}
        className="relative rounded-2xl overflow-hidden bg-black aspect-video border border-white/20 shadow-2xl group flex flex-col justify-between"
      >
        {/* Active Chapter Visual Background Image with Smooth Fade */}
        <AnimatePresence mode="wait">
          <motion.img
            key={activeChapter.id}
            src={activeChapter.image}
            alt={activeChapter.title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: isPlaying ? 1.08 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10000ms]"
          />
        </AnimatePresence>

        {/* Video Overlay Tint & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 pointer-events-none" />

        {/* Animated Steam Effect Layer when playing */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent pointer-events-none animate-pulse"
          />
        )}

        {/* Top Watermark & Live Badge */}
        <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-heading font-extrabold text-amber-200">
              <Leaf className="w-5 h-5 text-[#E895A3]" />
            </div>
            <div>
              <div className="font-heading font-extrabold text-sm sm:text-base text-white tracking-wide">
                BenDjo — Savoir-Faire Béninois
              </div>
              <div className="text-[10px] text-stone-300 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-ping' : 'bg-stone-400'}`} />
                {isPlaying ? "Lecture vidéo en cours" : "Prêt pour visionnage HD"}
              </div>
            </div>
          </div>

          <span
            className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md text-white border shadow-sm"
            style={{ backgroundColor: `${activeChapter.accentColor}CC`, borderColor: activeChapter.accentColor }}
          >
            {activeChapter.badge}
          </span>
        </div>

        {/* Middle Play Big Button if paused */}
        {!isPlaying && (
          <div className="relative z-10 flex items-center justify-center my-auto">
            <button
              onClick={() => setIsPlaying(true)}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#D64545] hover:scale-110 text-white flex items-center justify-center shadow-2xl transition-all border-4 border-white/30"
              title="Lancer la vidéo"
            >
              <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white translate-x-0.5" />
            </button>
          </div>
        )}

        {/* Chapter Quote Overlay when playing */}
        {isPlaying && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative z-10 px-6 max-w-xl mx-auto text-center my-auto"
          >
            <p className="font-brittany text-3xl sm:text-4xl text-amber-100 font-normal drop-shadow-md">
              "{activeChapter.quote}"
            </p>
          </motion.div>
        )}

        {/* Bottom Controls Bar */}
        <div className="relative z-10 p-4 sm:p-6 space-y-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
          {/* Timeline Progress Bar */}
          <div className="space-y-1">
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                handleSeek(pos * duration);
              }}
              className="h-2 w-full bg-white/20 hover:bg-white/30 rounded-full cursor-pointer relative overflow-hidden transition-all"
            >
              <motion.div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${(currentTime / duration) * 100}%`,
                  backgroundColor: activeChapter.accentColor
                }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-300 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span className="font-sans font-semibold text-white/90">{activeChapter.title}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              <button
                onClick={() => setCurrentTime(0)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Recommencer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title={isMuted ? "Activer le son" : "Désactiver le son"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-stone-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>
            </div>

            <div className="flex items-center gap-3">
              {onOpenBrewTimer && (
                <button
                  onClick={onOpenBrewTimer}
                  className="px-3 py-1.5 rounded-lg bg-[#2D5A36] hover:bg-[#224429] text-white text-[11px] font-extrabold flex items-center gap-1.5 transition-all"
                >
                  <Clock className="w-3.5 h-3.5 text-[#D64545]" />
                  <span>Minuteur 5 min</span>
                </button>
              )}

              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Plein écran"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters Interactive Selector Grid */}
      <div className="space-y-3 relative z-10">
        <div className="text-xs font-extrabold uppercase tracking-widest text-[#E895A3] flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D64545]" />
          <span>Chapitres & Moments Clés</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {VIDEO_CHAPTERS.map((chap, idx) => {
            const isActive = activeChapterIndex === idx;
            return (
              <button
                key={chap.id}
                onClick={() => {
                  setCurrentTime(chap.time);
                  setIsPlaying(true);
                }}
                className={`p-3.5 rounded-2xl text-left border transition-all flex items-start gap-3 ${
                  isActive
                    ? 'bg-white/15 border-white/40 shadow-lg ring-2 ring-amber-300/50'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-extrabold text-white"
                  style={{ backgroundColor: chap.accentColor }}
                >
                  {chap.id}
                </div>

                <div className="space-y-0.5 overflow-hidden">
                  <div className="text-xs font-extrabold text-white truncate">
                    {chap.title}
                  </div>
                  <div className="text-[10px] text-stone-300 line-clamp-1">
                    {chap.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
