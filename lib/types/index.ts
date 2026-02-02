export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: Category
  tags: string[]
  coverImage: {
    url: string
    alt: string
    width: number
    height: number
  }
  videoUrl?: string
  isVideo: boolean
  isBreaking: boolean
  heatIndex: number
  views: number
  shares: number
  commentsCount: number
  author: {
    name: string
    avatar?: string
  }
  publishedAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  color: string
  description?: string
}

export interface VideoPost extends Post {
  videoUrl: string
  duration?: number
  platform?: 'youtube' | 'tiktok' | 'instagram' | 'direct'
}

export interface TrendingPost extends Post {
  rank: number
  trend: 'up' | 'down' | 'same'
}

export interface TelegramChannel {
  name: string
  link: string
  members: number
  description: string
}
