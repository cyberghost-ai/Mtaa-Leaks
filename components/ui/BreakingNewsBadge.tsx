'use client'

import { useEffect, useState } from 'react'
import { AlertTriangle, Radio } from 'lucide-react'
import { motion } from 'framer-motion'

const breakingNewsItems = [
  "MAJOR LEAK: Government Official Spotted in Controversial Meeting",
  "URGENT: Massive Traffic Jam on Thika Road - Avoid Area",
  "EXCLUSIVE: Local Celebrity Pregnancy Announcement",
  "FLASH: Power Outage Hits Major Nairobi Suburbs"
]

export default function BreakingNewsBadge() {
  const [isBreaking, setIsBreaking] = useState(true)
  const [currentNews, setCurrentNews] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  // Simulate breaking news updates
  useEffect(() => {
    const newsInterval = setInterval(() => {
      if (isBreaking) {
        setCurrentNews((prev) => (prev + 1) % breakingNewsItems.length)
      }
    }, 8000)

    // Simulate breaking news status changes
    const statusInterval = setInterval(() => {
      setIsBreaking(Math.random() > 0.3)
    }, 30000)

    // Auto-hide after 10 seconds if not breaking
    const visibilityInterval = setInterval(() => {
      if (!isBreaking) {
        setIsVisible(false)
        setTimeout(() => setIsVisible(true), 30000)
      }
    }, 10000)

    return () => {
      clearInterval(newsInterval)
      clearInterval(statusInterval)
      clearInterval(visibilityInterval)
    }
  }, [isBreaking])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isBreaking ? 1 : 0.7,
        scale: isBreaking ? 1 : 0.95
      }}
      transition={{ duration: 0.3 }}
      className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm
        ${isBreaking 
          ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/30 text-red-400' 
          : 'bg-surface/30 border-white/10 text-text-secondary'
        }`}
    >
      {/* Pulsing Dot */}
      {isBreaking && (
        <motion.div
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500"
        />
      )}

      {/* Icon */}
      <motion.div
        animate={isBreaking ? {
          rotate: [0, 10, -10, 0]
        } : {}}
        transition={isBreaking ? {
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1
        } : {}}
      >
        {isBreaking ? (
          <AlertTriangle className="w-4 h-4" />
        ) : (
          <Radio className="w-4 h-4" />
        )}
      </motion.div>

      {/* Text */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold whitespace-nowrap">
          {isBreaking ? 'BREAKING NOW' : 'LATEST'}
        </span>
        
        {/* News Ticker */}
        {isBreaking && (
          <motion.div
            key={currentNews}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-xs overflow-hidden"
          >
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-current" />
              <p className="text-sm truncate">
                {breakingNewsItems[currentNews]}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Live Indicator */}
      {isBreaking && (
        <div className="flex items-center gap-1">
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-red-500"
          />
          <span className="text-xs font-bold">LIVE</span>
        </div>
      )}
    </motion.div>
  )
}
