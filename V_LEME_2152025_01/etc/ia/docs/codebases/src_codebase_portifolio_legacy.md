# App.css

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

/* Logo animations */
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  filter: drop-shadow(0 0 0.5em rgba(100, 108, 255, 0.3));
}

.logo:hover {
  filter: drop-shadow(0 0 1em rgba(100, 108, 255, 0.6));
}

.logo.react:hover {
  filter: drop-shadow(0 0 2em rgba(97, 218, 251, 0.6));
}

/* Card styles */
.card {
  padding: 2em;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

/* Text styles */
.read-the-docs {
  color: #888;
  font-size: 0.875rem;
}

/* Loading animation */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Glass effect */
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

```

# App.jsx

```jsx
/**
 * Main App component that serves as the application container
 * Handles language switching and provides i18n context to all components
 */
import { MobileMenuProvider } from './context/MobileMenuContext'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { I18nextProvider } from 'react-i18next'

// Import components
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import Journey from './components/Journey'
import PostsPage from './pages/PostsPage'

// Import i18n configuration
import i18n from './i18n'


function App() {
  const [language, setLanguage] = useState('en')

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'pt' : 'en'
    setLanguage(newLang)
    i18n.changeLanguage(newLang)
  }

  return (
    <I18nextProvider i18n={i18n}>
      <MobileMenuProvider>
        <div className="min-h-screen bg-white">
          <Navbar onLanguageToggle={toggleLanguage} currentLanguage={language} />
          <main>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
              <About />
              <Projects />
              {/* <PostsPage /> */}
              <Contact />
            </motion.div>
          </main>
        </div>
      </MobileMenuProvider>
    </I18nextProvider>
  )
}

export default App 
```

# assets/react.svg

This is a file of the type: SVG Image

# components/About.jsx

```jsx
/**
 * About Component
 * Displays information about skills and experience
 * Uses Framer Motion for animations and intersection observer for scroll-based animations
 */

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'
import { BiData } from 'react-icons/bi'
import { FaRobot, FaChartLine } from 'react-icons/fa'
import { BsCloudFill } from 'react-icons/bs'
import { AiOutlineCode } from 'react-icons/ai'
import { TbMathFunction } from 'react-icons/tb'
import { useState } from 'react'

// List of technical skills organized by category
const skillsByCategory = {
  dataEngineering: {
    title: 'Data Engineering',
    icon: BiData,
    skills: [
      'Airflow',
      'ETL Process',
      'Apache Spark',
      'Kafka',
      'Data Pipelines',
      'Data Warehousing',
      'Data Lakes',
      'SQL & NoSQL',
      'Data Modeling'
    ],
  },
  dataScience: {
    title: 'Data Science',
    icon: TbMathFunction,
    skills: [
      'TensorFlow',
      'SciPy',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'Jupyter',
      'Statistical Analysis',
      'Machine Learning',
      'Data Visualization'
    ],
  },
  devOpsCloud: {
    title: 'DevOps & Cloud Computing',
    icon: BsCloudFill,
    skills: [
      'AWS',
      'Azure',
      'Docker',
      'Kubernetes',
      'CI/CD',
      'Infrastructure as Code',
      'Terraform',
      'Git',
      'Monitoring & Logging'
    ],
  },
  softwareEngineering: {
    title: 'Software Engineering',
    icon: AiOutlineCode,
    skills: [
      'Python',
      'Java',
      'JavaScript',
      'REST APIs',
      'Microservices',
      'System Design',
      'Clean Code',
      'Design Patterns',
      'Test-Driven Development'
    ],
  },
  artificialIntelligence: {
    title: 'Artificial Intelligence',
    icon: FaRobot,
    skills: [
      'Deep Learning',
      'Neural Networks',
      'NLP',
      'Computer Vision',
      'PyTorch',
      'Keras',
      'Reinforcement Learning',
      'Model Deployment',
      'MLOps'
    ],
  },
  businessIntelligence: {
    title: 'Business Intelligence',
    icon: FaChartLine,
    skills: [
      'Power BI',
      'Tableau',
      'Data Analytics',
      'KPI Monitoring',
      'Dashboard Design',
      'Business Analysis',
      'Data Storytelling',
      'SQL Server',
      'ETL Tools'
    ],
  },
}

