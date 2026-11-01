import React, { useState } from 'react';
import { IceCream } from 'lucide-react';

interface ProductImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  badgeText?: string;
  badgeVariant?: 'amber' | 'choco' | 'pistachio' | 'light';
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  fallbackSrc,
  alt,
  badgeText,
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasFailedAll, setHasFailedAll] = useState(false);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasFailedAll(true);
    }
  };

  return (
    <div className="product-image mb-4 border border-cream-border/50">
      {!hasFailedAll ? (
        <img
          src={currentSrc}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={handleError}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-cream via-cream-card to-cream-border/40 p-4 text-center">
          <IceCream className="w-8 h-8 text-amber-brand mb-2" />
          <span className="font-headline text-sm font-semibold text-choco">
            {alt}
          </span>
        </div>
      )}
      {badgeText && (
        <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-choco text-[10px] px-2.5 py-0.5 rounded font-bold uppercase tracking-wider shadow-xs">
          {badgeText}
        </span>
      )}
    </div>
  );
};
