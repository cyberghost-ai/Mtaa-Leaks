export interface Image {
  url: string
  alt: string
  width: number
  height: number
}

export interface Category {
  id: string
  name: string
  slug: string
  color: string
}

export interface Author {
  name: string
}

export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: Category
  tags: string[]
  coverImage: Image
  videoUrl?: string
  isVideo: boolean
  isBreaking: boolean
  heatIndex: number
  views: number
  shares: number
  commentsCount: number
  author: Author
  publishedAt: string
  updatedAt: string
  duration?: number
  platform?: string
}

export interface VideoPost extends Post {
  videoUrl: string
  duration: number
  platform: string
}
