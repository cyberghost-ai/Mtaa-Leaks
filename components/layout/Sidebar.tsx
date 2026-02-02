'use client'

import { TrendingUp, Flame, Clock, Users, TrendingDown } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const trendingTopics = [
  { tag: '#CelebDrama', posts: 42, trend: 'up' },
  { tag: '#StreetFood', posts: 38, trend: 'up' },
  { tag: '#TrafficAlert', posts: 31, trend: 'down' },
  { tag: '#LocalMusic', posts: 27, trend: 'up' },
  { tag: '#Nightlife', posts: 23, trend: 'same' },
]

const mostDiscussed = [
  {
    title: 'Celebrity Feud Escalates',
    comments: 1240,
    category: 'Hot News',
    slug: 'celebrity-feud'
  },
  {
    title: 'New Club Controversy',
    comments: 890,
    category: 'Behind Scenes',
    slug: 'club-controversy'
  },
  {
    title: 'Viral Dance Origins',
    comments: 670,
    category: 'Video Vibes',
    slug: 'dance-origins'
  },
  {
    title: 'Local Business Boom',
    comments: 540,
    category: 'Around Mtaa',
    slug: 'business-boom'
  }
]

const popularAuthors = [
  { name: 'Street Insider', leaks: 42, verified: true },
  { name: 'Gossip Guru', leaks: 38, verified: true },
  { name: 'Night Owl', leaks: 31, verified: false },
  { name: 'Food Hunter', leaks: 27, verified: true },
  { name: 'Music Scout', leaks: 23, verified: false },
]

export default function Sidebar() {
  return (
    <div className="space-y-8">
      {/* Trending Topics */}
      <div className="glass-morphism rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-primary" />
          <h3 className="font-heading text-xl font-bold">Trending Topics</h3>
        </div>
        
        <div className="space-y-4">
          {trendingTopics.map((topic, index) => (
            <motion.div
              key={topic.tag}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group"
            >
              <Link href={`/tag/${topic.tag.slice(1)}`} className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {topic.tag}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/5">
                    {topic.posts}
                  </span>
                </div>
              </Link>
              
              <div className={`flex items-center gap-1 text-sm ${
                topic.trend === 'up' ? 'text-green-400' :
                topic.trend === 'down' ? 'text-red-400' :
                'text-yellow-400'
              }`}>
                {topic.trend === 'up' ? <TrendingUp className="w-4 h-4" /> :
                 topic.trend === 'down' ? <TrendingDown className="w-4 h-4" /> :
                 <span className="w-4 h-4">→</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Most Discussed */}
      <div className="glass-morphism rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-secondary" />
          <h3 className="font-heading text-xl font-bold">Most Discussed</h3>
        </div>
        
        <div className="space-y-4">
          {mostDiscussed.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/post/${post.slug}`} className="block">
                <div className="p-3 rounded-lg hover:bg-white/5 transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-white/5">
                      {post.category}
                    </span>
                    <span className="text-xs text-text-secondary flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {post.comments}
                    </span>
                  </div>
                  <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h4>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popular Authors */}
      <div className="glass-morphism rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Flame className="w-6 h-6 text-accent-purple" />
          <h3 className="font-heading text-xl font-bold">Top Leakers</h3>
        </div>
        
        <div className="space-y-4">
          {popularAuthors.map((author, index) => (
            <motion.div
              key={author.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <span className="font-bold text-black text-sm">
                      {author.name.charAt(0)}
                    </span>
                  </div>
                  {author.verified && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-[10px] font-bold">✓</span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{author.name}</p>
                  <p className="text-xs text-text-secondary">{author.leaks} leaks</p>
                </div>
              </div>
              <button className="text-xs px-3 py-1 rounded-full glass-morphism hover:bg-primary/20 hover:text-primary transition-colors">
                Follow
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ad Spot */}
      <div className="glass-morphism rounded-2xl p-6 border border-dashed border-white/20">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📢</span>
          </div>
          <h4 className="font-heading font-semibold mb-2">Advertise Here</h4>
          <p className="text-sm text-text-secondary mb-4">
            Reach Nairobi&apos;s most engaged audience
          </p>
          <button className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium">
            Contact Sales
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="glass-morphism rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-text-secondary" />
          <h3 className="font-heading text-xl font-bold">Today&apos;s Stats</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">New Leaks</span>
            <span className="font-semibold">24</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Comments</span>
            <span className="font-semibold text-primary">1,240</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Shares</span>
            <span className="font-semibold text-secondary">5,432</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Active Users</span>
            <span className="font-semibold">12.5K</span>
          </div>
        </div>
      </div>
    </div>
  )
}
