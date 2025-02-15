# api/email.services.ts

```ts

import type { EmailPayload } from '@/types/email.types';

/**
 * Email service for sending emails using EmailJS.
 */
const emailService = {
  /**
   * Sends an email using the EmailJS service.
   * @param {EmailPayload} payload - The email payload.
   * @returns {Promise<void>}
   */
  send: async (payload: EmailPayload): Promise<void> => {
    // EmailJS send logic here
  },
};

export default emailService;
```

# App.tsx

```tsx
import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar, Hero, About, Projects, Contact, LanguageChanger} from './components/sections';

const App: FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="mt-16">
        <LanguageChanger />
        <Hero />
        <About />
        <Projects />
        <Contact />
        </div>
        <footer>{/* Footer */}</footer>
      </div>
    </Router>
  );
};

export default App;
```

# components/common/Modal/index.ts

```ts
export { default as Modal } from './Modal';
```

# components/common/Modal/Modal.tsx

```tsx

import React, { FC, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
```

# components/sections/About/About.tsx

```tsx

import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const About: FC = () => {
  const { t } = useTranslation();

  return (
    <section className="about">
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('about.title')}
      </motion.h2>
      {/* About content */}
    </section>
  );
};

export default About;
```

# components/sections/About/index.ts

```ts
export { default as About } from './About';
```

# components/sections/Contact/Contact.tsx

```tsx

import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

const Contact: FC = () => {
  const { t } = useTranslation();

  return (
    <section className="contact">
      <h2>{t('contact.title')}</h2>
      <div className="contact-content">
        <ContactForm />
        <ContactInfo />
      </div>
    </section>
  );
};

export default Contact;
```

# components/sections/Contact/ContactForm.tsx

```tsx
import React from 'react';

const ContactForm: React.FC = () => {
  return (
    <form>
      {/* Your form fields go here */}
      <input type="text" placeholder="Your Name" />
      <input type="email" placeholder="Your Email" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
```

# components/sections/Contact/ContactInfo.tsx

```tsx

import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

const ContactInfo: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="contact-info">
      <p>{t('contact.info')}</p>
      {/* Contact info */}
    </div>
  );
};

export default ContactInfo;
```

# components/sections/Contact/index.ts

```ts

export { default as Contact } from './Contact';
```

# components/sections/Hero/Hero.tsx

```tsx
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaProjectDiagram, FaGlobeAmericas, FaBuilding } from 'react-icons/fa';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const textVariants = {
  enter: { y: 20, opacity: 0 },
  center: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

// Type for specialties array
type Specialties = string[];

const Hero: FC = () => {
  const { t } = useTranslation();
  const [currentSpecialty, setCurrentSpecialty] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const specialties = t('hero.specialties', { returnObjects: true }) as unknown as Specialties;
      setCurrentSpecialty((prev) => (prev + 1) % specialties.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [t]);

  // Get specialties array with proper typing
  const specialties = t('hero.specialties', { returnObjects: true }) as unknown as Specialties;

  return (
    <section className="min-h-screen flex items-center justify-center section-container relative overflow-hidden bg-white pt-24 md:pt-32">
      <motion.div
        className="max-w-4xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="text-primary font-mono mb-2 text-lg" variants={itemVariants}>
          {t('hero.greeting')}
        </motion.p>
        <div className="h-[12rem] mb-4">
          <motion.h1 className="text-4xl md:text-5xl font-bold leading-tight text-textPrimary" variants={itemVariants}>
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
              {specialties[currentSpecialty]}
            </motion.div>
          </motion.h1>
        </div>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8" variants={itemVariants}>
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
        <motion.p className="text-textSecondary text-lg max-w-2xl mb-8" variants={itemVariants}>
          {t('hero.description')}
        </motion.p>
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
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
  );
};

export default Hero;
```

# components/sections/Hero/index.ts

```ts
export { default as Hero } from './Hero';
```

# components/sections/index.ts

```ts
export { Hero } from './Hero';
export { About } from './About';
export { Projects } from './Projects';
export { Contact } from './Contact'; 
export { Navbar } from './Navbar'
export { LanguageChanger } from './LanguageChanger'
```

# components/sections/LanguageChanger/index.ts

