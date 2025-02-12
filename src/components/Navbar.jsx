/**
 * Navbar Component
 * Responsive navigation bar with language switcher and scroll-based styling
 * Uses Framer Motion for animations and country flags for language selection
 */
import { useMobileMenu } from '../context/MobileMenuContext'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { GB, BR } from 'country-flag-icons/react/3x2'

const Navbar = ({ onLanguageToggle, currentLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useMobileMenu()
  const { t } = useTranslation()

  // Effect to handle scroll-based styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigation links data
  const navLinks = [
    { href: '#about', label: t('about.title') },
    { href: '#projects', label: t('projects.title') },
    { href: '#contact', label: t('contact.title') },
    // { href: '#posts', label: t('posts.title') }
  ]

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-primary py-4 shadow-lg' : 'bg-primary py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-2xl font-mono text-white hover:text-white/80 transition-colors font-bold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            &lt;VGR/&gt;
          </motion.a>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white hover:text-white/80 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Navigation links */}
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-white hover:text-white/80 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </motion.a>
            ))}

            {/* Language switcher */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => currentLanguage === 'pt' && onLanguageToggle()}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                  currentLanguage === 'en'
                    ? 'bg-white text-primary border border-white'
                    : 'text-white border border-white/30 hover:border-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Switch to English"
              >
                <GB className="w-5 h-4" title="English" />
                <span className="text-sm">EN</span>
              </motion.button>

              <motion.button
                onClick={() => currentLanguage === 'en' && onLanguageToggle()}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                  currentLanguage === 'pt'
                    ? 'bg-white text-primary border border-white'
                    : 'text-white border border-white/30 hover:border-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Mudar para Português"
              >
                <BR className="w-5 h-4" title="Português" />
                <span className="text-sm">PT</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-primary shadow-lg mt-2 rounded-lg`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-white hover:text-white/80 transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            
            {/* Mobile Language Switcher */}
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => {
                  if (currentLanguage === 'pt') {
                    onLanguageToggle()
                    setIsMobileMenuOpen(false)
                  }
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                  currentLanguage === 'en'
                    ? 'bg-white text-primary border border-white'
                    : 'text-white border border-white/30 hover:border-white'
                }`}
              >
                <GB className="w-5 h-4" title="English" />
                <span className="text-sm">EN</span>
              </button>

              <button
                onClick={() => {
                  if (currentLanguage === 'en') {
                    onLanguageToggle()
                    setIsMobileMenuOpen(false)
                  }
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                  currentLanguage === 'pt'
                    ? 'bg-white text-primary border border-white'
                    : 'text-white border border-white/30 hover:border-white'
                }`}
              >
                <BR className="w-5 h-4" title="Português" />
                <span className="text-sm">PT</span>
              </button>
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
}

export default Navbar