import React, { useState } from 'react';
import {
  Sparkles,
  ExternalLink,
  Tag,
  Calendar,
  Layers,
  Wrench
} from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import { CreationCategory } from '../types';

interface CreationsPageProps {
  onNavigate: (route: string) => void;
  onOpenImageViewer: (imageUrl: string, title: string) => void;
}

export const CreationsPage: React.FC<CreationsPageProps> = ({ onNavigate, onOpenImageViewer }) => {
  const { creations } = useData();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: Array<{ id: string; label: string; labelEn: string }> = [
    { id: 'All', label: 'সকল সৃষ্টি', labelEn: 'All Creations' },
    { id: 'Websites', label: 'ওয়েবসাইট', labelEn: 'Websites' },
    { id: 'Web Apps', label: 'ওয়েব অ্যাপস', labelEn: 'Web Apps' },
    { id: 'Graphic Designs', label: 'গ্রাফিক ডিজাইন', labelEn: 'Graphic Designs' },
    { id: 'Posters', label: 'পোস্টার', labelEn: 'Posters' },
    { id: 'Banners', label: 'ব্যানার', labelEn: 'Banners' },
    { id: 'Logos', label: 'লোগো ও ব্র্যান্ডিং', labelEn: 'Logos' },
    { id: 'AI Projects', label: 'এআই প্রজেক্ট', labelEn: 'AI Projects' },
    { id: 'Bots', label: 'বটস', labelEn: 'Bots' },
    { id: 'Other', label: 'অন্যান্য', labelEn: 'Other' },
  ];

  const filteredCreations = selectedCategory === 'All'
    ? creations
    : creations.filter((c) => c.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8 pb-24">
      <Breadcrumbs
        items={[{ label: 'Creations', labelBn: 'আমার সৃষ্টিসমূহ' }]}
        onHomeClick={() => onNavigate('home')}
      />

      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('সৃষ্টিশীল কাজ ও ভিজ্যুয়াল আর্ট', 'Creative Works & Visual Art')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white font-sans">
          {t('আমার সৃষ্টিসমূহ', 'Things I Have Created')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          {t('গ্রাফিক আর্ট, মিনিমালিস্ট পোস্টার, টাইপোগ্রাফি লোগো, সোশ্যাল ব্যানার ও টেলিগ্রাম অটোমেশন বট।', 'Design artworks, banners, logos, posters, bots, and visual identities.')}
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-purple-600 text-white shadow-xs font-semibold'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {t(cat.label, cat.labelEn)}
          </button>
        ))}
      </div>

      {/* Creations Grid */}
      {filteredCreations.length === 0 ? (
        <EmptyState
          title={t('এই বিভাগে এখনও কোনো সৃষ্টি যোগ করা হয়নি।', 'No creations in this category yet.')}
          description={t('শীঘ্রই নতুন ডিজাইন ও ক্রিয়েটিভ প্রজেক্ট যুক্ত হবে।', 'New creative items will be added soon.')}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreations.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Cover */}
                <div
                  onClick={() => onOpenImageViewer(item.coverImage, item.title)}
                  className="cursor-pointer relative h-52 w-full bg-stone-100 dark:bg-stone-800 overflow-hidden group"
                >
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                    {t('বড় আকারে দেখুন 🔍', 'Click to enlarge 🔍')}
                  </div>
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-black/60 backdrop-blur-md text-white">
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-white">
                    {t(item.titleBn || item.title, item.title)}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                    {t(item.descriptionBn || item.description, item.description)}
                  </p>

                  {/* Tools used */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.toolsUsed.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 flex items-center gap-1"
                      >
                        <Wrench className="w-2.5 h-2.5 text-purple-500" />
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                  {item.linkUrl && item.linkUrl !== '#' && (
                    <a
                      href={item.linkUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-purple-600 dark:text-purple-400 font-semibold hover:underline flex items-center gap-1"
                    >
                      {t('লিংক দেখুন', 'Open Link')}
                      <ExternalLink className="w-3 h-3" />
                    </a>
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
