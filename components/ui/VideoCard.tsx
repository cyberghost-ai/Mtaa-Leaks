'use client'

import { Play, Clock, Eye, Share2, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { VideoPost } from '@/lib/types'

interface VideoCardProps {
  video: VideoPost
  index: number
}

export default function VideoCard({ video, index }: VideoCardProps) {
  // Define platform icons with type annotation
  const platformIcons: Record<string, string> = {
    youtube: '▶️',
    tiktok: '🎵',
    instagram: '📸',
    telegram: '📱',
    direct: '🎬'
  }

  // Helper function to get platform icon safely
  const getPlatformIcon = (platform: string | undefined): string => {
    if (!platform) return platformIcons.telegram
    return platformIcons[platform.toLowerCase()] || platformIcons.telegram
  }

  // Helper function to get platform name
  const getPlatformName = (platform: string | undefined): string => {
    if (!platform) return 'Telegram'
    return platform.charAt(0).toUpperCase() + platform.slice(1)
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

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
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0, 255, 204, 0.3)",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }

  // Function to handle play button click
  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (video.videoUrl) {
      window.open(video.videoUrl, '_blank')
    }
  }

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      className="group relative rounded-2xl overflow-hidden border border-white/10 glass-morphism card-hover"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Video Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        {video.coverImage && (
          <Image
            src={video.coverImage.url}
            alt={video.coverImage.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        
        {/* Platform Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md bg-black/60">
            <span className="text-sm">{getPlatformIcon(video.platform)}</span>
            <span className="text-xs font-medium">
              {getPlatformName(video.platform)}
            </span>
          </div>
        </div>

        {/* Duration */}
        {video.duration && (
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center gap-1 px-2 py-1 rounded-md backdrop-blur-md bg-black/60 text-sm">
              <Clock className="w-3 h-3" />
              <span className="font-medium">{formatDuration(video.duration)}</span>
            </div>
          </div>
        )}

        {/* Play Overlay - UPDATED TO LINK TO TELEGRAM */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePlayClick}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-2xl shadow-secondary/40 cursor-pointer"
          >
            <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
          </motion.div>
        </div>

        {/* Heat Index */}
        <div className="absolute bottom-4 left-4 z-10">
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full backdrop-blur-md bg-black/60">
            <div className="flex items-center gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${
                    i < Math.floor(video.heatIndex / 33)
                      ? 'bg-red-500 animate-pulse'
                      : 'bg-white/30'
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-white">{video.heatIndex}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="font-heading font-bold text-xl mb-3 line-clamp-2 group-hover:text-secondary transition-colors">
          <a 
            href={video.videoUrl || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault()
              if (video.videoUrl) {
                window.open(video.videoUrl, '_blank')
              }
            }}
            className="cursor-pointer"
          >
            {video.title}
          </a>
        </h3>

        {/* Excerpt */}
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {video.excerpt}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {video.views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {video.commentsCount}
            </span>
            <span className="flex items-center gap-1">
              <Share2 className="w-4 h-4" />
              {video.shares}
            </span>
          </div>
          
          <span className="text-xs px-3 py-1 rounded-full bg-secondary/20 text-secondary font-medium">
            Video
          </span>
        </div>

        {/* Tags */}
        {video.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {video.tags.slice(0, 2).map((tag) => (
              <span 
                key={tag}
                className="px-2 py-1 rounded-md text-xs bg-white/5 text-text-secondary hover:bg-secondary/20 hover:text-secondary transition-colors cursor-pointer"
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
                {video.author.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium">{video.author.name}</p>
              <p className="text-xs text-text-secondary">
                {new Date(video.publishedAt).toLocaleDateString('en-KE', {
                  day: 'numeric',
                  month: 'short'
                })}
              </p>
            </div>
          </div>

          <a 
            href={video.videoUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors cursor-pointer"
          >
            Watch Now
            <Play className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-secondary/50 rounded-2xl transition-colors pointer-events-none" />
    </motion.article>
  )
}
