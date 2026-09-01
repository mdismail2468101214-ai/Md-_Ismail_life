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
  SiteSettings
} from '../types';

export const INITIAL_PROFILE: Profile = {
  name: 'Md. Ismail',
  nameBn: 'মুহাম্মদ ইসমাইল',
  title: 'Full-Stack Developer & Creative Thinker',
  titleBn: 'ফুল-স্ট্যাক ডেভেলপার ও সৃষ্টিশীল চিন্তক',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  coverUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  motto: 'Seeking truth through knowledge, building elegance through code.',
  mottoBn: 'জ্ঞানের আলোয় সত্যের সন্ধান, প্রযুক্তির ছোঁয়ায় সৃষ্টির আনন্দ।',
  shortBio: 'A passionate developer and curious learner documenting my life milestones, code creations, aesthetic visual arts, and spiritual aspirations.',
  shortBioBn: 'একজন প্রযুক্তপ্রেমী ও শিক্ষার্থী—যেখানে জীবনের প্রতিটি অনুভূতি, শিক্ষাজীবন, কোডিং প্রজেক্ট এবং মানবিক মূল্যবোধের গল্প সযত্নে লিপিবদ্ধ।',
  fullBio: `স্বাগতম আমার ডিজিটাল জীবনবৃন্তে। ছোটবেলা থেকেই প্রকৃতির প্রতি গভীর টান এবং কম্পিউটারের স্ক্রিনের পেছনে লুকিয়ে থাকা অসীম সম্ভাবনার জগৎ আমাকে মুগ্ধ করত। 

আমার লক্ষ্য কেবল সুন্দর কোড লেখা নয়, বরং এমন সব প্রযুক্তি ও সৃষ্টিশীল কাজ উপহার দেওয়া যা মানুষের উপকারে আসে এবং হৃদয়ে প্রশান্তি ছড়ায়। একজন মুসলিম ও শিক্ষার্থী হিসেবে আমি বিশ্বাস করি জ্ঞান অর্জন একটি ধারাবাহিক সাধনা। এই ওয়েবসাইটের পাতায় পাতায় পাবেন আমার শৈশব, শিক্ষাজীবনের সংগ্রাম, বিভিন্ন প্রজেক্ট ও সৃষ্টির নির্ভেজাল গল্প।`,
  fullBioBn: `স্বাগতম আমার ডিজিটাল জীবনবৃন্তে। ছোটবেলা থেকেই প্রকৃতির প্রতি গভীর টান এবং কম্পিউটারের স্ক্রিনের পেছনে লুকিয়ে থাকা অসীম সম্ভাবনার জগৎ আমাকে মুগ্ধ করত। 

আমার লক্ষ্য কেবল সুন্দর কোড লেখা নয়, বরং এমন সব প্রযুক্তি ও সৃষ্টিশীল কাজ উপহার দেওয়া যা মানুষের উপকারে আসে এবং হৃদয়ে প্রশান্তি ছড়ায়। একজন মুসলিম ও শিক্ষার্থী হিসেবে আমি বিশ্বাস করি জ্ঞান অর্জন একটি ধারাবাহিক সাধনা। এই ওয়েবসাইটের পাতায় পাতায় পাবেন আমার শৈশব, শিক্ষাজীবনের সংগ্রাম, বিভিন্ন প্রজেক্ট ও সৃষ্টির নির্ভেজাল গল্প।`,
  location: 'Dhaka, Bangladesh',
  locationBn: 'ঢাকা, বাংলাদেশ',
  email: 'contact.ismail.dev@gmail.com',
  phone: '+880 1700-000000',
  resumeUrl: '#',
  interests: ['Clean Code Architecture', 'Islamic Geometry & Art', 'Creative Writing & Poetry', 'Nature & Astrophotography', 'Open Source Ecosystem', 'Reading History & Philosophy'],
  learning: ['Advanced Distributed Systems', 'Bengali Natural Language Processing', 'Rust & High Performance APIs', 'Classical Arabic & Tafseer'],
  loveCreating: ['Modern Web Applications', 'Minimalist Visual Brandings', 'Thoughtful Technical Articles', 'Community Open Source Tools'],
  values: [
    {
      id: 'val-1',
      title: 'Ikhlas (Sincerity of Intent)',
      titleBn: 'ইখলাস ও আন্তরিকতা',
      description: 'Doing every work with pure intention and dedication, solely for goodness and positive impact.',
      descriptionBn: 'প্রতিটি কাজে নিয়তের বিশুদ্ধতা এবং মানুষের কল্যাণে আত্মনিয়োগের প্রত্যয়।',
      iconName: 'Heart'
    },
    {
      id: 'val-2',
      title: 'Ihsan (Excellence & Craftsmanship)',
      titleBn: 'ইহসান ও নিখুঁত কর্মদক্ষতা',
      description: 'Striving for highest quality and meticulous precision in every line of code and design.',
      descriptionBn: 'কাজে সর্বোচ্চ যত্ন, নান্দনিকতা এবং পূর্ণাঙ্গ নিষ্ঠার সাথে সমাপ্তি।',
      iconName: 'Sparkles'
    },
    {
      id: 'val-3',
      title: 'Continuous Ilm (Knowledge Seeking)',
      titleBn: 'ধারাবাহিক ইলম ও জ্ঞানানুশীলন',
      description: 'Embracing lifelong curiosity and humility, learning from every success and failure.',
      descriptionBn: 'জীবনব্যাপী শেখার আগ্রহ ও বিনম্রতার সাথে সত্য ও জ্ঞান অন্বেষণ।',
      iconName: 'BookOpen'
    },
    {
      id: 'val-4',
      title: 'Service & Compassion',
      titleBn: 'মানবসেবা ও সহমর্মিতা',
      description: 'Utilizing technical skills to empower others, solve real problems, and spread peace.',
      descriptionBn: 'অর্জিত দক্ষতা ও মেধার মাধ্যমে সমাজে ইতিবাচক পরিবর্তন ও সেবা প্রদান।',
      iconName: 'Users'
    }
  ],
  socialLinks: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    youtube: 'https://youtube.com',
    telegram: 'https://t.me',
    email: 'contact.ismail.dev@gmail.com'
  }
};