```ts
export { default as LanguageChanger } from './LanguageChanger';
```

# components/sections/LanguageChanger/LanguageChanger.tsx

```tsx
import { useTranslation } from 'react-i18next';
import { GB, BR } from 'country-flag-icons/react/3x2';

const LanguageChanger = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="bg-white shadow-md flex justify-normal gap-4 p-2 z-10">
      <button 
        onClick={() => changeLanguage('en')}
        className={`flex items-center gap-2 px-3 py-1 rounded-md transition-all
          ${i18n.language === 'en' 
            ? 'bg-blue-100 text-blue-700 border-blue-300' 
            : 'bg-gray-50 text-gray-700 border-gray-200'} 
          border hover:bg-blue-50`}
      >
        <GB className="w-5 h-auto" title="UK flag" />
        EN
      </button>
      <button 
        onClick={() => changeLanguage('pt')}
        className={`flex items-center gap-2 px-3 py-1 rounded-md transition-all
          ${i18n.language === 'pt' 
            ? 'bg-blue-100 text-blue-700 border-blue-300' 
            : 'bg-gray-50 text-gray-700 border-gray-200'} 
          border hover:bg-blue-50`}
      >
        <BR className="w-5 h-auto" title="Brazil flag" />
        PT
      </button>
    </nav>
  );
};

export default LanguageChanger;

```

# components/sections/Navbar/index.ts

```ts
export { default as Navbar } from './Navbar';
```

