import React, { useState } from 'react';
import {
  Heart,
  Book,
  Music,
  Moon,
  Laptop,
  Palette,
  MapPin,
  Quote,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import { FavoriteItem, FavoriteCategory } from '../types';

interface FavoritesPageProps {
  onNavigate: (route: string) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ onNavigate }) => {
  const { favorites } = useData();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: Array<{ id: string; label: string; labelEn: string; icon: any }> = [
    { id: 'All', label: 'সব প্রিয় বিষয়', labelEn: 'All Favorites', icon: Sparkles },
    { id: 'Books', label: 'বইসমূহ', labelEn: 'Books', icon: Book },
    { id: 'Islamic content', label: 'ইসলামিক কনটেন্ট', labelEn: 'Islamic', icon: Moon },
    { id: 'Nasheeds / Audio', label: 'নাসিদ ও অডিও', labelEn: 'Nasheeds', icon: Music },
    { id: 'Technology', label: 'প্রযুক্তি ও টুলস', labelEn: 'Tech & Tools', icon: Laptop },
    { id: 'Designs', label: 'ডিজাইন প্রেরণা', labelEn: 'Design', icon: Palette },
    { id: 'Quotes', label: 'স্মরণীয় বাণী', labelEn: 'Quotes', icon: Quote },
    { id: 'Places', label: 'প্রিয় স্থান', labelEn: 'Places', icon: MapPin },
  ];

  const filtered = selectedCategory === 'All'
    ? favorites
    : favorites.filter((f) => f.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8 pb-24">
      <Breadcrumbs
        items={[{ label: 'Favorites', labelBn: 'পছন্দের বিষয়সমূহ' }]}
        onHomeClick={() => onNavigate('home')}
      />

      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>{t('অনুপ্রেরণা ও ভালোবাসা', 'Things That Inspire Me')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white font-sans">
          {t('আমার প্রিয় কিছু সৃষ্টি ও ভাবনা', 'My Favorite Inspirations')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          {t('বই, অর্থপূর্ণ নাসিদ, দ্বীনি বক্তব্য, প্রযুক্তি টুলস এবং আমার চিন্তাকে সমৃদ্ধ করা উক্তিগুলোর সংকলন।', 'Curated books, profound nasheeds, insightful Islamic lectures, and thoughts.')}
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-rose-600 text-white shadow-xs font-semibold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t(cat.label, cat.labelEn)}</span>
            </button>
          );
        })}
      </div>

      {/* Favorites List */}
      {filtered.length === 0 ? (
        <EmptyState
          title={t('এই ক্যাটাগরিতে এখনও কোনো আইটেম নেই।', 'No favorite items found.')}
          description={t('অ্যাডমিন প্যানেল থেকে পছন্দের বিষয় যুক্ত করুন।', 'Add favorite items from the Admin Panel.')}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60">
                    {item.category}
                  </span>
                  {item.authorOrArtist && (
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                      {item.authorOrArtist}
                    </span>
                  )}
                </div>

                {item.image && (
                  <div className="w-full h-40 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-white">
                  {t(item.titleBn || item.title, item.title)}
                </h3>

                {item.category === 'Quotes' && (item.quote || item.quoteBn) ? (
                  <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border-l-3 border-rose-500 italic text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                    "{t(item.quoteBn || item.quote || '', item.quote || item.quoteBn)}"
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    {t(item.descriptionBn || item.description || '', item.description || item.descriptionBn)}
                  </p>
                )}
              </div>

              {item.externalLink && (
                <div className="pt-3 border-t border-stone-100 dark:border-stone-800">
                  <a
                    href={item.externalLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
                  >
                    <span>{t('বিস্তারিত লিঙ্ক দেখুন', 'Visit Link')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