export const INITIAL_LIFE_STORY: LifeStory[] = [
  {
    id: 'story-1',
    title: 'Village Childhood & Early Curiosity',
    titleBn: 'সবুজ গ্রাম ও শৈশবের দিনগুলি',
    yearOrDate: '২০০৬ - ২০১২',
    category: 'Childhood',
    description: 'Growing up surrounded by serene greenery, morning dew on rice fields, and boundless curiosity about the universe and machines.',
    descriptionBn: 'গ্রামের শান্ত স্নিগ্ধ পরিবেশ, বর্ষার টিনের চালে বৃষ্টির শব্দ আর মুক্ত আকাশের নিচে বেড়ে ওঠার মধুর স্মৃতি। তখন থেকেই যেকোনো যন্ত্র খুলে দেখার অদম্য কৌতূহল কাজ করত।',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    location: 'গ্রামের বাড়ি, বাংলাদেশ',
    order: 1,
    featured: true
  },
  {
    id: 'story-2',
    title: 'First Computer & Spark of Code',
    titleBn: 'প্রথম কম্পিউটার ও কোডিংয়ের সূচনা',
    yearOrDate: '২০১৬',
    category: 'School',
    description: 'The memorable day when our family brought home a desktop computer. Writing my first HTML page and seeing text appear in browser felt magical.',
    descriptionBn: 'প্রথম কম্পিউটার কেনার সেই ঐতিহাসিক ক্ষণ। নোটপ্যাডে HTML লিখে ব্রাউজারে রান করার পর যখন নিজের নাম স্ক্রিনে ভেসে উঠল, মনে হয়েছিল যেন এক জাদুর জগৎ উন্মোচিত হলো।',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    location: 'Dhaka',
    order: 2,
    featured: true
  },
  {
    id: 'story-3',
    title: 'SSC Journey & Hard Work',
    titleBn: 'এসএসসি পরীক্ষা ও কঠোর অধ্যবসায়',
    yearOrDate: '২০২০',
    category: 'SSC',
    description: 'Countless nights with science textbooks, math problem solving, and building the foundational discipline that shaped my life.',
    descriptionBn: 'পদার্থবিজ্ঞান, উচ্চতর গণিত এবং বিজ্ঞানের জটিল সূত্রগুলোর সাথে কাটানো রাত। কঠোর পরিশ্রমের ফলস্বরূপ জিপিএ ৫.০০ অর্জনের আনন্দের মুহূর্ত।',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    location: 'Dhaka Education Board',
    order: 3,
    featured: true
  },
  {
    id: 'story-4',
    title: 'College Years & Deep Dive into Web Development',
    titleBn: 'কলেজ জীবন ও আধুনিক সফটওয়্যার জগতে প্রবেশ',
    yearOrDate: '২০২২',
    category: 'College',
    description: 'Mastered JavaScript, modern React, and backend architectures during college breaks while maintaining strong academic performance in HSC.',
    descriptionBn: 'কলেজে পড়ার পাশাপাশি নিয়মিত প্রোগ্রামিং সমস্যা সমাধান, জাভাস্ক্রিপ্ট এবং রিঅ্যাক্ট ফ্রেমওয়ার্ক শেখার যাত্রা। HSC পরীক্ষায় সফলতার সাথে উত্তীর্ণ হওয়া।',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    location: 'Dhaka City',
    order: 4,
    featured: false
  },
  {
    id: 'story-5',
    title: 'University Journey & Building Real-world Impact',
    titleBn: 'বিশ্ববিদ্যালয় জীবন ও আত্মনির্ভরশীলতা',
    yearOrDate: '২০২৩ - বর্তমান',
    category: 'University',
    description: 'Pursuing Computer Science & Engineering, collaborating with peers, contributing to open-source software, and mentoring juniors.',
    descriptionBn: 'কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং বিভাগে পড়াশোনার মাধ্যমে পেশাদার সফটওয়্যার প্রকৌশলের বিস্তৃত জগতে বিচরণ। সহপাঠীদের সাথে টিম প্রজেক্ট ও ওপেন সোর্স অবদান।',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    location: 'University Campus',
    order: 5,
    featured: true
  }
];

