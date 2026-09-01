import React from 'react';
import { X, ExternalLink, Github, Calendar, Tag, CheckCircle2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const { t } = useLanguage();

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 max-w-3xl w-full rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden my-8"
        >
          {/* Header Image with close button */}
          <div className="relative h-64 sm:h-80 w-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
            <img
              src={project.coverImage}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
              aria-label="Close Project Details"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/80 backdrop-blur-xs text-white">
                  {project.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-xs text-white flex items-center gap-1">
                  {project.status === 'Completed' ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                  ) : (
                    <Clock className="w-3 h-3 text-amber-300" />
                  )}
                  {project.status}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white">
                {t(project.titleBn || project.title, project.title)}
              </h2>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6">
            <div>
              <h4 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-2">
                {t('প্রজেক্টের বিবরণ', 'Project Overview')}
              </h4>
              <p className="text-stone-700 dark:text-stone-300 text-base leading-relaxed">
                {t(project.descriptionBn || project.description, project.description)}
              </p>
            </div>

            {project.detailedDescription && (
              <div>
                <h4 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-2">
                  {t('কারিগরি বৈশিষ্ট্য ও আর্কিটেকচার', 'Technical Specifications')}
                </h4>
                <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800 text-sm text-stone-600 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                  {t(project.detailedDescriptionBn || project.detailedDescription, project.detailedDescription)}
                </div>
              </div>
            )}

            {/* Technologies */}
            <div>
              <h4 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                {t('ব্যবহৃত প্রযুক্তি', 'Technologies & Tools')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-medium rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Meta and Links */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                <Calendar className="w-4 h-4" />
                <span>{t('তৈরির সময়:', 'Created:')} {project.creationDate}</span>
              </div>

              <div className="flex items-center gap-3">
                {project.sourceCodeUrl && (
                  <a
                    href={project.sourceCodeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    {t('সোর্স কোড', 'Source Code')}
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t('লাইভ ডেমো', 'Live Demo')}
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
