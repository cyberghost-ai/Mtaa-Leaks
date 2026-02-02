'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, TrendingUp, Sparkles, Flame, Zap } from 'lucide-react'
import HeroTicker from '@/components/ui/HeroTicker'
import AnimatedCard from '@/components/ui/AnimatedCard'
import Sidebar from '@/components/layout/Sidebar'
import { Post } from '@/lib/types'

// Category data matching your design
const categoryData: Record<string, { name: string; color: string; icon: any; description: string }> = {
  'hot-news': {
    name: 'Hot News',
    color: '#ff0055',
    icon: Flame,
    description: 'Breaking news, exclusive leaks, and major announcements from the streets'
  },
  'video-vibes': {
    name: 'Video Vibes',
    color: '#00ffcc',
    icon: Zap,
    description: 'Viral videos, exclusive footage, and trending visual content'
  },
  'behind-scenes': {
    name: 'Behind Scenes',
    color: '#f59e0b',
    icon: Sparkles,
    description: 'Exclusive gossip, insider information, and behind-the-curtain reveals'
  },
  'around-mtaa': {
    name: 'Around Mtaa',
    color: '#8b5cf6',
    icon: TrendingUp,
    description: 'Local stories, neighborhood happenings, and community buzz'
  }
}

// Mock posts for category
const categoryPosts: Post[] = [
  {
    id: '1',
    slug: 'exclusive-club-opening',
    title: 'Exclusive: New Ultra-Luxury Club Opening in Kilimani',
    excerpt: 'The most anticipated club opening of the year promises A-list performances and celebrity guests. Invite-only launch event leaked.',
    content: '',
    category: { id: '1', name: 'Hot News', slug: 'hot-news', color: '#ff0055' },
    tags: ['Nightlife', 'Exclusive', 'Launch', 'Celebrity'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop',
      alt: 'Club interior',
      width: 800,
      height: 600
    },
    isVideo: false,
    isBreaking: true,
    heatIndex: 92,
    views: 189000,
    shares: 8400,
    commentsCount: 1560,
    author: { name: 'Night Insider' },
    publishedAt: '2024-01-16T20:00:00Z',
    updatedAt: '2024-01-16T20:00:00Z'
  },
  {
    id: '2',
    slug: 'celebrity-feud-escalates',
    title: 'Celebrity Feud Escalates: Social Media War Erupts',
    excerpt: 'What started as a subtle shade has turned into full-blown social media warfare between two top celebrities.',
    content: '',
    category: { id: '1', name: 'Hot News', slug: 'hot-news', color: '#ff0055' },
    tags: ['CelebDrama', 'SocialMedia', 'Beef'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&auto=format&fit=crop',
      alt: 'Social media',
      width: 800,
      height: 600
    },
    isVideo: true,
    isBreaking: true,
    heatIndex: 88,
    views: 156000,
    shares: 7200,
    commentsCount: 2340,
    author: { name: 'Drama Scout' },
    publishedAt: '2024-01-15T14:30:00Z',
    updatedAt: '2024-01-15T14:30:00Z'
  },
  {
    id: '3',
    slug: 'major-traffic-alert',
    title: 'MAJOR TRAFFIC ALERT: Thika Road Complete Standstill',
    excerpt: 'Accident involving multiple vehicles causes complete standstill. Alternative routes inside.',
    content: '',
    category: { id: '1', name: 'Hot News', slug: 'hot-news', color: '#ff0055' },
    tags: ['Traffic', 'Alert', 'Nairobi'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop',
      alt: 'Traffic jam',
      width: 800,
      height: 600
    },
    isVideo: false,
    isBreaking: true,
    heatIndex: 85,
    views: 132000,
    shares: 5400,
    commentsCount: 890,
    author: { name: 'Road Warrior' },
    publishedAt: '2024-01-14T08:15:00Z',
    updatedAt: '2024-01-14T08:15:00Z'
  },
  {
    id: '4',
    slug: 'record-deal-leaked',
    title: 'Record Deal Worth Millions Leaked Before Announcement',
    excerpt: 'Contract details for major record deal surface online hours before official announcement.',
    content: '',
    category: { id: '1', name: 'Hot News', slug: 'hot-news', color: '#ff0055' },
    tags: ['Music', 'Leak', 'RecordDeal'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop',
      alt: 'Music studio',
      width: 800,
      height: 600
    },
    isVideo: false,
    isBreaking: false,
    heatIndex: 82,
    views: 98000,
    shares: 3200,
    commentsCount: 670,
    author: { name: 'Music Insider' },
    publishedAt: '2024-01-13T16:45:00Z',
    updatedAt: '2024-01-13T16:45:00Z'
  },
  {
    id: '5',
    slug: 'restaurant-scandal',
    title: 'Popular Restaurant Hit with Health Code Violations',
    excerpt: 'Exclusive photos show serious health code violations at one of Nairobi\'s most popular eateries.',
    content: '',
    category: { id: '1', name: 'Hot News', slug: 'hot-news', color: '#ff0055' },
    tags: ['Food', 'Scandal', 'Health'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop',
      alt: 'Restaurant',
      width: 800,
      height: 600
    },
    isVideo: true,
    isBreaking: true,
    heatIndex: 79,
    views: 87000,
    shares: 2800,
    commentsCount: 540,
    author: { name: 'Food Inspector' },
    publishedAt: '2024-01-12T11:20:00Z',
    updatedAt: '2024-01-12T11:20:00Z'
  },
  {
    id: '6',
    slug: 'street-fashion-trend',
    title: 'New Street Fashion Trend Taking Over Nairobi',
    excerpt: 'Local designers create buzz with innovative streetwear that\'s going viral on TikTok.',
    content: '',
    category: { id: '1', name: 'Hot News', slug: 'hot-news', color: '#ff0055' },
    tags: ['Fashion', 'Trend', 'Streetwear'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&auto=format&fit=crop',
      alt: 'Street fashion',
      width: 800,
      height: 600
    },
    isVideo: false,
    isBreaking: false,
    heatIndex: 76,
    views: 76000,
    shares: 2100,
    commentsCount: 420,
    author: { name: 'Style Scout' },
    publishedAt: '2024-01-11T13:45:00Z',
    updatedAt: '2024-01-11T13:45:00Z'
  }
]