export const INITIAL_EDUCATION: Education[] = [
  {
    id: 'edu-1',
    institution: 'University of Engineering & Technology (CSE)',
    institutionBn: 'কম্পিউটার বিজ্ঞান ও প্রকৌশল বিভাগ',
    level: 'Bachelor of Science (B.Sc)',
    levelBn: 'স্নাতক (বি.এসসি ইন সিএসই)',
    groupOrSubject: 'Computer Science & Engineering',
    groupOrSubjectBn: 'কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং',
    startYear: '২০২৩',
    endYear: 'বর্তমান',
    result: 'CGPA 3.85 / 4.00 (Continuing)',
    description: 'Focused on Algorithms, Data Structures, Database Management, Distributed Systems, and Modern AI Architectures.',
    descriptionBn: 'অ্যালগরিদম, ডেটা স্ট্রাকচার, ডেটাবেস সিস্টেম এবং সফটওয়্যার ডিজাইন প্যাটার্নে গভীর অনুশীলন।',
    certificateUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80',
    order: 1
  },
  {
    id: 'edu-2',
    institution: 'Dhaka Imperial College',
    institutionBn: 'ঢাকা ইমপিরিয়াল কলেজ',
    level: 'Higher Secondary Certificate (HSC)',
    levelBn: 'উচ্চ মাধ্যমিক সার্টিফিকেট (এইচএসসি)',
    groupOrSubject: 'Science',
    groupOrSubjectBn: 'বিজ্ঞান বিভাগ',
    startYear: '২০২০',
    endYear: '২০২২',
    result: 'GPA 5.00 / 5.00 (Golden A+)',
    description: 'Excitedly engaged in Physics, Chemistry, Higher Math, and ICT competitions representing college.',
    descriptionBn: 'উচ্চতর গণিত, পদার্থ ও আইসিটিতে মেধার স্বাক্ষর রেখে গোল্ডেন জিপিএ ৫.০০ অর্জন।',
    certificateUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80',
    order: 2
  },
  {
    id: 'edu-3',
    institution: 'Ideal School & College',
    institutionBn: 'আইডিয়াল স্কুল অ্যান্ড কলেজ',
    level: 'Secondary School Certificate (SSC)',
    levelBn: 'মাধ্যমিক স্কুল সার্টিফিকেট (এসএসসি)',
    groupOrSubject: 'Science',
    groupOrSubjectBn: 'বিজ্ঞান বিভাগ',
    startYear: '২০১৮',
    endYear: '২০২০',
    result: 'GPA 5.00 / 5.00 (Golden A+)',
    description: 'Active in science fairs, math olympiads, and school library club.',
    descriptionBn: 'বিজ্ঞান মেলা ও কুইজ প্রতিযোগিতায় অংশগ্রহণ এবং গোল্ডেন এ+ সহ মাধ্যমিক সমাপ্তি।',
    certificateUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80',
    order: 3
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Noor - Quranic Reflection & Audio Companion',
    titleBn: 'নূর — কুরআন তিলাওয়াত ও জার্নাল প্ল্যাটফর্ম',
    coverImage: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80',
    description: 'A serene, distraction-free web app for listening to authentic Quran recitations with verse-by-verse reflections, bookmarking, and custom notes.',
    descriptionBn: 'একটি পরিচ্ছন্ন ইসলামিক ওয়েব অ্যাপ্লিকেশন যাতে রয়েছে সুললিত তিলাওয়াত, আয়াতের অর্থ, ব্যক্তিগত তাদাব্বুর (চিন্তাভাবনা) নোটস এবং তাফসীর বুকমার্কিং।',
    detailedDescription: 'Built with React 19, TypeScript, Tailwind CSS, and Web Audio API. Features audio speed control, continuous playback, synchronized Bengali translation, dark/light serene theme, and local offline cache.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Web Audio API', 'Firestore', 'PWA'],
    category: 'Web Application',
    creationDate: '২০২৪',
    status: 'Completed',
    demoUrl: 'https://example.com/noor-app',
    sourceCodeUrl: 'https://github.com/example/noor-quran',
    featured: true,
    order: 1
  },
  {
    id: 'proj-2',
    title: 'Shonchoy - Smart Halal Budget & Zakat Planner',
    titleBn: 'সঞ্চয় — হালাল বাজেট ও যাকাত ক্যালকুলেটর',
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    description: 'Personal financial tracking tool respecting Islamic ethics, automated Zakat calculation across gold/silver/cash assets, and expense analytics.',
    descriptionBn: 'মাসিক আয়-ব্যয় ট্র্যাকিং, সঞ্চয় লক্ষ্যমাত্রা নির্ধারণ এবং নিসাব অনুযায়ী যাকাত হিসাবের পূর্ণাঙ্গ ডিজিটাল সমাধান।',
    detailedDescription: 'Full-stack application featuring interactive visual charts, currency conversions, exportable PDF financial reports, and encrypted data storage.',
    technologies: ['TypeScript', 'React', 'Recharts', 'Tailwind CSS', 'Node.js', 'Firebase'],
    category: 'Full-Stack',
    creationDate: '২০২৪',
    status: 'Completed',
    demoUrl: 'https://example.com/shonchoy',
    sourceCodeUrl: 'https://github.com/example/shonchoy-finance',
    featured: true,
    order: 2
  },
  {
    id: 'proj-3',
    title: 'Bangla Lekhok - Morphological Text & Grammar Assistant',
    titleBn: 'বাংলা লেখক — টেক্সট এডিটর ও বানান পরীক্ষক',
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    description: 'AI-assisted writing workspace tailored for standard Bengali orthography, phonetic typing support, vocabulary suggestions, and readability scoring.',
    descriptionBn: 'প্রমিত বাংলা বানানের নিয়ম অনুযায়ী স্মার্ট টেক্সট প্রসেসর ও ফনেটিক কনভার্টার টুল।',
    detailedDescription: 'Leverages modern NLP algorithms to detect common spelling mistakes, suggests synonyms, and provides distraction-free markdown editing mode.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'IndexedDB', 'NLP Rules'],
    category: 'AI & Bot',
    creationDate: '২০২৩',
    status: 'Maintained',
    demoUrl: 'https://example.com/bangla-lekhok',
    sourceCodeUrl: 'https://github.com/example/bangla-lekhok',
    featured: true,
    order: 3
  },
  {
    id: 'proj-4',
    title: 'DevCampus - University Student Collaboration Portal',
    titleBn: 'দেবক্যাম্পাস — শিক্ষার্থী কোলাবোরেশন পোর্টাল',
    coverImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    description: 'A lightweight hub for engineering students to share study notes, organize study groups, and track semester deadlines.',
    descriptionBn: 'ভার্সিটির বিভিন্ন ব্যাচের লেকচার নোটস, অ্যাসাইনমেন্ট রিমাইন্ডার এবং টিম স্টাডির জন্য কেন্দ্রীয় প্ল্যাটফর্ম।',
    detailedDescription: 'Real-time collaborative updates, document tagging, user authentication, and responsive mobile-first interface.',
    technologies: ['React', 'Firebase Firestore', 'Tailwind CSS', 'Lucide Icons'],
    category: 'Web Application',
    creationDate: '২০২৩',
    status: 'In Progress',
    demoUrl: 'https://example.com/devcampus',
    sourceCodeUrl: 'https://github.com/example/devcampus',
    featured: false,
    order: 4
  }
];

