import React from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 my-8">
      <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
        {icon || <Sparkles className="w-7 h-7" />}
      </div>
      <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-200 mb-1">
        {title || t('এখনও কোনো তথ্য যোগ করা হয়নি।', 'No content added yet.')}
      </h3>
      <p className="text-sm text-stone-500 dark:text-stone-400 max-w-sm">
        {description || t('শীঘ্রই নতুন তথ্য ও সৃষ্টিশীল কাজ এখানে যুক্ত করা হবে। ইনশাআল্লাহ।', 'New content and creative stories will be added soon. InshaAllah.')}
      </p>
    </div>
  );
};
