import React from 'react';
import {
  Heart,
  Sparkles,
  BookOpen,
  Users,
  Compass,
  Download,
  Mail,
  MapPin,
  CheckCircle2,
  Code2,
  Palette,
  Lightbulb
} from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

interface AboutPageProps {
  onNavigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { profile } = useData();
  const { t } = useLanguage();

  const iconMap: Record<string, React.ReactNode> = {
    Heart: <Heart className="w-5 h-5" />,
    Sparkles: <Sparkles className="w-5 h-5" />,
    BookOpen: <BookOpen className="w-5 h-5" />,
    Users: <Users className="w-5 h-5" />,
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-12 pb-20">
      <Breadcrumbs
        items={[{ label: 'About Me', labelBn: 'আমার সম্পর্কে' }]}
        onHomeClick={() => onNavigate('home')}
      />

      {/* Header Profile Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-10 shadow-xs">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          
          {/* Avatar */}
          <div className="relative shrink-0 w-36 h-36 sm:w-44 sm:h-44">
            <div className="w-full h-full rounded-2xl overflow-hidden p-1 bg-gradient-to-br from-emerald-500 via-teal-500 to-amber-300 shadow-md">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl bg-stone-100 dark:bg-stone-800"
              />
            </div>
          </div>

          {/* Bio Details */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('ব্যক্তিগত পরিচয় ও আত্মদর্শন', 'Personal Philosophy & Bio')}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white font-sans">
              {t(profile.nameBn, profile.name)}
            </h1>

            <p className="text-base sm:text-lg font-medium text-emerald-700 dark:text-emerald-400">
              {t(profile.titleBn, profile.title)}
            </p>

            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl whitespace-pre-line">
              {t(profile.fullBioBn || profile.fullBio, profile.fullBio)}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <span className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-800/80 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                {t(profile.locationBn || profile.location, profile.location)}
              </span>

              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-800/80 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:text-emerald-600 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-600" />
                  {profile.email}
                </a>
              )}

              {profile.resumeUrl && profile.resumeUrl !== '#' && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-1.5 rounded-lg transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  {t('জীবনবৃত্তান্ত (CV)', 'Download CV')}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
            {t('আমার মূলনীতি ও বিশ্বাস', 'My Core Values & Ethics')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            {t('যে নীতিগুলোর ওপর দাঁড়িয়ে আমার জীবনের প্রতিটি সিদ্ধান্ত ও কাজ', 'Guiding principles behind every line of code and life choice')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {profile.values.map((val) => (
            <div
              key={val.id}
              className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                {val.iconName && iconMap[val.iconName] ? iconMap[val.iconName] : <Sparkles className="w-5 h-5" />}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
                {t(val.titleBn || val.title, val.title)}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {t(val.descriptionBn || val.description, val.description)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 Columns: Interests, What I'm Learning, Love Creating */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Interests */}
        <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-base">
            <Heart className="w-5 h-5" />
            <h3>{t('আগ্রহের বিষয়সমূহ', 'Interests & Passions')}</h3>
          </div>
          <ul className="space-y-2">
            {profile.interests.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Currently Learning */}
        <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 space-y-4">
          <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold text-base">
            <BookOpen className="w-5 h-5" />
            <h3>{t('বর্তমানে যা শিখছি', 'Currently Learning')}</h3>
          </div>
          <ul className="space-y-2">
            {profile.learning.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Love Creating */}
        <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 space-y-4">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-base">
            <Palette className="w-5 h-5" />
            <h3>{t('যা তৈরি করতে ভালোবাসি', 'What I Love Creating')}</h3>
          </div>
          <ul className="space-y-2">
            {profile.loveCreating.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Direct Jump Buttons */}
      <section className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-stone-900 dark:text-white text-base">
            {t('আমার জীবনের গল্প ও টাইমলাইন জানতে চান?', 'Curious about my life milestones?')}
          </h4>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
            {t('শৈশব থেকে বর্তমান পর্যন্ত প্রতিটি গুরুত্বপূর্ণ স্মৃতি লিপিবদ্ধ রয়েছে।', 'Explore the chapters of childhood, SSC, college and university life.')}
          </p>
        </div>
        <button
          onClick={() => onNavigate('story')}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shrink-0 transition-colors shadow-xs"
        >
          {t('আমার গল্প পেইজে যান →', 'Explore Life Story →')}
        </button>
      </section>
    </div>
  );
};