export const INITIAL_CREATIONS: Creation[] = [
  {
    id: 'cr-1',
    title: 'Islamic Geometric Poster Collection',
    titleBn: 'ইসলামিক জ্যামিতিক পোস্টার সিরিজ',
    category: 'Posters',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    description: 'Minimalist vector artworks inspired by 8-fold Andalusian geometric patterns combined with subtle Arabic calligraphy.',
    descriptionBn: 'আন্দালুসিয়ান জ্যামিতিক নকশা এবং আধুনিক মিনিমালিস্ট আর্টের সমন্বয়ে তৈরি ভেক্টর পোস্টার।',
    toolsUsed: ['Adobe Illustrator', 'Figma', 'Vector Math'],
    linkUrl: '#',
    date: '২০২৪',
    order: 1
  },
  {
    id: 'cr-2',
    title: 'Borno - Minimal Bengali Typographic Branding',
    titleBn: 'বর্ণ — বাংলা টাইপোগ্রাফি ব্র্যান্ডিং',
    category: 'Logos',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'Custom Bengali letterform logo design expressing modernity, balance, and literary elegance.',
    descriptionBn: 'বাংলা বর্ণমালার শৈল্পিক রূপ দিয়ে তৈরি আধুনিক ব্র্যান্ড আইডেন্টিটি ও লোগো।',
    toolsUsed: ['Figma', 'Glyphs'],
    linkUrl: '#',
    date: '২০২৪',
    order: 2
  },
  {
    id: 'cr-3',
    title: 'Daily Hadith & Wisdom Telegram Bot',
    titleBn: 'দৈনিক হাদিস ও অনুপ্রেরণা বট',
    category: 'Bots',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'Automated Telegram bot sending curated Sahih Hadith, morning Athkar, and peaceful reminders to 5,000+ subscribers.',
    descriptionBn: 'প্রতিদিন সকাল ও সন্ধ্যায় সহিহ হাদিস ও দুআ পাঠকারী স্বয়ংক্রিয় টেলিগ্রাম বট।',
    toolsUsed: ['Node.js', 'Telegram API', 'Cloud Functions'],
    linkUrl: 'https://t.me',
    date: '২০২৩',
    order: 3
  },
  {
    id: 'cr-4',
    title: 'EcoGreen Bangladesh Campaign Visuals',
    titleBn: 'ইকোগ্রিন বাংলাদেশ সোশ্যাল মিডিয়া ব্যানার',
    category: 'Banners',
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    description: 'Awareness graphics highlighting tree plantation, clean rivers, and preserving Bengal natural biodiversity.',
    descriptionBn: 'পরিবেশ সচেতনতা এবং বৃক্ষরোপণ অভিযানের জন্য তৈরি হাই-রেজোলিউশন সোশ্যাল ব্যানার।',
    toolsUsed: ['Photoshop', 'Canva Pro'],
    linkUrl: '#',
    date: '২০২৩',
    order: 4
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Tranquil Mosque at Twilight',
    titleBn: 'গোধূলিবেলায় বায়তুল মোকাররম',
    description: 'Golden reflections on the courtyard during the peaceful Maghrib call to prayer.',
    descriptionBn: 'মাগরিবের আযানের সময় মসজিদের শান্ত ও মায়াবী পরিবেশ।',
    imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80',
    category: 'Islamic',
    date: '২০২৪',
    location: 'Dhaka',
    featured: true,
    order: 1
  },
  {
    id: 'gal-2',
    title: 'Lush Tea Gardens of Sreemangal',
    titleBn: 'শ্রীমঙ্গলের সবুজে ঘেরা চা বাগান',
    description: 'Endless layers of emerald tea leaves under the morning mist.',
    descriptionBn: 'কুয়াশায় ঘেরা সকাল আর সবুজ চা পাতার শান্তিময় চাদর।',
    imageUrl: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
    category: 'Nature',
    date: '২০২৩',
    location: 'Sylhet, Bangladesh',
    featured: true,
    order: 2
  },
  {
    id: 'gal-3',
    title: 'Late Night Developer Workspace',
    titleBn: 'গভীর রাতে কোডিং ও অধ্যয়ন ডেস্ক',
    description: 'Warm desk lamp, mechanical keyboard, and lines of clean TypeScript code.',
    descriptionBn: 'নীরব রাতে কোডিংয়ের সাধনা আর কফির উষ্ণ সুবাস।',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    category: 'My Photos',
    date: '২০২৪',
    location: 'Home Workspace',
    featured: true,
    order: 3
  },
  {
    id: 'gal-4',
    title: 'Rain over River Padma',
    titleBn: 'পদ্মা নদীর বুকে বৃষ্টির ক্যানভাস',
    description: 'Watching dramatic monsoon clouds over the mighty flowing waters.',
    descriptionBn: 'বর্ষার মেঘ আর নদীমাতৃক বাংলার রূপ।',
    imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80',
    category: 'Memories',
    date: '২০২৩',
    location: 'Mawa Ghat',
    featured: false,
    order: 4
  },
  {
    id: 'gal-5',
    title: 'Classic Islamic Calligraphy Study',
    titleBn: 'আরবি ক্যালিগ্রাফি ও হরফের সাধনা',
    description: 'Studying the proportion and curvature of Thuluth and Diwani scripts.',
    descriptionBn: 'বাঁশের কলম ও কালির নিবিড় পরশ।',
    imageUrl: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=1200&q=80',
    category: 'Designs',
    date: '২০২৪',
    location: 'Studio',
    featured: false,
    order: 5
  },
  {
    id: 'gal-6',
    title: 'University Tech Fest Moment',
    titleBn: 'বিশ্ববিদ্যালয় টেক ফেস্টে উপস্থাপনা',
    description: 'Sharing our software demo with enthusiastic faculty and classmates.',
    descriptionBn: 'সহপাঠীদের সাথে আনন্দঘন টেক ফেস্টের দিন।',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
    category: 'Important Moments',
    date: '২০২৩',
    location: 'Campus Auditorium',
    featured: true,
    order: 6
  }
];

