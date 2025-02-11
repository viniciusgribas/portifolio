/**
 * Hero Component
 * Main landing section of the portfolio that displays a rotating list of specialties
 * Uses Framer Motion for animations and i18n for translations
 */

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { FaProjectDiagram, FaGlobeAmericas, FaBuilding } from 'react-icons/fa'

// Animation variants for different elements
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const textVariants = {
  enter: { y: 20, opacity: 0 },
  center: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
}

const Hero = () => {
  const { t } = useTranslation()
  const [currentSpecialty, setCurrentSpecialty] = useState(0)

  // Effect to rotate through specialties
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpecialty((prev) => (prev + 1) % t('hero.specialties', { returnObjects: true }).length)
    }, 1500)

    return () => clearInterval(interval)
  }, [t])

  return (
    <section className="min-h-screen flex items-center justify-center section-container relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent" />
      
      {/* Main content container */}
      <motion.div
        className="max-w-4xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting text */}
        <motion.p
          className="text-secondary font-mono mb-2 text-lg"
          variants={itemVariants}
        >
          {t('hero.greeting')}
        </motion.p>

        {/* Main heading with rotating specialties */}
        <div className="h-[12rem] mb-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold leading-tight"
            variants={itemVariants}
          >
            {t('hero.intro')}
            <motion.div
              key={currentSpecialty}
              initial="enter"
              animate="center"
              exit="exit"
              variants={textVariants}
              transition={{ duration: 0.3 }}
              className="text-secondary mt-2"
            >
              {t('hero.specialties', { returnObjects: true })[currentSpecialty]}
            </motion.div>
          </motion.h1>
        </div>

        {/* Stats section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
          variants={itemVariants}
        >
          <div className="flex flex-col items-center text-center">
            <FaProjectDiagram className="text-4xl text-secondary mb-2" />
            <div className="text-3xl font-bold text-secondary">{t('hero.stats.projects.number')}</div>
            <div className="text-textSecondary">{t('hero.stats.projects.label')}</div>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <FaGlobeAmericas className="text-4xl text-secondary mb-2" />
            <div className="text-3xl font-bold text-secondary">{t('hero.stats.countries.number')}</div>
            <div className="text-textSecondary">{t('hero.stats.countries.label')}</div>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <FaBuilding className="text-4xl text-secondary mb-2" />
            <div className="text-3xl font-bold text-secondary">{t('hero.stats.experience.number')}</div>
            <div className="text-textSecondary">{t('hero.stats.experience.label')}</div>
          </div>
        </motion.div>

        {/* Description text */}
        <motion.p
          className="text-textSecondary text-lg max-w-2xl mb-8"
          variants={itemVariants}
        >
          {t('hero.description')}
        </motion.p>

        {/* CTA buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4"
        >
          <a href="#about" className="btn-primary">
            {t('about.title')}
          </a>
          <a href="#projects" className="btn-primary">
            {t('projects.title')}
          </a>
          <a href="#contact" className="btn-primary">
            {t('contact.title')}
          </a>
        </motion.div>

        {/* Remove scroll indicator and keep only the background decoration */}
        <div className="absolute right-0 top-1/4 -translate-y-1/2 opacity-10">
          <div className="text-[20rem] font-bold text-secondary rotate-90">&lt;/&gt;</div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero 