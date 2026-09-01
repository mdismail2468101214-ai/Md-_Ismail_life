import React, { useState } from 'react';
import {
  Video,
  Play,
  Calendar,
  Clock,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import { VideoItem, VideoCategory } from '../types';

interface VideosPageProps {
  onNavigate: (route: string) => void;
  onOpenVideoModal: (video: VideoItem) => void;
}

export const VideosPage: React.FC<VideosPageProps> = ({ onNavigate, onOpenVideoModal }) => {
  const { videos } = useData();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: Array<{ id: string; label: string; labelEn: string }> = [
    { id: 'All', label: 'সকল ভিডিও', labelEn: 'All Videos' },
    { id: 'Learning', label: 'শিক্ষা ও টিউটোরিয়াল', labelEn: 'Learning' },
    { id: 'Tech Talks', label: 'প্রযুক্তি আড্ডা', labelEn: 'Tech Talks' },
    { id: 'Memories', label: 'স্মৃতিময় ভিডিও', labelEn: 'Memories' },
    { id: 'Islamic', label: 'ইসলামিক বার্তা', labelEn: 'Islamic' },
    { id: 'Short Clips', label: 'শর্ট ক্লিপস', labelEn: 'Short Clips' },
    { id: 'Other', label: 'অন্যান্য', labelEn: 'Other' },
  ];

  const filteredVideos = selectedCategory === 'All'
    ? videos
    : videos.filter((v) => v.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8 pb-24">
      <Breadcrumbs
        items={[{ label: 'Videos', labelBn: 'ভিডিও সংগ্রহ' }]}
        onHomeClick={() => onNavigate('home')}
      />

      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300">
          <Video className="w-3.5 h-3.5" />
          <span>{t('ভিজ্যুয়াল কন্টেন্ট ও প্রেজেন্টেশন', 'Video Documentaries & Talks')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white font-sans">
          {t('আমার ভিডিও সংগ্রহ', 'Featured Videos')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          {t('প্রজেক্ট ডেমো, প্রযুক্তি উপস্থাপনা, শিক্ষণীয় আলোচনা এবং ক্যাম্পাসের সুন্দর মুহূর্তসমূহ।', 'Project walk-throughs, tech demos, campus memories, and thoughtful discussions.')}
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
                ? 'bg-rose-600 text-white shadow-xs font-semibold'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {t(cat.label, cat.labelEn)}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      {filteredVideos.length === 0 ? (
        <EmptyState
          title={t('এই বিভাগে এখনও কোনো ভিডিও যোগ করা হয়নি।', 'No videos in this category yet.')}
          description={t('অ্যাডমিন প্যানেল থেকে নতুন ভিডিও লিংক যোগ করা যাবে।', 'Add video links from the Admin Panel.')}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onOpenVideoModal(item)}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail with Play Overlay */}
                <div className="relative aspect-video w-full bg-stone-900 overflow-hidden">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-1 fill-white" />
                    </div>
                  </div>

                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-black/70 backdrop-blur-md text-white">
                    {item.category}
                  </span>

                  {item.duration && (
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md text-[11px] font-medium bg-black/80 text-white flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.duration}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-base text-stone-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2">
                    {t(item.titleBn || item.title, item.title)}
                  </h3>
                  {(item.description || item.descriptionBn) && (
                    <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                      {t(item.descriptionBn || item.description || '', item.description || item.descriptionBn)}
                    </p>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                  <span className="text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1">
                    {t('প্লে করুন ▷', 'Watch ▷')}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
