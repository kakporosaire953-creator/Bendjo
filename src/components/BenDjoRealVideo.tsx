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
      className={`relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#2D5A36]/30 ${className}`}
    >
      {title && (
        <div className="absolute top-4 left-4 right-4 z-10 bg-black/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <h3 className="font-heading font-extrabold text-lg text-white">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-stone-200 mt-1">
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
        className="w-full h-full object-cover"
        style={{ minHeight: '400px' }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
};
