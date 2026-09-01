import React, { useState } from 'react';
import {
  Trophy,
  Award,
  Calendar,
  Building,
  FileCheck,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import { Achievement, AchievementCategory } from '../types';

interface AchievementsPageProps {
  onNavigate: (route: string) => void;
  onOpenImageViewer: (imageUrl: string, title: string) => void;
}

export const AchievementsPage: React.FC<AchievementsPageProps> = ({
  onNavigate,
  onOpenImageViewer
}) => {
  const { achievements } = useData();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: Array<{ id: string; label: string; labelEn: string }> = [
    { id: 'All', label: 'সকল অর্জন', labelEn: 'All Achievements' },
    { id: 'Academic', label: 'একাডেমিক স্বীকৃতি', labelEn: 'Academic' },
    { id: 'Competition', label: 'প্রতিযোগিতা ও প্রাইজ', labelEn: 'Competition' },
    { id: 'Certification', label: 'প্রফেশনাল সার্টিফিকেট', labelEn: 'Certification' },
    { id: 'Honor', label: 'সম্মাননা', labelEn: 'Honor' },
  ];

  const filtered = selectedCategory === 'All'
    ? achievements
    : achievements.filter((a) => a.category === selectedCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8 pb-24">
      <Breadcrumbs
        items={[{ label: 'Achievements', labelBn: 'অর্জন ও সনদপত্র' }]}
        onHomeClick={() => onNavigate('home')}
      />

      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
          <Trophy className="w-3.5 h-3.5" />
          <span>{t('স্বীকৃতি ও সম্মাননা', 'Honors & Recognition')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white font-sans">
          {t('আমার অর্জন ও সনদপত্র', 'Honors & Certifications')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          {t('একাডেমিক মেধা বৃত্তি, প্রোগ্রামিং ও কুইজ প্রতিযোগিতায় অর্জন এবং প্রফেশনাল কোর্স সনদসমূহ।', 'Scholarships, competition wins, hackathon participations, and verified credentials.')}
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
                ? 'bg-amber-600 text-white shadow-xs font-semibold'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {t(cat.label, cat.labelEn)}
          </button>
        ))}
      </div>

      {/* Achievements Cards */}
      {filtered.length === 0 ? (
        <EmptyState
          title={t('এই ক্যাটাগরিতে এখনও কোনো অর্জন যোগ করা হয়নি।', 'No achievements found in this category.')}
          description={t('অ্যাডমিন প্যানেল থেকে নতুন অর্জন যুক্ত করুন।', 'Add achievements from the Admin Panel.')}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filtered.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                    <Trophy className="w-5 h-5" />
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                    {item.category}
                  </span>
                </div>

                <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-white">
                  {t(item.titleBn || item.title, item.title)}
                </h3>

                <div className="flex flex-col gap-1 text-xs text-stone-500 dark:text-stone-400">
                  <span className="flex items-center gap-1 font-medium text-stone-700 dark:text-stone-300">
                    <Building className="w-3.5 h-3.5 text-stone-400" />
                    {t(item.organizationBn || item.organization, item.organization)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    {item.date}
                  </span>
                </div>

                {(item.description || item.descriptionBn) && (
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed pt-1">
                    {t(item.descriptionBn || item.description || '', item.description || item.descriptionBn)}
                  </p>
                )}
              </div>

              {/* Certificate image trigger */}
              {item.certificateImage && (
                <div className="pt-3 border-t border-stone-100 dark:border-stone-800">
                  <button
                    onClick={() => onOpenImageViewer(item.certificateImage!, item.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>{t('সনদপত্রটি পূর্ণ স্ক্রিনে দেখুন ↗', 'View Certificate ↗')}</span>
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
