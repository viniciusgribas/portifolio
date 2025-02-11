/**
 * Contact Component
 * Displays contact information and social media links
 * Uses Framer Motion for animations and react-icons for social media icons
 */

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'
import { FiMail, FiLinkedin, FiGithub, FiDownload } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { useState } from 'react'
import Modal from './Modal'
import emailjs from '@emailjs/browser'

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
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Setup intersection observer for scroll-based animations
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleDownloadCV = (e) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')

    try {
      // Enviar e-mail usando EmailJS
      const templateParams = {
        to_email: 'viniciusgribas@gmail.com',
        from_name: name,
        from_email: email,
        message: `CV Download Request from ${name} (${email})
        
Message: ${message || 'No message provided'}`
      }

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )

      // Fechar o modal e iniciar o download
      setIsModalOpen(false)
      const link = document.createElement('a')
      link.href = '/assets/Vinicius_Guerra_e_Ribas_CV.pdf'
      link.download = 'Vinicius_Guerra_e_Ribas_CV.pdf'
      link.click()
    } catch (error) {
      console.error('Error sending email:', error)
      alert(t('contact.modal.error'))
    }
  }

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

        {/* Botões de contato */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Email button */}
          <motion.a
            href="mailto:viniciusgribas@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium border-2 border-secondary text-secondary rounded-lg hover:bg-secondary/10 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('contact.button')}
            <FiMail className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>

          {/* Download CV button - updated */}
          <motion.button
            onClick={handleDownloadCV}
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium bg-secondary text-primary border-2 border-secondary rounded-lg hover:bg-secondary/90 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('contact.downloadCV')}
            <FiDownload className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </section>
  )
}

export default Contact 