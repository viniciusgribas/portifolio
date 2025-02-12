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