import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { StoryPage } from './pages/StoryPage';
import { EducationPage } from './pages/EducationPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CreationsPage } from './pages/CreationsPage';
import { GalleryPage } from './pages/GalleryPage';
import { VideosPage } from './pages/VideosPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { FutureGoalsPage } from './pages/FutureGoalsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';

import { Toast } from './components/common/Toast';
import { ProjectModal } from './components/common/ProjectModal';
import { ImageViewerModal } from './components/common/ImageViewerModal';
import { VideoModal } from './components/common/VideoModal';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { Project, GalleryItem, VideoItem } from './types';

function MainAppContent() {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [routeParam, setRouteParam] = useState<string | undefined>(undefined);

  // Global UI States
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  
  // Image Viewer State
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<Array<{ imageUrl: string; title: string; titleBn?: string; description?: string; descriptionBn?: string; category?: string; date?: string; location?: string }>>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Toast State
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    show: false,
    message: '',
    type: 'info',
  });

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ show: true, message, type });
  }, []);

  // Handle URL hash changes & back/forward buttons
  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash || '';
      const cleanHash = rawHash.replace(/^#\/?/, '').split('?')[0].trim();
      if (!cleanHash || cleanHash === '') {
        setCurrentRoute('home');
        setRouteParam(undefined);
      } else if (cleanHash.startsWith('blog/')) {
        setCurrentRoute('blog-post');
        setRouteParam(cleanHash.replace('blog/', ''));
      } else if (cleanHash === 'admin' || cleanHash === 'dashboard' || cleanHash === 'admin-panel') {
        setCurrentRoute('admin-dashboard');
        setRouteParam(undefined);
      } else if (cleanHash === 'login' || cleanHash === 'admin-login') {
        setCurrentRoute('admin-login');
        setRouteParam(undefined);
      } else {
        setCurrentRoute(cleanHash);
        setRouteParam(undefined);
      }
    };

    handleHash();
    window.addEventListener('popstate', handleHash);
    window.addEventListener('hashchange', handleHash);

    // Global keyboard shortcuts (Ctrl+K for search, Ctrl+Shift+A for admin)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        handleNavigate('admin-login');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handleHash);
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavigate = (route: string, param?: string) => {
    setCurrentRoute(route);
    setRouteParam(param);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let targetHash = '#/';
    if (route === 'home') {
      targetHash = '#/';
    } else if (route === 'blog-post' && param) {
      targetHash = `#/blog/${param}`;
    } else {
      targetHash = `#/${route}`;
    }

    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
  };

  // Lightbox Triggers
  const openSingleImage = (imageUrl: string, title: string) => {
    setGalleryImages([{ imageUrl, title }]);
    setCurrentImageIndex(0);
    setImageViewerOpen(true);
  };

  const openGallerySet = (items: GalleryItem[], index: number) => {
    setGalleryImages(items);
    setCurrentImageIndex(index);
    setImageViewerOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] dark:bg-[#0E1117] text-stone-900 dark:text-stone-100 font-sans selection:bg-emerald-500 selection:text-white transition-colors">
      
      {/* Top Navbar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main Page Area */}
      <main className="flex-1 w-full">
        {currentRoute === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenProjectModal={setActiveProject}
            onOpenGalleryModal={openGallerySet}
          />
        )}
        {currentRoute === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentRoute === 'story' && (
          <StoryPage
            onNavigate={handleNavigate}
            onOpenImageViewer={openSingleImage}
          />
        )}
        {currentRoute === 'education' && (
          <EducationPage
            onNavigate={handleNavigate}
            onOpenImageViewer={openSingleImage}
          />
        )}
        {currentRoute === 'projects' && (
          <ProjectsPage
            onNavigate={handleNavigate}
            onOpenProjectModal={setActiveProject}
          />
        )}
        {currentRoute === 'creations' && (
          <CreationsPage
            onNavigate={handleNavigate}
            onOpenImageViewer={openSingleImage}
          />
        )}
        {currentRoute === 'gallery' && (
          <GalleryPage
            onNavigate={handleNavigate}
            onOpenImageViewer={openGallerySet}
          />
        )}
        {currentRoute === 'videos' && (
          <VideosPage
            onNavigate={handleNavigate}
            onOpenVideoModal={setActiveVideo}
          />
        )}
        {currentRoute === 'favorites' && <FavoritesPage onNavigate={handleNavigate} />}
        {currentRoute === 'blog' && <BlogPage onNavigate={handleNavigate} />}
        {currentRoute === 'blog-post' && (
          <BlogPostPage
            slugOrId={routeParam || ''}
            onNavigate={handleNavigate}
          />
        )}
        {currentRoute === 'achievements' && (
          <AchievementsPage
            onNavigate={handleNavigate}
            onOpenImageViewer={openSingleImage}
          />
        )}
        {currentRoute === 'goals' && <FutureGoalsPage onNavigate={handleNavigate} />}
        {currentRoute === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
            showToast={showToast}
          />
        )}
        {(currentRoute === 'admin-login' || currentRoute === 'login') && (
          <AdminLoginPage
            onNavigate={handleNavigate}
            showToast={showToast}
          />
        )}
        {(currentRoute === 'admin-dashboard' || currentRoute === 'admin' || currentRoute === 'dashboard' || currentRoute === 'admin-panel') && (
          <AdminDashboardPage
            onNavigate={handleNavigate}
            showToast={showToast}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Bottom Bar */}
      <BottomNav currentRoute={currentRoute} onNavigate={handleNavigate} />

      {/* Global Modals */}
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      <ProjectModal
        project={activeProject}
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
      />

      <ImageViewerModal
        images={galleryImages}
        currentIndex={currentImageIndex}
        isOpen={imageViewerOpen}
        onClose={() => setImageViewerOpen(false)}
        onSelectIndex={setCurrentImageIndex}
      />

      <VideoModal
        video={activeVideo}
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
      />

      {/* Global Toast */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <DataProvider>
            <MainAppContent />
          </DataProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