const About = () => {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState(null)
  // Setup intersection observer for scroll-based animations
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="section-container">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-12"
      >
        {/* Text content */}
        <div className="max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">
            {t('about.title')}
          </h2>
          <p className="text-textSecondary mb-4">
            {t('about.description')}
          </p>
          <p className="text-textSecondary mb-4">
            {t('about.description2')}
          </p>
          <p className="text-textSecondary mb-6">
            {t('about.description3')}
          </p>
        </div>
          
        {/* Skills section */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center">
            {t('about.expertise')}
          </h3>
          {/* Skills categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skillsByCategory).map(([key, category], categoryIndex) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={key}
                  className="group relative bg-secondary/5 rounded-lg p-6 hover:bg-secondary/10 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.5,
                    delay: categoryIndex * 0.1
                  }}
                  onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="text-2xl text-secondary" />
                    <h4 className="text-xl font-medium text-secondary">
                      {category.title}
                    </h4>
                  </div>
                  
                  {/* Skills list - expandable on click */}
                  <div className={`overflow-hidden transition-all duration-300 ${activeCategory === key ? 'h-[200px]' : 'h-0'}`}>
                    <div className="overflow-y-auto h-full pr-2 custom-scrollbar">
                      <ul className="space-y-2">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.li
                            key={skill}
                            className="flex items-center text-textSecondary"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                              duration: 0.3, 
                              delay: skillIndex * 0.05 
                            }}
                          >
                            <span className="text-secondary mr-2">▹</span>
                            {skill}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Indicator text */}
                  <p className="text-textSecondary text-sm mt-2">
                    {activeCategory === key 
                      ? t('about.skills.collapse') 
                      : t('about.skills.expand')
                    }
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default About 
```

# components/Contact.jsx

```jsx
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

