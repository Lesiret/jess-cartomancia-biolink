import React, { useState } from 'react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80';

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  fallbackSrc = DEFAULT_FALLBACK,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Sync if src prop changes
  React.useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-rose-50/40 ${wrapperClassName}`}>
      {/* Soft shimmering skeleton placeholder until image is fully rendered */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-rose-50/50 via-rose-100/30 to-rose-50/50 animate-pulse pointer-events-none" />
      )}
      <img
        src={currentSrc}
        alt={alt}
        loading={props.loading || 'lazy'}
        decoding={props.decoding || 'async'}
        onLoad={(e) => {
          setIsLoaded(true);
          if (props.onLoad) props.onLoad(e);
        }}
        onError={(e) => {
          if (!hasError && currentSrc !== fallbackSrc) {
            setHasError(true);
            setCurrentSrc(fallbackSrc);
          }
          if (props.onError) props.onError(e);
        }}
        className={`w-full h-full object-cover object-center transition-opacity duration-300 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};

