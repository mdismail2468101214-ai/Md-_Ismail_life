import React from 'react';
import { X, Calendar, Tag, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VideoItem } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface VideoModalProps {
  video: VideoItem | null;
  isOpen: boolean;
  onClose: () => void;
}

// Convert standard YouTube links to embed format
function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
  }
  return null;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, isOpen, onClose }) => {
  const { t } = useLanguage();

  if (!isOpen || !video) return null;

  const embedUrl = getYouTubeEmbedUrl(video.videoUrl);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 max-w-4xl w-full rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl overflow-hidden"
        >
          <div className="relative aspect-video w-full bg-black">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={video.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={video.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            )}

            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
              aria-label="Close Video Player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 bg-stone-900 text-stone-100">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {video.category}
              </span>
              <div className="flex items-center gap-3 text-xs text-stone-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {video.date}
                </span>
                {video.duration && <span>• {video.duration}</span>}
              </div>
            </div>

            <h3 className="text-xl font-bold font-sans text-stone-100 mb-2">
              {t(video.titleBn || video.title, video.title)}
            </h3>

            {(video.description || video.descriptionBn) && (
              <p className="text-sm text-stone-300 leading-relaxed">
                {t(video.descriptionBn || video.description || '', video.description || video.descriptionBn)}
              </p>
            )}

            <div className="mt-4 pt-4 border-t border-stone-800 flex justify-end">
              <a
                href={video.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {t('ইউটিউব / মূল লিংকে দেখুন', 'Watch on Platform')}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
