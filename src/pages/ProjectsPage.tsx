import React, { useState, useMemo } from 'react';
import {
  FolderGit2,
  Search,
  ExternalLink,
  Github,
  Tag,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import { Project } from '../types';

interface ProjectsPageProps {
  onNavigate: (route: string) => void;
  onOpenProjectModal: (project: Project) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate, onOpenProjectModal }) => {
  const { projects } = useData();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'All', label: 'সকল প্রজেক্ট', labelEn: 'All Projects' },
    { id: 'Web Application', label: 'ওয়েব অ্যাপস', labelEn: 'Web Apps' },
    { id: 'Full-Stack', label: 'ফুল-স্ট্যাক', labelEn: 'Full-Stack' },
    { id: 'AI & Bot', label: 'এআই ও বট', labelEn: 'AI & Bots' },
    { id: 'Open Source', label: 'ওপেন সোর্স', labelEn: 'Open Source' },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const matchCat = selectedCategory === 'All' || proj.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        proj.title.toLowerCase().includes(q) ||
        (proj.titleBn && proj.titleBn.toLowerCase().includes(q)) ||
        proj.description.toLowerCase().includes(q) ||
        proj.technologies.some((tech) => tech.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8 pb-24">
      <Breadcrumbs
        items={[{ label: 'Projects', labelBn: 'প্রজেক্ট পোর্টফোলিও' }]}
        onHomeClick={() => onNavigate('home')}
      />

      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>{t('সফটওয়্যার ও উদ্ভাবন', 'Software & Innovations')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white font-sans">
          {t('আমার প্রজেক্ট পোর্টফোলিও', 'Project Portfolio')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          {t('বাস্তব সমস্যার সমাধানে তৈরি আধুনিক ওয়েব অ্যাপ্লিকেশন, এআই টুলস এবং ওপেন সোর্স প্রজেক্ট।', 'Full-stack web applications, AI integrations, tools, and platforms engineered with modern stacks.')}
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
                  ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {t(cat.label, cat.labelEn)}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('প্রজেক্ট বা প্রযুক্তি খুঁজুন...', 'Search projects, tech...')}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Project Cards Grid */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          title={t('কোনো প্রজেক্ট পাওয়া যায়নি।', 'No projects found.')}
          description={t('সার্চ ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।', 'Try adjusting your search query or category filter.')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onOpenProjectModal(proj)}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Cover */}
                <div className="relative h-48 w-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                  <img
                    src={proj.coverImage}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-black/60 backdrop-blur-md text-white">
                    {proj.category}
                  </span>

                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[11px] font-medium bg-white/90 dark:bg-stone-900/90 text-stone-800 dark:text-stone-200 flex items-center gap-1">
                    {proj.status === 'Completed' ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <Clock className="w-3 h-3 text-amber-500" />
                    )}
                    {proj.status}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-lg text-stone-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {t(proj.titleBn || proj.title, proj.title)}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                    {t(proj.descriptionBn || proj.description, proj.description)}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.technologies.slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {proj.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] rounded-md bg-stone-100 dark:bg-stone-800 text-stone-400">
                        +{proj.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Links */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
                  <span>{proj.creationDate}</span>
                  <div className="flex items-center gap-3">
                    {proj.sourceCodeUrl && (
                      <a
                        href={proj.sourceCodeUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 hover:text-stone-900 dark:hover:text-white transition-colors"
                        title="Source Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {proj.demoUrl && (
                      <a
                        href={proj.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold group-hover:underline flex items-center gap-0.5">
                      {t('বিস্তারিত', 'View')}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
