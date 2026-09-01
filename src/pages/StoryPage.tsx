import React, { useState } from 'react';
import {
  Compass,
  Calendar,
  MapPin,
  Sparkles,
  Tag,
  Filter
} from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import { StoryCategory } from '../types';

interface StoryPageProps {
  onNavigate: (route: string) => void;
  onOpenImageViewer: (imageUrl: string, title: string) => void;
}

export const StoryPage: React.FC<StoryPageProps> = ({ onNavigate, onOpenImageViewer }) => {
  const { lifeStory } = useData();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: Array<{ id: string; label: string; labelEn: string }> = [
    { id: 'All', label: 'সব স্মৃতি', labelEn: 'All Memories' },
    { id: 'Childhood', label: 'শৈশব', labelEn: 'Childhood' },
    { id: 'School', label: 'স্কুল জীবন', labelEn: 'School' },
    { id: 'SSC', label: 'এসএসসি', labelEn: 'SSC' },
    { id: 'College', label: 'কলেজ জীবন', labelEn: 'College' },
    { id: 'University', label: 'বিশ্ববিদ্যালয়', labelEn: 'University' },
    { id: 'Milestone', label: 'মাইলফলক', labelEn: 'Milestones' },
  ];

  const filteredStories = selectedCategory === 'All'
    ? lifeStory
    : lifeStory.filter((s) => s.category === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8 pb-24">
      <Breadcrumbs
        items={[{ label: 'My Story', labelBn: 'আমার গল্প' }]}
        onHomeClick={() => onNavigate('home')}
      />

      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
          <Compass className="w-3.5 h-3.5" />
          <span>{t('জীবন পরিক্রমা ও স্মৃতিমালা', 'Chronological Life Journey')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white font-sans">
          {t('আমার পথচলার গল্প', 'Chapters of My Life Story')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          {t('যে স্মৃতিগুলো আমাকে আজকের মানুষ হিসেবে গড়ে তুলেছে—শৈশবের সবুজ গ্রাম থেকে প্রযুক্তির বিস্তৃত আঙিনা।', 'The moments, struggles, and milestones that shaped my journey and values.')}
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-amber-600 text-white shadow-xs font-semibold'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {t(cat.label, cat.labelEn)}
          </button>
        ))}
      </div>

      {/* Vertical Timeline */}
      {filteredStories.length === 0 ? (
        <EmptyState
          title={t('এই ক্যাটাগরিতে এখনও কোনো স্মৃতি যোগ করা হয়নি।', 'No memories in this category yet.')}
          description={t('অ্যাডমিন প্যানেল থেকে নতুন স্মৃতি যুক্ত করা যাবে।', 'Add new story chapters from the Admin Panel.')}
        />
      ) : (
        <div className="relative pl-6 sm:pl-8 border-l-2 border-amber-300 dark:border-amber-900/60 ml-4 sm:ml-8 space-y-10 my-8">
          {filteredStories.map((story, idx) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="relative group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-white dark:bg-stone-900 border-4 border-amber-500 shadow-sm group-hover:scale-125 transition-transform" />

              {/* Card Body */}
              <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 sm:p-7 shadow-xs hover:shadow-md transition-all space-y-4">
                
                {/* Year & Category Header */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                    <Calendar className="w-3.5 h-3.5" />
                    {story.yearOrDate}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                    {story.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white font-sans">
                  {t(story.titleBn || story.title, story.title)}
                </h3>

                {/* Story Image if available */}
                {story.imageUrl && (
                  <div
                    onClick={() => onOpenImageViewer(story.imageUrl!, story.title)}
                    className="cursor-pointer overflow-hidden rounded-xl max-h-80 bg-stone-100 dark:bg-stone-800 relative group/img"
                  >
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                      {t('বড় আকারে দেখুন 🔍', 'Click to enlarge 🔍')}
                    </div>
                  </div>
                )}

                {/* Description */}
                <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                  {t(story.descriptionBn || story.description, story.description)}
                </p>

                {/* Location Footer */}
                {story.location && (
                  <div className="pt-3 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>{story.location}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
