'use client'

import { Flame } from 'lucide-react'
import { motion } from 'framer-motion'

interface HeatIndexProps {
  value: number
  size?: 'sm' | 'md' | 'lg'
}

export default function HeatIndex({ value, size = 'md' }: HeatIndexProps) {
  const getColor = (val: number) => {
    if (val >= 80) return 'text-red-400'
    if (val >= 60) return 'text-orange-400'
    if (val >= 40) return 'text-yellow-400'
    return 'text-text-secondary'
  }

  const getBgColor = (val: number) => {
    if (val >= 80) return 'bg-gradient-to-r from-red-900/30 to-orange-900/30'
    if (val >= 60) return 'bg-gradient-to-r from-orange-900/30 to-yellow-900/30'
    if (val >= 40) return 'bg-gradient-to-r from-yellow-900/30 to-green-900/30'
    return 'bg-white/5'
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-1.5 rounded-full ${sizeClasses[size]} ${getBgColor(value)} border border-white/10 heat-index`}
    >
      <Flame className={`w-3.5 h-3.5 ${getColor(value)}`} />
      <span className={`font-bold ${getColor(value)}`}>{value}</span>
      <span className="text-text-secondary text-xs">HEAT</span>
      
      {/* Animated flames based on heat */}
      {value >= 80 && (
        <>
          <motion.div
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500"
          />
          <motion.div
            animate={{ 
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
            className="absolute -top-1 -right-3 w-1.5 h-1.5 rounded-full bg-orange-500"
          />
        </>
      )}
    </motion.div>
  )
}
