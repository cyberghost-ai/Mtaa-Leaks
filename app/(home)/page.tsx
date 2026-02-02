'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, TrendingUp, Video, Sparkles } from 'lucide-react'
import HeroTicker from '@/components/ui/HeroTicker'
import TrendingSlider from '@/components/ui/TrendingSlider'
import AnimatedCard from '@/components/ui/AnimatedCard'
import Sidebar from '@/components/layout/Sidebar'
import { Post } from '@/lib/types'

// Mock data - EASY TO EDIT: Just update titles, images, and URLs below
const mockPosts: Post[] = [
  {
    id: '1',
    slug: 'celebrity-beef-westlands',
    title: 'Celebrity Beef Erupts in Westlands Club - Exclusive Photos',
    excerpt: 'Two A-list celebrities were spotted in a heated argument at an exclusive Westlands club last night. Witnesses say it got physical...',
    content: '',
    category: { id: '1', name: 'Hot News', slug: 'hot-news', color: '#ff0055' },
    tags: ['CelebDrama', 'Westlands', 'Exclusive', 'ClubScene'],
    coverImage: {
      url: '/images/Baha.jpg', // EDIT: Change image path here
      alt: 'BAHA TRENDING VIDEO',
      width: 800,
      height: 600
    },
    videoUrl: 'https://t.me/mtaaleaks', // ADDED: Telegram link
    isVideo: true, // CHANGE: Set to true/false based on content
    isBreaking: true,
    heatIndex: 95,
    views: 125000,
    shares: 5400,
    commentsCount: 1240,
    author: { name: 'Street Insider' },
    publishedAt: '2024-01-15T18:30:00Z',
    updatedAt: '2024-01-15T18:30:00Z',
    duration: 120, // ADDED: Duration in seconds
    platform: 'telegram' // ADDED: Platform
  },
  {
    id: '2',
    slug: 'tiktok-dance-craze',
    title: 'New TikTok Dance Taking Over Nairobi Streets',
    excerpt: 'A new dance challenge has gone viral, with everyone from kids to grandparents trying the moves. Origin traced to local creator...',
    content: '',
    category: { id: '2', name: 'Video Vibes', slug: 'video-vibes', color: '#00ffcc' },
    tags: ['TikTok', 'Dance', 'Viral', 'Challenge'],
    coverImage: {
      url: '/images/Nyako.jpg', // EDIT: Change image path here
      alt: 'NYAKO TRENDING VIDEO',
      width: 800,
      height: 600
    },
    videoUrl: 'https://t.me/mtaaleaks', // ADDED: Telegram link
    isVideo: true,
    isBreaking: false,
    heatIndex: 88,
    views: 89000,
    shares: 3200,
    commentsCount: 890,
    author: { name: 'Dance Scout' },
    publishedAt: '2024-01-14T12:00:00Z',
    updatedAt: '2024-01-14T12:00:00Z',
    duration: 180,
    platform: 'telegram'
  },
  {
    id: '3',
    slug: 'street-food-king',
    title: 'Kenyatta Avenue Street Food Vendor Goes Viral',
    excerpt: 'Mama Nilis secret samosa recipe has broken the internet. Lines stretch for blocks as foodies flock for a taste...',
    content: '',
    category: { id: '3', name: 'Around Mtaa', slug: 'around-mtaa', color: '#8b5cf6' },
    tags: ['StreetFood', 'Viral', 'LocalBusiness', 'Foodie'],
    coverImage: {
      url: '/images/Baha.jpg', // EDIT: Change image path here (reusing Baha.jpg)
      alt: 'BAHA TRENDING VIDEO',
      width: 800,
      height: 600
    },
    videoUrl: 'https://t.me/mtaaleaks', // ADDED: Telegram link
    isVideo: false, // Non-video post
    isBreaking: false,
    heatIndex: 82,
    views: 67000,
    shares: 2100,
    commentsCount: 540,
    author: { name: 'Food Hunter' },
    publishedAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
    duration: 0, // No duration for non-video
    platform: 'website'
  },
  {
    id: '4',
    slug: 'underground-artist-deal',
    title: 'Underground Artist Signs Record Deal Worth Millions',
    excerpt: 'Local talent discovered on TikTok signs with major label after viral hit. Deal includes album and world tour...',
    content: '',
    category: { id: '1', name: 'Hot News', slug: 'hot-news', color: '#ff0055' },
    tags: ['Music', 'Discovery', 'RecordDeal', 'TikTok'],
    coverImage: {
      url: '/images/Nyako.jpg', // EDIT: Change image path here (reusing Nyako.jpg)
      alt: 'NYAKO TRENDING VIDEO',
      width: 800,
      height: 600
    },
    videoUrl: 'https://t.me/mtaaleaks', // ADDED: Telegram link
    isVideo: true,
    isBreaking: true,
    heatIndex: 78,
    views: 54000,
    shares: 1800,
    commentsCount: 420,
    author: { name: 'Music Insider' },
    publishedAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z',
    duration: 150,
    platform: 'telegram'
  },
  {
    id: '5',
    slug: 'new-club-opening',
    title: 'Exclusive New Club Opening in Kilimani This Weekend',
    excerpt: 'The most anticipated club opening of the year promises A-list performances and celebrity guests. Invite-only launch...',
    content: '',
    category: { id: '4', name: 'Behind Scenes', slug: 'behind-scenes', color: '#f59e0b' },
    tags: ['Nightlife', 'Events', 'Exclusive', 'Launch'],
    coverImage: {
      url: '/images/Baha.jpg', // EDIT: Change image path here
      alt: 'BAHA TRENDING VIDEO',
      width: 800,
      height: 600
    },
    videoUrl: 'https://t.me/mtaaleaks', // ADDED: Telegram link
    isVideo: true,
    isBreaking: false,
    heatIndex: 75,
    views: 45000,
    shares: 1500,
    commentsCount: 380,
    author: { name: 'Night Owl' },
    publishedAt: '2024-01-11T20:00:00Z',
    updatedAt: '2024-01-11T20:00:00Z',
    duration: 200,
    platform: 'telegram'
  },
  {
    id: '6',
    slug: 'traffic-hack-nairobi',
    title: 'Secret Traffic Hack That Saves Nairobi Drivers 2 Hours Daily',
    excerpt: 'Local driver reveals little-known routes that bypass major traffic. City officials are not happy about this leak...',
    content: '',
    category: { id: '3', name: 'Around Mtaa', slug: 'around-mtaa', color: '#8b5cf6' },
    tags: ['Traffic', 'Hack', 'Nairobi', 'Driving'],
    coverImage: {
      url: '/images/Nyako.jpg', // EDIT: Change image path here
      alt: 'NYAKO TRENDING VIDEO',
      width: 800,
      height: 600
    },
    videoUrl: 'https://t.me/mtaaleaks', // ADDED: Telegram link
    isVideo: false,
    isBreaking: false,
    heatIndex: 72,
    views: 38000,
    shares: 1200,
    commentsCount: 290,
    author: { name: 'Road Warrior' },
    publishedAt: '2024-01-10T07:30:00Z',
    updatedAt: '2024-01-10T07:30:00Z',
    duration: 0,
    platform: 'website'
  }
]