export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Peaceful Quran Recitation — Surah Ar-Rahman',
    titleBn: 'সুরমাধুর্যপূর্ণ তিলাওয়াত — সূরা আর-রহমান',
    description: 'A heart-softening recitation reflecting on the boundless blessings of our Creator.',
    descriptionBn: 'মহান রবের অশেষ নিয়ামতের স্মরণে অন্তরে প্রশান্তি জাগানিয়া তিলাওয়াত।',
    videoUrl: 'https://www.youtube.com/watch?v=2Tz89Z4h8kQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80',
    category: 'Islamic',
    date: '২০২৪',
    duration: '15:20',
    order: 1
  },
  {
    id: 'vid-2',
    title: 'Building Modern Full-Stack Web Apps: My Tech Stack',
    titleBn: 'আধুনিক ওয়েব আর্কিটেকচার: যেভাবে আমি প্রজেক্ট তৈরি করি',
    description: 'Walking through my favorite development workflow with React, TypeScript, and Firebase.',
    descriptionBn: 'রিঅ্যাক্ট, টাইপস্ক্রিপ্ট ও ক্লাউড ডেটাবেস ব্যবহারের বাস্তব গাইডলাইন।',
    videoUrl: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    category: 'Learning',
    date: '২০২৪',
    duration: '22:45',
    order: 2
  },
  {
    id: 'vid-3',
    title: 'My Journey into Programming & Advice for Beginners',
    titleBn: 'প্রোগ্রামিংয়ে আমার পথচলা ও নতুনদের জন্য কিছু কথা',
    description: 'Reflecting on the challenges, mistakes, and consistency that helped me grow as an engineer.',
    descriptionBn: 'ধৈর্য, অধ্যবসায় ও সঠিক দিকনির্দেশনা নিয়ে ব্যক্তিগত অভিজ্ঞতা।',
    videoUrl: 'https://www.youtube.com/watch?v=PkZNo7MFNFg',
    thumbnailUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    category: 'My Videos',
    date: '২০২৩',
    duration: '18:10',
    order: 3
  }
];

