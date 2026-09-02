import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  writeBatch
} from 'firebase/firestore';
import { db } from '../firebase/config';
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

// Collection Names
export const COLLECTIONS = {
  PROFILE: 'profile',
  LIFE_STORY: 'life_story',
  EDUCATION: 'education',
  PROJECTS: 'projects',
  CREATIONS: 'creations',
  GALLERY: 'gallery',
  VIDEOS: 'videos',
  FAVORITES: 'favorites',
  BLOG_POSTS: 'blog_posts',
  ACHIEVEMENTS: 'achievements',
  FUTURE_GOALS: 'future_goals',
  SETTINGS: 'settings',
  CONTACT_MESSAGES: 'contact_messages',
} as const;

// Helper to remove undefined fields which Firestore rejects
export function sanitizeForFirestore<T extends Record<string, any>>(obj: T): T {
  const clean: any = {};
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (val !== undefined) {
      if (val !== null && typeof val === 'object' && !Array.isArray(val) && !(val instanceof Date)) {
        clean[key] = sanitizeForFirestore(val);
      } else {
        clean[key] = val;
      }
    }
  });
  return clean as T;
}

// Helper to convert Firestore Snapshot to Typed Array and sort safely
function snapshotToData<T>(snapshot: any): T[] {
  const list: T[] = [];
  snapshot.forEach((docItem: any) => {
    list.push({ id: docItem.id, ...docItem.data() } as T);
  });
  // In-memory sort by order ascending if available, then createdAt
  list.sort((a: any, b: any) => {
    if (a.order !== undefined && b.order !== undefined && a.order !== b.order) {
      return Number(a.order) - Number(b.order);
    }
    if (a.createdAt && b.createdAt) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });
  return list;
}

// ---------------------------------------------
// PROFILE
// ---------------------------------------------
export async function getProfile(): Promise<Profile> {
  try {
    const docRef = doc(db, COLLECTIONS.PROFILE, 'main');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as Profile;
    }
    // Auto-seed main profile if not yet created
    await setDoc(docRef, INITIAL_PROFILE);
    return INITIAL_PROFILE;
  } catch (error) {
    console.warn('Firestore profile fetch fallback to default:', error);
    return INITIAL_PROFILE;
  }
}

export function subscribeProfile(callback: (profile: Profile) => void) {
  const docRef = doc(db, COLLECTIONS.PROFILE, 'main');
  return onSnapshot(
    docRef,
    (snap) => {
      if (snap.exists()) {
        callback({ id: snap.id, ...snap.data() } as Profile);
      } else {
        callback(INITIAL_PROFILE);
      }
    },
    (err) => {
      console.warn('Profile listener error, using initial profile:', err);
      callback(INITIAL_PROFILE);
    }
  );
}

export async function updateProfile(data: Partial<Profile>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.PROFILE, 'main');
  await setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
}

// ---------------------------------------------
// LIFE STORY
// ---------------------------------------------
export function subscribeLifeStory(callback: (items: LifeStory[]) => void) {
  const colRef = collection(db, COLLECTIONS.LIFE_STORY);
  return onSnapshot(
    colRef,
    (snap) => {
      if (snap.empty) {
        callback(INITIAL_LIFE_STORY);
      } else {
        callback(snapshotToData<LifeStory>(snap));
      }
    },
    (err) => {
      console.warn('LifeStory listener error:', err);
      callback(INITIAL_LIFE_STORY);
    }
  );
}

export async function addLifeStory(item: Omit<LifeStory, 'id'>): Promise<string> {
  const colRef = collection(db, COLLECTIONS.LIFE_STORY);
  const clean = sanitizeForFirestore({
    ...item,
    order: (item as any).order ?? Date.now(),
    createdAt: (item as any).createdAt || new Date().toISOString()
  });
  const docRef = await addDoc(colRef, clean);
  return docRef.id;
}

export async function updateLifeStory(id: string, item: Partial<LifeStory>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.LIFE_STORY, id);
  const clean = sanitizeForFirestore(item);
  delete (clean as any).id;
  await setDoc(docRef, clean, { merge: true });
}

