import React from 'react';
import {
  GraduationCap,
  Calendar,
  Award,
  BookOpen,
  FileCheck,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';

interface EducationPageProps {
  onNavigate: (route: string) => void;
  onOpenImageViewer: (imageUrl: string, title: string) => void;
}

export const EducationPage: React.FC<EducationPageProps> = ({ onNavigate, onOpenImageViewer }) => {
  const { education } = useData();
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8 pb-24">
      <Breadcrumbs
        items={[{ label: 'Education', labelBn: 'শিক্ষাজীবন' }]}
        onHomeClick={() => onNavigate('home')}
      />

      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>{t('একাডেমিক পথচলা ও অর্জন', 'Academic Journey')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white font-sans">
          {t('আমার শিক্ষাজীবন', 'Education & Qualifications')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          {t('প্রাথমিক স্কুল, মাধ্যমিক, উচ্চ মাধ্যমিক থেকে বিশ্ববিদ্যালয়ের প্রকৌশল বিদ্যা পর্যন্ত অর্জিত ফলাফল ও জ্ঞান।', 'Schools, colleges, university degree, results, and specialized academic pursuits.')}
        </p>
      </div>

      {education.length === 0 ? (
        <EmptyState
          title={t('এখনও কোনো শিক্ষাগত যোগ্যতা যোগ করা হয়নি।', 'No education records added yet.')}
          description={t('অ্যাডমিন প্যানেল থেকে শিক্ষাগত তথ্য যুক্ত করুন।', 'Add education records from the Admin Panel.')}
        />
      ) : (
        <div className="space-y-6">
          {education.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
                      <GraduationCap className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">
                        {t(item.levelBn || item.level, item.level)}
                      </h3>
                      <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        {t(item.institutionBn || item.institution, item.institution)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    {item.startYear} - {item.endYear}
                  </span>
                  <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    🏆 {item.result}
                  </span>
                </div>
              </div>

              {/* Group / Subject */}
              <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400 pt-1">
                <BookOpen className="w-4 h-4 text-stone-400 shrink-0" />
                <span className="font-medium">{t('বিভাগ / বিষয়:', 'Major / Group:')}</span>
                <span>{t(item.groupOrSubjectBn || item.groupOrSubject, item.groupOrSubject)}</span>
              </div>

              {/* Description */}
              {(item.description || item.descriptionBn) && (
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed pt-2 border-t border-stone-100 dark:border-stone-800">
                  {t(item.descriptionBn || item.description || '', item.description || item.descriptionBn)}
                </p>
              )}

              {/* Certificate image link */}
              {item.certificateUrl && (
                <div className="pt-2">
                  <button
                    onClick={() => onOpenImageViewer(item.certificateUrl!, `${item.level} Certificate`)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>{t('সনদপত্র বা মার্কশিট দেখুন ↗', 'View Certificate / Transcript ↗')}</span>
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
