'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Search, Flame, Zap, Send, Megaphone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import BreakingNewsBadge from '@/components/ui/BreakingNewsBadge'
import SearchBar from '@/components/shared/SearchBar'

const navItems = [
  { name: 'Home', href: '/', icon: Flame },
  { name: 'Hot News', href: '/category/hot-news' },
  { name: 'Behind Scenes', href: '/category/behind-scenes' },
  { name: 'Video Vibes', href: '/videos' },
  { name: 'Around Mtaa', href: '/category/around-mtaa' },
  { name: 'Advertise', href: '/advertise', icon: Megaphone },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-morphism py-3' : 'bg-background/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10">
                  <Image 
                    src="/logo.jpg" 
                    alt="Mtaa Leaks Logo"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -inset-1 bg-primary/20 blur-lg group-hover:bg-secondary/20 transition-colors rounded-lg" />
              </div>
              <div>
                <h1 className="font-heading text-2xl font-black bg-gradient-to-r from-primary via-secondary to-accent-purple bg-clip-text text-transparent">
                  Mtaa Leaks
                </h1>
                <p className="text-xs text-text-secondary">Street News & Viral Vibes</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-6">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`relative group font-medium text-sm tracking-wide ${
                        pathname === item.href
                          ? 'text-primary'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {Icon && <Icon className="w-4 h-4" />}
                        {item.name}
                      </span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                    </Link>
                  )
                })}
              </div>

              <div className="flex items-center space-x-4">
                <BreakingNewsBadge />
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="p-2 rounded-lg glass-morphism hover:bg-surface/50 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
                {/* Telegram Subscribe Button */}
                <a
                  href="https://t.me/mtaaleaks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-black font-semibold text-sm hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Join Telegram
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg glass-morphism"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <SearchBar />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="fixed top-0 right-0 bottom-0 w-80 glass-morphism z-50 md:hidden p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-heading font-bold">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-surface/50"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                        pathname === item.href
                          ? 'bg-surface text-primary'
                          : 'hover:bg-surface/50'
                      }`}
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )
                })}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <BreakingNewsBadge />
                <div className="mt-4">
                  <SearchBar />
                </div>
                {/* Telegram Join Button - Mobile */}
                <a
                  href="https://t.me/mtaaleaks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block w-full py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-black font-semibold text-center hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Join Telegram Channel
                </a>
                {/* Advertise Button - Mobile */}
                <Link
                  href="/advertise"
                  onClick={() => setIsOpen(false)}
                  className="mt-3 block w-full py-3 rounded-lg glass-morphism border border-primary/30 text-primary font-semibold text-center hover:border-primary/50 transition-all flex items-center justify-center gap-2"
                >
                  <Megaphone className="w-4 h-4" />
                  Advertise With Us
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