export async function deleteLifeStory(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.LIFE_STORY, id);
  await deleteDoc(docRef);
}

// ---------------------------------------------
// EDUCATION
// ---------------------------------------------
export function subscribeEducation(callback: (items: Education[]) => void) {
  const colRef = collection(db, COLLECTIONS.EDUCATION);
  return onSnapshot(
    colRef,
    (snap) => {
      if (snap.empty) {
        callback(INITIAL_EDUCATION);
      } else {
        callback(snapshotToData<Education>(snap));
      }
    },
    (err) => {
      console.warn('Education listener error:', err);
      callback(INITIAL_EDUCATION);
    }
  );
}

export async function addEducation(item: Omit<Education, 'id'>): Promise<string> {
  const colRef = collection(db, COLLECTIONS.EDUCATION);
  const clean = sanitizeForFirestore({
    ...item,
    order: (item as any).order ?? Date.now(),
    createdAt: (item as any).createdAt || new Date().toISOString()
  });
  const docRef = await addDoc(colRef, clean);
  return docRef.id;
}

export async function updateEducation(id: string, item: Partial<Education>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.EDUCATION, id);
  const clean = sanitizeForFirestore(item);
  delete (clean as any).id;
  await setDoc(docRef, clean, { merge: true });
}

export async function deleteEducation(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.EDUCATION, id);
  await deleteDoc(docRef);
}

// ---------------------------------------------
// PROJECTS
// ---------------------------------------------
export function subscribeProjects(callback: (items: Project[]) => void) {
  const colRef = collection(db, COLLECTIONS.PROJECTS);
  return onSnapshot(
    colRef,
    (snap) => {
      if (snap.empty) {
        callback(INITIAL_PROJECTS);
      } else {
        callback(snapshotToData<Project>(snap));
      }
    },
    (err) => {
      console.warn('Projects listener error:', err);
      callback(INITIAL_PROJECTS);
    }
  );
}

export async function addProject(item: Omit<Project, 'id'>): Promise<string> {
  const colRef = collection(db, COLLECTIONS.PROJECTS);
  const clean = sanitizeForFirestore({
    ...item,
    order: (item as any).order ?? Date.now(),
    createdAt: (item as any).createdAt || new Date().toISOString()
  });
  const docRef = await addDoc(colRef, clean);
  return docRef.id;
}

export async function updateProject(id: string, item: Partial<Project>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.PROJECTS, id);
  const clean = sanitizeForFirestore(item);
  delete (clean as any).id;
  await setDoc(docRef, clean, { merge: true });
}

export async function deleteProject(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.PROJECTS, id);
  await deleteDoc(docRef);
}

// ---------------------------------------------
// CREATIONS
// ---------------------------------------------
export function subscribeCreations(callback: (items: Creation[]) => void) {
  const colRef = collection(db, COLLECTIONS.CREATIONS);
  return onSnapshot(
    colRef,
    (snap) => {
      if (snap.empty) {
        callback(INITIAL_CREATIONS);
      } else {
        callback(snapshotToData<Creation>(snap));
      }
    },
    (err) => {
      console.warn('Creations listener error:', err);
      callback(INITIAL_CREATIONS);
    }
  );
}

export async function addCreation(item: Omit<Creation, 'id'>): Promise<string> {
  const colRef = collection(db, COLLECTIONS.CREATIONS);
  const clean = sanitizeForFirestore({
    ...item,
    order: (item as any).order ?? Date.now(),
    createdAt: (item as any).createdAt || new Date().toISOString()
  });
  const docRef = await addDoc(colRef, clean);
  return docRef.id;
}

export async function updateCreation(id: string, item: Partial<Creation>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.CREATIONS, id);
  const clean = sanitizeForFirestore(item);
  delete (clean as any).id;
  await setDoc(docRef, clean, { merge: true });
}

export async function deleteCreation(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.CREATIONS, id);
  await deleteDoc(docRef);
}

