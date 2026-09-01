import React from 'react';
import {
  ArrowRight,
  Sparkles,
  Compass,
  FolderGit2,
  BookOpen,
  Image,
  Award,
  Target,
  GraduationCap,
  Calendar,
  ExternalLink,
  Github,
  MapPin,
  Heart,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { Project, GalleryItem } from '../types';

interface HomePageProps {
  onNavigate: (route: string, param?: string) => void;
  onOpenProjectModal: (p: Project) => void;
  onOpenGalleryModal: (items: GalleryItem[], index: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenProjectModal,
  onOpenGalleryModal
}) => {
  const { profile, lifeStory, projects, blogPosts, gallery, futureGoals, achievements } = useData();
  const { t } = useLanguage();

  const featuredStories = lifeStory.slice(0, 3);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3).length > 0
    ? projects.filter((p) => p.featured).slice(0, 3)
    : projects.slice(0, 3);
  const recentBlogs = blogPosts.filter((b) => b.published).slice(0, 3);
  const selectedPhotos = gallery.slice(0, 4);
  const activeGoals = futureGoals.slice(0, 3);

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO SECTION */}
      <section id="hero-section" className="relative pt-6 sm:pt-12 pb-8 overflow-hidden">
        {/* Soft atmospheric background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          
          {/* Peaceful Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80 mb-6 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t('বিসমিল্লাহির রহমানির রাহিম', 'In the Name of Allah, Most Gracious, Most Merciful')}</span>
          </motion.div>

          {/* Profile Avatar with elegant ring */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 mb-6"
          >
            <div className="w-full h-full rounded-full p-1 bg-gradient-to-tr from-emerald-500 via-teal-400 to-amber-200 shadow-xl">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full bg-stone-100 dark:bg-stone-800"
              />
            </div>
            <div className="absolute bottom-1 right-1 bg-white dark:bg-stone-900 text-emerald-600 dark:text-emerald-400 p-2 rounded-full shadow-md border border-stone-200 dark:border-stone-800" title="Verified Personal Book">
              <Heart className="w-4 h-4 fill-emerald-600 dark:fill-emerald-400" />
            </div>
          </motion.div>

          {/* Name & Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-sans text-stone-900 dark:text-white tracking-tight mb-3"
          >
            {t(profile.nameBn, profile.name)}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-base sm:text-xl font-medium text-emerald-700 dark:text-emerald-400 mb-4"
          >
            {t(profile.titleBn, profile.title)}
          </motion.p>

          {/* Personal Motto */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 backdrop-blur-xs max-w-2xl mx-auto shadow-xs mb-8"
          >
            <p className="font-serif italic text-base sm:text-lg text-stone-700 dark:text-stone-300 leading-relaxed">
              “{t(profile.mottoBn || profile.motto, profile.motto)}”
            </p>
          </motion.div>

          {/* Call to Actions (CTAs) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <button
              id="cta-view-story"
              onClick={() => onNavigate('story')}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm sm:text-base flex items-center gap-2 shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>{t('আমার গল্প দেখুন', 'Explore My Story')}</span>
            </button>

            <button
              id="cta-view-projects"
              onClick={() => onNavigate('projects')}
              className="px-6 py-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium text-sm sm:text-base flex items-center gap-2 transition-all shadow-xs"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>{t('আমার কাজ দেখুন', 'View My Work')}</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. SHORT ABOUT SECTION */}
      <section id="home-about" className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200/90 dark:border-stone-800/90 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>{t('এক নজরে পরিচিতি', 'Brief Introduction')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                {t('সৃষ্টির প্রেরণায় প্রতিটি দিনের পথচলা', 'Walking With Purpose & Continuous Learning')}
              </h2>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-sm sm:text-base">
                {t(profile.shortBioBn || profile.shortBio, profile.shortBio)}
              </p>

              {/* Quick Info Badges */}
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-800/60 px-3 py-1.5 rounded-lg border border-stone-200/60 dark:border-stone-700/60">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  {t(profile.locationBn || profile.location, profile.location)}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-800/60 px-3 py-1.5 rounded-lg border border-stone-200/60 dark:border-stone-700/60">
                  <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
                  {t('সিএসই শিক্ষার্থী ও সফটওয়্যার কারিগর', 'CSE Student & Craftsman')}
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:gap-2.5 transition-all"
                >
                  <span>{t('সম্পূর্ণ পরিচিতি ও মূল্যবোধ পড়ুন', 'Read full bio & personal values')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED LIFE STORY / MEMORIES */}
      <section id="home-story" className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>{t('স্মৃতিমালা', 'Life Milestones')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
              {t('জীবনের কিছু স্মরণীয় অধ্যায়', 'Featured Chapters of My Story')}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('story')}
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:gap-2 transition-all"
          >
            <span>{t('সম্পূর্ণ টাইমলাইন', 'View Full Timeline')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredStories.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate('story')}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              {item.imageUrl && (
                <div className="h-44 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-medium">
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.yearOrDate}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {t(item.titleBn || item.title, item.title)}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-3 mt-1.5 leading-relaxed">
                    {t(item.descriptionBn || item.description, item.description)}
                  </p>
                </div>
                {item.location && (
                  <div className="text-[11px] text-stone-400 flex items-center gap-1 pt-2 border-t border-stone-100 dark:border-stone-800">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <button
            onClick={() => onNavigate('story')}
            className="w-full py-2.5 px-4 rounded-xl border border-stone-300 dark:border-stone-700 text-sm font-medium text-stone-700 dark:text-stone-300"
          >
            {t('সম্পূর্ণ টাইমলাইন দেখুন →', 'View Full Timeline →')}
          </button>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS */}
      <section id="home-projects" className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 mb-2">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>{t('নির্বাচিত প্রজেক্ট', 'Featured Projects')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
              {t('বাস্তব সমস্যার সৃষ্টিশীল সমাধান', 'Software Crafted with Precision')}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:gap-2 transition-all"
          >
            <span>{t('সকল প্রজেক্ট দেখুন', 'View All Projects')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => onOpenProjectModal(proj)}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col"
            >
              <div className="relative h-48 w-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                <img
                  src={proj.coverImage}
                  alt={proj.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-black/60 backdrop-blur-md text-white">
                  {proj.category}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {t(proj.titleBn || proj.title, proj.title)}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-2 mt-1.5 leading-relaxed">
                    {t(proj.descriptionBn || proj.description, proj.description)}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {proj.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-[11px] rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {proj.technologies.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[10px] rounded-md bg-stone-100 dark:bg-stone-800 text-stone-400">
                        +{proj.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-500 pt-3 border-t border-stone-100 dark:border-stone-800">
                    <span>{proj.creationDate}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold group-hover:underline flex items-center gap-1">
                      {t('বিস্তারিত দেখুন', 'Details')}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <button
            onClick={() => onNavigate('projects')}
            className="w-full py-2.5 px-4 rounded-xl border border-stone-300 dark:border-stone-700 text-sm font-medium text-stone-700 dark:text-stone-300"
          >
            {t('সকল প্রজেক্ট দেখুন →', 'View All Projects →')}
          </button>
        </div>
      </section>

      {/* 5. RECENT BLOGS & THOUGHTS */}
      <section id="home-blogs" className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/50 text-sky-800 dark:text-sky-300 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t('চিন্তাভাবনা ও ব্লগ', 'Reflections & Blog')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
              {t('প্রযুক্তি, জীবন ও বিশ্বাসের কথকতা', 'Recent Writings & Thoughts')}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('blog')}
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:gap-2 transition-all"
          >
            <span>{t('সকল লেখা পড়ুন', 'Read All Articles')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentBlogs.map((post) => (
            <div
              key={post.id}
              onClick={() => onNavigate('blog-post', post.slug || post.id)}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="h-44 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {t(post.titleBn || post.title, post.title)}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-2 mt-1.5 leading-relaxed">
                    {t(post.excerptBn || post.excerpt, post.excerpt)}
                  </p>
                </div>
                <div className="text-xs text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <span>{post.publishedAt}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold group-hover:underline">
                    {t('পড়ুন →', 'Read →')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SELECTED PHOTO GALLERY STRIP */}
      <section id="home-gallery" className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 mb-2">
              <Image className="w-3.5 h-3.5" />
              <span>{t('ফটো গ্যালারি', 'Photo Strip')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
              {t('ক্যামেরার ফ্রেমে বন্দী প্রশান্তিময় স্মৃতি', 'Moments of Serenity & Nature')}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('gallery')}
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:gap-2 transition-all"
          >
            <span>{t('সম্পূর্ণ গ্যালারি', 'Full Gallery')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {selectedPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => onOpenGalleryModal(selectedPhotos, idx)}
              className="group cursor-pointer relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 shadow-xs"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <p className="text-xs font-medium text-white line-clamp-1">
                  {t(photo.titleBn || photo.title, photo.title)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FUTURE GOALS PREVIEW */}
      <section id="home-goals" className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-stone-900 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-800/60 text-emerald-200 border border-emerald-700/50 mb-3">
                <Target className="w-3.5 h-3.5" />
                <span>{t('ভবিষ্যতের অঙ্গীকার', 'Future Aspirations')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-sans">
                {t('যে স্বপ্নের পানে অবিরাম পদযাত্রা', 'Roadmap Towards Meaningful Milestones')}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('goals')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors shrink-0 shadow-md"
            >
              {t('সকল লক্ষ্য ও অগ্রগতি দেখুন', 'View Goal Roadmap')}
            </button>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeGoals.map((g) => (
              <div
                key={g.id}
                className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700/60 backdrop-blur-xs space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-stone-300">
                  <span className="px-2 py-0.5 rounded-md bg-stone-700 text-emerald-300 font-medium">
                    {g.category}
                  </span>
                  <span>{g.targetDate}</span>
                </div>
                <h4 className="font-bold text-sm text-stone-100 line-clamp-2">
                  {t(g.titleBn || g.title, g.title)}
                </h4>
                
                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs text-stone-400 mb-1">
                    <span>{t('অগ্রগতি', 'Progress')}</span>
                    <span className="font-semibold text-emerald-400">{g.progressPercentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-stone-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${g.progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SERENE CLOSING INVITATION */}
      <section className="max-w-3xl mx-auto text-center px-4 pt-4">
        <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white mb-3">
          {t('কথা হোক, গড়ে উঠুক নতুন কোনো সৃষ্টি', 'Let’s Connect & Create Something Beautiful')}
        </h3>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mb-6 leading-relaxed">
          {t('কোনো প্রশ্ন, আলোচনা বা সহযোগিতার জন্য নির্দ্বিধায় মেসেজ পাঠাতে পারেন।', 'Feel free to reach out for collaborations, thoughtful discussions, or feedback.')}
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-all"
        >
          {t('যোগাযোগ পেইজে যান', 'Get in Touch')}
        </button>
      </section>

    </div>
  );
};
