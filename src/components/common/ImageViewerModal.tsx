import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';

export interface LightboxImageItem {
  id?: string;
  imageUrl: string;
  title?: string;
  titleBn?: string;
  description?: string;
  descriptionBn?: string;
  category?: string;
  date?: string;
  location?: string;
}

export interface ImageViewerModalProps {
  items?: LightboxImageItem[];
  images?: LightboxImageItem[];
  currentIndex: number | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (index: number) => void;
  onSelectIndex?: (index: number) => void;
}

export const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  items,
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  onSelectIndex
}) => {
  const { t } = useLanguage();
  const list = items || images || [];
  const handleNav = onNavigate || onSelectIndex || (() => {});

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || currentIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) handleNav(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < list.length - 1) handleNav(currentIndex + 1);
    },
    [isOpen, currentIndex, list.length, onClose, handleNav]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen || currentIndex === null || !list[currentIndex]) return null;

  const currentItem = list[currentIndex];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous Button */}
        {currentIndex > 0 && (
          <button
            onClick={() => handleNav(currentIndex - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all backdrop-blur-xs"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {currentIndex < list.length - 1 && (
          <button
            onClick={() => handleNav(currentIndex + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all backdrop-blur-xs"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Main Image Container */}
        <div className="relative max-w-5xl max-h-[85vh] w-full mx-4 flex flex-col items-center justify-center">
          <motion.img
            key={currentItem.imageUrl}
            src={currentItem.imageUrl}
            alt={currentItem.title || 'Image'}
            referrerPolicy="no-referrer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="max-h-[72vh] max-w-full object-contain rounded-lg shadow-2xl"
          />

          {/* Caption & Metadata */}
          <div className="mt-4 text-center text-white max-w-2xl px-4">
            {currentItem.title && (
              <h4 className="text-lg font-medium text-stone-100 font-sans">
                {t(currentItem.titleBn || currentItem.title, currentItem.title)}
              </h4>
            )}
            {(currentItem.description || currentItem.descriptionBn) && (
              <p className="text-sm text-stone-300 mt-1">
                {t(currentItem.descriptionBn || currentItem.description || '', currentItem.description || currentItem.descriptionBn)}
              </p>
            )}
            <div className="flex items-center justify-center gap-4 text-xs text-stone-400 mt-2">
              {currentItem.date && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {currentItem.date}
                </span>
              )}
              {currentItem.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {currentItem.location}
                </span>
              )}
              {currentItem.category && (
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-stone-300">
                  {currentItem.category}
                </span>
              )}
              <a
                href={currentItem.imageUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {t('আসল ছবি', 'Full Size')}
              </a>
            </div>
            {list.length > 1 && (
              <p className="text-[11px] text-stone-500 mt-2">
                {currentIndex + 1} / {list.length}
              </p>
            )}
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};
