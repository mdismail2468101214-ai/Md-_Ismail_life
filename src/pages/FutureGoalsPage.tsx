import React, { useState } from 'react';
import {
  Target,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import { FutureGoal, GoalCategory } from '../types';

interface FutureGoalsPageProps {
  onNavigate: (route: string) => void;
}

export const FutureGoalsPage: React.FC<FutureGoalsPageProps> = ({ onNavigate }) => {
  const { futureGoals } = useData();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: Array<{ id: string; label: string; labelEn: string }> = [
    { id: 'All', label: 'সকল লক্ষ্য', labelEn: 'All Goals' },
    { id: 'Islamic / Spiritual', label: 'ইসলামিক ও আত্মিক', labelEn: 'Islamic' },
    { id: 'Career / Tech', label: 'ক্যারিয়ার ও প্রযুক্তি', labelEn: 'Career & Tech' },
    { id: 'Education / Research', label: 'শিক্ষা ও গবেষণা', labelEn: 'Research' },
    { id: 'Creative / Writing', label: 'লেখালেখি ও সৃষ্টিশীল', labelEn: 'Creative' },
    { id: 'Personal / Family', label: 'ব্যক্তিগত ও পরিবার', labelEn: 'Personal' },
  ];

  const filtered = selectedCategory === 'All'
    ? futureGoals
    : futureGoals.filter((g) => g.category === selectedCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8 pb-24">
      <Breadcrumbs
        items={[{ label: 'Future Goals', labelBn: 'ভবিষ্যৎ লক্ষ্য ও রোডম্যাপ' }]}
        onHomeClick={() => onNavigate('home')}
      />

      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
          <Target className="w-3.5 h-3.5" />
          <span>{t('দূরদৃষ্টি ও পরিকল্পনা', 'Vision & Milestones')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white font-sans">
          {t('আমার ভবিষ্যৎ লক্ষ্যসমূহ', 'Future Aspirations & Roadmap')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          {t('আল্লাহর সন্তুষ্টি অর্জন, দ্বীনি জ্ঞানার্জন, আন্তর্জাতিক প্ল্যাটফর্মে অবদান এবং সমৃদ্ধ সমাজ গঠনে আমার পরিকল্পনা।', 'Intentional milestones across spiritual growth, engineering leadership, and community service.')}
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
                ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {t(cat.label, cat.labelEn)}
          </button>
        ))}
      </div>

      {/* Goals Cards */}
      {filtered.length === 0 ? (
        <EmptyState
          title={t('এই ক্যাটাগরিতে এখনও কোনো লক্ষ্য যোগ করা হয়নি।', 'No goals found.')}
          description={t('অ্যাডমিন প্যানেল থেকে ভবিষ্যৎ লক্ষ্য যুক্ত করতে পারেন।', 'Add new goals from the Admin Panel.')}
        />
      ) : (
        <div className="space-y-6">
          {filtered.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                    {item.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                    {item.status}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  <span>{t('কাঙ্ক্ষিত সময়:', 'Target:')} {item.targetDate}</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">
                  {t(item.titleBn || item.title, item.title)}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1.5 leading-relaxed">
                  {t(item.descriptionBn || item.description, item.description)}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    {t('অগ্রগতি সূচক', 'Progress status')}
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {item.progressPercentage}%
                  </span>
                </div>
                <div className="h-2.5 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-700"
                    style={{ width: `${item.progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Action items checklist if present */}
              {item.actionSteps && item.actionSteps.length > 0 && (
                <div className="pt-3 border-t border-stone-100 dark:border-stone-800">
                  <h4 className="text-xs font-semibold text-stone-500 dark:text-stone-400 mb-2">
                    {t('করণীয় পদক্ষেপসমূহ:', 'Key Action Milestones:')}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.actionSteps.map((step, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center gap-2 text-xs text-stone-700 dark:text-stone-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
