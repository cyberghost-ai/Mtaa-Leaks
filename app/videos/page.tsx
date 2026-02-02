'use client'

import { useState } from 'react'
import { Play, Clock, Eye, TrendingUp, Filter } from 'lucide-react'
import { motion } from 'framer-motion'
import VideoCard from '@/components/ui/VideoCard'
import { VideoPost } from '@/lib/types'

// Mock video data with local images and Telegram channel links
const videoPosts: VideoPost[] = [
  {
    id: '1',
    slug: 'baha-video',
    title: 'BAHA FUCKING BROWN SKIN BABE',
    excerpt: 'Tyler Mbaya(Baha Machachari)Leaked Video of him fucking a light skin babe doggy style',
    content: '',
    category: { id: '2', name: 'Video Vibes', slug: 'video-vibes', color: '#00ffcc' },
    tags: ['Trending', 'Viral'],
    coverImage: {
      url: '/images/Baha.jpg',
      alt: 'BAHA TRENDING VIDEO',
      width: 800,
      height: 600
    },
    videoUrl: 'https://t.me/mtaaleaks',
    isVideo: true,
    isBreaking: false,
    heatIndex: 95,
    views: 250000,
    shares: 12000,
    commentsCount: 3400,
    author: { name: 'Noni' },
    publishedAt: '2024-01-15T12:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z',
    duration: 127,
    platform: 'telegram'
  },
  {
    id: '2',
    slug: 'nyako-video',
    title: 'NYAKO LEAKED PUSSY VIDEO',
    excerpt: 'Tiktok Star Rose Atieno(Nyako)is seen spreading her pussy on a video call with someone who was beleived to be her lover',
    content: '',
    category: { id: '3', name: 'Around Mtaa', slug: 'around-mtaa', color: '#8b5cf6' },
    tags: ['Trending', 'Viral'],
    coverImage: {
      url: '/images/Nyako.jpg',
      alt: 'NYAKO TRENDING VIDEO',
      width: 800,
      height: 600
    },
    videoUrl: 'https://t.me/mtaaleaks',
    isVideo: true,
    isBreaking: true,
    heatIndex: 88,
    views: 180000,
    shares: 8500,
    commentsCount: 2400,
    author: { name: 'Video Creator' },
    publishedAt: '2024-01-14T09:15:00Z',
    updatedAt: '2024-01-14T09:15:00Z',
    duration: 186,
    platform: 'telegram'
  },
  {
    id: '3',
    slug: 'video-3',
    title: 'RUTH K(Mulamwahs ex)Spreading her Wet Pink Pussy',
    excerpt: 'Ruth K Spreading her Juicy Pussy. Would you fuck this pink pussy?',
    content: '',
    category: { id: '1', name: 'Hot News', slug: 'hot-news', color: '#ff0055' },
    tags: ['Trending', 'Viral'],
    coverImage: {
      url: '/images/RuthK.jpg',
      alt: 'VIDEO3 TRENDING VIDEO',
      width: 800,
      height: 600
    },
    videoUrl: 'https://t.me/mtaaleaks',
    isVideo: true,
    isBreaking: false,
    heatIndex: 82,
    views: 150000,
    shares: 7200,
    commentsCount: 1900,
    author: { name: 'Video Creator' },
    publishedAt: '2024-01-13T16:45:00Z',
    updatedAt: '2024-01-13T16:45:00Z',
    duration: 94,
    platform: 'telegram'
  },
  {
    id: '4',
    slug: 'video-4',
    title: 'Azziad Alleged Leaked Sex Tape',
    excerpt: 'Azziad Nasenya,Kenyan Tiktok Star sex tape allegedly leaked,Is it her?',
    content: '',
    category: { id: '4', name: 'Behind Scenes', slug: 'behind-scenes', color: '#f59e0b' },
    tags: ['Trending', 'Viral'],
    coverImage: {
      url: '/images/Azziad.jpg',
      alt: 'VIDEO4 TRENDING VIDEO',
      width: 800,
      height: 600
    },
    videoUrl: 'https://t.me/mtaaleaks',
    isVideo: true,
    isBreaking: false,
    heatIndex: 76,
    views: 120000,
    shares: 5400,
    commentsCount: 1500,
    author: { name: 'Video Creator' },
    publishedAt: '2024-01-12T20:00:00Z',
    updatedAt: '2024-01-12T20:00:00Z',
    duration: 243,
    platform: 'telegram'
  },
  {
    id: '5',
    slug: 'video-5',
    title: 'Alleged Mjaka Mfine Leaked Sex Tape',
    excerpt: 'Alleged Mjaka Mfine(Tiktok Star Michelle)Receiving Backshots',
    content: '',
    category: { id: '3', name: 'Around Mtaa', slug: 'around-mtaa', color: '#8b5cf6' },
    tags: ['Trending', 'Viral'],
    coverImage: {
      url: '/images/Mjaka.jpg',
      alt: 'VIDEO5 TRENDING VIDEO',
      width: 800,
      height: 600
    },
    videoUrl: 'https://t.me/mtaaleaks',
    isVideo: true,
    isBreaking: true,
    heatIndex: 91,
    views: 210000,
    shares: 9800,
    commentsCount: 2800,
    author: { name: 'Video Creator' },
    publishedAt: '2024-01-11T07:30:00Z',
    updatedAt: '2024-01-11T07:30:00Z',
    duration: 152,
    platform: 'telegram'
  },
  {
    id: '6',
    slug: 'video-6',
    title: 'VIDEO6 TRENDING VIDEO',
    excerpt: 'TRENDING VIDEO',
    content: '',
    category: { id: '2', name: 'Video Vibes', slug: 'video-vibes', color: '#00ffcc' },
    tags: ['Trending', 'Viral'],
    coverImage: {
      url: '/images/Video6.jpg',
      alt: 'VIDEO6 TRENDING VIDEO',
      width: 800,
      height: 600
    },
    videoUrl: 'https://t.me/mtaaleaks',
    isVideo: true,
    isBreaking: false,
    heatIndex: 73,
    views: 95000,
    shares: 4100,
    commentsCount: 1200,
    author: { name: 'Video Creator' },
    publishedAt: '2024-01-10T14:20:00Z',
    updatedAt: '2024-01-10T14:20:00Z',
    duration: 198,
    platform: 'telegram'
  }
]

