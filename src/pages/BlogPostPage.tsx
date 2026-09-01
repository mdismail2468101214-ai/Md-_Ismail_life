import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Tag,
  ArrowLeft,
  Share2,
  Check,
  Twitter,
  Facebook,
  Linkedin,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

interface BlogPostPageProps {
  slugOrId: string;
  onNavigate: (route: string, param?: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slugOrId, onNavigate }) => {
  const { blogPosts, profile } = useData();
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const post = blogPosts.find((b) => b.slug === slugOrId || b.id === slugOrId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slugOrId]);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
          {t('আর্টিকেলটি খুঁজে পাওয়া যায়নি!', 'Article Not Found!')}
        </h2>
        <button
          onClick={() => onNavigate('blog')}
          className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold"
        >
          {t('সকল ব্লগ তালিকায় ফিরুন', 'Back to Blog List')}
        </button>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedPosts = blogPosts
    .filter((b) => b.id !== post.id && b.category === post.category && b.published)
    .slice(0, 2);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8 pb-24">
      <Breadcrumbs
        items={[
          { label: 'Blog', labelBn: 'ব্লগ', onClick: () => onNavigate('blog') },
          { label: post.title, labelBn: post.titleBn || post.title },
        ]}
        onHomeClick={() => onNavigate('home')}
      />

      {/* Back Button */}
      <div>
        <button
          onClick={() => onNavigate('blog')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 dark:text-stone-400 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('সকল আর্টিকেলে ফিরে যান', 'Back to all articles')}</span>
        </button>
      </div>

      {/* Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-stone-400">
            <Calendar className="w-3.5 h-3.5" />
            {post.publishedAt}
          </span>
          <span className="text-stone-400">•</span>
          <span className="flex items-center gap-1 text-xs text-stone-400">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-white font-sans leading-tight">
          {t(post.titleBn || post.title, post.title)}
        </h1>

        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed italic border-l-3 border-sky-500 pl-4">
          {t(post.excerptBn || post.excerpt, post.excerpt)}
        </p>
      </header>

      {/* Featured Cover Image */}
      {post.coverImage && (
        <div className="w-full rounded-2xl overflow-hidden shadow-md bg-stone-100 dark:bg-stone-800 max-h-96">
          <img
            src={post.coverImage}
            alt={post.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Main Content Body */}
      <div className="prose prose-stone dark:prose-invert max-w-none text-stone-800 dark:text-stone-200 leading-relaxed font-sans text-base sm:text-lg space-y-5 pt-4">
        {t(post.contentBn || post.content, post.content)
          .split('\n\n')
          .map((paragraph, pIdx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={pIdx} className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white mt-8 mb-3">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={pIdx} className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mt-10 mb-4 border-b border-stone-200 dark:border-stone-800 pb-2">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('> ')) {
              return (
                <blockquote key={pIdx} className="border-l-4 border-emerald-500 pl-4 py-1 italic text-stone-700 dark:text-stone-300 font-serif bg-emerald-50/50 dark:bg-emerald-950/20 rounded-r-xl my-4">
                  {paragraph.replace('> ', '')}
                </blockquote>
              );
            }
            return (
              <p key={pIdx} className="leading-relaxed whitespace-pre-line">
                {paragraph}
              </p>
            );
          })}
      </div>

      {/* Tags & Sharing Section */}
      <div className="pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          <Tag className="w-4 h-4 text-stone-400 mr-1" />
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Share Buttons */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-400">{t('শেয়ার করুন:', 'Share:')}</span>
          <button
            onClick={handleCopyLink}
            className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-emerald-600 transition-colors flex items-center gap-1 text-xs"
            title="Copy Link"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? t('কপি হয়েছে', 'Copied!') : t('লিংক', 'Link')}</span>
          </button>
        </div>
      </div>

      {/* Author Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex items-center gap-4">
        <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 ring-2 ring-emerald-500/30">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-1">
          <p className="text-xs text-stone-400 font-medium">{t('লেখক', 'Written By')}</p>
          <h4 className="font-bold text-base text-stone-900 dark:text-white">
            {t(profile.nameBn, profile.name)}
          </h4>
          <p className="text-xs text-stone-600 dark:text-stone-400">
            {t(profile.shortBioBn || profile.shortBio, profile.shortBio)}
          </p>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="pt-6 space-y-4">
          <h3 className="text-lg font-bold text-stone-900 dark:text-white">
            {t('সম্পর্কিত অন্যান্য লেখা', 'Related Articles')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedPosts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onNavigate('blog-post', rel.slug || rel.id)}
                className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-sky-500/50 cursor-pointer transition-all space-y-2"
              >
                <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                  {rel.category}
                </span>
                <h4 className="font-bold text-sm text-stone-900 dark:text-white line-clamp-1">
                  {t(rel.titleBn || rel.title, rel.title)}
                </h4>
                <p className="text-xs text-stone-500 line-clamp-2">
                  {t(rel.excerptBn || rel.excerpt, rel.excerpt)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