export const INITIAL_FAVORITES: FavoriteItem[] = [
  {
    id: 'fav-1',
    title: 'Ar-Raheeq Al-Makhtum (The Sealed Nectar)',
    titleBn: 'আর-রাহীকুল মাখতূম (সীরাত গ্রন্থ)',
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    description: 'The masterclass biography of the Messenger of Allah ﷺ by Safiur Rahman Mubarakpuri. A constant source of strength and humility.',
    descriptionBn: 'রাসূলুল্লাহ ﷺ এর অনুপম জীবনচরিত ও আখলাকের সেরা সংকলন।',
    authorOrArtist: 'Safiur Rahman Mubarakpuri',
    quote: 'And indeed, you are of a great moral character. (Quran 68:4)',
    quoteBn: 'এবং নিশ্চয়ই আপনি মহান চরিত্রের ওপর অধিষ্ঠিত।'
  },
  {
    id: 'fav-2',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    titleBn: 'ক্লিন কোড — রবার্ট সি. মার্টিন',
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd3?auto=format&fit=crop&w=800&q=80',
    description: 'Transformed my perspective on writing readable, testable, and maintainable software.',
    descriptionBn: 'কোডের সৌন্দর্য ও শৃঙ্খলা বজায় রাখার কালজয়ী বই।',
    authorOrArtist: 'Robert C. Martin (Uncle Bob)',
    quote: 'Clean code always looks like it was written by someone who cares.',
    quoteBn: 'পরিচ্ছন্ন কোড দেখে সবসময় মনে হয় তা কোনো যত্নবান মানুষ লিখেছে।'
  },
  {
    id: 'fav-3',
    title: 'Muallim & Hasbi Rabbi - Vocal Nasheeds',
    titleBn: 'হাসবি রাব্বি ও মুআল্লিম — নাশিদ সংকলন',
    category: 'Nasheeds / Audio',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    description: 'Uplifting spiritual harmony, acoustic melody, and poetic verses remembering the Divine.',
    descriptionBn: 'আত্মিক প্রশান্তিময় নাশিদ যা হৃদয়ে একাগ্রতা সৃষ্টি করে।',
    authorOrArtist: 'Sami Yusuf & Traditional Voices',
    quote: 'My Lord is sufficient for me; glory be to Allah.'
  },
  {
    id: 'fav-4',
    title: 'Islamic Architecture & Geometric Proportion',
    titleBn: 'ইসলামিক জ্যামিতি ও স্থাপত্য কলা',
    category: 'Islamic content',
    image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
    description: 'The infinite repeating symmetry representing the unity and transcendence of the Creator.',
    descriptionBn: 'অসীম প্রতিসাম্য ও তাওহিদের শৈল্পিক প্রকাশ।'
  },
  {
    id: 'fav-5',
    title: 'The Beauty of Quiet Morning Dew in Bangladesh',
    titleBn: 'কুয়াশাময় সকাল ও নিঝুম প্রকৃতির নির্জনতা',
    category: 'Places',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    description: 'Walking in barefoot silence on dewy green fields at Fajr time.',
    descriptionBn: 'ভোরের স্নিগ্ধ বাতাস ও শিশিরভেজা সবুজ ঘাসের স্পর্শ।'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Self-Purification and Time Mastery in the Age of Algorithms',
    titleBn: 'অ্যালগরিদমের যুগে আত্মশুদ্ধি ও সময় ব্যবস্থাপনা',
    slug: 'time-mastery-in-digital-age',
    excerpt: 'How to safeguard your focus, mental peace, and spiritual core while working heavily with modern technology.',
    excerptBn: 'প্রযুক্তির কোলাহলের মাঝে কীভাবে অন্তরের প্রশান্তি, একাগ্রতা ও মূল্যবান সময়ের সদ্ব্যবহার করবেন।',
    content: `## প্রযুক্তির ভিড়ে আত্মস্থ হওয়ার সাধনা

আমাদের চারপাশে অবিরাম নোটিফিকেশন, স্ক্রলিং এবং কৃত্রিম উদ্দীপনার ছড়াছড়ি। একজন সফটওয়্যার ইঞ্জিনিয়ার হিসেবে দিনের সিংহভাগ সময় স্ক্রিনের সামনে কাটালেও আমি উপলব্ধি করেছি—**মনোযোগই আমাদের সবচেয়ে মূল্যবান সম্পদ**।

### ১. নিয়তের নবায়ন
প্রতিটি কাজ শুরুর আগে একটু থেমে ভাবুন: *এই কাজটি কি কোনো ভালো উদ্দেশ্যে করা হচ্ছে?* কাজের মধ্যে যখন মহৎ লক্ষ্য যুক্ত হয়, ক্লান্তি রূপ নেয় সৃষ্টিশীল শান্তিতে।

### ২. ডিজিটাল ফাস্টিং বা বিরতি
- প্রতিদিন নির্দিষ্ট সময়ে (বিশেষ করে ভোরবেলা ও ঘুমানোর আগে) মোবাইল ও স্ক্রিন থেকে দূরে থাকুন।
- সালাতের সময়গুলোকে দিনের স্বাভাবিক বিরতি হিসেবে গ্রহণ করুন। এই সময়টি মনকে রিফ্রেশ করে।

### ৩. ডিপ ওয়ার্ক (Deep Work) পদ্ধতি
অগভীর ১০টি কাজের চেয়ে পূর্ণ মনোযোগে করা ২ ঘণ্টার গভীর কাজ অনেক বেশি ফলপ্রসূ।

> "সময়ের কসম! নিশ্চয়ই মানুষ ক্ষতির মধ্যে রয়েছে; তারা ছাড়া যারা ঈমান এনেছে এবং সৎকাজ করেছে..." (সূরা আল-আসর: ১-৩)

আসুন প্রযুক্তিকে আমাদের দাস বানাই, মালিক নয়।`,
    contentBn: `## প্রযুক্তির ভিড়ে আত্মস্থ হওয়ার সাধনা

আমাদের চারপাশে অবিরাম নোটিফিকেশন, স্ক্রলিং এবং কৃত্রিম উদ্দীপনার ছড়াছড়ি। একজন সফটওয়্যার ইঞ্জিনিয়ার হিসেবে দিনের সিংহভাগ সময় স্ক্রিনের সামনে কাটালেও আমি উপলব্ধি করেছি—**মনোযোগই আমাদের সবচেয়ে মূল্যবান সম্পদ**।

### ১. নিয়তের নবায়ন
প্রতিটি কাজ শুরুর আগে একটু থেমে ভাবুন: *এই কাজটি কি কোনো ভালো উদ্দেশ্যে করা হচ্ছে?* কাজের মধ্যে যখন মহৎ লক্ষ্য যুক্ত হয়, ক্লান্তি রূপ নেয় সৃষ্টিশীল শান্তিতে।

### ২. ডিজিটাল ফাস্টিং বা বিরতি
- প্রতিদিন নির্দিষ্ট সময়ে (বিশেষ করে ভোরবেলা ও ঘুমানোর আগে) মোবাইল ও স্ক্রিন থেকে দূরে থাকুন।
- সালাতের সময়গুলোকে দিনের স্বাভাবিক বিরতি হিসেবে গ্রহণ করুন। এই সময়টি মনকে রিফ্রেশ করে।

### ৩. ডিপ ওয়ার্ক (Deep Work) পদ্ধতি
অগভীর ১০টি কাজের চেয়ে পূর্ণ মনোযোগে করা ২ ঘণ্টার গভীর কাজ অনেক বেশি ফলপ্রসূ।

> "সময়ের কসম! নিশ্চয়ই মানুষ ক্ষতির মধ্যে রয়েছে; তারা ছাড়া যারা ঈমান এনেছে এবং সৎকাজ করেছে..." (সূরা আল-আসর: ১-৩)

আসুন প্রযুক্তিকে আমাদের দাস বানাই, মালিক নয়।`,
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    category: 'Productivity & Life',
    tags: ['Mindfulness', 'Time Management', 'Spiritual', 'Self Growth'],
    readTime: '4 min read',
    published: true,
    publishedAt: '২০২৪-০৭-১৫',
    featured: true,
    views: 342
  },
  {
    id: 'blog-2',
    title: 'How I Started Programming: A Raw Reflective Journey',
    titleBn: 'কীভাবে আমি প্রোগ্রামিং শুরু করেছিলাম: একটি সত্য গল্প',
    slug: 'my-programming-journey-story',
    excerpt: 'From struggling with basic loops to loving full-stack engineering: the mistakes, lessons, and mindset that kept me going.',
    excerptBn: 'লজিক মেলাতে না পেরে হতাশ হওয়া থেকে শুরু করে স্বাচ্ছন্দ্যে সিস্টেম ডিজাইন করার অনুপ্রেরণামূলক অভিজ্ঞতা।',
    content: `## প্রথম সেই সিনট্যাক্স এরর

শুরুটা মোটেও সহজ ছিল না। যখন প্রথম সি প্রোগ্রামিংয়ে \`printf("Hello World");\` লিখলাম, মনে হয়েছিল খুব সহজ। কিন্তু যখনই একটু জটিল সমস্যা বা লুপের অ্যালগরিদম সামনে এলো, মাথা কাজ করছিল না।

### যে ভুলগুলো আমি করেছিলাম:
1. **শুধু টিউটোরিয়াল দেখা, নিজে কোড না করা:** টিউটোরিয়াল দেখার সময় মনে হয় সব বুঝে ফেলেছি, কিন্তু নিজে লিখতে গেলে হাত আটকে যায়।
2. **এক ফ্রেমওয়ার্ক থেকে আরেক ফ্রেমওয়ার্কে দৌড়ানো:** মূল বেসিক শক্তিশালী না করে আধুনিক ট্রেন্ডের পেছনে ছোটা।

### পরিবর্তনের মুহূর্ত
একদিন স্থির করলাম—প্রতিদিন মাত্র ১ ঘণ্টা হলেও কোড লিখব এবং সমস্যা নিজে সমাধান না হওয়া পর্যন্ত হাল ছাড়ব না। এই ধারাবাহিকতাই আমার আত্মবিশ্বাস বদলে দেয়।

নতুনদের প্রতি আমার পরামর্শ: **ধৈর্য ধরুন, প্রতিদিন ১% করে উন্নতিই বছর শেষে ৩৬ গুণ পরিবর্তন আনবে।**`,
    contentBn: `## প্রথম সেই সিনট্যাক্স এরর

শুরুটা মোটেও সহজ ছিল না। যখন প্রথম সি প্রোগ্রামিংয়ে \`printf("Hello World");\` লিখলাম, মনে হয়েছিল খুব সহজ। কিন্তু যখনই একটু জটিল সমস্যা বা লুপের অ্যালগরিদম সামনে এলো, মাথা কাজ করছিল না।

### যে ভুলগুলো আমি করেছিলাম:
1. **শুধু টিউটোরিয়াল দেখা, নিজে কোড না করা:** টিউটোরিয়াল দেখার সময় মনে হয় সব বুঝে ফেলেছি, কিন্তু নিজে লিখতে গেলে হাত আটকে যায়।
2. **এক ফ্রেমওয়ার্ক থেকে আরেক ফ্রেমওয়ার্কে দৌড়ানো:** মূল বেসিক শক্তিশালী না করে আধুনিক ট্রেন্ডের পেছনে ছোটা।

### পরিবর্তনের মুহূর্ত
একদিন স্থির করলাম—প্রতিদিন মাত্র ১ ঘণ্টা হলেও কোড লিখব এবং সমস্যা নিজে সমাধান না হওয়া পর্যন্ত হাল ছাড়ব না। এই ধারাবাহিকতাই আমার আত্মবিশ্বাস বদলে দেয়।

নতুনদের প্রতি আমার পরামর্শ: **ধৈর্য ধরুন, প্রতিদিন ১% করে উন্নতিই বছর শেষে ৩৬ গুণ পরিবর্তন আনবে।**`,
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    category: 'Tech & Career',
    tags: ['Programming', 'Beginner Guide', 'Career', 'Learning'],
    readTime: '6 min read',
    published: true,
    publishedAt: '২০২৪-০৫-১০',
    featured: true,
    views: 589
  },
  {
    id: 'blog-3',
    title: 'Minimalism & Islamic Aesthetics in Modern Web Design',
    titleBn: 'আধুনিক ইউআই ডিজাইনে মিনিমালিজম ও ইসলামিক নন্দনতত্ত্ব',
    slug: 'minimalism-islamic-ui-design',
    excerpt: 'Exploring how calm negative space, balance, and thoughtful typography create a serene user experience.',
    excerptBn: 'অপ্রয়োজনীয় জটিলতা পরিহার করে প্রশান্তিময় ও অর্থবহ ডিজিটাল ইন্টারফেস তৈরির মূলনীতি।',
    content: `## নকশায় শান্তির ছোঁয়া

ডিজাইন কেবল কিছু রঙের বিন্যাস নয়, এটি ব্যবহারকারীর মনের অনুভূতিকে স্পর্শ করার মাধ্যম। 

### মিনিমালিজমের তিনটি মূল সূত্র:
1. **নেগেটিভ স্পেস বা নিঃশ্বাসের জায়গা:** প্রতিটি উপাদানের মাঝে পরিমিত ফাঁকা জায়গা থাকলে চোখ বিশ্রাম পায়।
2. **পরিচ্ছন্ন টাইপোগ্রাফি:** ফন্টের আকার, উচ্চতা ও অক্ষরের ব্যবধান যেন পড়ার আনন্দ বাড়িয়ে দেয়।
3. **প্রাকৃতিক শান্ত রঙের প্যালেট:** অতিরিক্ত উজ্জ্বল ও কড়া রঙের বদলে উষ্ণ বালুকণা, শান্ত সবুজ ও মৃদু অফ-হোয়াইট রঙের ব্যবহার।`,
    contentBn: `## নকশায় শান্তির ছোঁয়া

ডিজাইন কেবল কিছু রঙের বিন্যাস নয়, এটি ব্যবহারকারীর মনের অনুভূতিকে স্পর্শ করার মাধ্যম। 

### মিনিমালিজমের তিনটি মূল সূত্র:
1. **নেগেটিভ স্পেস বা নিঃশ্বাসের জায়গা:** প্রতিটি উপাদানের মাঝে পরিমিত ফাঁকা জায়গা থাকলে চোখ বিশ্রাম পায়।
2. **পরিচ্ছন্ন টাইপোগ্রাফি:** ফন্টের আকার, উচ্চতা ও অক্ষরের ব্যবধান যেন পড়ার আনন্দ বাড়িয়ে দেয়।
3. **প্রাকৃতিক শান্ত রঙের প্যালেট:** অতিরিক্ত উজ্জ্বল ও কড়া রঙের বদলে উষ্ণ বালুকণা, শান্ত সবুজ ও মৃদু অফ-হোয়াইট রঙের ব্যবহার।`,
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    category: 'Design & UI',
    tags: ['UI/UX', 'Design', 'Minimalism', 'Typography'],
    readTime: '3 min read',
    published: true,
    publishedAt: '২০২৪-০৩-২২',
    featured: false,
    views: 280
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'National ICT Fellowship Finalist',
    titleBn: 'জাতীয় আইসিটি ফেলোশিপ ফাইনালিস্ট',
    organization: 'ICT Division, Government of Bangladesh',
    organizationBn: 'আইসিটি বিভাগ, বাংলাদেশ সরকার',
    date: '২০২৪',
    description: 'Recognized among top emerging student technologists for innovative Bangla digital health & reflection concept.',
    descriptionBn: 'বাংলা ভাষায় স্বাস্থ্য ও সহায়ক প্রযুক্তি প্রজেক্টের জন্য জাতীয় পর্যায়ে স্বীকৃতি।',
    category: 'Competition',
    certificateImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    badgeIcon: 'Award',
    order: 1
  },
  {
    id: 'ach-2',
    title: 'Dean’s Honour List for Academic Excellence',
    titleBn: 'ডিনস অনার লিস্ট (একাডেমিক শ্রেষ্ঠত্ব)',
    organization: 'Faculty of Electrical & Computer Engineering',
    organizationBn: 'ইলেকট্রিক্যাল অ্যান্ড কম্পিউটার ইঞ্জিনিয়ারিং অনুষদ',
    date: '২০২৩',
    description: 'Awarded for consistently maintaining top percentile CGPA across consecutive semesters.',
    descriptionBn: 'ধারাবাহিক শীর্ষ ফলাফলের জন্য বিশ্ববিদ্যালয়ের সম্মাননা সনদ।',
    category: 'Academic',
    certificateImage: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80',
    badgeIcon: 'GraduationCap',
    order: 2
  },
  {
    id: 'ach-3',
    title: '1st Runner Up — Inter-College Science & Math Olympiad',
    titleBn: 'আন্তঃকলেজ গণিত ও বিজ্ঞান অলিম্পিয়াড (রানার-আপ)',
    organization: 'Bangladesh Mathematical Society (Regional)',
    organizationBn: 'বাংলাদেশ গণিত সমিতি',
    date: '২০২২',
    description: 'Solved challenging combinatorics, calculus, and analytical logic puzzles.',
    descriptionBn: 'উচ্চতর গণিত ও বিশ্লেষণমূলক যুক্তি দক্ষতায় বিভাগীয় রানার-আপ।',
    category: 'Honor',
    certificateImage: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80',
    badgeIcon: 'Trophy',
    order: 3
  }
];