// ---------------------------------------------
// GALLERY
// ---------------------------------------------
export function subscribeGallery(callback: (items: GalleryItem[]) => void) {
  const colRef = collection(db, COLLECTIONS.GALLERY);
  return onSnapshot(
    colRef,
    (snap) => {
      if (snap.empty) {
        callback(INITIAL_GALLERY);
      } else {
        callback(snapshotToData<GalleryItem>(snap));
      }
    },
    (err) => {
      console.warn('Gallery listener error:', err);
      callback(INITIAL_GALLERY);
    }
  );
}

export async function addGalleryItem(item: Omit<GalleryItem, 'id'>): Promise<string> {
  const colRef = collection(db, COLLECTIONS.GALLERY);
  const clean = sanitizeForFirestore({
    ...item,
    order: (item as any).order ?? Date.now(),
    createdAt: (item as any).createdAt || new Date().toISOString()
  });
  const docRef = await addDoc(colRef, clean);
  return docRef.id;
}

export async function updateGalleryItem(id: string, item: Partial<GalleryItem>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.GALLERY, id);
  const clean = sanitizeForFirestore(item);
  delete (clean as any).id;
  await setDoc(docRef, clean, { merge: true });
}

export async function deleteGalleryItem(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.GALLERY, id);
  await deleteDoc(docRef);
}

// ---------------------------------------------
// VIDEOS
// ---------------------------------------------
export function subscribeVideos(callback: (items: VideoItem[]) => void) {
  const colRef = collection(db, COLLECTIONS.VIDEOS);
  return onSnapshot(
    colRef,
    (snap) => {
      if (snap.empty) {
        callback(INITIAL_VIDEOS);
      } else {
        callback(snapshotToData<VideoItem>(snap));
      }
    },
    (err) => {
      console.warn('Videos listener error:', err);
      callback(INITIAL_VIDEOS);
    }
  );
}

export async function addVideo(item: Omit<VideoItem, 'id'>): Promise<string> {
  const colRef = collection(db, COLLECTIONS.VIDEOS);
  const clean = sanitizeForFirestore({
    ...item,
    order: (item as any).order ?? Date.now(),
    createdAt: (item as any).createdAt || new Date().toISOString()
  });
  const docRef = await addDoc(colRef, clean);
  return docRef.id;
}

export async function updateVideo(id: string, item: Partial<VideoItem>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.VIDEOS, id);
  const clean = sanitizeForFirestore(item);
  delete (clean as any).id;
  await setDoc(docRef, clean, { merge: true });
}

export async function deleteVideo(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.VIDEOS, id);
  await deleteDoc(docRef);
}

// ---------------------------------------------
// FAVORITES
// ---------------------------------------------
export function subscribeFavorites(callback: (items: FavoriteItem[]) => void) {
  const colRef = collection(db, COLLECTIONS.FAVORITES);
  return onSnapshot(
    colRef,
    (snap) => {
      if (snap.empty) {
        callback(INITIAL_FAVORITES);
      } else {
        callback(snapshotToData<FavoriteItem>(snap));
      }
    },
    (err) => {
      console.warn('Favorites listener error:', err);
      callback(INITIAL_FAVORITES);
    }
  );
}

export async function addFavorite(item: Omit<FavoriteItem, 'id'>): Promise<string> {
  const colRef = collection(db, COLLECTIONS.FAVORITES);
  const clean = sanitizeForFirestore({
    ...item,
    order: (item as any).order ?? Date.now(),
    createdAt: (item as any).createdAt || new Date().toISOString()
  });
  const docRef = await addDoc(colRef, clean);
  return docRef.id;
}

export async function updateFavorite(id: string, item: Partial<FavoriteItem>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.FAVORITES, id);
  const clean = sanitizeForFirestore(item);
  delete (clean as any).id;
  await setDoc(docRef, clean, { merge: true });
}

export async function deleteFavorite(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.FAVORITES, id);
  await deleteDoc(docRef);
}

