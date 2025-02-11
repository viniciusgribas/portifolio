/**
 * Contact Component
 * Displays contact information and social media links
 * Uses Framer Motion for animations and react-icons for social media icons
 */

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'
import { FiMail, FiLinkedin, FiGithub } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

// Social media links configuration
const socialLinks = [
  {
    name: 'Email',
    icon: <FiMail size={24} />,
    href: 'mailto:viniciusgribas@gmail.com',
  },
  {
    name: 'LinkedIn',
    icon: <FiLinkedin size={24} />,
    href: 'https://www.linkedin.com/in/vinicius-guerra-e-ribas/',
  },
  {
    name: 'GitHub',
    icon: <FiGithub size={24} />,
    href: 'https://github.com/viniciusgribas',
  },
  {
    name: 'WhatsApp',
    icon: <FaWhatsapp size={24} />,
    href: 'https://wa.me/+5561981657050',
  },
]

const Contact = () => {
  const { t } = useTranslation()
  // Setup intersection observer for scroll-based animations
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="contact" className="section-container">
      {/* Main content container with fade-in animation */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        {/* Section heading */}
        <h2 className="text-4xl font-bold mb-6">
          {t('contact.title')}
        </h2>

        {/* Section description */}
        <p className="text-textSecondary mb-12">
          {t('contact.description')}
        </p>

        {/* Social media links */}
        <motion.div
          className="flex justify-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-textSecondary hover:text-secondary transition-colors"
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {link.icon}
              <span className="sr-only">{link.name}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Contact button */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="mailto:your.email@example.com"
            className="btn-primary"
          >
            {t('contact.button')}
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Contact 