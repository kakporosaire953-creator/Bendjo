import React from 'react';
import { motion } from 'framer-motion';

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
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
        style={{ minHeight: '300px', maxHeight: '600px' }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
};
