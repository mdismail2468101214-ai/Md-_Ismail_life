import React, { useState } from 'react';
import {
  LogOut,
  Sparkles,
  User,
  Compass,
  GraduationCap,
  FolderGit2,
  Image,
  Video,
  Heart,
  BookOpen,
  Trophy,
  Target,
  Mail,
  Settings,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  ExternalLink,
  Eye,
  ArrowLeft,
  Search,
  CheckCircle2,
  Database,
  RefreshCw,
  ShieldCheck,
  UserPlus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import {
  LifeStory,
  Education,
  Project,
  Creation,
  GalleryItem,
  VideoItem,
  FavoriteItem,
  BlogPost,
  Achievement,
  FutureGoal,
  ContactMessage,
  MASTER_ADMIN_EMAIL
} from '../../types';

interface AdminDashboardPageProps {
  onNavigate: (route: string) => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate, showToast }) => {
  const { currentUser, logout, isAdmin } = useAuth();
  const {
    profile,
    lifeStory,
    education,
    projects,
    creations,
    gallery,
    videos,
    favorites,
    blogPosts,
    achievements,
    futureGoals,
    messages,
    settings,
    updateProfile,
    updateSettings,
    addDocument,
    updateDocument,
    deleteDocument,
    seedSampleData
  } = useData();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isSaving, setIsSaving] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  // Confirmation Dialog State
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => Promise<void>>(() => async () => {});
  const [confirmTitle, setConfirmTitle] = useState('');
  const [confirmMsg, setConfirmMsg] = useState('');

  // Item Editor Modal State
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorCollection, setEditorCollection] = useState<string>('');
  const [editorData, setEditorData] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState(profile);
  const [settingsForm, setSettingsForm] = useState(settings);
  const [newAdminEmail, setNewAdminEmail] = useState('');

  // If not admin, redirect to login
  if (!isAdmin) {
    onNavigate('admin-login');
    return null;
  }

  const handleLogout = async () => {
    await logout();
    showToast(t('সফলভাবে লগআউট হয়েছে', 'Logged out successfully'), 'info');
    onNavigate('home');
  };

  // Open Add/Edit Modal Helper
  const openEditor = (collection: string, item: any = null) => {
    setEditorCollection(collection);
    setIsEditing(!!item);
    setEditorData(item || getDefaultData(collection));
    setEditorOpen(true);
  };

  const getDefaultData = (collection: string) => {
    switch (collection) {
      case 'story':
        return {
          title: '',
          titleBn: '',
          yearOrDate: new Date().getFullYear().toString(),
          category: 'Childhood',
          description: '',
          descriptionBn: '',
          imageUrl: '',
          location: '',
        };
      case 'education':
        return {
          institution: '',
          institutionBn: '',
          level: 'Bachelor of Science (B.Sc)',
          levelBn: '',
          groupOrSubject: 'Computer Science and Engineering',
          groupOrSubjectBn: '',
          startYear: '2022',
          endYear: 'Present',
          result: 'CGPA 3.85 / 4.00',
          description: '',
          descriptionBn: '',
          certificateUrl: '',
        };
      case 'projects':
        return {
          title: '',
          titleBn: '',
          category: 'Web Application',
          coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
          description: '',
          descriptionBn: '',
          technologies: ['React', 'TypeScript', 'Tailwind CSS'],
          demoUrl: '',
          sourceCodeUrl: '',
          featured: true,
          status: 'Completed',
          creationDate: '2025',
          keyFeatures: ['Feature 1', 'Feature 2'],
        };
      case 'creations':
        return {
          title: '',
          titleBn: '',
          category: 'Websites',
          coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
          description: '',
          descriptionBn: '',
          toolsUsed: ['Figma', 'Photoshop'],
          linkUrl: '',
          date: '2025',
        };
      case 'gallery':
        return {
          title: '',
          titleBn: '',
          category: 'Nature',
          imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
          description: '',
          descriptionBn: '',
          date: '2025',
          location: 'Bangladesh',
        };
      case 'videos':
        return {
          title: '',
          titleBn: '',
          category: 'Learning',
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
          description: '',
          duration: '10:00',
          date: '2025',
        };
      case 'favorites':
        return {
          title: '',
          titleBn: '',
          category: 'Book',
          authorOrCreator: '',
          whyFavorite: '',
          whyFavoriteBn: '',
          imageUrl: '',
          linkUrl: '',
        };
      case 'blogs':
        return {
          title: '',
          titleBn: '',
          slug: '',
          category: 'Tech',
          coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
          excerpt: '',
          excerptBn: '',
          content: '## ভূমিকা\n\nএখানে বিস্তারিত আর্টিকেল লিখুন...',
          contentBn: '',
          publishedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          readTime: '5 min read',
          published: true,
          tags: ['tech', 'thoughts'],
        };
      case 'achievements':
        return {
          title: '',
          titleBn: '',
          category: 'Academic',
          issuer: '',
          issuerBn: '',
          dateOrYear: '2025',
          description: '',
          descriptionBn: '',
          certificateImageUrl: '',
        };
      case 'goals':
        return {
          title: '',
          titleBn: '',
          category: 'Career / Tech',
          description: '',
          descriptionBn: '',
          targetDate: '2026',
          progressPercentage: 50,
          status: 'In Progress',
          actionSteps: ['Step 1', 'Step 2'],
        };
      default:
        return {};
    }
  };

  const handleSaveEditor = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const dataToSave = { ...editorData };

      // Normalization and fallback
      if (!dataToSave.title && dataToSave.titleBn) dataToSave.title = dataToSave.titleBn;
      if (!dataToSave.titleBn && dataToSave.title) dataToSave.titleBn = dataToSave.title;
      if (!dataToSave.institution && dataToSave.institutionBn) dataToSave.institution = dataToSave.institutionBn;
      if (!dataToSave.institutionBn && dataToSave.institution) dataToSave.institutionBn = dataToSave.institution;
      if (!dataToSave.description && dataToSave.descriptionBn) dataToSave.description = dataToSave.descriptionBn;
      if (!dataToSave.descriptionBn && dataToSave.description) dataToSave.descriptionBn = dataToSave.description;
      if (editorCollection === 'blogs' && !dataToSave.slug) {
        dataToSave.slug = ((dataToSave.title || dataToSave.titleBn || 'post')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-') + '-' + Date.now()).replace(/^-+|-+$/g, '');
      }

      if (isEditing && dataToSave.id) {
        await updateDocument(editorCollection, dataToSave.id, dataToSave);
        showToast(t('সফলভাবে আপডেট করা হয়েছে!', 'Item updated successfully!'), 'success');
      } else {
        await addDocument(editorCollection, dataToSave);
        showToast(t('সফলভাবে যোগ করা হয়েছে!', 'Item added successfully!'), 'success');
      }
      setEditorOpen(false);
    } catch (err: any) {
      console.error('Save error in handleSaveEditor:', err);
      showToast(t(`সংরক্ষণে সমস্যা হয়েছে: ${err.message || 'Error'}`, `Failed to save: ${err.message || 'Error'}`), 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    try {
      await seedSampleData();
      showToast(t('ক্লাউড ডাটাবেসে সফলভাবে সকল তথ্য সংরক্ষিত হয়েছে!', 'All sample data synced to cloud database!'), 'success');
    } catch (err: any) {
      console.error('Seed error:', err);
      showToast(t('ডাটাবেসে তথ্য সংরক্ষণে ত্রুটি দেখা দিয়েছে', 'Failed to seed database'), 'error');
    } finally {
      setIsSeeding(false);
    }
  };

  const handleDeleteItem = (collection: string, id: string, title: string) => {
    setConfirmTitle(t('আইটেমটি ডিলিট করতে চান?', 'Delete Item?'));
    setConfirmMsg(t(`"${title}" মুছে ফেলা হবে। আপনি কি নিশ্চিত?`, `"${title}" will be permanently removed. Are you sure?`));
    setConfirmAction(() => async () => {
      await deleteDocument(collection, id);
      showToast(t('আইটেমটি ডিলিট করা হয়েছে।', 'Item deleted successfully.'), 'info');
      setConfirmOpen(false);
    });
    setConfirmOpen(true);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(profileForm);
      showToast(t('প্রোফাইল তথ্য সফলভাবে সংরক্ষিত হয়েছে!', 'Profile saved successfully!'), 'success');
    } catch (err) {
      showToast(t('প্রোফাইল আপডেট ব্যর্থ হয়েছে', 'Profile update failed'), 'error');
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSettings(settingsForm);
      showToast(t('সাইট সেটিংস সংরক্ষিত হয়েছে!', 'Settings updated successfully!'), 'success');
    } catch (err) {
      showToast(t('সেটিংস আপডেট ব্যর্থ হয়েছে', 'Settings update failed'), 'error');
    }
  };

  const currentAuthorizedAdmins = Array.from(
    new Set([
      MASTER_ADMIN_EMAIL.toLowerCase(),
      ...(settingsForm.authorizedAdmins || []).map((e) => e.trim().toLowerCase())
    ])
  );

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newAdminEmail.trim().toLowerCase();
    if (!clean || !clean.includes('@')) {
      showToast(t('সঠিক ইমেইল অ্যাড্রেস লিখুন', 'Enter a valid email address'), 'error');
      return;
    }
    if (currentAuthorizedAdmins.includes(clean)) {
      showToast(t('এই ইমেইল ইতিমধ্যে অনুমোদিত তালিকায় আছে', 'This email is already authorized'), 'info');
      setNewAdminEmail('');
      return;
    }
    const updated = [...currentAuthorizedAdmins, clean];
    const newSettings = { ...settingsForm, authorizedAdmins: updated };
    setSettingsForm(newSettings);
    setNewAdminEmail('');
    try {
      await updateSettings(newSettings);
      showToast(t(`"${clean}" কে অ্যাডমিন হিসেবে অনুমতি দেওয়া হয়েছে!`, `Admin access granted to "${clean}"!`), 'success');
    } catch (err) {
      showToast(t('অনুমতি সংরক্ষণে সমস্যা হয়েছে', 'Failed to save admin permission'), 'error');
    }
  };

  const handleRemoveAdmin = async (targetEmail: string) => {
    const clean = targetEmail.trim().toLowerCase();
    if (clean === MASTER_ADMIN_EMAIL.toLowerCase()) {
      showToast(t('প্রধান অ্যাডমিন (মালিক) এর অনুমতি বাতিল করা সম্ভব নয়', 'Master Admin (Owner) cannot be removed'), 'error');
      return;
    }
    const updated = currentAuthorizedAdmins.filter((e) => e !== clean);
    const newSettings = { ...settingsForm, authorizedAdmins: updated };
    setSettingsForm(newSettings);
    try {
      await updateSettings(newSettings);
      showToast(t(`"${clean}" এর অ্যাডমিন অনুমতি প্রত্যাহার করা হয়েছে।`, `Admin access revoked for "${clean}".`), 'info');
    } catch (err) {
      showToast(t('আপডেট ব্যর্থ হয়েছে', 'Failed to update'), 'error');
    }
  };

  const navTabs = [
    { id: 'overview', label: 'ওভারভিউ', labelEn: 'Overview', icon: Sparkles },
    { id: 'profile', label: 'প্রোফাইল', labelEn: 'Profile', icon: User },
    { id: 'story', label: 'জীবনগাথা', labelEn: 'Story', count: lifeStory.length, icon: Compass },
    { id: 'education', label: 'শিক্ষা', labelEn: 'Education', count: education.length, icon: GraduationCap },
    { id: 'projects', label: 'প্রজেক্টস', labelEn: 'Projects', count: projects.length, icon: FolderGit2 },
    { id: 'creations', label: 'সৃষ্টিসমূহ', labelEn: 'Creations', count: creations.length, icon: Sparkles },
    { id: 'gallery', label: 'গ্যালারি', labelEn: 'Gallery', count: gallery.length, icon: Image },
    { id: 'videos', label: 'ভিডিও', labelEn: 'Videos', count: videos.length, icon: Video },
    { id: 'favorites', label: 'পছন্দ', labelEn: 'Favorites', count: favorites.length, icon: Heart },
    { id: 'blogs', label: 'ব্লগ ও লেখা', labelEn: 'Blogs', count: blogPosts.length, icon: BookOpen },
    { id: 'achievements', label: 'অর্জনসমূহ', labelEn: 'Achievements', count: achievements.length, icon: Trophy },
    { id: 'goals', label: 'ভবিষ্যৎ লক্ষ্য', labelEn: 'Goals', count: futureGoals.length, icon: Target },
    { id: 'messages', label: 'মেসেজ ইনবক্স', labelEn: 'Messages', count: messages.length, icon: Mail },
    { id: 'settings', label: 'সেটিংস', labelEn: 'Settings', icon: Settings },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 pb-24">
      
      {/* Top Admin Bar */}
      <div className="p-4 sm:p-6 rounded-3xl bg-stone-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-sans">
              {t('অ্যাডমিন কন্ট্রোল সেন্টার', 'Admin Control Panel')}
            </h1>
            <p className="text-xs text-stone-400">
              {t('লগইন আছেন:', 'Logged in as:')} {currentUser?.email || 'admin@myjourney.com'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('ওয়েবসাইট দেখুন', 'View Website')}</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('লগআউট', 'Sign Out')}</span>
          </button>
        </div>
      </div>

      {/* Admin Tabs Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                active
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t(tab.label, tab.labelEn)}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  active ? 'bg-emerald-700 text-emerald-100' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'প্রজেক্টস', labelEn: 'Projects', count: projects.length, icon: FolderGit2, color: 'text-emerald-500', tab: 'projects' },
              { label: 'স্মৃতিগাথা', labelEn: 'Stories', count: lifeStory.length, icon: Compass, color: 'text-amber-500', tab: 'story' },
              { label: 'ফটো গ্যালারি', labelEn: 'Photos', count: gallery.length, icon: Image, color: 'text-purple-500', tab: 'gallery' },
              { label: 'ব্লগ পোস্ট', labelEn: 'Articles', count: blogPosts.length, icon: BookOpen, color: 'text-sky-500', tab: 'blogs' },
              { label: 'সৃষ্টিসমূহ', labelEn: 'Creations', count: creations.length, icon: Sparkles, color: 'text-rose-500', tab: 'creations' },
              { label: 'ইনবক্স বার্তা', labelEn: 'Messages', count: messages.length, icon: Mail, color: 'text-teal-500', tab: 'messages' },
            ].map((stat, sIdx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={sIdx}
                  onClick={() => setActiveTab(stat.tab)}
                  className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs hover:border-emerald-500 cursor-pointer transition-all space-y-2"
                >
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                  <p className="text-2xl font-extrabold text-stone-900 dark:text-white">{stat.count}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">{t(stat.label, stat.labelEn)}</p>
                </div>
              );
            })}
          </div>

          {/* Quick Actions Panel */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-stone-900 dark:text-white">
              {t('দ্রুত কনটেন্ট যুক্ত করুন', 'Quick Add Shortcuts')}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {[
                { name: 'নতুন প্রজেক্ট', nameEn: 'Add Project', col: 'projects' },
                { name: 'নতুন স্মৃতি / গল্প', nameEn: 'Add Story', col: 'story' },
                { name: 'নতুন ব্লগ পোস্ট', nameEn: 'Add Blog Post', col: 'blogs' },
                { name: 'নতুন ছবি', nameEn: 'Add Photo', col: 'gallery' },
                { name: 'নতুন সৃষ্টি', nameEn: 'Add Creation', col: 'creations' },
                { name: 'নতুন অর্জন', nameEn: 'Add Achievement', col: 'achievements' },
                { name: 'নতুন লক্ষ্য', nameEn: 'Add Goal', col: 'goals' },
              ].map((btn, bIdx) => (
                <button
                  key={bIdx}
                  onClick={() => openEditor(btn.col)}
                  className="px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-emerald-200 dark:border-emerald-800"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t(btn.name, btn.nameEn)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Database Cloud Sync Panel */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800/60 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h4 className="font-bold text-sm text-stone-900 dark:text-white">
                  {t('ক্লাউড ডাটাবেস ব্যাকআপ ও প্রাথমিক ডাটা সিঙ্ক', 'Cloud Database Sync & Initial Data')}
                </h4>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                {t('সমস্ত প্রাথমিক প্রজেক্ট, ব্লগ, শিক্ষা ও অর্জন সরাসরি ফায়ারবেস ক্লাউড ডাটাবেসে সেভ করতে ক্লিক করুন।', 'Sync all portfolio initial projects, stories, and blogs directly to the Firebase Cloud Firestore database.')}
              </p>
            </div>
            <button
              onClick={handleSeedDatabase}
              disabled={isSeeding}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap shadow-xs disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : ''}`} />
              <span>{isSeeding ? t('সিঙ্ক হচ্ছে...', 'Syncing...') : t('ডাটাবেসে সিঙ্ক করুন', 'Sync to Cloud Database')}</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: PROFILE EDIT */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-white">{t('ব্যক্তিগত পরিচিতি ও প্রোফাইল', 'Edit Profile & Info')}</h2>
              <p className="text-xs text-stone-500">{t('নাম, বায়ো, ছবি, ঠিকানা ও সোশ্যাল লিংক আপডেট করুন', 'Update your personal bio, avatars, location, and social links')}</p>
            </div>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs"
            >
              {t('প্রোফাইল সংরক্ষণ করুন', 'Save Profile')}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-stone-700 dark:text-stone-300">নাম (বাংলা)</label>
              <input
                type="text"
                value={profileForm.nameBn}
                onChange={(e) => setProfileForm({ ...profileForm, nameBn: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Name (English)</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-stone-700 dark:text-stone-300">পদবি / ট্যাগলাইন (বাংলা)</label>
              <input
                type="text"
                value={profileForm.titleBn}
                onChange={(e) => setProfileForm({ ...profileForm, titleBn: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Professional Title (English)</label>
              <input
                type="text"
                value={profileForm.title}
                onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-stone-700 dark:text-stone-300">প্রোফাইল ছবির URL (Avatar URL)</label>
              <input
                type="text"
                value={profileForm.avatarUrl}
                onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-stone-700 dark:text-stone-300">ইমেইল (Email)</label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-stone-700 dark:text-stone-300">ব্যক্তিগত মূলমন্ত্র / Motto</label>
            <input
              type="text"
              value={profileForm.mottoBn}
              onChange={(e) => setProfileForm({ ...profileForm, mottoBn: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-stone-700 dark:text-stone-300">সংক্ষিপ্ত পরিচিতি (বাংলা)</label>
            <textarea
              rows={3}
              value={profileForm.shortBioBn}
              onChange={(e) => setProfileForm({ ...profileForm, shortBioBn: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-stone-700 dark:text-stone-300">সম্পূর্ণ পরিচিতি ও মূল্যবোধ (Full Bio)</label>
            <textarea
              rows={5}
              value={profileForm.fullBioBn}
              onChange={(e) => setProfileForm({ ...profileForm, fullBioBn: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
            />
          </div>

          {/* Social Links Form */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-4">
            <h3 className="font-bold text-sm text-stone-900 dark:text-white">সোশ্যাল মিডিয়া ও পোর্টফোলিও লিংক</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="GitHub URL"
                value={profileForm.socialLinks.github || ''}
                onChange={(e) => setProfileForm({
                  ...profileForm,
                  socialLinks: { ...profileForm.socialLinks, github: e.target.value }
                })}
                className="px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs"
              />
              <input
                type="text"
                placeholder="LinkedIn URL"
                value={profileForm.socialLinks.linkedin || ''}
                onChange={(e) => setProfileForm({
                  ...profileForm,
                  socialLinks: { ...profileForm.socialLinks, linkedin: e.target.value }
                })}
                className="px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs"
              />
              <input
                type="text"
                placeholder="Facebook URL"
                value={profileForm.socialLinks.facebook || ''}
                onChange={(e) => setProfileForm({
                  ...profileForm,
                  socialLinks: { ...profileForm.socialLinks, facebook: e.target.value }
                })}
                className="px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs"
              />
              <input
                type="text"
                placeholder="Twitter URL"
                value={profileForm.socialLinks.twitter || ''}
                onChange={(e) => setProfileForm({
                  ...profileForm,
                  socialLinks: { ...profileForm.socialLinks, twitter: e.target.value }
                })}
                className="px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs"
              />
              <input
                type="text"
                placeholder="YouTube URL"
                value={profileForm.socialLinks.youtube || ''}
                onChange={(e) => setProfileForm({
                  ...profileForm,
                  socialLinks: { ...profileForm.socialLinks, youtube: e.target.value }
                })}
                className="px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs"
              />
              <input
                type="text"
                placeholder="Telegram URL"
                value={profileForm.socialLinks.telegram || ''}
                onChange={(e) => setProfileForm({
                  ...profileForm,
                  socialLinks: { ...profileForm.socialLinks, telegram: e.target.value }
                })}
                className="px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs"
              />
            </div>
          </div>
        </form>
      )}

      {/* TAB CONTENT: GENERIC CRUD LISTINGS (Story, Education, Projects, Creations, Gallery, Videos, Favorites, Blogs, Achievements, Goals) */}
      {[
        { tabId: 'story', title: 'জীবন পরিক্রমা ও টাইমলাইন', col: 'story', items: lifeStory },
        { tabId: 'education', title: 'শিক্ষাজীবন ও ডিগ্রি', col: 'education', items: education },
        { tabId: 'projects', title: 'প্রজেক্ট পোর্টফোলিও', col: 'projects', items: projects },
        { tabId: 'creations', title: 'সৃষ্টিসমূহ ও ডিজাইন', col: 'creations', items: creations },
        { tabId: 'gallery', title: 'ফটো গ্যালারি', col: 'gallery', items: gallery },
        { tabId: 'videos', title: 'ভিডিও সংগ্রহ', col: 'videos', items: videos },
        { tabId: 'favorites', title: 'পছন্দের বিষয়সমূহ', col: 'favorites', items: favorites },
        { tabId: 'blogs', title: 'ব্লগ ও চিন্তাভাবনা', col: 'blogs', items: blogPosts },
        { tabId: 'achievements', title: 'অর্জন ও সনদপত্র', col: 'achievements', items: achievements },
        { tabId: 'goals', title: 'ভবিষ্যৎ লক্ষ্য ও রোডম্যাপ', col: 'goals', items: futureGoals },
      ].map((sec) => {
        if (activeTab !== sec.tabId) return null;
        return (
          <div key={sec.tabId} className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-stone-900 dark:text-white">{sec.title}</h2>
                <p className="text-xs text-stone-500">মোট আইটেম: {sec.items.length} টি</p>
              </div>
              <button
                onClick={() => openEditor(sec.col)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs w-fit"
              >
                <Plus className="w-4 h-4" />
                <span>{t('নতুন যোগ করুন', 'Add New')}</span>
              </button>
            </div>

            <div className="space-y-3">
              {sec.items.map((item: any) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 flex items-center justify-between gap-4 hover:border-emerald-500/50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {(item.imageUrl || item.coverImage || item.thumbnailUrl) && (
                      <img
                        src={item.imageUrl || item.coverImage || item.thumbnailUrl}
                        alt="thumb"
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-xl object-cover shrink-0 bg-stone-200"
                      />
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300">
                          {item.category || item.level || item.status || 'Item'}
                        </span>
                        {item.yearOrDate && <span className="text-xs text-stone-400">{item.yearOrDate}</span>}
                        {item.date && <span className="text-xs text-stone-400">{item.date}</span>}
                      </div>
                      <h4 className="font-bold text-sm text-stone-900 dark:text-white truncate">
                        {item.titleBn || item.title || item.institutionBn || item.institution}
                      </h4>
                      <p className="text-xs text-stone-500 line-clamp-1">
                        {item.descriptionBn || item.description || item.whyFavoriteBn || item.excerptBn || ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => openEditor(sec.col, item)}
                      className="p-2 rounded-xl hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(sec.col, item.id, item.titleBn || item.title || 'Item')}
                      className="p-2 rounded-xl hover:bg-rose-100 dark:hover:bg-rose-950/60 text-rose-600 dark:text-rose-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* TAB CONTENT: INBOX MESSAGES */}
      {activeTab === 'messages' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-6">
          <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">{t('যোগাযোগ ফর্ম থেকে আসা বার্তাসমূহ', 'Inbox Messages')}</h2>
            <p className="text-xs text-stone-500">মোট বার্তা: {messages.length} টি</p>
          </div>

          {messages.length === 0 ? (
            <p className="text-sm text-stone-500 text-center py-10">কোনো নতুন বার্তা নেই।</p>
          ) : (
            <div className="space-y-3">
              {messages.map((msg: ContactMessage) => (
                <div
                  key={msg.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    msg.read
                      ? 'bg-stone-50 dark:bg-stone-800/40 border-stone-200 dark:border-stone-800'
                      : 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-sm text-stone-900 dark:text-white">{msg.name}</h4>
                        <span className="text-xs text-stone-400">({msg.email})</span>
                        {!msg.read && (
                          <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-600 text-white">NEW</span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">বিষয়: {msg.subject}</p>
                      <p className="text-xs text-stone-600 dark:text-stone-400 whitespace-pre-line leading-relaxed">{msg.message}</p>
                      <p className="text-[10px] text-stone-400 mt-2">{msg.createdAt}</p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {!msg.read && (
                        <button
                          onClick={() => updateDocument('messages', msg.id, { read: true })}
                          className="px-2.5 py-1 text-xs rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-medium hover:bg-emerald-200"
                        >
                          পড়া হয়েছে
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteItem('messages', msg.id, msg.subject)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: GENERAL SETTINGS */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-white">{t('ওয়েবসাইট সেটিংস ও এসইও', 'Website Settings & Quotes')}</h2>
              <p className="text-xs text-stone-500">{t('ফুটার বাণী, সাইটের শিরোনাম ও সাধারণ কনফিগারেশন', 'Configure footer quotes, branding text, and SEO defaults')}</p>
            </div>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs"
            >
              {t('সেটিংস সংরক্ষণ', 'Save Settings')}
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-stone-700 dark:text-stone-300">ফুটার বাণী (বাংলা)</label>
              <textarea
                rows={2}
                value={settingsForm.footerQuoteBn}
                onChange={(e) => setSettingsForm({ ...settingsForm, footerQuoteBn: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Footer Quote (English)</label>
              <textarea
                rows={2}
                value={settingsForm.footerQuote}
                onChange={(e) => setSettingsForm({ ...settingsForm, footerQuote: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
              />
            </div>
          </div>

          {/* Admin Access & Permission Security Management */}
          <div className="pt-6 border-t border-stone-200 dark:border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>{t('অ্যাডমিন অ্যাক্সেস ও অনুমতি ব্যবস্থাপনা', 'Admin Access & Permissions')}</span>
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {t(
                    'শুধুমাত্র তালিকাভুক্ত ইমেইলসমূহ অ্যাডমিন প্যানেলে লগইন করতে পারে। আপনি নতুন কাউকে অনুমতি দিতে বা অনুমতি বাতিল করতে পারেন।',
                    'Only whitelisted emails can log in as Admin. You can grant or revoke access anytime.'
                  )}
                </p>
              </div>
            </div>

            {/* List of authorized admins */}
            <div className="space-y-2">
              {currentAuthorizedAdmins.map((admEmail, aIdx) => {
                const isMaster = admEmail.toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase();
                return (
                  <div
                    key={aIdx}
                    className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <p className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-white truncate">
                          {admEmail}
                        </p>
                        <p className="text-[11px] text-stone-400">
                          {isMaster
                            ? t('প্রধান মালিক ও সুপার অ্যাডমিন (স্থায়ী)', 'Owner & Super Admin (Permanent)')
                            : t('অনুমতিপ্রাপ্ত সহকারী অ্যাডমিন', 'Authorized Admin')}
                        </p>
                      </div>
                    </div>

                    {isMaster ? (
                      <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        {t('মালিক', 'OWNER')}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleRemoveAdmin(admEmail)}
                        className="px-2.5 py-1 rounded-xl text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors flex items-center gap-1 font-medium border border-rose-200 dark:border-rose-900/50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{t('অনুমতি বাতিল', 'Revoke')}</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Add New Authorized Admin Form */}
            <div className="pt-2">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1.5">
                {t('নতুন কাউকে অ্যাডমিন অনুমতি দিন:', 'Grant Admin Access to a new Email:')}
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm focus:outline-hidden focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={handleAddAdmin}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs whitespace-nowrap"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{t('অনুমোদন দিন', 'Grant Access')}</span>
                </button>
              </div>
            </div>
          </div>

        </form>
      )}

      {/* Dynamic Item Editor Modal */}
      {editorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/70 backdrop-blur-xs">
          <div className="relative z-10 max-w-2xl w-full rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4 mb-4">
              <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                {isEditing ? t('আইটেম সম্পাদনা করুন', 'Edit Item') : t('নতুন আইটেম যোগ করুন', 'Add New Item')}
              </h3>
              <button
                onClick={() => setEditorOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditor} className="space-y-4">
              {/* Title / Institution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-700 dark:text-stone-300">শিরোনাম (বাংলা)</label>
                  <input
                    type="text"
                    required
                    value={editorData.titleBn || editorData.institutionBn || ''}
                    onChange={(e) => {
                      if (editorCollection === 'education') setEditorData({ ...editorData, institutionBn: e.target.value });
                      else setEditorData({ ...editorData, titleBn: e.target.value });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Title / Name (English)</label>
                  <input
                    type="text"
                    required
                    value={editorData.title || editorData.institution || ''}
                    onChange={(e) => {
                      if (editorCollection === 'education') setEditorData({ ...editorData, institution: e.target.value });
                      else setEditorData({ ...editorData, title: e.target.value });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                  />
                </div>
              </div>

              {/* Category / Level */}
              {editorData.category !== undefined && (
                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-700 dark:text-stone-300">ক্যাটাগরি (Category)</label>
                  <input
                    type="text"
                    value={editorData.category || ''}
                    onChange={(e) => setEditorData({ ...editorData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                  />
                </div>
              )}

              {/* Date / Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(editorData.yearOrDate !== undefined || editorData.date !== undefined || editorData.dateOrYear !== undefined) && (
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700 dark:text-stone-300">বছর বা তারিখ (Year / Date)</label>
                    <input
                      type="text"
                      value={editorData.yearOrDate || editorData.date || editorData.dateOrYear || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (editorData.yearOrDate !== undefined) setEditorData({ ...editorData, yearOrDate: val });
                        else if (editorData.date !== undefined) setEditorData({ ...editorData, date: val });
                        else if (editorData.dateOrYear !== undefined) setEditorData({ ...editorData, dateOrYear: val });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                    />
                  </div>
                )}
                {editorData.location !== undefined && (
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700 dark:text-stone-300">স্থান (Location)</label>
                    <input
                      type="text"
                      value={editorData.location || ''}
                      onChange={(e) => setEditorData({ ...editorData, location: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                    />
                  </div>
                )}
              </div>

              {/* Image URL / Video URL */}
              {(editorData.imageUrl !== undefined || editorData.coverImage !== undefined || editorData.videoUrl !== undefined) && (
                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-700 dark:text-stone-300">ছবির লিংক / Cover / Video URL</label>
                  <input
                    type="text"
                    value={editorData.imageUrl || editorData.coverImage || editorData.videoUrl || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editorData.imageUrl !== undefined) setEditorData({ ...editorData, imageUrl: val });
                      else if (editorData.coverImage !== undefined) setEditorData({ ...editorData, coverImage: val });
                      else if (editorData.videoUrl !== undefined) setEditorData({ ...editorData, videoUrl: val });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                  />
                </div>
              )}

              {/* Progress Percentage for Goals */}
              {editorData.progressPercentage !== undefined && (
                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-700 dark:text-stone-300">অগ্রগতি ({editorData.progressPercentage}%)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={editorData.progressPercentage}
                    onChange={(e) => setEditorData({ ...editorData, progressPercentage: Number(e.target.value) })}
                    className="w-full accent-emerald-600"
                  />
                </div>
              )}

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700 dark:text-stone-300">বিস্তারিত বিবরণ (Description / Content)</label>
                <textarea
                  rows={4}
                  value={editorData.descriptionBn || editorData.description || editorData.contentBn || editorData.content || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (editorCollection === 'blogs') setEditorData({ ...editorData, contentBn: val, content: val });
                    else setEditorData({ ...editorData, descriptionBn: val, description: val });
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-200 dark:border-stone-800">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => setEditorOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300 disabled:opacity-50"
                >
                  {t('বাতিল', 'Cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs flex items-center gap-2 disabled:opacity-50"
                >
                  {isSaving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>{isSaving ? t('সংরক্ষণ হচ্ছে...', 'Saving...') : t('সংরক্ষণ করুন', 'Save Changes')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmOpen}
        title={confirmTitle}
        message={confirmMsg}
        confirmLabel={t('ডিলিট করুন', 'Delete')}
        cancelLabel={t('বাতিল', 'Cancel')}
        isDanger={true}
        onConfirm={confirmAction}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
};
