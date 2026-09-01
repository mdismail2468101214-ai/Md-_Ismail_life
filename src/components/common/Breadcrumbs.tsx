import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface BreadcrumbsProps {
  items: Array<{
    label: string;
    labelBn?: string;
    onClick?: () => void;
  }>;
  onHomeClick: () => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onHomeClick }) => {
  const { t } = useLanguage();

  return (
    <nav className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 py-3 mb-4 overflow-x-auto whitespace-nowrap">
      <button
        onClick={onHomeClick}
        className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>{t('হোম', 'Home')}</span>
      </button>

      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 dark:text-stone-600 shrink-0" />
          {item.onClick ? (
            <button
              onClick={item.onClick}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
            >
              {t(item.labelBn || item.label, item.label)}
            </button>
          ) : (
            <span className="text-stone-800 dark:text-stone-200 font-medium">
              {t(item.labelBn || item.label, item.label)}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