export const INITIAL_FUTURE_GOALS: FutureGoal[] = [
  {
    id: 'goal-1',
    title: 'Memorize the 30th Juz (Amma) of the Holy Quran',
    titleBn: 'পবিত্র কুরআনের ৩০তম পারা (জুয আম্মা) হিফজ সমাপ্ত করা',
    description: 'Consistent daily revision with tajweed, understanding core meanings and themes of each surah.',
    descriptionBn: 'বিশুদ্ধ তাজবীদ সহকারে প্রতিদিন নিয়মিত মুখস্থ ও তাদাব্বুর অনুশীলন।',
    category: 'Spiritual',
    targetDate: 'ডিসেম্বর ২০২৫',
    status: 'In Progress',
    progressPercentage: 75,
    actionSteps: [
      'Daily 20 minutes revision after Fajr',
      'Study brief Tafseer of short Surahs',
      'Recite memorized passages in Tahajjud'
    ],
    order: 1
  },
  {
    id: 'goal-2',
    title: 'Master Cloud-Native & Distributed System Architecture',
    titleBn: 'ক্লাউড-নেটিভ ও ডিস্ট্রিবিউটেড সিস্টেম ডিজাইনে দক্ষতা অর্জন',
    description: 'Build enterprise-grade resilient microservices, deep understanding of consensus protocols and Kubernetes.',
    descriptionBn: 'উচ্চ স্কেলেবিলিটি সম্পন্ন সিস্টেম আর্কিটেকচার, ডকার ও কুবারনেটিসে পারদর্শিতা।',
    category: 'Skills',
    targetDate: '২০২৬',
    status: 'In Progress',
    progressPercentage: 60,
    actionSteps: [
      'Read "Designing Data-Intensive Applications"',
      'Build a distributed key-value store in Go/Rust',
      'Pass AWS / GCP Solutions Architect exam'
    ],
    order: 2
  },
  {
    id: 'goal-3',
    title: 'Launch a Non-Profit Free Tech Academy for Rural Youth',
    titleBn: 'গ্রামীণ সুবিধাবঞ্চিত তরুণদের জন্য বিনামূল্যে টেক একাডেমি প্রতিষ্ঠা',
    description: 'Empowering students from non-urban areas with practical computer literacy, coding fundamentals, and mentorship.',
    descriptionBn: 'মফস্বলের শিক্ষার্থীদের প্র্যাকটিক্যাল কোডিং ও ফ্রিল্যান্সিং মেন্টরশিপ দেওয়া।',
    category: 'Personal goals',
    targetDate: '২০২৭',
    status: 'Not Started',
    progressPercentage: 15,
    actionSteps: [
      'Prepare free open-source Bengali curriculum',
      'Collaborate with local community volunteers',
      'Host weekend bootcamps'
    ],
    order: 3
  },
  {
    id: 'goal-4',
    title: 'Contribute to Major Global Open-Source Software',
    titleBn: 'আন্তর্জাতিক ওপেন-সোর্স প্রজেক্টে অর্থবহ অবদান',
    description: 'Get code merged into widely used developer tools or React ecosystem libraries.',
    descriptionBn: 'গ্লোবাল ডেভেলপার কমিউনিটিতে কার্যকর টুলস ও লাইব্রেরি উপহার দেওয়া।',
    category: 'Projects',
    targetDate: '২০২৫',
    status: 'In Progress',
    progressPercentage: 45,
    actionSteps: [
      'Fix issues in high-profile repos',
      'Improve accessibility documentation',
      'Publish a custom TypeScript utility library'
    ],
    order: 4
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  siteTitle: 'আমার গল্প | My Journey',
  siteSubtitle: 'Personal Life Book, Portfolio & Creative Vault',
  allowPublicContact: true,
  footerQuote: '“And say: My Lord, increase me in knowledge.” (Quran 20:114)',
  footerQuoteBn: '“এবং বলুন: হে আমার পালনকর্তা, আমার জ্ঞান বৃদ্ধি করে দিন।” (সূরা ত্বা-হা: ১১৪)',
  showVisitorStats: true
};
