import React from 'react';
import {
  Heart,
  Github,
  Linkedin,
  Facebook,
  Twitter,
  Youtube,
  Send,
  Mail,
  ShieldAlert,
  ArrowUp,
  Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { profile, settings } = useData();
  const { t } = useLanguage();
  const { isAdmin } = useAuth();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = profile.socialLinks || {};

  return (
    <footer id="main-footer" className="bg-stone-100 dark:bg-[#090C10] border-t border-stone-200 dark:border-stone-850 pt-16 pb-24 md:pb-12 text-stone-600 dark:text-stone-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Quote Card / Reflection Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-emerald-50 p-8 sm:p-10 mb-12 shadow-xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-800/60 text-emerald-200 border border-emerald-700/50 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              {t('দৈনিক পাথেয় ও আত্মচিন্তা', 'Daily Reflection')}
            </span>
            <p className="font-serif italic text-lg sm:text-2xl text-emerald-100 leading-relaxed font-light">
              {t(settings.footerQuoteBn || settings.footerQuote, settings.footerQuote)}
            </p>
            <p className="text-xs text-emerald-300/80 mt-3">
              {t('— আমার পথচলার গল্প | জীবনের প্রতিটি পদক্ষেপে জ্ঞানের অন্বেষণ', '— My Journey | Seeking knowledge with humility & faith')}
            </p>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Branding & Intro */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-serif font-bold text-base shadow-sm">
                আ
              </div>
              <span className="text-lg font-bold text-stone-900 dark:text-white">
                আমার গল্প <span className="text-emerald-600 dark:text-emerald-400 font-serif font-normal">| My Journey</span>
              </span>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md leading-relaxed">
              {t(profile.shortBioBn || profile.shortBio, profile.shortBio)}
            </p>

            {/* Social Icons */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:text-emerald-600 hover:border-emerald-500/50 transition-all shadow-xs"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:text-sky-600 hover:border-sky-500/50 transition-all shadow-xs"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:text-blue-600 hover:border-blue-500/50 transition-all shadow-xs"
                  aria-label="Facebook Profile"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:text-sky-500 hover:border-sky-500/50 transition-all shadow-xs"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:text-red-600 hover:border-red-500/50 transition-all shadow-xs"
                  aria-label="YouTube Channel"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {socialLinks.telegram && (
                <a
                  href={socialLinks.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:text-sky-500 hover:border-sky-500/50 transition-all shadow-xs"
                  aria-label="Telegram Channel"
                >
                  <Send className="w-4 h-4" />
                </a>
              )}
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:text-emerald-600 hover:border-emerald-500/50 transition-all shadow-xs"
                  aria-label="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-200 uppercase tracking-wider mb-3 font-sans">
              {t('প্রয়োজনীয় পাতা', 'Navigation')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('story')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {t('আমার গল্প ও টাইমলাইন', 'My Life Story')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('education')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {t('শিক্ষাজীবন ও ফলাফল', 'Education & Results')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {t('প্রজেক্ট পোর্টফোলিও', 'Project Portfolio')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('creations')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {t('সৃষ্টিসমূহ ও ডিজাইন', 'Creations & Designs')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {t('ফটো গ্যালারি ও মুহূর্ত', 'Photo Gallery')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: More & Admin */}
          <div>
            <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-200 uppercase tracking-wider mb-3 font-sans">
              {t('অন্যান্য বিভাগ', 'Explore')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {t('ব্লগ ও চিন্তাভাবনা', 'Blog & Thoughts')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('videos')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {t('ভিডিও সংগ্রহ', 'Video Highlights')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('favorites')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {t('পছন্দের বই ও নাশিদ', 'Favorites & Books')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('achievements')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {t('অর্জন ও সনদপত্র', 'Achievements')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('goals')}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {t('ভবিষ্যৎ লক্ষ্য', 'Future Milestones')}
                </button>
              </li>
              {isAdmin && (
                <li className="pt-2">
                  <button
                    onClick={() => onNavigate('admin-dashboard')}
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>{t('অ্যাডমিন ড্যাশবোর্ড', 'Admin Dashboard')}</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {t(profile.nameBn, profile.name)}. {t('সর্বস্বত্ব সংরক্ষিত।', 'All rights reserved.')}</span>
            {/* Discreet Admin link for site owner */}
            <button
              onClick={() => onNavigate(isAdmin ? 'admin-dashboard' : 'admin-login')}
              className="text-stone-300 dark:text-stone-700 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ml-1"
              title={isAdmin ? t('অ্যাডমিন ড্যাশবোর্ড', 'Admin Dashboard') : t('অ্যাডমিন লগইন (Ctrl+Shift+A)', 'Admin Login (Ctrl+Shift+A)')}
              aria-label="Admin Access"
            >
              🔒
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
            >
              {t('যোগাযোগ করুন', 'Contact Me')}
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{t('উপরে উঠুন', 'Back to top')}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
