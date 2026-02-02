'use client'

import { TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

export default function TrendingSlider() {
  const trendingPosts = [
    { id: 1, title: 'Celebrity Beef in Westlands', heat: 95 },
    { id: 2, title: 'TikTok Dance Craze', heat: 88 },
    { id: 3, title: 'Street Food Viral', heat: 82 },
  ]

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-6">
          <TrendingUp className="w-8 h-8 text-primary" />
          <h2 className="font-heading text-3xl font-bold">
            <span className="text-gradient">Trending Now</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trendingPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl glass-morphism"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-text-secondary">#{index + 1}</span>
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold">
                  {post.heat} HEAT
                </span>
              </div>
              <h3 className="font-medium">{post.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
