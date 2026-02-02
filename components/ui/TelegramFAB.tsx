'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, QrCode, Users, Zap } from 'lucide-react'
import Image from 'next/image'

export default function TelegramFAB() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const telegramLink = process.env.NEXT_PUBLIC_TELEGRAM_LINK || '[YOUR_TELEGRAM_CHANNEL_LINK_HERE]'
  
  // Fallback QR code data URL (1px transparent image - replace with actual QR code)
  const qrCodeData = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzBhMGEwYSIvPjxwYXRoIGQ9Ik00MCA0MGgxMjB2MTIwSDQweiIgZmlsbD0iI2ZmMDA1NSIvPjwvc3ZnPg=='

  return (
    <>
      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="relative">
          {/* Pulsing Ring */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-primary/20"
          />
          <motion.div
            animate={{ scale: [1.2, 1.4, 1.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute inset-0 rounded-full bg-secondary/20"
          />

          {/* Main Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsOpen(true)}
            className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary shadow-2xl shadow-primary/40 flex items-center justify-center group"
          >
            <MessageCircle className="w-8 h-8 text-black" />
            
            {/* Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute right-full mr-4 top-1/2 -translate-y-1/2"
                >
                  <div className="glass-morphism rounded-xl px-4 py-2 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="font-semibold">Join The Leaks</span>
                    </div>
                    <p className="text-xs text-text-secondary">Real-time updates</p>
                  </div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-surface/30 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
            >
              <div className="glass-morphism rounded-2xl border border-white/20 overflow-hidden mx-4">
                {/* Header */}
                <div className="relative p-6">
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <MessageCircle className="w-8 h-8 text-black" />
                    </div>
                    <div>
                      <h2 className="font-heading text-2xl font-bold">
                        Join The Buzz
                      </h2>
                      <p className="text-text-secondary">
                        Get leaks before they drop
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-0">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* QR Code */}
                    <div className="bg-surface/30 rounded-xl p-4 flex flex-col items-center">
                      <div className="mb-4 p-2 rounded-lg bg-white/5">
                        <div className="w-32 h-32 relative">
                          <Image
                            src={qrCodeData}
                            alt="Telegram QR Code"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <p className="text-sm text-center text-text-secondary">
                        Scan to join
                      </p>
                    </div>

                    {/* Info */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-semibold">12.5K Members</p>
                          <p className="text-sm text-text-secondary">Active community</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Zap className="w-5 h-5 text-secondary" />
                        <div>
                          <p className="font-semibold">Instant Updates</p>
                          <p className="text-sm text-text-secondary">Real-time notifications</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-text-secondary">
                          Join our Telegram channel for:
                        </p>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            Exclusive leaks & gossip
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                            Behind-the-scenes content
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                            Early access to videos
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <a
                    href={telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-6 py-3 px-6 rounded-xl bg-gradient-to-r from-primary to-secondary text-center text-black font-bold hover:shadow-lg hover:shadow-primary/30 transition-all"
                  >
                    Join Telegram Channel
                  </a>

                  <p className="text-xs text-text-secondary text-center mt-4">
                    🔒 Your privacy is respected. No spam, only quality leaks.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
