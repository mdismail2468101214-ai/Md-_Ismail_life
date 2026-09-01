import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Calendar,
  Clock,
  Tag,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import { BlogPost } from '../types';

interface BlogPageProps {
  onNavigate: (route: string, param?: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const { blogPosts } = useData();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: Array<{ id: string; label: string; labelEn: string }> = [
    { id: 'All', label: 'সকল লেখা', labelEn: 'All Articles' },
    { id: 'Islamic', label: 'ইসলামিক চিন্তা', labelEn: 'Islamic' },
    { id: 'Tech', label: 'প্রযুক্তি ও সফটওয়্যার', labelEn: 'Tech' },
    { id: 'Life Lessons', label: 'জীবনবোধ ও শিক্ষা', labelEn: 'Life Lessons' },
    { id: 'Thoughts', label: 'আত্মচিন্তা', labelEn: 'Thoughts' },
    { id: 'Books', label: 'বই আলোচনা', labelEn: 'Book Reviews' },
  ];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      if (!post.published) return false;
      const matchCat = selectedCategory === 'All' || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        (post.titleBn && post.titleBn.toLowerCase().includes(q)) ||
        post.excerpt.toLowerCase().includes(q) ||
        (post.excerptBn && post.excerptBn.toLowerCase().includes(q)) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [blogPosts, selectedCategory, searchQuery]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8 pb-24">
      <Breadcrumbs
        items={[{ label: 'Blog & Thoughts', labelBn: 'চিন্তাভাবনা ও ব্লগ' }]}
        onHomeClick={() => onNavigate('home')}
      />

      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{t('কলমের ডগায় ভাবনা', 'Writings, Essays & Thoughts')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white font-sans">
          {t('আমার চিন্তাভাবনা ও ব্লগ', 'Thoughts & Writings')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          {t('প্রযুক্তি, ধর্মীয় আদর্শ, জীবনের পাঠ এবং গঠনমূলক অভিজ্ঞতার আলোকে লিখিত প্রবন্ধমালা।', 'Deep dives into engineering, philosophy, faith, and intentional living.')}
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-sky-600 text-white shadow-xs font-semibold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {t(cat.label, cat.labelEn)}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('আর্টিকেল খুঁজুন...', 'Search articles, topics...')}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:border-sky-500"
          />
        </div>
      </div>

      {/* Blog Cards */}
      {filteredPosts.length === 0 ? (
        <EmptyState
          title={t('কোনো লেখা পাওয়া যায়নি।', 'No articles found.')}
          description={t('সার্চ কিওয়ার্ড পরিবর্তন করুন অথবা সকল লেখা সিলেক্ট করুন।', 'Try adjusting your search criteria.')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onNavigate('blog-post', post.slug || post.id)}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-black/60 backdrop-blur-md text-white">
                    {post.category}
                  </span>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
                    {t(post.titleBn || post.title, post.title)}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                    {t(post.excerptBn || post.excerpt, post.excerpt)}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 text-[10px]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-sky-600 dark:text-sky-400 font-semibold group-hover:underline flex items-center gap-1">
                    {t('সম্পূর্ণ পড়ুন', 'Read')}
                    <ArrowRight className="w-3 h-3" />
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