// Adicione esta linha logo após os imports
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)

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
      // Log mais detalhado
      console.log('Ambiente:', {
        NODE_ENV: process.env.NODE_ENV,
        VITE_EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        VITE_EMAILJS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        hasPublicKey: !!import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      })

      const templateParams = {
        to_email: 'viniciusgribas@gmail.com',
        from_name: name,
        from_email: email,
        message: `CV Download Request from ${name} (${email})
        
Message: ${message || 'No message provided'}`
      }

      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      )

      console.log('Email enviado com sucesso:', response)

      // Fechar o modal e iniciar o download
      setIsModalOpen(false)
      const link = document.createElement('a')
      link.href = '/assets/Vinicius_Guerra_e_Ribas_CV.pdf'
      link.download = 'Vinicius_Guerra_e_Ribas_CV.pdf'
      link.click()
    } catch (error) {
      console.error('Erro detalhado:', error)
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
          <motion.a
            href="#"
            onClick={handleDownloadCV}
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium border-2 border-secondary text-secondary rounded-lg hover:bg-secondary/10 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('contact.downloadCV')}
            <FiDownload className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </motion.a>
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
```

# components/Hero.jsx

```jsx
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpecialty((prev) => (prev + 1) % t('hero.specialties', { returnObjects: true }).length)
    }, 1500)

    return () => clearInterval(interval)
  }, [t])

  return (
    <section className="min-h-screen flex items-center justify-center section-container relative overflow-hidden bg-white pt-24 md:pt-32">
      {/* Main content container */}
      <motion.div
        className="max-w-4xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting text */}
        <motion.p
          className="text-primary font-mono mb-2 text-lg"
          variants={itemVariants}
        >
          {t('hero.greeting')}
        </motion.p>

        {/* Main heading with rotating specialties */}
        <div className="h-[12rem] mb-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold leading-tight text-textPrimary"
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
              className="text-primary mt-2"
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
          <div className="stats-card">
            <FaProjectDiagram className="text-4xl text-primary mb-2" />
            <div className="text-3xl font-bold text-primary">{t('hero.stats.projects.number')}</div>
            <div className="text-textSecondary">{t('hero.stats.projects.label')}</div>
          </div>
          
          <div className="stats-card">
            <FaGlobeAmericas className="text-4xl text-primary mb-2" />
            <div className="text-3xl font-bold text-primary">{t('hero.stats.countries.number')}</div>
            <div className="text-textSecondary">{t('hero.stats.countries.label')}</div>
          </div>
          
          <div className="stats-card">
            <FaBuilding className="text-4xl text-primary mb-2" />
            <div className="text-3xl font-bold text-primary">{t('hero.stats.experience.number')}</div>
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
          <a href="#about" className="px-6 py-2 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors">
            {t('about.title')}
          </a>
          <a href="#projects" className="px-6 py-2 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors">
            {t('projects.title')}
          </a>
          <a href="#contact" className="px-6 py-2 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors">
            {t('contact.title')}
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
```

# components/Journey.jsx

```jsx
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'
import { FiCalendar, FiMapPin } from 'react-icons/fi'

const Journey = () => {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="section-container">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold mb-12 text-center">
          {t('about.timeline.title')}
        </h2>
        <div className="space-y-8 max-w-4xl mx-auto">
          {t('about.timeline.items', { returnObjects: true }).map((item, index) => (
            <motion.div
              key={item.period}
              className="relative pl-8 pb-8 border-l-2 border-secondary/20 last:border-l-0"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-secondary" />
              
              <div className="bg-secondary/5 rounded-lg p-6 ml-4 hover:bg-secondary/10 transition-all duration-300 transform hover:-translate-y-1">
                <div className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4" />
                    {item.period}
                  </div>
                </div>
                
                <h4 className="text-xl font-semibold mb-2">{item.role}</h4>
                <div className="flex items-center gap-2 text-textSecondary mb-4">
                  <FiMapPin className="w-4 h-4 text-secondary" />
                  <span>{item.company}</span>
                </div>
                
                <p className="text-textSecondary">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Journey 
```

# components/Modal.jsx

```jsx
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FiX } from 'react-icons/fi'

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useTranslation()
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white border-2 border-secondary rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-secondary">
                  {t('contact.modal.title')}
                </h3>
                <button
                  onClick={onClose}
                  className="text-textSecondary hover:text-secondary"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-textSecondary mb-2">
                    {t('contact.modal.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 bg-secondary/5 border-2 border-secondary/20 rounded-lg focus:border-secondary outline-none text-textPrimary"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-textSecondary mb-2">
                    {t('contact.modal.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 bg-secondary/5 border-2 border-secondary/20 rounded-lg focus:border-secondary outline-none text-textPrimary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-textSecondary mb-2">
                    {t('contact.modal.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    className="w-full px-4 py-2 bg-secondary/5 border-2 border-secondary/20 rounded-lg focus:border-secondary outline-none text-textPrimary resize-none"
                    placeholder={t('contact.modal.messagePlaceholder')}
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  {t('contact.modal.download')}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Modal 
```

# components/Navbar.jsx

```jsx
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
```

# components/Posts.jsx

```jsx
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Posts = () => {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      const response = await fetch('posts/posts.json'); // Caminho atualizado
      const data = await response.json();
      setPosts(data.posts);
      // Extrai tags únicas em português e inglês
      const uniqueTags = [
        ...new Set(data.posts.flatMap(post => [...post.tags_pt, ...post.tags_en]))
      ];
      setTags(uniqueTags);
    };

    loadPosts();
  }, []);

  const filteredPosts = selectedTag 
    ? posts.filter(post => 
        (i18n.language === 'pt' ? post.tags_pt : post.tags_en).includes(selectedTag)
      ) 
    : posts;

  return (
    <section className="section-container">
      <h2 className="text-4xl font-bold mb-6">{t('posts.title')}</h2>
      <p className="text-sm text-gray-500 mb-4">{t('posts.filterInstruction')}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {(i18n.language === 'pt' 
          ? tags.filter(tag => posts.some(post => post.tags_pt.includes(tag))) 
          : tags.filter(tag => posts.some(post => post.tags_en.includes(tag)))
        ).map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-1 rounded-full border-2 border-primary ${selectedTag === tag ? 'bg-primary text-white' : 'bg-white text-black'} transition-colors`}
          >
            {tag}
          </button>
        ))}
        <button onClick={() => setSelectedTag(null)} className="px-4 py-1 rounded-full border-2 border-primary bg-white text-black transition-colors">
          {t('posts.all')}
        </button>
      </div>
      <div>
        {filteredPosts.map(post => (
          <div key={post.id} className="mb-4 p-4 border rounded flex flex-col md:flex-row items-start">
            <div className="flex-shrink-0">
              <img src={post.image} alt="Post" className="w-32 h-auto mr-4" />
            </div>
            <div className="flex-grow">
              <h3 className="text-2xl font-semibold">{i18n.language === 'pt' ? post.title_pt : post.title_en}</h3>
              <p>{i18n.language === 'pt' ? post.excerpt_pt : post.excerpt_en}</p>
              <div className="flex items-center mt-2">
                {post.available_pt && <img src="/public/br-flag.svg" alt="Português" className="w-4 h-4 mr-2" />}
                {post.available_en && <img src="/public/uk-flag.svg" alt="English" className="w-4 h-4 mr-2" />}
                {post.icon && <img src={post.icon} alt="Source" className="w-4 h-4 mr-2" />}
              </div>
              <a href={post.url} className="text-primary mt-2" target="_blank" rel="noopener noreferrer">{t('posts.readMore')}</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Posts;
```

# components/Projects.jsx

```jsx
/**
 * Projects Component
 * Displays a horizontal carousel of project cards with descriptions and links
 * Uses Framer Motion for animations and intersection observer for scroll-based animations
 */

import { motion, useAnimation } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { AiFillStar } from 'react-icons/ai'
import { useEffect, useState, useRef } from 'react'

// Projects data with client reviews
const projects = [
  {
    title: 'Energy Sector Text Mining & NLP Analysis',
    description: 'projects.nlpProject',
    tech: ['Python', 'NLP', 'Machine Learning', 'Web Scraping', 'Plotly', 'Sentiment Analysis'],
    rating: 5.00,
    review: {
      en: "In order to apply Text Mining, Sentiment Analysis, NLP, Machine Learning, Crawlers, and Web Scraping knowledge, data solutions were developed with topics relevant to the energy sector. These solutions scrape data from CNN Brazil websites (with a focus on the international energy scenario) and government agency websites such as ANP, ANEEL, and MME (with a focus on the national energy scenario). Once scraped, the data is manipulated and added to a dataframe, and finally presented via Plotly and Wordcloud, as shown in the figures below.",
      pt: "Com o objetivo de aplicar conhecimentos em Text Mining, Análise de Sentimentos, PLN, Machine Learning, Crawlers e Web Scraping, foram desenvolvidas soluções de dados com tópicos relevantes para o setor energético. Essas soluções extraem dados dos sites da CNN Brasil (com foco no cenário energético internacional) e sites de agências governamentais como ANP, ANEEL e MME (com foco no cenário energético nacional). Uma vez extraídos, os dados são manipulados e adicionados a um dataframe, e finalmente apresentados via Plotly e Wordcloud, como mostrado nas figuras abaixo."
    },
    source: 'USP - Universidade de São Paulo',
    date: 'October, 2022',
    image: '/assets/cloud_view.png',
    url: 'https://www.upwork.com/freelancers/~01705d8c35f170c499?p=1636913026235174912'
  },
  {
    title: 'Brazilian Electric Generation System Analysis',
    description: 'projects.uspProject',
    tech: ['Python', 'Data Analysis', 'Plotly', 'GeoDataFrame', 'Data Visualization'],
    rating: 5.00,
    review: {
      en: "The project consists of an exploratory data analysis. The objective of this analysis is to visualize the Brazilian electric generation system in a diagrammatic and spatial way, extracting insights. For this, a dataframe of the GeoDataFrame type was used and, mainly, the power of the Plotly Express library optimized for the Python language.",
      pt: "O projeto consiste em uma análise exploratória de dados. O objetivo desta análise é visualizar o sistema de geração elétrica brasileiro de forma diagramática e espacial, extraindo insights. Para isso, foi utilizado um dataframe do tipo GeoDataFrame e, principalmente, o poder da biblioteca Plotly Express otimizada para a linguagem Python."
    },
    source: 'USP - Universidade de São Paulo',
    date: 'January, 2023',
    image: '/assets/bar_charts_1.png',
    url: 'https://www.upwork.com/freelancers/viniciusg?p=1636904767317643264'
  },
  {
    title: 'ANEEL Data Engineering Project',
    description: 'projects.aneelProject',
    tech: ['Python', 'Data Engineering', 'Streamlit', 'Data Visualization'],
    rating: 5.00,
    review: {
      en: "With great satisfaction, I recommend Vinicius Guerra e Ribas. During his engineering graduation, he stood out in his internship at ANEEL and later completed a postgraduate degree in data science, evidenced by a notable course completion work that used ANEEL data in an innovative way. Additionally, his significant contributions to improving ANEEL's open data reflect his commitment.",
      pt: "Com grande satisfação, recomendo Vinicius Guerra e Ribas. Durante sua graduação em engenharia, destacou-se em seu estágio na ANEEL e, posteriormente, concluiu uma pós-graduação em ciência de dados, evidenciada por um notável trabalho de conclusão de curso que utilizou dados da ANEEL de maneira inovadora. Além disso, suas contribuições significativas para aprimorar os dados abertos da ANEEL refletem seu comprometimento."
    },
    source: 'USP - Universidade de São Paulo',
    date: 'December 1, 2023',
    image: '/assets/aneel_project.png',
    url: 'https://vinici-analise-geracao-iipydashboard-geracao-brasil-app-1w9whk.streamlit.app/'
  },
  {
    title: 'Senior Python Developer - Data Extraction',
    description: 'projects.seniorPython',
    tech: ['Python', 'AWS', 'Data Engineering', 'Backend'],
    rating: 5.00,
    review: {
      en: "Everything went great, I can sincerely recommend Vinicius!",
      pt: "Tudo foi ótimo, posso sinceramente recomendar o Vinicius!"
    },
    source: 'Upwork',
    date: 'Apr 14, 2024 - May 30, 2024',
    private: true
  },
  {
    title: 'Data Scientists/Engineers ETL Project',
    description: 'projects.dataScientist',
    tech: ['ETL', 'ML', 'Python', 'AWS'],
    rating: 5.00,
    review: {
      en: "Vinicius did a great job on ETL and ML tasks using Amazon Web Services (AWS) capabilities. We'd be happy to work with this freelancer again.",
      pt: "Vinicius fez um ótimo trabalho nas tarefas de ETL e ML usando as capacidades da Amazon Web Services (AWS). Estamos felizes em trabalhar com este freelancer novamente."
    },
    source: 'Upwork',
    date: 'Jun 14, 2023 - Jun 26, 2023',
    private: true
  },
  {
    title: 'IBGE Data Project',
    description: 'projects.ibgeData',
    tech: ['Python', 'Data Engineering', 'ETL'],
    rating: 5.00,
    review: {
      en: "The work was done with professionalism and on schedule.",
      pt: "O trabalho foi realizado com profissionalismo e dentro do prazo."
    },
    source: 'Workana',
    date: 'Mar 17, 2023 - Apr 24, 2023',
    private: true
  },
  {
    title: 'Electricity Distribution Network Maps',
    description: 'projects.electricityMaps',
    tech: ['Python', 'GIS', 'Data Visualization'],
    rating: 5.00,
    review: {
      en: "Vinicius's work was amazing. Very complete and based on reliable sources of information, managing to finish the work with an impressive speed and great quality.",
      pt: "O trabalho do Vinicius foi incrível. Muito completo e baseado em fontes confiáveis de informação, conseguindo finalizar o trabalho com uma velocidade impressionante e ótima qualidade."
    },
    source: 'Upwork',
    date: 'Nov 13, 2022 - Nov 15, 2022',
    image: '/assets/south_america_map.jpeg',
    url: 'https://www.upwork.com/freelancers/viniciusg?p=1636909561297944576', // Adicionada a URL
  }
]

const Projects = () => {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language
  const [isHovered, setIsHovered] = useState(false)
  const carouselRef = useRef(null)
  
  // Setup intersection observer for scroll-based animations
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <AiFillStar
        key={index}
        className={`inline ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  // Animation for continuous scrolling
  useEffect(() => {
    if (!isHovered && carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth
      const clientWidth = carouselRef.current.clientWidth
      
      if (scrollWidth > clientWidth) {
        const scroll = () => {
          if (!isHovered && carouselRef.current) {
            carouselRef.current.scrollLeft += 1
            if (
              carouselRef.current.scrollLeft >=
              scrollWidth - clientWidth
            ) {
              carouselRef.current.scrollLeft = 0
            }
          }
        }

        const intervalId = setInterval(scroll, 20)
        return () => clearInterval(intervalId)
      }
    }
  }, [isHovered])

  return (
    <section id="projects" className="section-container">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Section header */}
        <h2 className="text-4xl font-bold text-center mb-4">
          {t('projects.title')}
        </h2>
        <p className="text-textSecondary text-center mb-12">
          {t('projects.description')}
        </p>

        {/* Projects carousel */}
        <div 
          ref={carouselRef}
          className="overflow-x-hidden relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex gap-6 py-4">
            {[...projects, ...projects].map((project, index) => (
              <motion.div
                key={`${project.title}-${index}`}
                className="flex-none w-[400px] bg-secondary/5 rounded-lg p-6 shadow-lg"
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Project details */}
                <div>
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-textSecondary mb-3 text-sm">{t(project.description)}</p>
                  
                  {/* Technologies used */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-secondary text-xs font-mono px-2 py-1 rounded-full bg-secondary/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Client Review */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      {renderStars(project.rating)}
                      <span className="text-textSecondary text-sm">({project.rating.toFixed(2)})</span>
                    </div>
                    <p className="text-textSecondary italic text-sm">
                      "{currentLanguage === 'pt' ? project.review.pt : project.review.en}"
                    </p>
                    <div className="mt-2 text-xs text-textSecondary">
                      <span className="font-semibold">{project.source}</span> • {project.date}
                    </div>
                  </div>

                  {/* Project status and link */}
                  <div className="flex items-center justify-between mt-2">
                    {project.private && (
                      <div className="text-xs text-textSecondary">
                        {t('projects.privateProject')}
                      </div>
                    )}
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-secondary hover:text-secondary/80 transition-colors"
                      >
                        <span>{t('projects.viewProject')}</span>
                        <FiExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Project image if available */}
                  {project.image && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative group mt-4 h-32 overflow-hidden rounded-lg">
                        <div className="absolute inset-0 bg-secondary/20 transition-opacity group-hover:opacity-0" />
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll indicators */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="text-sm text-textSecondary">
            {isHovered ? t('projects.hoverPause') : t('projects.autoScroll')}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Projects 
```

# context/MobileMenuContext.jsx

```jsx
// src/context/MobileMenuContext.jsx
import { createContext, useContext, useState } from 'react';

const MobileMenuContext = createContext();

export function MobileMenuProvider({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <MobileMenuContext.Provider value={{ isMobileMenuOpen, setIsMobileMenuOpen }}>
      {children}
    </MobileMenuContext.Provider>
  );
}

export function useMobileMenu() {
  return useContext(MobileMenuContext);
}
```

# i18n.js

```js
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      // Hero section
      'hero.greeting': 'Hi, I\'m Vinicius Guerra e Ribas',
      'hero.intro': 'I specialize in',
      'hero.specialties': [
        'Data Engineering',
        'Data Science',
        'Artificial Intelligence',
        'Software Engineering',
        'Software Development'
      ],
      'hero.stats': {
        'projects': {
          'number': '50+',
          'label': 'Projects and Data Pipelines'
        },
        'countries': {
          'number': '10+',
          'label': 'International Projects'
        },
        'experience': {
          'number': '5+',
          'label': 'Years in Engineering and Data'
        }
      },
      'hero.description': 'As a software and data engineer, I am dedicated to crafting innovative, ' +
                          'data-driven solutions that tackle complex challenges across various industries. ' +
                          'My expertise lies in developing scalable and efficient products that drive ' +
                          'organizational success.',
      
      // About section
      'about.title': 'About Me',
      'about.description': 'With a strong foundation in data engineering, data science, AI, and software development, ' +
                          'I create technology that empowers organizations and enhances lives. ' +
                          'My focus is on delivering scalable, efficient, and inclusive solutions tailored to diverse needs.',
      'about.description2': 'Currently, I am a software developer specializing in data and AI.' +
                          'I use best practices in Cloud Computing, DevSecOps, Software Architecture, Data Engineering, and Artificial Intelligence to create ' +
                          'robust and scalable solutions.',
      'about.description3': 'I am always seeking new challenges and opportunities to learn and grow, believing that collaboration and knowledge sharing are essential for success.',
      'about.timeline': {
        'title': 'My Journey',
        'items': [
          {
            'period': '2023 - Present',
            'role': 'Data Engineer, Analytics Engineering',
            'company': 'Raizen Energia S.A.',
            'description': 'Leading data quality initiatives and developing cloud solutions for data democratization across multiple departments.'
          },
          {
            'period': '2022 - 2023',
            'role': 'Data Engineer, ETL Pipelines Development',
            'company': 'Raizen Energia S.A.',
            'description': 'Architected and implemented 20+ data pipelines, integrating various data sources and developing ML-enhanced solutions.'
          },
          {
            'period': '2021 - 2022',
            'role': 'Business Intelligence Analyst',
            'company': 'Energisa S.A.',
            'description': 'Enhanced data warehousing capabilities and automated data processes, reducing manual work by 75%.'
          },
          {
            'period': '2019 - 2021',
            'role': 'Data Scientist, Intern',
            'company': 'Brazilian Electricity Regulatory Agency (ANEEL)',
            'description': 'Contributed to national energy customer database development, receiving formal recognition from the Brazilian government.'
          }
        ]
      },
      'about.expertise': 'Areas of Expertise & Technologies',
      'about.skills.expand': 'Click to expand',
      'about.skills.collapse': 'Click to collapse',
      
      // Projects section
      'projects.title': 'Featured Projects',
      'projects.description': 'Take a look at some of my recent projects and client collaborations. Each project represents a unique challenge solved through innovative solutions.',
      'projects.privateProject': '(Private project - Source code and details protected by NDA)',
      'projects.nlpProject': 'Developed advanced text mining and NLP solutions for energy sector analysis, implementing web scraping and sentiment analysis on news and government data sources.',
      'projects.uspProject': 'Conducted comprehensive exploratory data analysis of the Brazilian electric generation system, creating interactive visualizations and spatial analysis using Python and advanced data visualization libraries.',
      'projects.aneelProject': 'Developed innovative data analysis solutions for the Brazilian Electricity Regulatory Agency (ANEEL), focusing on open data and energy sector visualization tools.',
      'projects.seniorPython': 'Led the development of data extraction systems and backend infrastructure, implementing efficient solutions for complex data processing requirements.',
      'projects.dataScientist': 'Developed ETL pipelines and machine learning models using AWS services, creating scalable data processing solutions.',
      'projects.ibgeData': 'Created data processing pipelines for Brazilian government statistical data, ensuring accurate and efficient data transformation.',
      'projects.electricityMaps': 'Developed visualization tools for electricity distribution networks, creating interactive maps and data analysis systems.',
      'projects.autoScroll': 'Auto-scrolling • Hover to pause',
      'projects.hoverPause': 'Paused • Move mouse away to continue',
      'projects.viewProject': 'View Project',
      
      // Contact section
      'contact.title': 'Get in Touch',
      'contact.description': 'I enjoy connecting with like-minded professionals and solving complex problems. ' +
                            'Feel free to reach out if you have any questions or want to collaborate ' +
                            'on exciting projects!',
      'contact.button': 'Say Hello',
      'contact.downloadCV': 'Download CV',
      'contact.modal.title': 'Download CV',
      'contact.modal.name': 'Name',
      'contact.modal.email': 'Email',
      'contact.modal.download': 'Download',
      'contact.modal.error': 'Error sending contact information. Please try again.',
      'contact.modal.message': 'Message (optional)',
      'contact.modal.messagePlaceholder': 'Write your message here...',
      
      // Posts section
      'posts.title': 'Posts',
      'posts.all': 'All',
      'posts.readMore': 'Read More',
      'posts.filterInstruction': 'Click on the tags to filter the posts.',
    },
  },
  pt: {
    translation: {
      // Hero section
      'hero.greeting': 'Olá, me chamo Vinicius Guerra e Ribas',
      'hero.intro': 'Especialista em',
      'hero.specialties': [
        'Engenharia de Dados',
        'Ciência de Dados',
        'Inteligência Artificial', 
        'Engenharia de Software',
        'Desenvolvimento de Software'
      ],
      'hero.stats': {
        'projects': {
          'number': '50+',
          'label': 'Projetos e Pipelines de Dados'
        },
        'countries': {
          'number': '10+',
          'label': 'Projetos Internacionais'
        },
        'experience': {
          'number': '5+',
          'label': 'Anos em Engenharia e Dados'
        }
      },
      'hero.description': 'Como engenheiro de software e dados, dedico-me a criar soluções inovadoras e orientadas por dados ' +
                          'que enfrentam desafios complexos em diversos setores. Minha especialidade está em desenvolver ' +
                          'produtos escaláveis e eficientes que impulsionam o sucesso organizacional.',
      
      // About section
      'about.title': 'Sobre Mim',
      'about.description': 'Com uma base sólida em engenharia de dados, ciência de dados, IA e desenvolvimento de software, ' +
                          'crio tecnologias que capacitam organizações e melhoram vidas. ' +
                          'Meu foco está em entregar soluções escaláveis, eficientes e inclusivas, adaptadas a diversas necessidades.',
      'about.description2': 'Atualmente, sou desenvolvedor de software especialista em dados e IA.' +
                          'Utilizo das melhores práticas de Cloud Computing, DevSecOps,' +
                          'Arquitetura de Software, Engenharia de dados e Inteligência Artificial para criar ' +
                          'soluções robustas e escaláveis.',
      'about.description3': 'Estou sempre em busca de novos desafios e oportunidades para aprender e crescer, ' +
                            'acreditando que a colaboração e a troca de conhecimentos são fundamentais para o sucesso.',
      'about.timeline': {
        'title': 'Minha Trajetória',
        'items': [
          {
            'period': '2023 - Presente',
            'role': 'Engenheiro de Dados, Engenharia Analítica',
            'company': 'Raizen Energia S.A.',
            'description': 'Liderando iniciativas de qualidade de dados e desenvolvendo soluções em nuvem para democratização de dados em múltiplos departamentos.'
          },
          {
            'period': '2022 - 2023',
            'role': 'Engenheiro de Dados, Desenvolvimento de Pipelines ETL',
            'company': 'Raizen Energia S.A.',
            'description': 'Arquitetou e implementou mais de 20 pipelines de dados, integrando várias fontes e desenvolvendo soluções aprimoradas com ML.'
          },
          {
            'period': '2021 - 2022',
            'role': 'Analista de Business Intelligence',
            'company': 'Energisa S.A.',
            'description': 'Aprimorou capacidades de data warehousing e automatizou processos de dados, reduzindo trabalho manual em 75%.'
          },
          {
            'period': '2019 - 2021',
            'role': 'Cientista de Dados, Estagiário',
            'company': 'Agência Nacional de Energia Elétrica (ANEEL)',
            'description': 'Contribuiu para o desenvolvimento do banco de dados nacional de consumidores de energia, recebendo reconhecimento formal do governo brasileiro.'
          }
        ]
      },
      'about.expertise': 'Áreas de Especialização & Tecnologias',
      'about.skills.expand': 'Clique para expandir',
      'about.skills.collapse': 'Clique para recolher',
      
      // Projects section
      'projects.title': 'Projetos em Destaque',
      'projects.description': 'Conheça alguns dos meus projetos recentes e colaborações com clientes. Cada projeto representa um desafio único resolvido através de soluções inovadoras.',
      'projects.privateProject': '(Projeto privado - Código fonte e detalhes protegidos por NDA)',
      'projects.nlpProject': 'Desenvolveu soluções avançadas de mineração de texto e processamento de linguagem natural para análise do setor energético, implementando raspagem de web e análise de sentimento em fontes de dados de notícias e governos.',
      'projects.uspProject': 'Conduziu análise exploratória de dados abrangente do sistema elétrico brasileiro, criando visualizações interativas e análise espacial usando Python e bibliotecas avançadas de visualização de dados.',
      'projects.aneelProject': 'Desenvolveu soluções de análise de dados inovadoras para a Agência Reguladora de Energia Elétrica Brasileira (ANEEL), focando em dados abertos e ferramentas de visualização para o setor energético.',
      'projects.seniorPython': 'Liderou o desenvolvimento de sistemas de extração de dados e infraestrutura backend, implementando soluções eficientes para requisitos complexos de processamento de dados.',
      'projects.dataScientist': 'Desenvolveu pipelines ETL e modelos de machine learning usando serviços AWS, criando soluções escaláveis de processamento de dados.',
      'projects.ibgeData': 'Criou pipelines de processamento de dados estatísticos do governo brasileiro, garantindo transformação precisa e eficiente dos dados.',
      'projects.electricityMaps': 'Desenvolveu ferramentas de visualização para redes de distribuição de energia elétrica, criando mapas interativos e sistemas de análise de dados.',
      'projects.autoScroll': 'Rolagem automática • Passe o mouse para pausar',
      'projects.hoverPause': 'Pausado • Retire o mouse para continuar',
      'projects.viewProject': 'Ver Projeto',
      
      // Contact section
      'contact.title': 'Entre em Contato',
      'contact.description': 'Adoro me conectar com profissionais que compartilham da mesma visão e resolver problemas complexos. ' +
                            'Sinta-se à vontade para entrar em contato se tiver alguma dúvida ou quiser colaborar ' +
                            'em projetos interessantes!',
      'contact.button': 'Diga Olá',
      'contact.downloadCV': 'Baixar Currículo',
      'contact.modal.title': 'Baixar Currículo',
      'contact.modal.name': 'Nome',
      'contact.modal.email': 'E-mail',
      'contact.modal.download': 'Baixar',
      'contact.modal.error': 'Erro ao enviar informações de contato. Por favor, tente novamente.',
      'contact.modal.message': 'Mensagem (opcional)',
      'contact.modal.messagePlaceholder': 'Escreva sua mensagem aqui...',
      
      // Posts section
      'posts.title': 'Posts',
      'posts.all': 'All',
      'posts.readMore': 'Read More',
      'posts.filterInstruction': 'Clique nas tags para filtrar os posts.',
    },
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n 
```

# index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    @apply selection:bg-primary/30 selection:text-white;
  }

  body {
    @apply bg-white text-textPrimary font-sans;
  }

  /* Scrollbar customization */
  ::-webkit-scrollbar {
    @apply w-2;
  }

  ::-webkit-scrollbar-track {
    @apply bg-white;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-primary/30 rounded-full hover:bg-primary/50 transition-colors;
  }
}

@layer components {
  .section-container {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white;
  }

  .nav-link {
    @apply text-textSecondary hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all;
  }

  .btn-primary {
    @apply px-6 py-3 bg-primary text-white rounded-full hover:bg-secondary transition-all duration-300;
  }

  .btn-outline {
    @apply px-6 py-3 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300;
  }
}

/* Card styles */
.card {
  @apply bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300;
}

/* Stats styling */
.stats-card {
  @apply bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300;
}

/* Hero section specific styles */
.hero-container {
  @apply bg-white relative;
}

.hero-content {
  @apply bg-white relative z-10;
}

/* Navbar styles */
.navbar {
  @apply bg-white/90 backdrop-blur-sm shadow-sm;
}

/* Text colors */
.text-primary-color {
  @apply text-primary;
}

.text-secondary-color {
  @apply text-textSecondary;
}
```

# main.jsx

```jsx
/**
 * Main entry point for the Portfolio application
 * This file initializes React and renders the root component with additional configurations
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
// Import the main App component
import App from './App.jsx'
// Import i18n configuration for internationalization
import './i18n'
// Import global styles
import './index.css'

// Custom cursor follower
const CursorFollower = () => {
  React.useEffect(() => {
    const cursor = document.createElement('div')
    cursor.className = 'cursor-follower'
    document.body.appendChild(cursor)

    const moveCursor = (e) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
    }

    window.addEventListener('mousemove', moveCursor)
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.body.removeChild(cursor)
    }
  }, [])
  return null
}

// Create and render the root component with enhanced configurations
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <CursorFollower />
      <App />
    </MotionConfig>
  </React.StrictMode>,
) 
```

# pages/PostsPage.jsx

```jsx
import React from 'react';
import Posts from '../components/Posts';

const PostsPage = () => {
  return (
    <div>
      <Posts />
    </div>
  );
};

export default PostsPage; 
```

