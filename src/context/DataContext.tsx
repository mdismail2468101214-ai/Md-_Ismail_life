import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  Profile,
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
  SiteSettings
} from '../types';
import {
  subscribeProfile,
  subscribeLifeStory,
  subscribeEducation,
  subscribeProjects,
  subscribeCreations,
  subscribeGallery,
  subscribeVideos,
  subscribeFavorites,
  subscribeBlogPosts,
  subscribeAchievements,
  subscribeFutureGoals,
  subscribeSiteSettings,
  subscribeContactMessages,
  updateProfile as updateProfileService,
  updateSiteSettings as updateSettingsService,
  addGenericDocument,
  updateGenericDocument,
  deleteGenericDocument,
  seedAllDataToFirestore
} from '../services/firestoreService';
import {
  INITIAL_PROFILE,
  INITIAL_LIFE_STORY,
  INITIAL_EDUCATION,
  INITIAL_PROJECTS,
  INITIAL_CREATIONS,
  INITIAL_GALLERY,
  INITIAL_VIDEOS,
  INITIAL_FAVORITES,
  INITIAL_BLOG_POSTS,
  INITIAL_ACHIEVEMENTS,
  INITIAL_FUTURE_GOALS,
  INITIAL_SETTINGS
} from '../data/initialData';

interface DataContextType {
  profile: Profile;
  lifeStory: LifeStory[];
  education: Education[];
  projects: Project[];
  creations: Creation[];
  gallery: GalleryItem[];
  videos: VideoItem[];
  favorites: FavoriteItem[];
  blogPosts: BlogPost[];
  achievements: Achievement[];
  futureGoals: FutureGoal[];
  messages: ContactMessage[];
  settings: SiteSettings;
  loading: boolean;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  updateSettings: (data: Partial<SiteSettings>) => Promise<void>;
  addDocument: (collectionKey: string, data: any) => Promise<string>;
  updateDocument: (collectionKey: string, id: string, data: any) => Promise<void>;
  deleteDocument: (collectionKey: string, id: string) => Promise<void>;
  seedSampleData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>(INITIAL_PROFILE);
  const [lifeStory, setLifeStory] = useState<LifeStory[]>(INITIAL_LIFE_STORY);
  const [education, setEducation] = useState<Education[]>(INITIAL_EDUCATION);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [creations, setCreations] = useState<Creation[]>(INITIAL_CREATIONS);
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [videos, setVideos] = useState<VideoItem[]>(INITIAL_VIDEOS);
  const [favorites, setFavorites] = useState<FavoriteItem[]>(INITIAL_FAVORITES);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [futureGoals, setFutureGoals] = useState<FutureGoal[]>(INITIAL_FUTURE_GOALS);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubs: Array<() => void> = [];

    try {
      unsubs.push(subscribeProfile(setProfile));
      unsubs.push(subscribeLifeStory(setLifeStory));
      unsubs.push(subscribeEducation(setEducation));
      unsubs.push(subscribeProjects(setProjects));
      unsubs.push(subscribeCreations(setCreations));
      unsubs.push(subscribeGallery(setGallery));
      unsubs.push(subscribeVideos(setVideos));
      unsubs.push(subscribeFavorites(setFavorites));
      unsubs.push(subscribeBlogPosts(setBlogPosts, true));
      unsubs.push(subscribeAchievements(setAchievements));
      unsubs.push(subscribeFutureGoals(setFutureGoals));
      unsubs.push(subscribeSiteSettings(setSettings));
      unsubs.push(subscribeContactMessages(setMessages));

      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);

      return () => {
        clearTimeout(timer);
        unsubs.forEach((unsub) => unsub());
      };
    } catch (err) {
      console.warn('Data subscription error:', err);
      setLoading(false);
    }
  }, []);

  const updateProfile = async (data: Partial<Profile>) => {
    await updateProfileService(data);
  };

  const updateSettings = async (data: Partial<SiteSettings>) => {
    await updateSettingsService(data);
  };

  const addDocument = async (collectionKey: string, data: any) => {
    return await addGenericDocument(collectionKey, data);
  };

  const updateDocument = async (collectionKey: string, id: string, data: any) => {
    await updateGenericDocument(collectionKey, id, data);
  };

  const deleteDocument = async (collectionKey: string, id: string) => {
    await deleteGenericDocument(collectionKey, id);
  };

  const seedSampleData = async () => {
    await seedAllDataToFirestore();
  };

  return (
    <DataContext.Provider
      value={{
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
        loading,
        updateProfile,
        updateSettings,
        addDocument,
        updateDocument,
        deleteDocument,
        seedSampleData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
