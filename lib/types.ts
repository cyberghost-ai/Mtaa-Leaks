export type Author = {
  name: string;
  avatar?: string;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: {
    id: string;
    name: string;
    slug: string;
    color: string;
  };
  tags: string[];
  coverImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  isVideo?: boolean;
  videoUrl?: string;
  isBreaking?: boolean;
  heatIndex: number;
  views: number;
  shares: number;
  commentsCount: number;
  author: Author;
  publishedAt: string;
  updatedAt: string;
  duration?: number;    // ADD THIS LINE
  platform?: string;    // ADD THIS LINE
};

export type VideoPost = Post; // Alias for compatibility
