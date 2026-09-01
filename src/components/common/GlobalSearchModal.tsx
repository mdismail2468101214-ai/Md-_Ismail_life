import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, FolderGit2, BookOpen, Clock, Image, Video, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string, param?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const { projects, blogPosts, lifeStory, gallery, videos, creations } = useData();
  const { t } = useLanguage();

  // Keyboard shortcut Ctrl/Cmd + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    const matchedProjects = projects.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        (p.titleBn && p.titleBn.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q) ||
        (p.descriptionBn && p.descriptionBn.toLowerCase().includes(q)) ||
        p.technologies.some(tech => tech.toLowerCase().includes(q))
    );

    const matchedBlogs = blogPosts.filter(
      b =>
        b.title.toLowerCase().includes(q) ||
        (b.titleBn && b.titleBn.toLowerCase().includes(q)) ||
        b.excerpt.toLowerCase().includes(q) ||
        (b.excerptBn && b.excerptBn.toLowerCase().includes(q)) ||
        b.tags.some(tag => tag.toLowerCase().includes(q))
    );

    const matchedStory = lifeStory.filter(
      s =>
        s.title.toLowerCase().includes(q) ||
        (s.titleBn && s.titleBn.toLowerCase().includes(q)) ||
        s.description.toLowerCase().includes(q) ||
        (s.descriptionBn && s.descriptionBn.toLowerCase().includes(q)) ||
        s.category.toLowerCase().includes(q)
    );

    const matchedGallery = gallery.filter(
      g =>
        g.title.toLowerCase().includes(q) ||
        (g.titleBn && g.titleBn.toLowerCase().includes(q)) ||
        (g.description && g.description.toLowerCase().includes(q)) ||
        g.category.toLowerCase().includes(q)
    );

    const matchedVideos = videos.filter(
      v =>
        v.title.toLowerCase().includes(q) ||
        (v.titleBn && v.titleBn.toLowerCase().includes(q)) ||
        (v.description && v.description.toLowerCase().includes(q))
    );

    const matchedCreations = creations.filter(
      c =>
        c.title.toLowerCase().includes(q) ||
        (c.titleBn && c.titleBn.toLowerCase().includes(q)) ||
        c.description.toLowerCase().includes(q) ||
        c.toolsUsed.some(tool => tool.toLowerCase().includes(q))
    );

    const totalMatches =
      matchedProjects.length +
      matchedBlogs.length +
      matchedStory.length +
      matchedGallery.length +
      matchedVideos.length +
      matchedCreations.length;

    return {
      projects: matchedProjects,
      blogs: matchedBlogs,
      story: matchedStory,
      gallery: matchedGallery,
      videos: matchedVideos,
      creations: matchedCreations,
      totalMatches
    };
  }, [query, projects, blogPosts, lifeStory, gallery, videos, creations]);

  if (!isOpen) return null;

  const handleSelect = (route: string, param?: string) => {
    onNavigate(route, param);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          className="relative z-10 max-w-2xl w-full rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden"
        >
          {/* Search Input Box */}
          <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center gap-3">
            <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('ওয়েবসাইটের যেকোনো কিছু খুঁজুন... (প্রজেক্ট, ব্লগ, স্মৃতি, ছবি)', 'Search anything... (projects, blogs, memories, photos)')}
              autoFocus
              className="flex-1 bg-transparent border-0 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-hidden text-base font-sans"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg text-stone-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
            {!query.trim() ? (
              <div className="text-center py-10 text-stone-400 dark:text-stone-500 text-sm">
                <p className="mb-2">💡 {t('টাইপ করে খুঁজুন:', 'Quick Search Tips:')}</p>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {['React', 'Quran', 'ক্যাম্পাস', 'জ্যামিতি', 'SSC', 'সঞ্চয়'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-2.5 py-1 text-xs rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-stone-600 dark:text-stone-300 transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : searchResults && searchResults.totalMatches === 0 ? (
              <div className="text-center py-12 text-stone-400 dark:text-stone-500 text-sm">
                {t(`"${query}" দিয়ে কোনো তথ্য পাওয়া যায়নি।`, `No results found for "${query}".`)}
              </div>
            ) : searchResults ? (
              <div className="space-y-6">
                {/* Projects */}
                {searchResults.projects.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <FolderGit2 className="w-3.5 h-3.5 text-emerald-500" />
                      {t('প্রজেক্টসমূহ', 'Projects')} ({searchResults.projects.length})
                    </h4>
                    <div className="space-y-1.5">
                      {searchResults.projects.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelect('projects')}
                          className="p-3 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/80 cursor-pointer flex items-center justify-between transition-colors group"
                        >
                          <div>
                            <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                              {t(item.titleBn || item.title, item.title)}
                            </p>
                            <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
                              {t(item.descriptionBn || item.description, item.description)}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Blog Posts */}
                {searchResults.blogs.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-sky-500" />
                      {t('ব্লগ ও চিন্তাভাবনা', 'Blog & Thoughts')} ({searchResults.blogs.length})
                    </h4>
                    <div className="space-y-1.5">
                      {searchResults.blogs.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelect('blog', item.slug || item.id)}
                          className="p-3 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/80 cursor-pointer flex items-center justify-between transition-colors group"
                        >
                          <div>
                            <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 group-hover:text-sky-600 dark:group-hover:text-sky-400">
                              {t(item.titleBn || item.title, item.title)}
                            </p>
                            <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
                              {t(item.excerptBn || item.excerpt, item.excerpt)}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Life Story */}
                {searchResults.story.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      {t('জীবন পরিক্রমা', 'Life Story')} ({searchResults.story.length})
                    </h4>
                    <div className="space-y-1.5">
                      {searchResults.story.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelect('story')}
                          className="p-3 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/80 cursor-pointer flex items-center justify-between transition-colors group"
                        >
                          <div>
                            <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                              {t(item.titleBn || item.title, item.title)} ({item.yearOrDate})
                            </p>
                            <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
                              {t(item.descriptionBn || item.description, item.description)}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gallery */}
                {searchResults.gallery.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Image className="w-3.5 h-3.5 text-purple-500" />
                      {t('ছবি ও মুহূর্ত', 'Gallery')} ({searchResults.gallery.length})
                    </h4>
                    <div className="space-y-1.5">
                      {searchResults.gallery.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelect('gallery')}
                          className="p-3 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/80 cursor-pointer flex items-center justify-between transition-colors group"
                        >
                          <div>
                            <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                              {t(item.titleBn || item.title, item.title)}
                            </p>
                            <p className="text-xs text-stone-500 dark:text-stone-400">
                              {item.category} • {item.date}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Creations */}
                {searchResults.creations.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                      {t('সৃষ্টিসমূহ', 'Creations')} ({searchResults.creations.length})
                    </h4>
                    <div className="space-y-1.5">
                      {searchResults.creations.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelect('creations')}
                          className="p-3 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/80 cursor-pointer flex items-center justify-between transition-colors group"
                        >
                          <div>
                            <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                              {t(item.titleBn || item.title, item.title)}
                            </p>
                            <p className="text-xs text-stone-500 dark:text-stone-400">
                              {item.category} • {item.date}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
