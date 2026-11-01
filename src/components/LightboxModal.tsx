import React from 'react';
import { X } from 'lucide-react';
import { GalleryItem } from '../data/menuData';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  onClose,
}) => {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-choco/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={item.caption}
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close enlarged view"
          onClick={onClose}
          className="absolute -top-11 right-0 text-white hover:text-amber-brand transition-colors p-1"
        >
          <X className="w-7 h-7" />
        </button>
        <img
          src={item.image}
          alt={item.caption}
          referrerPolicy="no-referrer"
          className="max-w-full max-h-[78vh] rounded-2xl object-contain shadow-2xl border-2 border-white/20 bg-choco"
        />
        <p className="text-white text-sm font-semibold mt-3 text-center">
          {item.caption}
        </p>
      </div>
    </div>
  );
};
