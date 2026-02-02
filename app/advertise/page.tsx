'use client'

import { motion } from 'framer-motion'
import { Target, Users, TrendingUp, BarChart3, Clock, CheckCircle, Send, DollarSign, Megaphone } from 'lucide-react'

export default function AdvertisePage() {
  const audienceStats = [
    { label: 'Monthly Visitors', value: '250K+', icon: Users, color: 'text-primary' },
    { label: 'Avg. Engagement', value: '4.2 min', icon: Clock, color: 'text-secondary' },
    { label: 'Social Shares', value: '42K+', icon: TrendingUp, color: 'text-accent-purple' },
    { label: 'Growth Rate', value: '35%', icon: BarChart3, color: 'text-green-400' },
  ]

  const advertisingOptions = [
    {
      title: 'Sponsored Posts',
      description: 'Native content that appears in the main feed',
      price: 'From $150',
      features: ['24-hour visibility', 'Social media mention', 'Analytics report'],
      popular: false
    },
    {
      title: 'Banner Ads',
      description: 'Display ads in sidebar and content areas',
      price: 'From $75/week',
      features: ['Multiple size options', 'High visibility spots', 'Geo-targeting'],
      popular: true
    },
    {
      title: 'Video Sponsorships',
      description: 'Sponsor exclusive video content',
      price: 'Custom Quote',
      features: ['Pre-roll placement', 'Brand integration', 'Content partnership'],
      popular: false
    }
  ]

  const audienceDemographics = [
    { category: 'Age 18-35', percentage: 78 },
    { category: 'Nairobi Residents', percentage: 85 },
    { category: 'Students/Professionals', percentage: 92 },
    { category: 'Mobile Users', percentage: 95 },
  ]

  const benefits = [
    'Reach Nairobi\'s trendiest audience',
    'High engagement and share rates',
    'Youth-focused content environment',
    'Viral content potential',
    'Direct access to urban market',
    'Authentic street culture context'
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-16 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
                  <Megaphone className="w-4 h-4" />
                  Advertising Opportunities
                </span>
                <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                  Advertise with <span className="text-gradient">Mtaa Leaks</span>
                </h1>
                <p className="text-xl text-text-secondary mb-8 max-w-2xl">
                  Reach Nairobi's most engaged youth audience. Your brand in front of trendsetters,
                  influencers, and the urban culture movers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://t.me/mtaaleaks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-bold hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-3"
                  >
                    <Send className="w-5 h-5" />
                    Contact on Telegram
                  </a>
                  <a
                    href="#pricing"
                    className="px-8 py-3 rounded-xl glass-morphism border border-white/10 hover:border-primary/30 transition-all flex items-center justify-center gap-3"
                  >
                    <DollarSign className="w-5 h-5" />
                    View Pricing
                  </a>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {audienceStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-morphism rounded-2xl p-6 text-center"
                    >
                      <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm text-text-secondary">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 to-secondary/5 blur-2xl rounded-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Audience Demographics */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Know Your <span className="text-gradient">Audience</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              We reach Nairobi's most influential demographic - young, urban, and highly engaged.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Demographic Stats */}
            <div>
              <h3 className="font-heading text-xl font-bold mb-6">Audience Breakdown</h3>
              <div className="space-y-4">
                {audienceDemographics.map((item, index) => (
                  <div key={item.category} className="flex items-center justify-between p-4 rounded-lg glass-morphism">
                    <span className="font-medium">{item.category}</span>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-2 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ delay: index * 0.1, duration: 1 }}
                          className="h-full bg-gradient-to-r from-primary to-secondary"
                        />
                      </div>
                      <span className="font-bold text-primary w-10">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="font-heading text-xl font-bold mb-6">Why Advertise With Us</h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-lg hover:glass-morphism transition-all"
                  >
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Advertising <span className="text-gradient">Packages</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Choose the package that fits your campaign goals. All packages include detailed analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advertisingOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`relative rounded-2xl p-8 transition-all ${
                  option.popular 
                    ? 'border-2 border-primary/50 glass-morphism' 
                    : 'border border-white/10 glass-morphism'
                }`}
              >
                {option.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-black text-sm font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="font-heading text-xl font-bold mb-2">{option.title}</h3>
                  <p className="text-text-secondary text-sm mb-4">{option.description}</p>
                  <div className="text-2xl font-bold mb-2">{option.price}</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {option.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a
                  href="https://t.me/mtaaleaks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-3 rounded-lg text-center font-semibold transition-all ${
                    option.popular
                      ? 'bg-gradient-to-r from-primary to-secondary text-black hover:shadow-lg hover:shadow-primary/30'
                      : 'glass-morphism border border-white/10 hover:border-primary/30'
                  }`}
                >
                  Get Started
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-morphism rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
          <div className="relative z-10">
            <Target className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="font-heading text-3xl font-bold mb-4">
              Ready to Reach Nairobi's Trendsetters?
            </h2>
            <p className="text-text-secondary text-xl mb-8 max-w-2xl mx-auto">
              Contact us on Telegram to discuss custom campaigns, negotiate rates, or get a personalized media kit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://t.me/mtaaleaks"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-bold hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-3"
              >
                <Send className="w-5 h-5" />
                Contact on Telegram
              </a>
              <a
                href="https://t.me/mtaaleaks"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-xl glass-morphism border border-white/10 hover:border-primary/30 transition-all flex items-center justify-center gap-3"
              >
                <Megaphone className="w-5 h-5" />
                Request Media Kit
              </a>
            </div>
            <p className="mt-6 text-sm text-text-secondary">
              Average response time: 2 hours via Telegram
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h3 className="font-heading text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'How do I start advertising?',
                a: 'Contact us directly on Telegram @mtaaleaks with your campaign details. We\'ll respond within 2 hours.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept M-Pesa, bank transfers, and cryptocurrency for international clients.'
              },
              {
                q: 'Can I target specific demographics?',
                a: 'Yes! We offer geo-targeting, interest-based targeting, and custom audience segments.'
              },
              {
                q: 'Do you provide performance reports?',
                a: 'All campaigns include detailed analytics including impressions, clicks, and engagement metrics.'
              }
            ].map((faq, index) => (
              <div key={index} className="glass-morphism rounded-xl p-6">
                <h4 className="font-heading font-semibold mb-3">{faq.q}</h4>
                <p className="text-text-secondary text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
