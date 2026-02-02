'use client'

import { useState, useCallback, useEffect } from 'react'
import { Search, X, TrendingUp, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { debounce } from 'lodash'
import Link from 'next/link'

const recentSearches = [
  "Celebrity gossip",
  "Nairobi nightlife",
  "TikTok trends",
  "Street food",
  "Local artists"
]

const trendingSearches = [
  { term: "Westlands club", count: 1250 },
  { term: "Mama Nili samosas", count: 890 },
  { term: "Underground music", count: 670 },
  { term: "Traffic updates", count: 540 }
]

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Mock search function (replace with actual API call)
  const performSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([])
        return
      }

      setIsSearching(true)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))

      // Mock results
      const mockResults = [
        {
          id: 1,
          title: `${searchQuery} - Exclusive Leak`,
          excerpt: 'Breaking news about this trending topic...',
          category: 'Hot News',
          slug: 'search-result-1',
          type: 'article'
        },
        {
          id: 2,
          title: `Viral Video: ${searchQuery}`,
          excerpt: 'Watch the trending video everyone is talking about...',
          category: 'Video Vibes',
          slug: 'search-result-2',
          type: 'video'
        },
        {
          id: 3,
          title: `Behind the Scenes: ${searchQuery}`,
          excerpt: 'Get the inside scoop on what really happened...',
          category: 'Behind Scenes',
          slug: 'search-result-3',
          type: 'article'
        }
      ]

      setResults(mockResults)
      setIsSearching(false)
    }, 500),
    []
  )

  useEffect(() => {
    performSearch(query)
    return () => performSearch.cancel()
  }, [query, performSearch])

  const handleClear = () => {
    setQuery('')
    setResults([])
    setShowSuggestions(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      // Navigate to search results page or perform search
      console.log('Searching for:', query)
      setShowSuggestions(false)
    }
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search for leaks, gossip, videos..."
            className="w-full pl-12 pr-12 py-3 rounded-xl glass-morphism border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Search button */}
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-black font-semibold text-sm hover:shadow-lg hover:shadow-primary/30 transition-all"
        >
          Search
        </button>
      </form>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full glass-morphism rounded-xl border border-white/10 shadow-2xl shadow-black/50 z-50 overflow-hidden"
          >
            {/* Recent Searches */}
            {!query && (
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-text-secondary" />
                  <h3 className="text-sm font-semibold">Recent Searches</h3>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(search)}
                      className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-sm text-text-secondary group-hover:text-text-primary">
                        {search}
                      </span>
                      <X className="w-4 h-4 opacity-0 group-hover:opacity-100 text-text-secondary" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Searches */}
            {!query && (
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold">Trending Searches</h3>
                </div>
                <div className="space-y-2">
                  {trendingSearches.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(item.term)}
                      className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <span className="text-sm font-medium">{item.term}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                        {item.count.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {query && (
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">
                    {isSearching ? 'Searching...' : 'Search Results'}
                  </h3>
                  <span className="text-xs text-text-secondary">
                    {results.length} found
                  </span>
                </div>

                {isSearching ? (
                  <div className="py-8 flex justify-center">
                    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-3">
                    {results.map((result) => (
                      <Link
                        key={result.id}
                        href={`/post/${result.slug}`}
                        onClick={() => setShowSuggestions(false)}
                        className="block p-3 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            result.type === 'video' ? 'bg-secondary' : 'bg-primary'
                          }`} />
                          <div className="flex-1">
                            <h4 className="font-medium group-hover:text-primary transition-colors">
                              {result.title}
                            </h4>
                            <p className="text-sm text-text-secondary mt-1 line-clamp-1">
                              {result.excerpt}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-xs px-2 py-1 rounded-full bg-white/5">
                                {result.category}
                              </span>
                              <span className="text-xs text-text-secondary">
                                {result.type === 'video' ? '🎥 Video' : '📝 Article'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <Search className="w-12 h-12 text-text-secondary/30 mx-auto mb-3" />
                    <p className="text-text-secondary">No results found for "{query}"</p>
                    <p className="text-sm text-text-secondary/70 mt-1">
                      Try different keywords
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Quick Actions */}
            <div className="p-4 bg-surface/30">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setQuery('breaking news')
                    setShowSuggestions(true)
                  }}
                  className="text-xs px-3 py-2 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors text-center"
                >
                  🔥 Breaking
                </button>
                <button
                  onClick={() => {
                    setQuery('viral video')
                    setShowSuggestions(true)
                  }}
                  className="text-xs px-3 py-2 rounded-lg bg-white/5 hover:bg-secondary/20 hover:text-secondary transition-colors text-center"
                >
                  🎥 Viral
                </button>
                <button
                  onClick={() => {
                    setQuery('celebrity gossip')
                    setShowSuggestions(true)
                  }}
                  className="text-xs px-3 py-2 rounded-lg bg-white/5 hover:bg-accent-purple/20 hover:text-accent-purple transition-colors text-center"
                >
                  💎 Gossip
                </button>
                <button
                  onClick={() => {
                    setQuery('local events')
                    setShowSuggestions(true)
                  }}
                  className="text-xs px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-center"
                >
                  📅 Events
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
