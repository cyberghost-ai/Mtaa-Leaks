'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Zap, Flame } from 'lucide-react'
import { useEffect, useState } from 'react'

const hotTopics = [
  "EXCLUSIVE: Celebrity Beef Spotted in Westlands! 🔥",
  "VIRAL: TikTok Dance Taking Over Nairobi Streets 💃",
  "LEAKED: New Club Opening This Weekend 🎉",
  "SHOCKING: Local Artist Signs Major Deal 🎤",
  "TRENDING: Street Food Vendor Goes Viral 🍔"
]

export default function HeroTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % hotTopics.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 border-y border-white/10 py-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255, 0, 85, 0.2) 2%, transparent 0%)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between">
          {/* Label */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Flame className="w-6 h-6 text-primary animate-pulse" />
              <div className="absolute -inset-2 bg-primary/20 blur-md rounded-full" />
            </div>
            <div className="hidden md:block">
              <h2 className="font-heading font-bold text-lg flex items-center gap-2">
                <span className="text-gradient">HOTTEST LEAKS</span>
                <TrendingUp className="w-5 h-5 text-secondary" />
              </h2>
              <p className="text-xs text-text-secondary">Updated every 5 minutes</p>
            </div>
          </div>

          {/* Ticker */}
          <div className="flex-1 mx-8 overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-3">
                <Zap className="w-5 h-5 text-secondary flex-shrink-0" />
                <p className="text-lg font-semibold truncate">
                  {hotTopics[currentIndex]}
                </p>
                <div className="hidden md:flex items-center gap-2 ml-4">
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold border border-primary/30">
                    BREAKING
                  </span>
                  <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-semibold border border-secondary/30">
                    TRENDING
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Dots */}
          <div className="hidden md:flex items-center gap-2">
            {hotTopics.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary w-6'
                    : 'bg-text-secondary/30 hover:bg-text-secondary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <motion.div
        key={currentIndex}
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 4, ease: 'linear' }}
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary"
      />
    </div>
  )
}
