'use client'
import { Facebook, Twitter, Instagram, Youtube, Mail, Heart, Send } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'  // Add this import

export default function Footer() {
  const footerLinks = {
    Categories: [
      { name: 'Hot News', href: '/category/hot-news' },
      { name: 'Behind Scenes', href: '/category/behind-scenes' },
      { name: 'Video Vibes', href: '/videos' },
      { name: 'Around Mtaa', href: '/category/around-mtaa' },
    ],
    Resources: [
      { name: 'Submit a Leak', href: 'https://t.me/mtaaleaks', external: true },
      { name: 'Advertise', href: '/advertise' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: 'https://t.me/mtaaleaks', external: true },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'DMCA', href: '/dmca' },
    ]
  }

  const socialLinks = [
    { icon: Send, href: 'https://t.me/mtaaleaks', label: 'Telegram', isTelegram: true },
    { icon: Facebook, href: 'https://facebook.com/mtaaleaks', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/mtaaleaks', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/mtaaleaks', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/@mtaaleaks', label: 'YouTube' },
    { icon: Mail, href: 'mailto:contact@mtaaleaks.com', label: 'Email' },
  ]

  return (
    <footer className="mt-auto border-t border-white/10 bg-background/50 backdrop-blur-sm">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10">
                <Image 
                  src="/logo.jpg" 
                  alt="Mtaa Leaks Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-heading text-2xl font-black">
                  <span className="text-gradient">Mtaa Leaks</span>
                </h2>
                <p className="text-text-secondary text-sm">Street News & Viral Vibes</p>
              </div>
            </Link>
            <p className="text-text-secondary mb-6 max-w-md">
              Your premier source for breaking street news, exclusive gossip, and viral videos from Nairobi and beyond. First to know, always authentic.
            </p>
            
            {/* Newsletter - Now Telegram Subscribe */}
            <div className="mb-8">
              <h3 className="font-heading font-semibold mb-3">Join Our Telegram Channel</h3>
              <div className="flex gap-2">
                <div className="flex-1 px-4 py-3 rounded-lg glass-morphism border border-white/10 flex items-center">
                  <span className="text-text-secondary">t.me/mtaaleaks</span>
                </div>
                <a 
                  href="https://t.me/mtaaleaks" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Join Now
                </a>
              </div>
              <p className="text-xs text-text-secondary mt-2">
                Get instant updates, exclusive leaks, and viral content
              </p>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-heading font-semibold text-lg mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-primary transition-colors"
                      >
                        {link.name}
                        {link.name === 'Submit a Leak' && (
                          <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-primary/20 text-primary">
                            Telegram
                          </span>
                        )}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-text-secondary hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social & Contact */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-lg glass-morphism hover:bg-white/10 transition-colors group ${
                  social.isTelegram ? 'border border-primary/30' : ''
                }`}
                aria-label={social.label}
              >
                <social.icon className={`w-5 h-5 transition-colors ${
                  social.isTelegram 
                    ? 'text-primary group-hover:text-secondary' 
                    : 'text-text-secondary group-hover:text-primary'
                }`} />
              </a>
            ))}
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <p className="text-text-secondary mb-2">
              Got a tip? Submit via Telegram for anonymity.
            </p>
            <a
              href="https://t.me/mtaaleaks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-secondary font-medium transition-colors flex items-center gap-1 justify-center md:justify-end"
            >
              <Send className="w-4 h-4" />
              t.me/mtaaleaks
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-text-secondary text-sm">
              © {new Date().getFullYear()} Mtaa Leaks. All rights reserved.
              <span className="hidden md:inline"> • </span>
              <span className="block md:inline mt-1 md:mt-0">
                Connect with us on Telegram for exclusive content.
              </span>
            </p>
            
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <a 
                href="https://t.me/mtaaleaks" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <Send className="w-3 h-3" />
                Join Telegram
              </a>
              <span className="flex items-center gap-1">
                Made with
                <Heart className="w-4 h-4 text-primary mx-1" fill="currentColor" />
                in Nairobi
              </span>
            </div>
          </div>

          {/* Disclaimers */}
          <div className="mt-4 text-xs text-text-secondary/70 text-center">
            <p>
              Mtaa Leaks is an entertainment website. All content is for entertainment purposes only.
              Connect with us on Telegram for exclusive leaks and updates.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
