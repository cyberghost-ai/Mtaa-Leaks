'use client'

import { motion } from 'framer-motion'
import { Play, Eye, Share2, MessageCircle, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/lib/types'
import HeatIndex from './HeatIndex'

interface AnimatedCardProps {
  post: Post
  index?: number
  variant?: 'default' | 'compact' | 'featured'
}

export default function AnimatedCard({ 
  post, 
  index = 0, 
  variant = 'default' 
}: AnimatedCardProps) {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95 
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -8,
      boxShadow: "0 20px 40px rgba(255, 0, 85, 0.3)",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }

  const isCompact = variant === 'compact'
  const isFeatured = variant === 'featured'

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      className={`group relative rounded-2xl overflow-hidden border border-white/10 
        ${isFeatured ? 'col-span-2' : ''}
        ${isCompact ? 'bg-surface/30' : 'glass-morphism'}
        card-hover glow-border`}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span 
          className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border border-white/10"
          style={{ 
            backgroundColor: `${post.category.color}20`,
            color: post.category.color 
          }}
        >
          {post.category.name}
        </span>
      </div>

      {/* Breaking News Badge */}
      {post.isBreaking && (
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold backdrop-blur-md border border-red-400/50">
            BREAKING
          </span>
        </div>
      )}

      {/* Image/Video Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        {post.coverImage && (
          <Image
            src={post.coverImage.url}
            alt={post.coverImage.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes={isFeatured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            priority={index < 3}
          />
        )}
        
        {/* Video Overlay */}
        {post.isVideo && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center backdrop-blur-sm">
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 relative">
        {/* Heat Index & Stats */}
        <div className="flex items-center justify-between mb-3">
          <HeatIndex value={post.heatIndex} />
          <div className="flex items-center gap-4 text-text-secondary text-sm">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {post.views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {post.commentsCount}
            </span>
            <span className="flex items-center gap-1">
              <Share2 className="w-4 h-4" />
              {post.shares}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className={`font-heading font-bold mb-3 group-hover:text-primary transition-colors
          ${isFeatured ? 'text-2xl' : 'text-xl'}`}>
          <Link href={`/post/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {!isCompact && (
          <p className="text-text-secondary mb-4 line-clamp-2">
            {post.excerpt}
          </p>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag}
                className="px-2 py-1 rounded-md text-xs bg-white/5 text-text-secondary hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-xs font-bold text-black">
                {post.author.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium">{post.author.name}</p>
              <p className="text-xs text-text-secondary">
                {new Date(post.publishedAt).toLocaleDateString('en-KE', {
                  day: 'numeric',
                  month: 'short'
                })}
              </p>
            </div>
          </div>

          <Link 
            href={`/post/${post.slug}`}
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition-colors"
          >
            Read Leak
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-2xl transition-colors pointer-events-none" />
    </motion.article>
  )
}
