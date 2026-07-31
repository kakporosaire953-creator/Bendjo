import React from 'react';

interface MediaDisplayProps {
  src: string;
  alt: string;
  mediaType?: 'image' | 'video';
  className?: string;
  controls?: boolean;
}

export const MediaDisplay: React.FC<MediaDisplayProps> = ({
  src,
  alt,
  mediaType,
  className = '',
  controls = false,
}) => {
  const isVideo =
    mediaType === 'video' ||
    src.startsWith('data:video/') ||
    /\.(mp4|webm|ogg|mov)$/i.test(src);

  if (isVideo) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        controls={controls}
        className={`object-cover ${className}`}
        title={alt}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover ${className}`}
    />
  );
};
