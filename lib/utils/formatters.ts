/**
 * Format large numbers with K, M suffixes
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

/**
 * Format date to relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date: Date): string => {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  
  return date.toLocaleDateString('en-KE', {
    month: 'short',
    day: 'numeric'
  })
}

/**
 * Calculate reading time from content
 */
export const calculateReadingTime = (content: string): string => {
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
}

/**
 * Generate excerpt from content
 */
export const generateExcerpt = (content: string, maxLength: number = 150): string => {
  const plainText = content.replace(/<[^>]+>/g, '')
  if (plainText.length <= maxLength) return plainText
  return plainText.substring(0, maxLength).trim() + '...'
}

/**
 * Generate heat index based on engagement
 */
export const calculateHeatIndex = (
  views: number,
  shares: number,
  comments: number,
  publishedAt: Date
): number => {
  const now = new Date()
  const hoursSincePublished = (now.getTime() - publishedAt.getTime()) / 3600000
  
  // Base score from engagement
  let score = Math.log10(views + 1) * 10
  score += Math.log10(shares + 1) * 15
  score += Math.log10(comments + 1) * 20
  
  // Time decay (more recent = higher score)
  const timeDecay = Math.max(0, 1 - (hoursSincePublished / 168)) // Decay over 7 days
  score *= timeDecay
  
  // Cap at 100
  return Math.min(Math.floor(score), 100)
}

/**
 * Format video duration
 */
export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

/**
 * Generate unique ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