const subCategories = [
  { name: 'Breaking News', count: 24 },
  { name: 'Exclusive Leaks', count: 18 },
  { name: 'Major Announcements', count: 12 },
  { name: 'Controversies', count: 15 }
]

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categoryData[params.slug] || {
    name: params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    color: '#ff0055',
    icon: Flame,
    description: 'Latest updates and trending news'
  }
  
  const Icon = category.icon
  const [sortBy, setSortBy] = useState<'latest' | 'trending'>('trending')

  const sortedPosts = [...categoryPosts].sort((a, b) => {
    if (sortBy === 'trending') return b.heatIndex - a.heatIndex
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })

  return (
    <div className="min-h-screen">
      {/* Hero Ticker */}
      <HeroTicker />

      {/* Category Header */}
      <div className="relative py-12 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${category.color}40, ${category.color}20)` }}>
                  <Icon className="w-10 h-10" style={{ color: category.color }} />
                </div>
                <div className="absolute -inset-4 bg-current blur-xl opacity-20 rounded-2xl" />
              </div>
              <div>
                <h1 className="font-heading text-4xl md:text-5xl font-bold mb-3">
                  <span style={{ color: category.color }}>{category.name}</span>
                </h1>
                <p className="text-xl text-text-secondary max-w-2xl">
                  {category.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: category.color }}>
                  {categoryPosts.length}
                </div>
                <div className="text-text-secondary">Total Leaks</div>
              </div>
              <div className="h-12 w-px bg-white/10" />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {categoryPosts.reduce((sum, post) => sum + post.views, 0).toLocaleString()}
                </div>
                <div className="text-text-secondary">Total Views</div>
              </div>
            </div>
          </div>

          {/* Subcategories */}
          <div className="flex flex-wrap gap-3 mt-8">
            {subCategories.map((sub, index) => (
              <button
                key={sub.name}
                className="px-4 py-2 rounded-full glass-morphism hover:bg-white/5 transition-all group"
                style={{ borderColor: `${category.color}30` }}
              >
                <span className="font-medium">{sub.name}</span>
                <span className="ml-2 text-xs px-2 py-1 rounded-full bg-white/5">
                  {sub.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Posts */}
          <div className="lg:w-3/4">
            {/* Header with Sorting */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="font-heading text-2xl font-bold">
                  Latest in <span style={{ color: category.color }}>{category.name}</span>
                </h2>
                <p className="text-text-secondary mt-1">
                  Stay updated with the hottest leaks in this category
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-text-secondary">Sort by:</span>
                <div className="flex rounded-lg glass-morphism p-1">
                  <button
                    onClick={() => setSortBy('trending')}
                    className={`px-4 py-2 rounded-md transition-all ${
                      sortBy === 'trending'
                        ? 'bg-primary text-black font-semibold'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    🔥 Trending
                  </button>
                  <button
                    onClick={() => setSortBy('latest')}
                    className={`px-4 py-2 rounded-md transition-all ${
                      sortBy === 'latest'
                        ? 'bg-primary text-black font-semibold'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    🆕 Latest
                  </button>
                </div>
              </div>
            </div>

            {/* Posts Grid */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {sortedPosts.map((post, index) => (
                <AnimatedCard 
                  key={post.id} 
                  post={post} 
                  index={index}
                  variant={index === 0 ? 'featured' : 'default'}
                />
              ))}
            </motion.div>

            {/* Load More */}
            <div className="mt-12 text-center">
              <button 
                className="px-8 py-3 rounded-xl glass-morphism border border-white/10 hover:border-primary/30 hover:bg-primary/5 transition-all group"
                style={{ borderColor: `${category.color}30` }}
              >
                <span className="font-medium group-hover:text-gradient">
                  Load More {category.name}
                </span>
                <span className="text-xs ml-3 px-2 py-1 rounded-full bg-primary/20 text-primary">
                  18 more
                </span>
              </button>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:w-1/4">
            <Sidebar />
            
            {/* Category-specific Stats */}
            <div className="glass-morphism rounded-2xl p-6 mt-8">
              <h3 className="font-heading text-xl font-bold mb-6">
                {category.name} Stats
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Active Leaks</span>
                  <span className="font-semibold" style={{ color: category.color }}>
                    {categoryPosts.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Avg. Heat</span>
                  <span className="font-semibold text-primary">
                    {Math.round(categoryPosts.reduce((sum, p) => sum + p.heatIndex, 0) / categoryPosts.length)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Daily Views</span>
                  <span className="font-semibold text-secondary">
                    {(categoryPosts.reduce((sum, p) => sum + p.views, 0) / 30).toLocaleString('en-KE', { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Engagement Rate</span>
                  <span className="font-semibold text-accent-purple">
                    {((categoryPosts.reduce((sum, p) => sum + p.commentsCount, 0) / categoryPosts.reduce((sum, p) => sum + p.views, 0)) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              
              <button className="w-full mt-6 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium"
                style={{ border: `1px solid ${category.color}30`, color: category.color }}>
                Follow Category
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trending in Category */}
      <div className="mt-16 py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${category.color}40, ${category.color}20)` }}>
              <TrendingUp className="w-6 h-6" style={{ color: category.color }} />
            </div>
            <div>
              <h2 className="font-heading text-3xl font-bold">
                Trending in <span style={{ color: category.color }}>{category.name}</span>
              </h2>
              <p className="text-text-secondary">Most discussed leaks this week</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryPosts.slice(0, 4).map((post, index) => (
              <div key={post.id} className="p-4 rounded-xl glass-morphism hover:bg-white/5 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-text-secondary">#{index + 1}</span>
                  <span className="px-2 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: `${category.color}20`, color: category.color }}>
                    {post.heatIndex} HEAT
                  </span>
                </div>
                <h3 className="font-medium line-clamp-2">{post.title}</h3>
                <div className="flex items-center justify-between mt-3 text-sm text-text-secondary">
                  <span>{post.views.toLocaleString()} views</span>
                  <span>{post.commentsCount} comments</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
