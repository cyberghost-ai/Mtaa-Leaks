'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { 
  Calendar, 
  Clock, 
  Eye, 
  Share2, 
  MessageCircle, 
  User, 
  Tag,
  ArrowLeft,
  Bookmark
} from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import ShareButtons from '@/components/shared/ShareButtons'
import Comments from '@/components/shared/Comments'
import HeatIndex from '@/components/ui/HeatIndex'
import { Post } from '@/lib/types'

// Mock post data - replace with CMS fetch
const mockPost: Post = {
  id: '1',
  slug: 'celebrity-beef-westlands',
  title: 'Celebrity Beef Erupts in Westlands Club - Exclusive Photos & Video',
  excerpt: 'Two A-list celebrities were spotted in a heated argument at an exclusive Westlands club last night. Witnesses say it got physical before security intervened.',
  content: `
    <p>In a shocking turn of events last night, two of Kenya's biggest celebrities were involved in a heated altercation at the exclusive "Silhouette" club in Westlands. The incident occurred around 1:30 AM, catching party-goers by surprise.</p>
    
    <h2>What We Know</h2>
    <p>According to multiple eyewitnesses, the argument started over a business deal gone wrong. Sources close to the celebrities reveal that it involved a joint venture that turned sour.</p>
    
    <p>"They were shouting at each other near the VIP section," said one witness who requested anonymity. "It got so heated that security had to step in. Drinks were spilled, and it almost turned physical."</p>
    
    <h2>Exclusive Photos</h2>
    <p>Our photographer managed to capture these exclusive shots of the aftermath. Notice the tense body language and the security personnel keeping them separated.</p>
    
    <h2>The Aftermath</h2>
    <p>Both celebrities left separately shortly after the incident. Their management teams have been contacted for comment but have yet to respond.</p>
    
    <p>This isn't the first time these two have had public disagreements, but it's certainly the most dramatic. Industry insiders suggest this could affect several upcoming projects they were supposedly collaborating on.</p>
    
    <h2>What This Means</h2>
    <p>The entertainment industry is buzzing with speculation. Will this affect their careers? Will they reconcile? Only time will tell.</p>
    
    <p><strong>UPDATE (2:00 PM):</strong> One of the celebrities has posted a cryptic message on Instagram stories, fueling further speculation.</p>
  `,
  category: { id: '1', name: 'Hot News', slug: 'hot-news', color: '#ff0055' },
  tags: ['CelebDrama', 'Westlands', 'Exclusive', 'ClubScene', 'Entertainment'],
  coverImage: {
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop',
    alt: 'Night club interior',
    width: 1200,
    height: 800
  },
  isVideo: true,
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  isBreaking: true,
  heatIndex: 95,
  views: 125000,
  shares: 5400,
  commentsCount: 1240,
  author: { 
    name: 'Street Insider',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop'
  },
  publishedAt: '2024-01-15T18:30:00Z',
  updatedAt: '2024-01-15T20:45:00Z'
}

const relatedPosts = [
  {
    id: '2',
    slug: 'tiktok-dance-craze',
    title: 'New TikTok Dance Taking Over Nairobi Streets',
    excerpt: 'Everyone from kids to grandparents is trying these moves',
    category: { id: '2', name: 'Video Vibes', slug: 'video-vibes', color: '#00ffcc' },
    views: 89000,
    publishedAt: '2024-01-14T12:00:00Z'
  },
  {
    id: '3',
    slug: 'street-food-king',
    title: 'Kenyatta Avenue Street Food Vendor Goes Viral',
    excerpt: 'Mama Nili\'s secret samosa recipe breaks the internet',
    category: { id: '3', name: 'Around Mtaa', slug: 'around-mtaa', color: '#8b5cf6' },
    views: 67000,
    publishedAt: '2024-01-13T09:15:00Z'
  },
  {
    id: '4',
    slug: 'underground-artist-deal',
    title: 'Underground Artist Signs Record Deal Worth Millions',
    excerpt: 'Local talent discovered on TikTok signs major label deal',
    category: { id: '1', name: 'Hot News', slug: 'hot-news', color: '#ff0055' },
    views: 54000,
    publishedAt: '2024-01-12T16:45:00Z'
  }
]