// ---------------------------------------------
// BLOG POSTS
// ---------------------------------------------
export function subscribeBlogPosts(callback: (items: BlogPost[]) => void, includeDrafts: boolean = false) {
  const colRef = collection(db, COLLECTIONS.BLOG_POSTS);
  return onSnapshot(
    colRef,
    (snap) => {
      if (snap.empty) {
        callback(includeDrafts ? INITIAL_BLOG_POSTS : INITIAL_BLOG_POSTS.filter(b => b.published));
      } else {
        const posts = snapshotToData<BlogPost>(snap);
        callback(includeDrafts ? posts : posts.filter(b => b.published));
      }
    },
    (err) => {
      console.warn('BlogPosts listener error:', err);
      callback(includeDrafts ? INITIAL_BLOG_POSTS : INITIAL_BLOG_POSTS.filter(b => b.published));
    }
  );
}

export async function getBlogPostByIdOrSlug(idOrSlug: string): Promise<BlogPost | null> {
  try {
    const docRef = doc(db, COLLECTIONS.BLOG_POSTS, idOrSlug);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as BlogPost;
    }
    const found = INITIAL_BLOG_POSTS.find(p => p.id === idOrSlug || p.slug === idOrSlug);
    return found || null;
  } catch (error) {
    return INITIAL_BLOG_POSTS.find(p => p.id === idOrSlug || p.slug === idOrSlug) || null;
  }
}

export async function addBlogPost(item: Omit<BlogPost, 'id'>): Promise<string> {
  const colRef = collection(db, COLLECTIONS.BLOG_POSTS);
  const clean = sanitizeForFirestore({
    ...item,
    order: (item as any).order ?? Date.now(),
    createdAt: (item as any).createdAt || new Date().toISOString()
  });
  const docRef = await addDoc(colRef, clean);
  return docRef.id;
}

export async function updateBlogPost(id: string, item: Partial<BlogPost>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.BLOG_POSTS, id);
  const clean = sanitizeForFirestore(item);
  delete (clean as any).id;
  await setDoc(docRef, clean, { merge: true });
}

export async function deleteBlogPost(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.BLOG_POSTS, id);
  await deleteDoc(docRef);
}

// ---------------------------------------------
// ACHIEVEMENTS
// ---------------------------------------------
export function subscribeAchievements(callback: (items: Achievement[]) => void) {
  const colRef = collection(db, COLLECTIONS.ACHIEVEMENTS);
  return onSnapshot(
    colRef,
    (snap) => {
      if (snap.empty) {
        callback(INITIAL_ACHIEVEMENTS);
      } else {
        callback(snapshotToData<Achievement>(snap));
      }
    },
    (err) => {
      console.warn('Achievements listener error:', err);
      callback(INITIAL_ACHIEVEMENTS);
    }
  );
}

export async function addAchievement(item: Omit<Achievement, 'id'>): Promise<string> {
  const colRef = collection(db, COLLECTIONS.ACHIEVEMENTS);
  const clean = sanitizeForFirestore({
    ...item,
    order: (item as any).order ?? Date.now(),
    createdAt: (item as any).createdAt || new Date().toISOString()
  });
  const docRef = await addDoc(colRef, clean);
  return docRef.id;
}

export async function updateAchievement(id: string, item: Partial<Achievement>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.ACHIEVEMENTS, id);
  const clean = sanitizeForFirestore(item);
  delete (clean as any).id;
  await setDoc(docRef, clean, { merge: true });
}

export async function deleteAchievement(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.ACHIEVEMENTS, id);
  await deleteDoc(docRef);
}

// ---------------------------------------------
// FUTURE GOALS
// ---------------------------------------------
export function subscribeFutureGoals(callback: (items: FutureGoal[]) => void) {
  const colRef = collection(db, COLLECTIONS.FUTURE_GOALS);
  return onSnapshot(
    colRef,
    (snap) => {
      if (snap.empty) {
        callback(INITIAL_FUTURE_GOALS);
      } else {
        callback(snapshotToData<FutureGoal>(snap));
      }
    },
    (err) => {
      console.warn('FutureGoals listener error:', err);
      callback(INITIAL_FUTURE_GOALS);
    }
  );
}

