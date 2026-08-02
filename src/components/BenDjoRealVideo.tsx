import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface BenDjoRealVideoProps {
  videoSrc: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const BenDjoRealVideo: React.FC<BenDjoRealVideoProps> = ({
  videoSrc,
  title,
  subtitle,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-[#2D5A36]/30 bg-black ${className}`}
    >
      {title && (
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-10 bg-black/70 backdrop-blur-none rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/20">
          <h3 className="font-heading font-extrabold text-base sm:text-lg text-white leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs sm:text-sm text-stone-200 mt-1 leading-snug">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      <video
        ref={videoRef}
        src={videoSrc}
        loop
        muted
        playsInline
        preload="none"
        controls
        controlsList="nodownload"
        onLoadedData={handleLoadedData}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="w-full h-full object-cover"
        style={{ minHeight: '300px', maxHeight: '600px' }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 pointer-events-none">
          <div className="text-white text-sm">Chargement...</div>
        </div>
      )}

      {/* Boutons personnalisés (optionnels) */}
      <div className="absolute bottom-4 right-4 z-20 flex gap-2">
        <button
          onClick={toggleMute}
          className="w-12 h-12 rounded-full bg-white/90 hover:bg-white text-[#2D5A36] flex items-center justify-center shadow-xl transition-all hover:scale-110"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>
        
        <button
          onClick={togglePlay}
          className="w-14 h-14 rounded-full bg-white/90 hover:bg-white text-[#2D5A36] flex items-center justify-center shadow-xl transition-all hover:scale-110"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 fill-current" />
          ) : (
            <Play className="w-6 h-6 fill-current ml-1" />
          )}
        </button>
      </div>
    </motion.div>
  );
};
