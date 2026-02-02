'use client'

import { useState } from 'react'
import { 
  Share2, 
  Facebook, 
  Twitter, 
  MessageCircle, 
  Link as LinkIcon,
  Check,
  Mail
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ShareButtonsProps {
  url: string
  title: string
  excerpt: string
  className?: string
}

export default function ShareButtons({ url, title, excerpt, className = '' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const shareData = {
    title,
    text: excerpt,
    url: `${window.location.origin}${url}`
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const sharePlatforms = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-500/20 hover:bg-blue-500/30',
      textColor: 'text-blue-400',
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
          '_blank'
        )
      }
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500/20 hover:bg-sky-500/30',
      textColor: 'text-sky-400',
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareData.url)}`,
          '_blank'
        )
      }
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500/20 hover:bg-green-500/30',
      textColor: 'text-green-400',
      action: () => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(`${title}\n${shareData.url}`)}`,
          '_blank'
        )
      }
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-500/20 hover:bg-gray-500/30',
      textColor: 'text-gray-400',
      action: () => {
        window.open(
          `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${excerpt}\n\n${shareData.url}`)}`,
          '_blank'
        )
      }
    }
  ]

  return (
    <div className={`relative ${className}`}>
      {/* Main Share Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg glass-morphism border border-white/10 hover:border-primary/30 transition-all group"
      >
        <Share2 className="w-5 h-5 text-text-secondary group-hover:text-primary transition-colors" />
        <span className="font-medium text-sm">Share</span>
        <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
          {Math.floor(Math.random() * 100) + 50}
        </span>
      </motion.button>

      {/* Share Options Dropdown */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="fixed inset-0 z-40"
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className="absolute right-0 top-full mt-2 w-64 glass-morphism rounded-xl border border-white/10 shadow-2xl shadow-black/50 z-50 p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold">Share This Leak</h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <span className="text-2xl leading-none">&times;</span>
                </button>
              </div>

              {/* Copy Link Button */}
              <button
                onClick={handleCopyLink}
                className="flex items-center justify-between w-full p-3 rounded-lg bg-white/5 hover:bg-primary/20 transition-colors group mb-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${copied ? 'bg-green-500/20' : 'bg-primary/20'}`}>
                    {copied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <LinkIcon className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm">
                      {copied ? 'Copied!' : 'Copy Link'}
                    </p>
                    <p className="text-xs text-text-secondary truncate max-w-[140px]">
                      {shareData.url.substring(0, 30)}...
                    </p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-white/5">
                  Ctrl+C
                </span>
              </button>

              {/* Platform Buttons */}
              <div className="grid grid-cols-2 gap-2">
                {sharePlatforms.map((platform) => (
                  <motion.button
                    key={platform.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      platform.action()
                      setIsExpanded(false)
                    }}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl ${platform.color} transition-colors`}
                  >
                    <platform.icon className={`w-6 h-6 ${platform.textColor}`} />
                    <span className="text-xs font-medium">{platform.name}</span>
                  </motion.button>
                ))}
              </div>

              {/* QR Code Option */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    // Implement QR code generation
                    console.log('Generate QR code for:', shareData.url)
                    setIsExpanded(false)
                  }}
                  className="flex items-center justify-center gap-2 w-full p-2 rounded-lg hover:bg-white/5 transition-colors text-sm"
                >
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <span className="text-xs font-bold text-black">QR</span>
                  </div>
                  Generate QR Code
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Share Count Popup */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 left-0 px-3 py-2 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              Link copied to clipboard!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