export async function addFutureGoal(item: Omit<FutureGoal, 'id'>): Promise<string> {
  const colRef = collection(db, COLLECTIONS.FUTURE_GOALS);
  const clean = sanitizeForFirestore({
    ...item,
    order: (item as any).order ?? Date.now(),
    createdAt: (item as any).createdAt || new Date().toISOString()
  });
  const docRef = await addDoc(colRef, clean);
  return docRef.id;
}

export async function updateFutureGoal(id: string, item: Partial<FutureGoal>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.FUTURE_GOALS, id);
  const clean = sanitizeForFirestore(item);
  delete (clean as any).id;
  await setDoc(docRef, clean, { merge: true });
}

export async function deleteFutureGoal(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.FUTURE_GOALS, id);
  await deleteDoc(docRef);
}

// ---------------------------------------------
// CONTACT MESSAGES
// ---------------------------------------------
export async function sendContactMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>): Promise<string> {
  const colRef = collection(db, COLLECTIONS.CONTACT_MESSAGES);
  const clean = sanitizeForFirestore({
    ...msg,
    createdAt: new Date().toISOString(),
    read: false,
  });
  const docRef = await addDoc(colRef, clean);
  return docRef.id;
}

export function subscribeContactMessages(callback: (items: ContactMessage[]) => void) {
  const colRef = collection(db, COLLECTIONS.CONTACT_MESSAGES);
  return onSnapshot(
    colRef,
    (snap) => {
      callback(snapshotToData<ContactMessage>(snap));
    },
    (err) => {
      console.warn('Contact messages listener error:', err);
      callback([]);
    }
  );
}

export async function markContactMessageRead(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.CONTACT_MESSAGES, id);
  await updateDoc(docRef, { read: true });
}

export async function deleteContactMessage(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.CONTACT_MESSAGES, id);
  await deleteDoc(docRef);
}

// ---------------------------------------------
// SETTINGS
// ---------------------------------------------
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const docRef = doc(db, COLLECTIONS.SETTINGS, 'general');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as SiteSettings;
    }
    await setDoc(docRef, INITIAL_SETTINGS);
    return INITIAL_SETTINGS;
  } catch (error) {
    return INITIAL_SETTINGS;
  }
}

export function subscribeSiteSettings(callback: (settings: SiteSettings) => void) {
  const docRef = doc(db, COLLECTIONS.SETTINGS, 'general');
  return onSnapshot(
    docRef,
    (snap) => {
      if (snap.exists()) {
        callback(snap.data() as SiteSettings);
      } else {
        callback(INITIAL_SETTINGS);
      }
    },
    (err) => {
      console.warn('SiteSettings error, fallback:', err);
      callback(INITIAL_SETTINGS);
    }
  );
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.SETTINGS, 'general');
  const clean = sanitizeForFirestore(settings);
  await setDoc(docRef, clean, { merge: true });
}

