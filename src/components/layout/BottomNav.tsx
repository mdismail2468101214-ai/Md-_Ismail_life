import React, { useState } from 'react';
import { Home, Compass, FolderGit2, Image, BookOpen, MoreHorizontal, X, Sparkles, GraduationCap, Trophy, Target, Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface BottomNavProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentRoute, onNavigate }) => {
  const { t } = useLanguage();
  const [moreDrawerOpen, setMoreDrawerOpen] = useState(false);

  const mainTabs = [
    { id: 'home', label: 'হোম', labelEn: 'Home', icon: Home },
    { id: 'story', label: 'গল্প', labelEn: 'Story', icon: Compass },
    { id: 'projects', label: 'কাজ', labelEn: 'Work', icon: FolderGit2 },
    { id: 'gallery', label: 'ছবি', labelEn: 'Photos', icon: Image },
    { id: 'blog', label: 'ব্লগ', labelEn: 'Blog', icon: BookOpen },
  ];

  const extraTabs = [
    { id: 'about', label: 'আমার পরিচিতি', labelEn: 'About Me', icon: Sparkles },
    { id: 'education', label: 'শিক্ষাজীবন', labelEn: 'Education', icon: GraduationCap },
    { id: 'creations', label: 'অন্যান্য সৃষ্টি', labelEn: 'Creations', icon: Sparkles },
    { id: 'achievements', label: 'অর্জন ও সনদ', labelEn: 'Achievements', icon: Trophy },
    { id: 'goals', label: 'ভবিষ্যৎ লক্ষ্য', labelEn: 'Future Goals', icon: Target },
    { id: 'contact', label: 'যোগাযোগ', labelEn: 'Contact', icon: Mail },
  ];

  const handleSelect = (id: string) => {
    onNavigate(id);
    setMoreDrawerOpen(false);
  };

  return (
    <>
      {/* Mobile Drawer for Extra Tabs */}
      {moreDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end bg-black/60 backdrop-blur-xs">
          <div
            className="fixed inset-0"
            onClick={() => setMoreDrawerOpen(false)}
          />
          <div className="relative z-10 bg-white dark:bg-stone-900 rounded-t-3xl border-t border-stone-200 dark:border-stone-800 p-6 shadow-2xl space-y-4 max-h-[70vh] overflow-y-auto animate-in slide-in-from-bottom-6 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <span className="font-semibold text-sm text-stone-800 dark:text-stone-200">
                {t('আরও পৃষ্ঠা দেখুন', 'Explore More Sections')}
              </span>
              <button
                onClick={() => setMoreDrawerOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {extraTabs.map((tab) => {
                const Icon = tab.icon;
                const active = currentRoute === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleSelect(tab.id)}
                    className={`p-3 rounded-2xl flex items-center gap-2.5 text-xs font-medium transition-all ${
                      active
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-stone-50 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 hover:bg-stone-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{t(tab.label, tab.labelEn)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar on Mobile */}
      <nav
        id="mobile-bottom-nav"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0E1117]/95 backdrop-blur-xl border-t border-stone-200 dark:border-stone-800/80 px-2 py-1.5 flex items-center justify-around shadow-lg"
      >
        {mainTabs.map((tab) => {
          const Icon = tab.icon;
          const active = currentRoute === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleSelect(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-150 min-w-[54px] ${
                active
                  ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <div className={`p-1 rounded-full ${active ? 'bg-emerald-50 dark:bg-emerald-950/60' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-sans">
                {t(tab.label, tab.labelEn)}
              </span>
            </button>
          );
        })}

        {/* More Button */}
        <button
          onClick={() => setMoreDrawerOpen(true)}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 min-w-[54px] ${
            extraTabs.some((t) => t.id === currentRoute) ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''
          }`}
        >
          <div className="p-1">
            <MoreHorizontal className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight font-sans">
            {t('অন্যান্য', 'More')}
          </span>
        </button>
      </nav>
    </>
  );
};
