import React, { useState, useMemo } from 'react';
import {
  Image,
  Search,
  Calendar,
  MapPin,
  Maximize2,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import { GalleryItem, GalleryCategory } from '../types';

interface GalleryPageProps {
  onNavigate: (route: string) => void;
  onOpenImageViewer: (items: GalleryItem[], index: number) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate, onOpenImageViewer }) => {
  const { gallery } = useData();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: Array<{ id: string; label: string; labelEn: string }> = [
    { id: 'All', label: 'সকল ছবি', labelEn: 'All Photos' },
    { id: 'My Photos', label: 'আমার ছবি', labelEn: 'My Photos' },
    { id: 'Memories', label: 'স্মৃতিময় মুহূর্ত', labelEn: 'Memories' },
    { id: 'Nature', label: 'প্রকৃতি ও দৃশ্যপট', labelEn: 'Nature' },
    { id: 'Islamic', label: 'ইসলামিক নন্দনতত্ত্ব', labelEn: 'Islamic' },
    { id: 'Designs', label: 'ডিজাইন ও আর্ট', labelEn: 'Designs' },
    { id: 'Important Moments', label: 'বিশেষ মুহূর্ত', labelEn: 'Important' },
  ];

  const filteredGallery = useMemo(() => {
    return gallery.filter((item) => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.titleBn && item.titleBn.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.location && item.location.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [gallery, selectedCategory, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8 pb-24">
      <Breadcrumbs
        items={[{ label: 'Gallery', labelBn: 'ফটো গ্যালারি' }]}
        onHomeClick={() => onNavigate('home')}
      />

      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
          <Image className="w-3.5 h-3.5" />
          <span>{t('ছবি ও স্মৃতিকথা', 'Visual Memories & Snapshots')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white font-sans">
          {t('ফটো গ্যালারি', 'Photo Gallery')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          {t('প্রকৃতির স্নিগ্ধ রূপ, ইসলামিক স্থাপত্য, কর্মব্যস্ত কোডিং ডেস্ক এবং জীবনের প্রিয় মুহূর্তমালা।', 'Capturing serene nature, mosques, campus events, and calm workspaces.')}
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {t(cat.label, cat.labelEn)}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('ছবি বা স্থান খুঁজুন...', 'Search photos or places...')}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Masonry / Grid Gallery */}
      {filteredGallery.length === 0 ? (
        <EmptyState
          title={t('এখনও কোনো ছবি যোগ করা হয়নি।', 'No photos found.')}
          description={t('সার্চ বা ক্যাটাগরি ফিল্টার পরিবর্তন করে দেখুন।', 'Try searching for other keywords.')}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredGallery.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.04 }}
              onClick={() => onOpenImageViewer(filteredGallery, idx)}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 w-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4 text-white">
                  <span className="text-xs font-medium flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5" />
                    {t('পূর্ণ পর্দায় দেখুন', 'Click to expand')}
                  </span>
                </div>
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-black/60 backdrop-blur-md text-white">
                  {item.category}
                </span>
              </div>

              <div className="p-4 space-y-1.5">
                <h3 className="font-bold text-sm sm:text-base text-stone-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {t(item.titleBn || item.title, item.title)}
                </h3>
                {(item.description || item.descriptionBn) && (
                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                    {t(item.descriptionBn || item.description || '', item.description || item.descriptionBn)}
                  </p>
                )}
                <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                  {item.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      {item.location}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