// ---------------------------------------------
// SEED ALL DATA TO FIRESTORE (FOR ADMIN)
// ---------------------------------------------
export async function seedAllDataToFirestore(): Promise<void> {
  try {
    const batch = writeBatch(db);

    // Profile
    const profileRef = doc(db, COLLECTIONS.PROFILE, 'main');
    batch.set(profileRef, sanitizeForFirestore(INITIAL_PROFILE));

    // Settings
    const settingsRef = doc(db, COLLECTIONS.SETTINGS, 'general');
    batch.set(settingsRef, sanitizeForFirestore(INITIAL_SETTINGS));

    // Life story
    for (const item of INITIAL_LIFE_STORY) {
      const itemRef = doc(db, COLLECTIONS.LIFE_STORY, item.id);
      batch.set(itemRef, sanitizeForFirestore(item));
    }

    // Education
    for (const item of INITIAL_EDUCATION) {
      const itemRef = doc(db, COLLECTIONS.EDUCATION, item.id);
      batch.set(itemRef, sanitizeForFirestore(item));
    }

    // Projects
    for (const item of INITIAL_PROJECTS) {
      const itemRef = doc(db, COLLECTIONS.PROJECTS, item.id);
      batch.set(itemRef, sanitizeForFirestore(item));
    }

    // Creations
    for (const item of INITIAL_CREATIONS) {
      const itemRef = doc(db, COLLECTIONS.CREATIONS, item.id);
      batch.set(itemRef, sanitizeForFirestore(item));
    }

    // Gallery
    for (const item of INITIAL_GALLERY) {
      const itemRef = doc(db, COLLECTIONS.GALLERY, item.id);
      batch.set(itemRef, sanitizeForFirestore(item));
    }

    // Videos
    for (const item of INITIAL_VIDEOS) {
      const itemRef = doc(db, COLLECTIONS.VIDEOS, item.id);
      batch.set(itemRef, sanitizeForFirestore(item));
    }

    // Favorites
    for (const item of INITIAL_FAVORITES) {
      const itemRef = doc(db, COLLECTIONS.FAVORITES, item.id);
      batch.set(itemRef, sanitizeForFirestore(item));
    }

    // Blog posts
    for (const item of INITIAL_BLOG_POSTS) {
      const itemRef = doc(db, COLLECTIONS.BLOG_POSTS, item.id);
      batch.set(itemRef, sanitizeForFirestore(item));
    }

    // Achievements
    for (const item of INITIAL_ACHIEVEMENTS) {
      const itemRef = doc(db, COLLECTIONS.ACHIEVEMENTS, item.id);
      batch.set(itemRef, sanitizeForFirestore(item));
    }

    // Future goals
    for (const item of INITIAL_FUTURE_GOALS) {
      const itemRef = doc(db, COLLECTIONS.FUTURE_GOALS, item.id);
      batch.set(itemRef, sanitizeForFirestore(item));
    }

    await batch.commit();
  } catch (error) {
    console.error('Error seeding data to Firestore:', error);
    throw error;
  }
}

// ---------------------------------------------
// UNIFIED GENERIC CRUD OPERATIONS
// ---------------------------------------------
const collectionKeyMap: Record<string, string> = {
  profile: COLLECTIONS.PROFILE,
  story: COLLECTIONS.LIFE_STORY,
  life_story: COLLECTIONS.LIFE_STORY,
  education: COLLECTIONS.EDUCATION,
  projects: COLLECTIONS.PROJECTS,
  creations: COLLECTIONS.CREATIONS,
  gallery: COLLECTIONS.GALLERY,
  videos: COLLECTIONS.VIDEOS,
  favorites: COLLECTIONS.FAVORITES,
  blogs: COLLECTIONS.BLOG_POSTS,
  blog_posts: COLLECTIONS.BLOG_POSTS,
  achievements: COLLECTIONS.ACHIEVEMENTS,
  goals: COLLECTIONS.FUTURE_GOALS,
  future_goals: COLLECTIONS.FUTURE_GOALS,
  messages: COLLECTIONS.CONTACT_MESSAGES,
  contact_messages: COLLECTIONS.CONTACT_MESSAGES,
  settings: COLLECTIONS.SETTINGS,
};

export async function addGenericDocument(collectionKey: string, data: any): Promise<string> {
  const colName = collectionKeyMap[collectionKey] || collectionKey;
  const colRef = collection(db, colName);
  
  const cleanData = sanitizeForFirestore({
    ...data,
    order: data.order !== undefined ? data.order : Date.now(),
    createdAt: data.createdAt || new Date().toISOString()
  });
  delete cleanData.id;

  const docRef = await addDoc(colRef, cleanData);
  return docRef.id;
}

export async function updateGenericDocument(collectionKey: string, id: string, data: any): Promise<void> {
  const colName = collectionKeyMap[collectionKey] || collectionKey;
  const docRef = doc(db, colName, id);
  const cleanData = sanitizeForFirestore({
    ...data,
    updatedAt: new Date().toISOString()
  });
  delete cleanData.id;
  await setDoc(docRef, cleanData, { merge: true });
}

export async function deleteGenericDocument(collectionKey: string, id: string): Promise<void> {
  const colName = collectionKeyMap[collectionKey] || collectionKey;
  const docRef = doc(db, colName, id);
  await deleteDoc(docRef);
}