# components/sections/Navbar/Navbar.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
      menu.style.transition = 'max-height 0.3s ease-in-out';
      menu.style.maxHeight = isOpen ? '200px' : '0';
    }
  }, [isOpen]);

  return (
      <nav className="bg-[#0077B5] shadow-md fixed top-0 left-0 w-full z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-2xl font-mono transition-transform duration-300 hover:scale-105 p-1 rounded-lg font-bold ">
              {t('navbar.logo')}
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-white hover:text-gray-200 font- px-3 py-2 rounded-md text-sm transition-transform duration-300 hover:scale-105"
              >
                {t('navbar.home')}
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-gray-200 font-bold px-3 py-2 rounded-md text-sm transition-transform duration-300 hover:scale-105"
              >
                {t('navbar.about')}
              </Link>
              <Link
                to="/projects"
                className="text-white hover:text-gray-200 font-bold px-3 py-2 rounded-md text-sm transition-transform duration-300 hover:scale-105"
              >
                {t('navbar.projects')}
              </Link>
              <Link
                to="/contact"
                  className="text-white hover:text-gray-200 font-bold px-3 py-2 rounded-md text-sm transition-transform duration-300 hover:scale-105"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className={`bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-textPrimary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">{t('navbar.openMenu')}</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden overflow-hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-white hover:text-gray-200 block px-3 py-2 rounded-md text-base font-bold transition duration-300 ease-in-out transform hover:scale-105"
            >
              {t('navbar.home')}
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-gray-200 block px-3 py-2 rounded-md text-base font-bold transition duration-300 ease-in-out transform hover:scale-105"
            >
              {t('navbar.about')}
            </Link>
            <Link
              to="/projects"
              className="text-white hover:text-gray-200 block px-3 py-2 rounded-md text-base font-bold transition duration-300 ease-in-out transform hover:scale-105"
            >
              {t('navbar.projects')}
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-gray-200 block px-3 py-2 rounded-md text-base font-bold transition duration-300 ease-in-out transform hover:scale-105"
            >
              {t('navbar.contact')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
```

# components/sections/Projects/index.ts

```ts
export { default as Projects } from './Projects';
```

# components/sections/Projects/Projects.tsx

```tsx

import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Projects: FC = () => {
  const { t } = useTranslation();

  return (
    <section className="projects">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('projects.title')}
      </motion.h2>
      {/* Projects content */}
    </section>
  );
};

export default Projects;
```

# hooks/useEmail.ts

```ts

import { useState } from 'react';
import emailService from '@/api/email.services';
import type { EmailPayload } from '@/types/email.types';

/**
 * Custom hook for sending emails using EmailJS service.
 * @returns {{
 *   sendEmail: (payload: EmailPayload) => Promise<void>;
 *   isLoading: boolean;
 *   error: Error | null;
 * }}
 */
const useEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Sends an email using the EmailJS service.
   * @param {EmailPayload} payload - The email payload.
   * @returns {Promise<void>}
   */
  const sendEmail = async (payload: EmailPayload): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await emailService.send(payload);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendEmail, isLoading, error };
};

export default useEmail;
```

# i18n/en.json

```json
{
    "hero": {
      "title": "Welcome to My Portfolio",
      "greeting": "Hi, I'm Vinicius Guerra e Ribas",
      "intro": "I specialize in",
      "specialties": [
        "Data Engineering",
        "Data Science",
        "Artificial Intelligence",
        "Software Engineering",
        "Software Development",
        "Web Development"
      ],
      "stats": {
        "projects": {
          "number": "50+",
          "label": "Projects and Data Pipelines"
        },
        "countries": {
          "number": "10+",
          "label": "International Projects"
        },
        "experience": {
          "number": "5+",
          "label": "Years in Engineering and Data"
        }
      },
      "description": "As a software and data engineer, I am dedicated to crafting innovative, data-driven solutions that tackle complex challenges across various industries. My expertise lies in developing scalable and efficient products that drive organizational success."
    },
    "about": {
      "title": "About Me"
    },
    "projects": {
      "title": "Projects"
    },
    "contact": {
      "title": "Contact",
      "info": "Feel free to reach out to me."
    },
    "navbar": {
      "home": "Home",
      "about": "About",
      "projects": "Projects",
      "contact": "Contact",
      "openMenu": "Open menu",
      "logo": "<VGR>"
    }
  }
```

# i18n/pt.json

```json
{
    "hero": {
      "greeting": "Olá, me chamo Vinicius Guerra e Ribas",
      "intro": "Especialista em",
      "specialties": [
        "Engenharia de Dados",
        "Ciência de Dados",
        "Inteligência Artificial",
        "Engenharia de Software",
        "Desenvolvimento de Software",
        "Desenvolvimento Web"
      ],
      "stats": {
        "projects": {
          "number": "50+",
          "label": "Projetos e Pipelines de Dados"
        },
        "countries": {
          "number": "10+",
          "label": "Projetos Internacionais"
        },
        "experience": {
          "number": "5+",
          "label": "Anos em Engenharia e Dados"
        }
      },
      "description": "Como engenheiro de software e dados, dedico-me a criar soluções inovadoras e orientadas por dados que enfrentam desafios complexos em diversos setores. Minha especialidade está em desenvolver produtos escaláveis e eficientes que impulsionam o sucesso organizacional."
    },
    "about": {
      "title": "Sobre Mim"
    },
    "projects": {
      "title": "Projetos"
    },
    "contact": {
      "title": "Contato",
      "info": "Sinta-se à vontade para entrar em contato comigo."
    },
    "navbar": {
      "home": "Início",
      "about": "Sobre",
      "projects": "Projetos",
      "contact": "Contato",
      "openMenu": "Abrir menu",
      "logo": "</VGR>"
    }
  }
```

# index.css

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Custom base styles */
@layer base {
  body {
    @apply bg-background text-textPrimary;
    font-family: 'Inter', sans-serif;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-bold text-textPrimary;
  }

  a {
    @apply text-primary hover:text-secondary;
  }

  nav {
    @apply transition-all duration-300 ease-in-out;
  }
}

/* Custom component styles */
@layer components {
  .btn {
    @apply px-4 py-2 rounded-lg font-semibold;
  }

  .btn-primary {
    @apply bg-primary text-white hover:bg-secondary;
  }

  .btn-secondary {
    @apply bg-accent-light text-white hover:bg-accent-dark;
  }

  .input {
    @apply px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary;
  }
}

/* Custom utility styles */
@layer utilities {
  .text-gradient {
    @apply text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary;
  }

  .transition-fast {
    @apply transition-all duration-200 ease-in-out;
  }
}
```

# main.tsx

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import App from './App';
import en from './i18n/en.json';
import pt from './i18n/pt.json';
import './index.css';

i18n.init({
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    pt: { translation: pt },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);
```

# types/email.types.ts

```ts
export interface EmailPayload {
    name: string;
    email: string;
    message: string;
  }
```