const videoFilters = [
  { id: 'all', name: 'All Videos', count: 156 },
  { id: 'trending', name: 'Trending', count: 24 },
  { id: 'telegram', name: 'Telegram', count: 156 },
  { id: 'youtube', name: 'YouTube', count: 0 },
  { id: 'instagram', name: 'Instagram', count: 0 }
]

export default function VideosPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [sortBy, setSortBy] = useState('trending')

  const filteredVideos = selectedFilter === 'all'
    ? videoPosts
    : videoPosts.filter(video => 
        selectedFilter === 'trending' ? video.heatIndex > 80 :
        selectedFilter === video.platform
      )

  // Sort videos
  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortBy) {
      case 'trending': return b.heatIndex - a.heatIndex
      case 'views': return b.views - a.views
      case 'newest': return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      default: return 0
    }
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-12 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gradient">Video Vibes</span>
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl">
                Watch the hottest viral videos, exclusive content, and behind-the-scenes footage from the streets
              </p>
            </div>
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center animate-pulse">
                <Play className="w-12 h-12 text-black ml-1" fill="currentColor" />
              </div>
              <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="glass-morphism rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-primary">1.2M+</div>
              <div className="text-text-secondary">Total Views</div>
            </div>
            <div className="glass-morphism rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-secondary">156</div>
              <div className="text-text-secondary">Videos</div>
            </div>
            <div className="glass-morphism rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-accent-purple">42K+</div>
              <div className="text-text-secondary">Shares</div>
            </div>
            <div className="glass-morphism rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-white">24</div>
              <div className="text-text-secondary">Trending Now</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters and Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          {/* Platform Filters */}
          <div className="flex flex-wrap gap-2">
            {videoFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedFilter === filter.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-black font-semibold'
                    : 'glass-morphism hover:bg-white/5'
                }`}
              >
                <span>{filter.name}</span>
                <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-black/20">
                  {filter.count}
                </span>
              </button>
            ))}
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-3">
            <span className="text-text-secondary">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg glass-morphism border border-white/10 focus:outline-none focus:border-primary/50"
            >
              <option value="trending">🔥 Trending</option>
              <option value="views">👁️ Most Viewed</option>
              <option value="newest">🆕 Newest</option>
            </select>
          </div>
        </div>

        {/* Videos Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sortedVideos.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </motion.div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 rounded-xl glass-morphism border border-white/10 hover:border-primary/30 hover:bg-primary/5 transition-all group">
            <span className="font-medium group-hover:text-gradient flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              Load More Videos
            </span>
            <span className="text-xs ml-3 px-2 py-1 rounded-full bg-primary/20 text-primary">
              32 more
            </span>
          </button>
        </div>

        {/* Featured Section */}
        <div className="mt-16">
          <div className="flex items-center gap-4 mb-8">
            <TrendingUp className="w-8 h-8 text-primary" />
            <h2 className="font-heading text-3xl font-bold">
              <span className="text-gradient">Featured This Week</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Featured Video */}
            <div className="relative rounded-2xl overflow-hidden group">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-bold">
                    FEATURED
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs">
                    12:45
                  </span>
                </div>
                <h3 className="font-heading text-2xl font-bold mb-2">
                  Exclusive: Inside Nairobi's Hottest Party
                </h3>
                <p className="text-text-secondary mb-4">
                  Get unprecedented access to the most exclusive event of the year
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      450K views
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      2 days ago
                    </span>
                  </div>
                  <button className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-black font-bold hover:shadow-lg hover:shadow-primary/30 transition-all">
                    Watch Now
                  </button>
                </div>
              </div>
            </div>

            {/* Upcoming Videos */}
            <div className="glass-morphism rounded-2xl p-6">
              <h3 className="font-heading text-xl font-bold mb-6">Coming Soon</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Play className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">Exclusive Interview with Local Star</h4>
                      <p className="text-sm text-text-secondary">Drops in 2 days</p>
                    </div>
                    <div className="ml-auto text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                      Soon
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
