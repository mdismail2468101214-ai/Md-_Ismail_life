import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Search,
  Sun,
  Moon,
  ShieldAlert,
  User,
  Sparkles,
  ChevronDown,
  Layers,
  Heart,
  Globe
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string, param?: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, onOpenSearch }) => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();
  const { isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const primaryNavItems = [
    { id: 'home', label: 'হোম', labelEn: 'Home' },
    { id: 'about', label: 'পরিচিতি', labelEn: 'About' },
    { id: 'story', label: 'জীবনগাথা', labelEn: 'Story' },
    { id: 'education', label: 'শিক্ষা', labelEn: 'Education' },
    { id: 'projects', label: 'প্রজেক্ট', labelEn: 'Projects' },
    { id: 'creations', label: 'সৃষ্টিসমূহ', labelEn: 'Creations' },
    { id: 'gallery', label: 'গ্যালারি', labelEn: 'Gallery' },
    { id: 'blog', label: 'চিন্তাভাবনা', labelEn: 'Blog' },
  ];

  const secondaryNavItems = [
    { id: 'videos', label: 'ভিডিও সংগ্রহ', labelEn: 'Videos' },
    { id: 'favorites', label: 'পছন্দের বিষয়', labelEn: 'Favorites' },
    { id: 'achievements', label: 'অর্জন ও স্বীকৃতি', labelEn: 'Achievements' },
    { id: 'goals', label: 'ভবিষ্যৎ লক্ষ্য', labelEn: 'Future Goals' },
    { id: 'contact', label: 'যোগাযোগ', labelEn: 'Contact' },
  ];

  const allNavItems = [
    { id: 'home', label: 'হোম', labelEn: 'Home' },
    { id: 'about', label: 'আমার সম্পর্কে', labelEn: 'About Me' },
    { id: 'story', label: 'আমার গল্প', labelEn: 'My Story' },
    { id: 'education', label: 'শিক্ষাজীবন', labelEn: 'Education' },
    { id: 'projects', label: 'প্রজেক্টসমূহ', labelEn: 'Projects' },
    { id: 'creations', label: 'সৃষ্টিসমূহ', labelEn: 'Creations' },
    { id: 'gallery', label: 'ফটো গ্যালারি', labelEn: 'Gallery' },
    { id: 'videos', label: 'ভিডিও', labelEn: 'Videos' },
    { id: 'favorites', label: 'পছন্দের তালিকা', labelEn: 'Favorites' },
    { id: 'blog', label: 'ব্লগ ও লেখা', labelEn: 'Blog / Thoughts' },
    { id: 'achievements', label: 'অর্জন ও সনদ', labelEn: 'Achievements' },
    { id: 'goals', label: 'ভবিষ্যৎ লক্ষ্য', labelEn: 'Future Goals' },
    { id: 'contact', label: 'যোগাযোগ', labelEn: 'Contact' },
  ];

  const handleItemClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#FBFBFA]/90 dark:bg-[#0E1117]/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 shadow-xs'
          : 'bg-[#FBFBFA] dark:bg-[#0E1117] border-b border-stone-100 dark:border-stone-850'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo / Branding */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleItemClick('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-hidden"
              id="brand-logo"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-500 dark:to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
                <span className="font-serif font-bold text-lg leading-none">আ</span>
              </div>
              <div>
                <span className="font-bold text-stone-900 dark:text-white text-base sm:text-lg tracking-tight block leading-tight font-sans">
                  আমার গল্প <span className="font-serif italic font-normal text-emerald-600 dark:text-emerald-400">| My Journey</span>
                </span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 block tracking-wide">
                  {t('ব্যক্তিগত ডিজিটাল জীবনগ্রন্থ', 'Personal Digital Life Book')}
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
            {primaryNavItems.map((item) => {
              const active = currentRoute === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                      : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800/60'
                  }`}
                >
                  {t(item.label, item.labelEn)}
                </button>
              );
            })}

            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium flex items-center gap-1 transition-colors ${
                  secondaryNavItems.some((s) => s.id === currentRoute)
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800/60'
                }`}
                aria-expanded={moreDropdownOpen}
              >
                <span>{t('আরও', 'More')}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-52 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setMoreDropdownOpen(false)}
                >
                  {secondaryNavItems.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => handleItemClick(sec.id)}
                      className={`w-full text-left px-4 py-2 text-xs xl:text-sm transition-colors flex items-center justify-between ${
                        currentRoute === sec.id
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-semibold'
                          : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                      }`}
                    >
                      {t(sec.label, sec.labelEn)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Action buttons (Search, Theme, Lang, Admin) */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Global Search trigger */}
            <button
              id="search-button"
              onClick={onOpenSearch}
              className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-1.5"
              aria-label="Search"
              title="Search (Ctrl + K)"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline text-xs text-stone-400 dark:text-stone-500 border border-stone-200 dark:border-stone-700 px-1.5 py-0.5 rounded-md">
                ⌘K
              </span>
            </button>

            {/* Language toggle */}
            <button
              id="lang-toggle-btn"
              onClick={toggleLang}
              className="px-2.5 py-1 rounded-xl text-xs font-semibold border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-1"
              aria-label="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{lang === 'bn' ? 'EN' : 'বাং'}</span>
            </button>

            {/* Theme toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-stone-700" />
              )}
            </button>

            {/* Admin Dashboard shortcut button */}
            <button
              id="admin-nav-btn"
              onClick={() => handleItemClick(isAdmin ? 'admin-dashboard' : 'admin-login')}
              className={`p-2 rounded-xl transition-colors flex items-center gap-1.5 ${
                isAdmin
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold'
                  : 'text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-white'
              }`}
              title={isAdmin ? t('অ্যাডমিন ড্যাশবোর্ড', 'Admin Dashboard') : t('অ্যাডমিন লগইন', 'Admin Login')}
            >
              <ShieldAlert className="w-4 h-4" />
              <span className="hidden md:inline text-xs font-medium">
                {isAdmin ? t('অ্যাডমিন', 'Admin') : t('লগইন', 'Login')}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors ml-1"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-stone-200 dark:border-stone-800 bg-white/98 dark:bg-stone-900/98 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200 px-4 pt-3 pb-6 space-y-1 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-1.5 pt-2 pb-4 border-b border-stone-100 dark:border-stone-800">
            {allNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`text-left px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  currentRoute === item.id
                    ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {t(item.label, item.labelEn)}
              </button>
            ))}
          </div>

          <div className="pt-3 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            <span>{t('লগইন স্ট্যাটাস:', 'Auth Status:')} {isAdmin ? '✅ Logged In' : 'Visitor'}</span>
            <button
              onClick={() => handleItemClick(isAdmin ? 'admin-dashboard' : 'admin-login')}
              className="text-emerald-600 dark:text-emerald-400 font-semibold"
            >
              {isAdmin ? t('অ্যাডমিন ড্যাশবোর্ড খুলুন →', 'Open Admin →') : t('অ্যাডমিন লগইন →', 'Admin Login →')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