export default function PostPage() {
  const params = useParams()
  const [post, setPost] = useState(mockPost)
  const [isLoading, setIsLoading] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [readTime, setReadTime] = useState('3 min')

  useEffect(() => {
    // Calculate read time based on content length
    const words = post.content.split(/\s+/).length
    const minutes = Math.ceil(words / 200)
    setReadTime(`${minutes} min`)
    
    // Simulate view increment
    const timer = setTimeout(() => {
      setPost(prev => ({
        ...prev,
        views: prev.views + 1
      }))
    }, 5000)

    return () => clearTimeout(timer)
  }, [post.content])

  // Format date
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-KE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass-morphism hover:bg-white/10 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Leaks</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              {/* Category & Breaking Badge */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Link
                  href={`/category/${post.category.slug}`}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold"
                  style={{ 
                    backgroundColor: `${post.category.color}20`,
                    color: post.category.color 
                  }}
                >
                  {post.category.name}
                </Link>
                
                {post.isBreaking && (
                  <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold">
                    🔥 BREAKING
                  </span>
                )}
                
                <HeatIndex value={post.heatIndex} size="md" />
              </div>

              {/* Title */}
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-text-secondary mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{post.author.name}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-text-secondary" />
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-text-secondary" />
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{readTime} read</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 ml-auto">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{post.views.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    <span>{post.shares.toLocaleString()} shares</span>
                  </div>
                </div>
              </div>
            </motion.header>

            {/* Featured Image/Video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative aspect-video rounded-2xl overflow-hidden mb-8"
            >
              <Image
                src={post.coverImage.url}
                alt={post.coverImage.alt}
                fill
                className="object-cover"
                priority
              />
              
              {/* Video Overlay */}
              {post.isVideo && post.videoUrl && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-2xl shadow-secondary/40 hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 text-black ml-1" fill="currentColor" />
                  </button>
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-xl glass-morphism">
              <div className="flex items-center gap-4">
                <ShareButtons
                  url={`/post/${post.slug}`}
                  title={post.title}
                  excerpt={post.excerpt}
                />
                
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isBookmarked
                      ? 'bg-primary/20 text-primary'
                      : 'glass-morphism hover:bg-white/10'
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                  <span>{isBookmarked ? 'Saved' : 'Save'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {post.tags.slice(0, 3).map(tag => (
                  <Link
                    key={tag}
                    href={`/tag/${tag}`}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors text-sm"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="prose prose-lg prose-invert max-w-none mb-12"
            >
              <div className="text-xl text-text-secondary mb-8 font-medium">
                {post.excerpt}
              </div>
              
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </motion.article>

            {/* Comments Section */}
            <Comments postId={post.id} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Author Bio */}
            <div className="glass-morphism rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    {post.author.avatar ? (
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={64}
                        height={64}
                        className="rounded-full"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-black">
                        {post.author.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold">{post.author.name}</h3>
                  <p className="text-text-secondary text-sm">Verified Leaker</p>
                </div>
              </div>
              <p className="text-text-secondary text-sm mb-4">
                Street Insider with over 5 years of experience uncovering Nairobi&apos;s hottest gossip.
                Trusted source for exclusive leaks.
              </p>
              <button className="w-full py-2 rounded-lg glass-morphism hover:bg-white/10 transition-colors text-sm font-medium">
                Follow Author
              </button>
            </div>

            {/* Related Posts */}
            <div className="glass-morphism rounded-2xl p-6">
              <h3 className="font-heading text-xl font-bold mb-6">Related Leaks</h3>
              <div className="space-y-4">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.div
                    key={relatedPost.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Link
                      href={`/post/${relatedPost.slug}`}
                      className="block p-4 rounded-xl hover:bg-white/5 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{ 
                            backgroundColor: `${relatedPost.category.color}20`,
                            color: relatedPost.category.color 
                          }}
                        >
                          {relatedPost.category.name}
                        </span>
                        <span className="text-xs text-text-secondary flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {relatedPost.views.toLocaleString()}
                        </span>
                      </div>
                      <h4 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-text-secondary mt-1 line-clamp-1">
                        {relatedPost.excerpt}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Trending Now */}
            <div className="glass-morphism rounded-2xl p-6">
              <h3 className="font-heading text-xl font-bold mb-6">🔥 Trending Now</h3>
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="text-2xl font-bold text-text-secondary">#{i}</div>
                    <div>
                      <h4 className="font-medium text-sm">Celebrity Scandal Rocks Industry</h4>
                      <p className="text-xs text-text-secondary">Hot News • 45K views</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ad Spot */}
            <div className="glass-morphism rounded-2xl p-6 border border-dashed border-white/20 text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📢</span>
              </div>
              <h4 className="font-heading font-semibold mb-2">Advertise Here</h4>
              <p className="text-sm text-text-secondary mb-4">
                Reach engaged readers
              </p>
              <button className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Play icon component
const Play = ({ className, fill }: { className?: string; fill?: string }) => (
  <svg
    className={className}
    fill={fill || "currentColor"}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
)