const categories = [
  { id: 'all', name: 'All Leaks', count: 156, icon: Sparkles },
  { id: 'hot-news', name: 'Hot News', count: 42, icon: TrendingUp },
  { id: 'video-vibes', name: 'Video Vibes', count: 38, icon: Video },
  { id: 'behind-scenes', name: 'Behind Scenes', count: 31 },
  { id: 'around-mtaa', name: 'Around Mtaa', count: 45 }
]

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const filteredPosts = selectedCategory === 'all' 
    ? mockPosts 
    : mockPosts.filter(post => 
        post.category.slug === selectedCategory || 
        post.category.name.toLowerCase().includes(selectedCategory.toLowerCase())
      )

  return (
    <div className="min-h-screen">
      {/* Hero Ticker */}
      <HeroTicker />

      <div className="container mx-auto px-4 py-8">
        {/* Trending Slider */}
        <TrendingSlider />

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Content */}
          <div className="lg:w-3/4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold">
                  Latest <span className="text-gradient">Street Leaks</span>
                </h1>
                <p className="text-text-secondary mt-2">
                  Fresh gossip, breaking news, and viral videos from your neighborhood
                </p>
              </div>

              {/* Filters */}
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl glass-morphism border border-white/10 hover:border-primary/30 transition-all"
                >
                  <Filter className="w-5 h-5" />
                  <span className="font-medium">Filter</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                    {selectedCategory === 'all' ? 'All' : selectedCategory}
                  </span>
                </button>

                {/* Filter Dropdown */}
                {showFilters && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setShowFilters(false)}
                    />
                    <div className="absolute top-full right-0 mt-2 w-64 glass-morphism rounded-xl border border-white/10 shadow-2xl z-50 p-4">
                      <h3 className="font-heading font-semibold mb-4">Categories</h3>
                      <div className="space-y-2">
                        {categories.map((category) => {
                          const Icon = category.icon
                          return (
                            <button
                              key={category.id}
                              onClick={() => {
                                setSelectedCategory(category.id)
                                setShowFilters(false)
                              }}
                              className={`flex items-center justify-between w-full p-3 rounded-lg transition-all ${
                                selectedCategory === category.id
                                  ? 'bg-primary/20 text-primary'
                                  : 'hover:bg-white/5'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {Icon && <Icon className="w-4 h-4" />}
                                <span>{category.name}</span>
                              </div>
                              <span className="text-xs px-2 py-1 rounded-full bg-white/5">
                                {category.count}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Posts Grid */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredPosts.map((post, index) => (
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
              <a 
                href="https://t.me/mtaaleaks"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <button className="px-8 py-3 rounded-xl glass-morphism border border-white/10 hover:border-primary/30 hover:bg-primary/5 transition-all group">
                  <span className="font-medium group-hover:text-gradient">
                    Subscribe for More Leaks
                  </span>
                  <span className="text-xs ml-3 px-2 py-1 rounded-full bg-primary/20 text-primary">
                    Join Telegram
                  </span>
                </button>
              </a>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:w-1/4">
            <Sidebar />
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="mt-16 py-12 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 border-y border-white/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Got a <span className="text-gradient">Hot Leak</span>?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Share exclusive gossip, breaking news, or viral content with our community. 
            Anonymous submissions accepted.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Anonymous Tip Button - Links to Telegram */}
            <a 
              href="https://t.me/mtaaleaks" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-bold hover:shadow-xl hover:shadow-primary/30 transition-all inline-block"
            >
              Submit Anonymous Tip
            </a>
            
            {/* Become a Contributor Button - Also links to Telegram */}
            <a 
              href="https://t.me/mtaaleaks" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-xl glass-morphism border border-white/10 hover:border-primary/30 transition-all inline-block"
            >
              Become a Contributor
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
