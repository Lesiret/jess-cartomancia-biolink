import React, { useState } from 'react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-rose-50/40 ${wrapperClassName}`}>
      {/* Soft shimmering skeleton placeholder until image is fully rendered */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-rose-50/50 via-rose-100/30 to-rose-50/50 animate-pulse pointer-events-none" />
      )}
      <img
        src={src}
        alt={alt}
        loading={props.loading || 'lazy'}
        decoding={props.decoding || 'async'}
        onLoad={(e) => {
          setIsLoaded(true);
          if (props.onLoad) props.onLoad(e);
        }}
        className={`w-full h-full object-cover object-center transition-opacity duration-300 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
