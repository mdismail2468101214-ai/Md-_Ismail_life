export type ThemeMode = 'light' | 'dark' | 'system';
export type Language = 'bn' | 'en';

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  telegram?: string;
  instagram?: string;
  whatsapp?: string;
  email?: string;
}

export interface ValueItem {
  id: string;
  title: string;
  titleBn?: string;
  description: string;
  descriptionBn?: string;
  iconName?: string;
}

export interface Profile {
  id?: string;
  name: string;
  nameBn: string;
  title: string;
  titleBn: string;
  avatarUrl: string;
  coverUrl?: string;
  motto: string;
  mottoBn: string;
  shortBio: string;
  shortBioBn: string;
  fullBio: string;
  fullBioBn: string;
  location: string;
  locationBn: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  interests: string[];
  learning: string[];
  loveCreating: string[];
  values: ValueItem[];
  socialLinks: SocialLinks;
  updatedAt?: string;
}

export type StoryCategory = 
  | 'Childhood'
  | 'School'
  | 'SSC'
  | 'College'
  | 'University'
  | 'Milestone'
  | 'Spiritual'
  | 'Career'
  | 'Other';

export interface LifeStory {
  id: string;
  title: string;
  titleBn: string;
  yearOrDate: string;
  category: StoryCategory;
  description: string;
  descriptionBn: string;
  imageUrl?: string;
  location?: string;
  order: number;
  featured?: boolean;
  createdAt?: string;
}

export interface Education {
  id: string;
  institution: string;
  institutionBn?: string;
  level: string; // e.g. "Secondary School Certificate (SSC)", "Higher Secondary (HSC)", "B.Sc in CSE"
  levelBn?: string;
  groupOrSubject: string;
  groupOrSubjectBn?: string;
  startYear: string;
  endYear: string;
  result: string; // e.g. "GPA 5.00 / 5.00"
  description?: string;
  descriptionBn?: string;
  certificateUrl?: string;
  order: number;
  createdAt?: string;
}

export type ProjectStatus = 'Completed' | 'In Progress' | 'Maintained' | 'Concept';

export interface Project {
  id: string;
  title: string;
  titleBn?: string;
  coverImage: string;
  description: string;
  descriptionBn?: string;
  detailedDescription?: string;
  detailedDescriptionBn?: string;
  technologies: string[];
  category: 'Web Application' | 'Mobile App' | 'AI & Bot' | 'Full-Stack' | 'Open Source' | 'Other';
  creationDate: string;
  status: ProjectStatus;
  demoUrl?: string;
  sourceCodeUrl?: string;
  featured?: boolean;
  order?: number;
  createdAt?: string;
}

export type CreationCategory = 
  | 'Websites'
  | 'Web Apps'
  | 'Graphic Designs'
  | 'Posters'
  | 'Banners'
  | 'Logos'
  | 'AI Projects'
  | 'Bots'
  | 'Other';

export interface Creation {
  id: string;
  title: string;
  titleBn?: string;
  category: CreationCategory;
  coverImage: string;
  description: string;
  descriptionBn?: string;
  toolsUsed: string[];
  linkUrl?: string;
  date: string;
  order?: number;
  createdAt?: string;
}

export type GalleryCategory = 
  | 'My Photos'
  | 'Memories'
  | 'Nature'
  | 'Islamic'
  | 'Designs'
  | 'Important Moments'
  | 'Other';

export interface GalleryItem {
  id: string;
  title: string;
  titleBn?: string;
  description?: string;
  descriptionBn?: string;
  imageUrl: string;
  category: GalleryCategory;
  date: string;
  location?: string;
  featured?: boolean;
  order?: number;
  createdAt?: string;
}

export type VideoCategory = 
  | 'My Videos'
  | 'Learning'
  | 'Islamic'
  | 'Projects'
  | 'Memories'
  | 'Other';

export interface VideoItem {
  id: string;
  title: string;
  titleBn?: string;
  description?: string;
  descriptionBn?: string;
  videoUrl: string; // YouTube or direct link
  thumbnailUrl?: string;
  category: VideoCategory;
  date: string;
  duration?: string;
  order?: number;
  createdAt?: string;
}

export type FavoriteCategory = 
  | 'Books'
  | 'Nasheeds / Audio'
  | 'Islamic content'
  | 'Technology'
  | 'Designs'
  | 'Places'
  | 'Quotes'
  | 'Other';

export interface FavoriteItem {
  id: string;
  title: string;
  titleBn?: string;
  category: FavoriteCategory;
  image?: string;
  description: string;
  descriptionBn?: string;
  authorOrArtist?: string;
  externalLink?: string;
  quote?: string;
  quoteBn?: string;
  order?: number;
  createdAt?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  titleBn?: string;
  slug: string;
  excerpt: string;
  excerptBn?: string;
  content: string; // Markdown supported
  contentBn?: string;
  coverImage: string;
  category: string;
  tags: string[];
  readTime: string;
  published: boolean;
  publishedAt: string;
  featured?: boolean;
  views?: number;
  createdAt?: string;
}

export type AchievementCategory = 
  | 'Academic'
  | 'Competition'
  | 'Certification'
  | 'Honor'
  | 'Skill'
  | 'Community'
  | 'Other';

export interface Achievement {
  id: string;
  title: string;
  titleBn?: string;
  organization: string;
  organizationBn?: string;
  date: string;
  description: string;
  descriptionBn?: string;
  category: AchievementCategory;
  certificateImage?: string;
  badgeIcon?: string;
  order?: number;
  createdAt?: string;
}

export type GoalCategory = 
  | 'Education'
  | 'Skills'
  | 'Career'
  | 'Projects'
  | 'Personal goals'
  | 'Spiritual';

export type GoalStatus = 'Not Started' | 'In Progress' | 'Near Completion' | 'Achieved';

export interface FutureGoal {
  id: string;
  title: string;
  titleBn?: string;
  description: string;
  descriptionBn?: string;
  category: GoalCategory;
  targetDate: string;
  status: GoalStatus;
  progressPercentage: number;
  actionSteps?: string[];
  order?: number;
  createdAt?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read?: boolean;
}

export const MASTER_ADMIN_EMAIL = 'mdismail2468101214@gmail.com';

export interface SiteSettings {
  siteTitle: string;
  siteSubtitle: string;
  allowPublicContact: boolean;
  footerQuote: string;
  footerQuoteBn: string;
  showVisitorStats: boolean;
  authorizedAdmins?: string[];
}
