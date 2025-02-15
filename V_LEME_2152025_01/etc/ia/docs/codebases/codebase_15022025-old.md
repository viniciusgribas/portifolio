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
        <div className="mt-16">
        <About />
        </div>
        <div className="mt-16">
        <Projects />
        </div>
        <div className="mt-16">
        <Contact />
        </div>
        </div>
        
        <footer>{/* Footer */}</footer>
      </div>
    </Router>
  );
};

export default App;
```

# codebase_1522025-navbar.md

```md
# api/email.services.ts

\`\`\`ts

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
\`\`\`

# App.tsx

\`\`\`tsx
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
\`\`\`

# components/common/Modal/index.ts

\`\`\`ts
export { default as Modal } from './Modal';
\`\`\`

# components/common/Modal/Modal.tsx

\`\`\`tsx

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
\`\`\`

# components/sections/About/About.tsx

\`\`\`tsx

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
\`\`\`

# components/sections/About/index.ts

\`\`\`ts
export { default as About } from './About';
\`\`\`

# components/sections/Contact/Contact.tsx

\`\`\`tsx

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
\`\`\`

# components/sections/Contact/ContactForm.tsx

\`\`\`tsx
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
\`\`\`

# components/sections/Contact/ContactInfo.tsx

\`\`\`tsx

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
\`\`\`

# components/sections/Contact/index.ts

\`\`\`ts

export { default as Contact } from './Contact';
\`\`\`

# components/sections/Hero/Hero.tsx

\`\`\`tsx
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
\`\`\`

# components/sections/Hero/index.ts

\`\`\`ts
export { default as Hero } from './Hero';
\`\`\`

# components/sections/index.ts

\`\`\`ts
export { Hero } from './Hero';
export { About } from './About';
export { Projects } from './Projects';
export { Contact } from './Contact'; 
export { Navbar } from './Navbar'
export { LanguageChanger } from './LanguageChanger'
\`\`\`

# components/sections/LanguageChanger/index.ts

\`\`\`ts
export { default as LanguageChanger } from './LanguageChanger';
\`\`\`

# components/sections/LanguageChanger/LanguageChanger.tsx

\`\`\`tsx
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

\`\`\`

# components/sections/Navbar/index.ts

\`\`\`ts
export { default as Navbar } from './Navbar';
\`\`\`

# components/sections/Navbar/Navbar.tsx

\`\`\`tsx
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
\`\`\`

# components/sections/Projects/index.ts

\`\`\`ts
export { default as Projects } from './Projects';
\`\`\`

# components/sections/Projects/Projects.tsx

\`\`\`tsx

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
\`\`\`

# hooks/useEmail.ts

\`\`\`ts

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
\`\`\`

# i18n/en.json

\`\`\`json
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
\`\`\`

# i18n/pt.json

\`\`\`json
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
\`\`\`

# index.css

\`\`\`css
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
\`\`\`

# main.tsx

\`\`\`tsx
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
\`\`\`

# types/email.types.ts

\`\`\`ts
export interface EmailPayload {
    name: string;
    email: string;
    message: string;
  }
\`\`\`


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
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BiData } from 'react-icons/bi';
import { FaRobot, FaChartLine } from 'react-icons/fa';
import { BsCloudFill } from 'react-icons/bs';
import { AiOutlineCode } from 'react-icons/ai';
import { TbMathFunction } from 'react-icons/tb';
import { ChevronDown } from 'lucide-react';

// Skills data organized by category
const skillsByCategory = {
  dataEngineering: {
    icon: BiData,
    skills: ['ETL', 'Pipelines', 'Apache Spark', 'Analytics Engineering', 'SQL & NoSQL', 'Data Lakes', 'Data Governance', 'Data Quality', 'Data Integration']
  },
  dataScience: {
    icon: TbMathFunction,
    skills: ['Machine Learning', 'Pandas', 'Jupyter', 'Statistical Analysis', 'Data Visualization', 'AWS SageMaker', 'Databricks']
  },
  devOps: {
    icon: BsCloudFill,
    skills: ['AWS', 'Azure', 'Google Cloud Platform', 'Kubernetes', 'CI/CD', 'Infrastructure as Code', 'Docker', 'Git', 'Monitoring & Logging']
  },
  software: {
    icon: AiOutlineCode,
    skills: ['Python','React + JavaScript + TypeScript + Node.js', 'SQL', 'CSS + HTML','Backend','Frontend' , 'Agile Methodologies']
  },
  ai: {
    icon: FaRobot,
    skills: ['Deep Learning', 'Prompt Engineering', 'NLP', 'AI Assistant Development', 'MLOps']
  },
  bi: {
    icon: FaChartLine,
    skills: ['Power BI', 'Tableau', 'Data Analytics', 'KPI Monitoring', 'Dashboard Design', 'Business Analysis', 'Data Storytelling']
  }
};

const About = () => {
  const { t } = useTranslation();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
      {/* Profile Section */}
      <div className="mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-[#0A66C2] mb-6"
        >
          {t('about.title')}
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 text-gray-700"
        >
          <p className="text-lg">{t('about.description')}</p>
          <p className="text-lg">{t('about.description2')}</p>
          <p className="text-lg">{t('about.description3')}</p>
        </motion.div>
      </div>

      {/* Skills Section */}
      <div className="mb-8">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-semibold text-[#0A66C2] mb-6"
        >
          {t('about.expertise')}
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(skillsByCategory).map(([key, category], index) => {
            const Icon = category.icon;
            const isExpanded = expandedCategory === key;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <button
                  onClick={() => setExpandedCategory(isExpanded ? null : key)}
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="text-2xl text-[#0A66C2]" />
                      <h4 className="text-lg font-medium text-gray-900">
                        {t(`about.skills.categories.${key}`)}
                      </h4>
                    </div>
                    <ChevronDown 
                      className={`text-gray-500 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  {/* Instructions inside the card */}
                  <div className="text-sm text-gray-500 mt-2">
                    {t('about.skills.instructions')}
                  </div>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'mt-4 max-h-[300px]' : 'max-h-0'
                  }`}>
                    <div className="space-y-2 overflow-y-auto pr-2 show-scrollbar-on-hover">
                      {category.skills.map((skill) => (
                        <div key={skill} className="flex items-center gap-2 text-gray-600">
                          <span className="text-[#0A66C2]">•</span>
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
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
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ContactFormModal from './ContactFormModal';
import ContactInfo from './ContactInfo';

const Contact: FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section id="contact" className="section-container py-16 bg-white rounded-lg shadow-lg max-w-xl mx-auto">
      <div className="text-center">
        <h2 className="text-5xl font-bold mb-6 text-[#0077B5]">{t('contact.title')}</h2>
        <p className="text-gray-600 mb-12 text-xl">{t('contact.description')}</p>
      </div>

      <div className="flex flex-col items-center gap-10 ">
        <ContactInfo openModal={openModal} />
      </div>

      {isModalOpen && <ContactFormModal onClose={closeModal} />}
    </section>
  );
};

export default Contact;

```

# components/sections/Contact/ContactFormModal.tsx

```tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMail } from 'react-icons/fi';
import emailService from '@/api/email.services';

interface Props {
  onClose: () => void;
}

const ContactFormModal: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.message) {
      alert(t('contact.errorIncompleteFields'));
      setIsSubmitting(false);
      return;
    }

    try {
      await emailService.send({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      alert(t('contact.successMessage'));

      const link = document.createElement('a');
      link.href = '/assets/Vinicius_Guerra_e_Ribas_CV.pdf';
      link.download = 'Vinicius_Guerra_e_Ribas_CV.pdf';
      link.click();
      onClose();
    } catch (error) {
      console.error('Email sending failed:', error);
      alert(t('contact.errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-xl p-6 bg-white rounded-xl shadow-xl relative"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
        >
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            onClick={onClose}
          >
            <FiX size={28} />
          </button>

          <h3 className="text-3xl font-bold text-[#0077B5] mb-6 text-center">
            {t('contact.form.title')}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-textPrimary">
                {t('contact.form.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B5] outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-textPrimary">
                {t('contact.form.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B5] outline-none"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-textPrimary">
                {t('contact.form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B5] outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className={`w-full px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0077B5] hover:bg-[#005582]'
              } flex items-center justify-center gap-2`}
              disabled={isSubmitting}
            >
              {t('contact.form.submit')}
              <FiMail />
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactFormModal;

```

# components/sections/Contact/ContactInfo.tsx

```tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiMail, FiLinkedin, FiGithub, FiDownload } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

interface Props {
  openModal: () => void;
}

const ContactInfo: React.FC<Props> = ({ openModal }) => {
  const { t } = useTranslation();
  const socialLinks = [
    {
      name: 'Email',
      icon: <FiMail size={35} />,
      href: 'mailto:viniciusgribas@gmail.com',
      color: 'hover:text-[#EA4335]',
    },
    {
      name: 'LinkedIn',
      icon: <FiLinkedin size={35} />,
      href: 'https://www.linkedin.com/in/vinicius-guerra-e-ribas/',
      color: 'hover:text-[#0077B5]',
    },
    {
      name: 'GitHub',
      icon: <FiGithub size={35} />,
      href: 'https://github.com/viniciusgribas',
      color: 'hover:text-gray-800',
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp size={35} />,
      href: 'https://wa.me/+5561981657050',
      color: 'hover:text-[#25D366]',
    },
  ];

  return (
    <div className="flex flex-col items-center text-center space-y-6 bg-[#F3F2EF] p-6 rounded-xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all max-w-sm">
      <h3 className="text-2xl font-bold text-[#0077B5]">{t('contact.socialTitle')}</h3>
      <p className="text-gray-600 text-lg">{t('contact.info')}</p>
      <div className="flex gap-6">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-600 ${link.color} transition-transform hover:scale-125`}
          >
            {link.icon}
            <span className="sr-only">{link.name}</span>
          </a>
        ))}
      </div>

      <button
        onClick={openModal}
        className="mt-6 px-6 py-3 bg-[#0077B5] text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-[#005582] transition-all flex items-center gap-2"
      >
        {t('contact.downloadCV')}
        <FiDownload />
      </button>
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

type Specialties = string[];

const Hero: FC = () => {
  const { t } = useTranslation();
  const [currentSpecialty, setCurrentSpecialty] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const specialties = t('hero.specialties', { returnObjects: true }) as unknown as Specialties;
      setCurrentSpecialty((prev) => (prev + 1) % specialties.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [t]);

  const specialties = t('hero.specialties', { returnObjects: true }) as unknown as Specialties;

  
const StatsCard: FC<{ icon: React.ReactNode; number: string; label: string }> = ({ 
  icon, number, label 
}) => (
  <div className="bg-[white] p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="text-[#0077B5] mb-3">{icon}</div>
    <div className="text-2xl md:text-3xl font-bold text-[#0077B5] mb-2">{number}</div>
    <div className="text-gray-600 text-sm">{label}</div>
  </div>
);

const HeroButton: FC<{ href: string; label: string }> = ({ href, label }) => (
  <a
    href={href}
    className="px-6 py-3 rounded-full border-2 border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-colors text-sm md:text-base font-semibold"
  >
    {label}
  </a>
);


  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      <motion.div
        className="w-full max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting */}
        <motion.p 
          className="text-[#0077B5] font-mono text-lg md:text-xl mb-4"
          variants={itemVariants}
        >
          {t('hero.greeting')}
        </motion.p>

        {/* Specialties */}
        <motion.div 
          className="mb-8"
          variants={itemVariants}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('hero.intro')}
          </h1>
          <div className="h-16 md:h-20 flex items-center justify-center">
            <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0077B5]">
              {specialties[currentSpecialty]}
            </span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          variants={itemVariants}
        >
          <StatsCard
            icon={<FaProjectDiagram className="w-8 h-8" />}
            number={t('hero.stats.projects.number')}
            label={t('hero.stats.projects.label')}
          />
          <StatsCard
            icon={<FaGlobeAmericas className="w-8 h-8" />}
            number={t('hero.stats.countries.number')}
            label={t('hero.stats.countries.label')}
          />
          <StatsCard
            icon={<FaBuilding className="w-8 h-8" />}
            number={t('hero.stats.experience.number')}
            label={t('hero.stats.experience.label')}
          />
        </motion.div>

        {/* Description */}
        <motion.p 
          className="text-gray-600 text-lg max-w-3xl mx-auto mb-8"
          variants={itemVariants}
        >
          {t('hero.description')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          variants={itemVariants}
        >
          <HeroButton href="#about" label={t('about.title')} />
          <HeroButton href="#projects" label={t('projects.title')} />
          <HeroButton href="#contact" label={t('contact.title')} />
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
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GB, BR } from 'country-flag-icons/react/3x2';
import { ChevronDown } from 'lucide-react';

const LanguageChanger = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', flag: GB, label: 'English', title: 'UK flag' },
    { code: 'pt', flag: BR, label: 'Português', title: 'Brazil flag' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-16 right-4 z-20" ref={dropdownRef}>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-md bg-white shadow-sm border border-gray-200 hover:bg-gray-50 transition-all"
        >
          <currentLanguage.flag className="w-5 h-auto" title={currentLanguage.title} />
          <span className="text-sm font-medium text-gray-700">{currentLanguage.label}</span>
          <ChevronDown 
            size={16} 
            className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors
                  ${i18n.language === language.code
                    ? 'bg-[#0077B5]/5 text-[#0077B5]'
                    : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <language.flag className="w-5 h-auto" title={language.title} />
                <span className="font-medium">{language.label}</span>
                {i18n.language === language.code && (
                  <span className="ml-auto text-[#0077B5]">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
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
import { Home, User, Briefcase, Mail, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 ${
      scrolled ? 'bg-[#0077B5] shadow-lg' : 'bg-[#0077B5]'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-white text-3xl font-mono font-extrabold tracking-wide hover:scale-105 transition-transform">
              {t('navbar.logo')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" icon={<Home size={24} />} label={t('navbar.home')} />
            <NavLink to="/about" icon={<User size={24} />} label={t('navbar.about')} />
            <NavLink to="/projects" icon={<Briefcase size={24} />} label={t('navbar.projects')} />
            <NavLink to="/contact" icon={<Mail size={24} />} label={t('navbar.contact')} />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 rounded-full hover:bg-white/20 text-white transition-all"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-64 border-t' : 'max-h-0'
      } overflow-hidden bg-[#0077B5]`}>
        <div className="px-6 py-3 space-y-2">
          <MobileNavLink to="/" icon={<Home size={24} />} label={t('navbar.home')} onClick={() => setIsOpen(false)} />
          <MobileNavLink to="/about" icon={<User size={24} />} label={t('navbar.about')} onClick={() => setIsOpen(false)} />
          <MobileNavLink to="/projects" icon={<Briefcase size={24} />} label={t('navbar.projects')} onClick={() => setIsOpen(false)} />
          <MobileNavLink to="/contact" icon={<Mail size={24} />} label={t('navbar.contact')} onClick={() => setIsOpen(false)} />
        </div>
      </div>
    </nav>
  );
};

// Desktop NavLink component
const NavLink: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex flex-col items-center px-4 py-2 text-white/80 hover:text-white transition-colors group"
  >
    <div className="group-hover:bg-white/20 p-3 rounded-lg transition-colors">
      {icon}
    </div>
    <span className="text-sm mt-1">{label}</span>
  </Link>
);

// Mobile NavLink component
const MobileNavLink: React.FC<{ to: string; icon: React.ReactNode; label: string; onClick: () => void }> = ({ 
  to, icon, label, onClick 
}) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center px-4 py-4 text-white/80 hover:bg-white/10 hover:text-white rounded-lg"
  >
    <span className="mr-4">{icon}</span>
    <span className="text-base font-semibold">{label}</span>
  </Link>
);

export default Navbar;

```

# components/sections/Projects/index.ts

```ts
export { default as Projects } from './Projects';
```

# components/sections/Projects/Projects.tsx

```tsx
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { AiFillStar } from 'react-icons/ai'
import { useEffect, useState, useRef } from 'react'

const Projects = () => {
  const { t } = useTranslation()
  const [isHovered, setIsHovered] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projects = Object.values(t('projects.items', { returnObjects: true }))

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <AiFillStar
        key={index}
        className={`inline ${index < rating ? 'text-[#F1C40F]' : 'text-gray-300'}`}
      />
    ))
  }

  useEffect(() => {
    if (!isHovered && carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth
      const clientWidth = carouselRef.current.clientWidth
      let position = carouselRef.current.scrollLeft
      
      const scroll = () => {
        if (!isHovered && carouselRef.current) {
          position += 1
          carouselRef.current.scrollLeft = position
          
          if (position >= scrollWidth / 2) {
            position = 0
            carouselRef.current.scrollLeft = 0
          }
        }
      }

      const intervalId = setInterval(scroll, 20)
      return () => clearInterval(intervalId)
    }
  }, [isHovered])

  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16  bg-white rounded-lg shadow-lg">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#0A66C2] text-center mb-6">
          {t('projects.title')}
        </h2>
        <p className="text-gray-600 text-center mb-10">
          {t('projects.description')}
        </p>

        <div 
          ref={carouselRef}
          className="overflow-x-hidden relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex gap-6 py-4">
            {[...projects, ...projects].map((project, index) => (
              <motion.div
                key={`${project.id}-${index}`}
                className="flex-none w-[350px] bg-[white] rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <div>
                  {/* Title and Links */}
                  <div className="flex justify-between items-start mb-3 ">
                    <h3 className="text-xl font-semibold text-[#0A66C2]">
                      {project.title}
                    </h3>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#0A66C2] hover:underline flex items-center gap-1"
                      >
                        <span>{t('projects.viewProject')}</span>
                        <FiExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-3 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech: string) => (
                      <span
                        key={tech}
                        className="text-xs font-medium px-2 py-1 rounded-full bg-[#E6F0F8] text-[#0A66C2]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Rating and Review */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      {renderStars(project.rating)}
                      <span className="text-gray-500 text-sm">({project.rating.toFixed(1)})</span>
                    </div>
                    <p className="italic text-sm text-gray-600">
                      "{project.review}"
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      <span className="font-semibold">{project.source}</span> • {project.date}
                    </div>
                  </div>

                  {/* Footer Links */}
                  <div className="flex items-center justify-between mt-4">
                    {project.private && (
                      <div className="text-xs text-gray-500 italic">
                        {t('projects.privateProject')}
                      </div>
                    )}
                  </div>
                  {/* Image */}
                  {project.image && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative group mt-4 h-36 overflow-hidden rounded-lg border border-gray-300">
                        <div className="absolute inset-0 bg-[#0077B5]/30 transition-opacity group-hover:opacity-0" />
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

        {/* Auto Scroll Indicator */}
        <div className="flex justify-center mt-6 text-sm text-gray-500">
          {isHovered ? t('projects.hoverPause') : t('projects.autoScroll')}
        </div>
      </motion.div>
    </section>
  )
}

export default Projects

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
          "label": "Worldwide Projects"
        },
        "experience": {
          "number": "5+",
          "label": "Years in Engineering and Data"
        }
      },
      "description": "As a software and data engineer, I am dedicated to crafting innovative, data-driven solutions that tackle complex challenges across various industries. My expertise lies in developing scalable and efficient products that drive organizational success."
    },
    "navbar": {
      "home": "Home",
      "about": "About",
      "projects": "Projects",
      "contact": "Contact",
      "openMenu": "Open menu",
      "logo": "<VGR>"
    },
    "about": {
    "title": "About Me",
    "description": "With a strong foundation in data engineering, data science, AI, and software development, I create technology that empowers organizations and enhances lives. My focus is on delivering scalable, efficient, and inclusive solutions tailored to diverse needs.",
    "description2": "Currently, I am a software developer specializing in data and AI. I use best practices in Cloud Computing, DevSecOps, Software Architecture, Data Engineering, and Artificial Intelligence to create robust and scalable solutions.",
    "description3": "I am always seeking new challenges and opportunities to learn and grow, believing that collaboration and knowledge sharing are essential for success.",
    "expertise": "Areas of Expertise & Technologies",
    "skills": {
      "instructions": "Click to expand/collapse skills",
      "expand": "Click to view skills",
      "collapse": "Click to hide skills",
      "categories": {
        "dataEngineering": "Data Engineering",
        "dataScience": "Data Science",
        "devOps": "DevOps & Cloud",
        "software": "Software Development",
        "ai": "Artificial Intelligence",
        "bi": "Business Intelligence"
      }

    }
  },
"projects": {
    "title": "Featured Projects",
    "description": "Take a look at some of my recent projects and client collaborations. Each project represents a unique challenge solved through innovative solutions.",
    "viewProject": "View Project",
    "privateProject": "(Private project - Source code and details protected by NDA)",
    "autoScroll": "Auto-scrolling • Hover to pause",
    "hoverPause": "Paused • Move mouse away to continue",
    "items": [
      {
        "id": "nlpProject",
        "title": "Energy Sector Text Mining & NLP Analysis",
        "description": "Developed advanced text mining and NLP solutions for energy sector analysis, implementing web scraping and sentiment analysis on news and government data sources.",
        "tech": ["Python", "NLP", "Machine Learning", "Web Scraping", "Plotly", "Sentiment Analysis"],
        "rating": 5.00,
        "review": "In order to apply Text Mining, Sentiment Analysis, NLP, Machine Learning, Crawlers, and Web Scraping knowledge, data solutions were developed with topics relevant to the energy sector. These solutions scrape data from CNN Brazil websites (with a focus on the international energy scenario) and government agency websites such as ANP, ANEEL, and MME (with a focus on the national energy scenario). Once scraped, the data is manipulated and added to a dataframe, and finally presented via Plotly and Wordcloud, as shown in the figures below.",
        "source": "USP - Universidade de São Paulo",
        "date": "October, 2022",
        "image": "/assets/cloud_view.png",
        "url": "https://www.upwork.com/freelancers/~01705d8c35f170c499?p=1636913026235174912"
      },
      {
        "id": "uspProject",
        "title": "Brazilian Electric Generation System Analysis",
        "description": "Conducted comprehensive exploratory data analysis of the Brazilian electric generation system, creating interactive visualizations and spatial analysis using Python and advanced libraries.",
        "tech": ["Python", "Data Analysis", "Plotly", "GeoDataFrame", "Data Visualization"],
        "rating": 5.00,
        "review": "The project consists of an exploratory data analysis. The objective of this analysis is to visualize the Brazilian electric generation system in a diagrammatic and spatial way, extracting insights. For this, a dataframe of the GeoDataFrame type was used and, mainly, the power of the Plotly Express library optimized for the Python language.",
        "source": "USP - Universidade de São Paulo",
        "date": "January, 2023",
        "image": "/assets/bar_charts_1.png",
        "url": "https://www.upwork.com/freelancers/viniciusg?p=1636904767317643264"
      },
      {
        "id": "aneelProject",
        "title": "ANEEL Data Engineering Project",
        "description": "Developed innovative data analysis solutions for the Brazilian Electricity Regulatory Agency (ANEEL), focusing on open data and energy sector visualization tools.",
        "tech": ["Python", "Data Engineering", "Streamlit", "Data Visualization"],
        "rating": 5.00,
        "review": "With great satisfaction, I recommend Vinicius Guerra e Ribas. During his engineering graduation, he stood out in his internship at ANEEL and later completed a postgraduate degree in data science, evidenced by a notable course completion work that used ANEEL data in an innovative way. Additionally, his significant contributions to improving ANEEL's open data reflect his commitment.",
        "source": "USP - Universidade de São Paulo",
        "date": "December 1, 2023",
        "image": "/assets/aneel_project.png",
        "url": "https://vinici-analise-geracao-iipydashboard-geracao-brasil-app-1w9whk.streamlit.app/"
      },
      {
        "id": "seniorPython",
        "title": "Senior Python Developer - Data Extraction",
        "description": "Led the development of data extraction systems and backend infrastructure, implementing efficient solutions for complex data processing requirements.",
        "tech": ["Python", "AWS", "Data Engineering", "Backend"],
        "rating": 5.00,
        "review": "Everything went great, I can sincerely recommend Vinicius!",
        "source": "Upwork",
        "date": "Apr 14, 2024 - May 30, 2024",
        "private": true
      },
      {
        "id": "dataScientist",
        "title": "Data Scientists/Engineers ETL Project",
        "description": "Developed ETL pipelines and machine learning models using AWS services, creating scalable data processing solutions.",
        "tech": ["ETL", "ML", "Python", "AWS"],
        "rating": 5.00,
        "review": "Vinicius did a great job on ETL and ML tasks using Amazon Web Services (AWS) capabilities. We'd be happy to work with this freelancer again.",
        "source": "Upwork",
        "date": "Jun 14, 2023 - Jun 26, 2023",
        "private": true
      },
      {
        "id": "ibgeProject",
        "title": "IBGE Data Project",
        "description": "Created data processing pipelines for Brazilian government statistical data, ensuring accurate and efficient data transformation.",
        "tech": ["Python", "Data Engineering", "ETL"],
        "rating": 5.00,
        "review": "The work was done with professionalism and on schedule.",
        "source": "Workana",
        "date": "Mar 17, 2023 - Apr 24, 2023",
        "private": true
      },
      {
        "id": "electricityMaps",
        "title": "Electricity Distribution Network Maps",
        "description": "Developed visualization tools for electricity distribution networks, creating interactive maps and data analysis systems.",
        "tech": ["Python", "GIS", "Data Visualization"],
        "rating": 5.00,
        "review": "Vinicius's work was amazing. Very complete and based on reliable sources of information, managing to finish the work with an impressive speed and great quality.",
        "source": "Upwork",
        "date": "Nov 13, 2022 - Nov 15, 2022",
        "image": "/assets/south_america_map.jpeg",
        "url": "https://www.upwork.com/freelancers/viniciusg?p=1636909561297944576"
      }
    ]
  },
"contact": {
  "title": "Contact",
  "description": "Let's connect! Click below to download my CV.",
  "form": {
    "title": "Fill out the form to download my CV",
    "name": "Your Name",
    "email": "Your Email",
    "message": "Your Message",
    "submit": "Send Message"
  },
  "socialTitle": "Find me here",
  "info": "Reach out via these social links:",
  "downloadCV": "Download My CV",
  "successMessage": "Message sent successfully! Download starting...",
  "errorMessage": "Failed to send the message. Please try again later.",
  "errorIncompleteFields": "Please fill out all fields before submitting."
}
  
  }
```

# i18n/pt.json

```json
{    "hero": {
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
          "label": "Projetos pelo mundo"
        },
        "experience": {
          "number": "5+",
          "label": "Anos em Engenharia e Dados"
        }
      },
      "description": "Como engenheiro de software e dados, dedico-me a criar soluções inovadoras e orientadas por dados que enfrentam desafios complexos em diversos setores. Minha especialidade está em desenvolver produtos escaláveis e eficientes que impulsionam o sucesso organizacional."
    },
    "navbar": {
      "home": "Início",
      "about": "Sobre",
      "projects": "Projetos",
      "contact": "Contato",
      "openMenu": "Abrir menu",
      "logo": "</VGR>"
    },
    "about": {
    "title": "Sobre Mim",
    "description": "Com uma base sólida em engenharia de dados, ciência de dados, inteligência artificial e desenvolvimento de software, crio tecnologia que impulsiona organizações e melhora vidas. Meu foco é fornecer soluções escaláveis, eficientes e inclusivas que atendem a diversas necessidades.",
    "description2": "Atualmente, sou desenvolvedor de software especializado em dados e inteligência artificial. Utilizo as melhores práticas em computação em nuvem, desenvolvimento seguro e operacional, arquitetura de software, engenharia de dados e inteligência artificial para criar soluções robustas e escaláveis.",
    "description3": "Estou sempre buscando novos desafios e oportunidades para aprender e crescer, acreditando que colaboração e compartilhamento de conhecimento são essenciais para o sucesso.",
    "expertise": "Áreas de Especialização & Tecnologias",
    "skills": {
      "instructions": "Clique para expandir/colapsar habilidades",
      "expand": "Clique para ver habilidades",
      "collapse": "Clique para esconder habilidades",
      "categories": {
        "dataEngineering": "Engenharia de Dados",
        "dataScience": "Ciência de Dados",
        "devOps": "DevOps & Núvem",
        "software": "Desenvolvimento de Software",
        "ai": "Inteligência Artificial",
        "bi": "Inteligência de Negócios"
      }
    }
  },
"projects": {
    "title": "Projetos em Destaque",
    "description": "Conheça alguns dos meus projetos recentes e colaborações com clientes. Cada projeto representa um desafio único resolvido através de soluções inovadoras.",
    "viewProject": "Ver Projeto",
    "privateProject": "(Projeto privado - Código fonte e detalhes protegidos por NDA)",
    "autoScroll": "Rolagem automática • Passe o mouse para pausar",
    "hoverPause": "Pausado • Retire o mouse para continuar",
    "items": [
      {
        "id": "nlpProject",
        "title": "Mineração de Texto e Análise NLP do Setor Energético",
        "description": "Desenvolveu soluções avançadas de mineração de texto e processamento de linguagem natural para análise do setor energético, implementando raspagem de web e análise de sentimento em fontes de dados de notícias e governos.",
        "tech": ["Python", "NLP", "Machine Learning", "Web Scraping", "Plotly", "Sentiment Analysis"],
        "rating": 5.00,
        "review": "Com o objetivo de aplicar conhecimentos em Text Mining, Análise de Sentimentos, PLN, Machine Learning, Crawlers e Web Scraping, foram desenvolvidas soluções de dados com tópicos relevantes para o setor energético. Essas soluções extraem dados dos sites da CNN Brasil (com foco no cenário energético internacional) e sites de agências governamentais como ANP, ANEEL e MME (com foco no cenário energético nacional). Uma vez extraídos, os dados são manipulados e adicionados a um dataframe, e finalmente apresentados via Plotly e Wordcloud, como mostrado nas figuras abaixo.",
        "source": "USP - Universidade de São Paulo",
        "date": "Outubro, 2022",
        "image": "/assets/cloud_view.png",
        "url": "https://www.upwork.com/freelancers/~01705d8c35f170c499?p=1636913026235174912"
      },
      {
        "id": "uspProject",
        "title": "Análise do Sistema de Geração Elétrica Brasileiro",
        "description": "Conduziu análise exploratória de dados abrangente do sistema elétrico brasileiro, criando visualizações interativas e análise espacial usando Python e bibliotecas avançadas.",
        "tech": ["Python", "Data Analysis", "Plotly", "GeoDataFrame", "Data Visualization"],
        "rating": 5.00,
        "review": "O projeto consiste em uma análise exploratória de dados. O objetivo desta análise é visualizar o sistema de geração elétrica brasileiro de forma diagramática e espacial, extraindo insights. Para isso, foi utilizado um dataframe do tipo GeoDataFrame e, principalmente, o poder da biblioteca Plotly Express otimizada para a linguagem Python.",
        "source": "USP - Universidade de São Paulo",
        "date": "Janeiro, 2023",
        "image": "/assets/bar_charts_1.png",
        "url": "https://www.upwork.com/freelancers/viniciusg?p=1636904767317643264"
      },
      {
        "id": "aneelProject",
        "title": "Projeto de Engenharia de Dados ANEEL",
        "description": "Desenvolveu soluções inovadoras de análise de dados para a Agência Nacional de Energia Elétrica (ANEEL), focando em dados abertos e ferramentas de visualização para o setor energético.",
        "tech": ["Python", "Data Engineering", "Streamlit", "Data Visualization"],
        "rating": 5.00,
        "review": "Com grande satisfação, recomendo Vinicius Guerra e Ribas. Durante sua graduação em engenharia, destacou-se em seu estágio na ANEEL e, posteriormente, concluiu uma pós-graduação em ciência de dados, evidenciada por um notável trabalho de conclusão de curso que utilizou dados da ANEEL de maneira inovadora. Além disso, suas contribuições significativas para aprimorar os dados abertos da ANEEL refletem seu comprometimento.",
        "source": "USP - Universidade de São Paulo",
        "date": "1 de Dezembro, 2023",
        "image": "/assets/aneel_project.png",
        "url": "https://vinici-analise-geracao-iipydashboard-geracao-brasil-app-1w9whk.streamlit.app/"
      },
      {
        "id": "seniorPython",
        "title": "Desenvolvedor Python Sênior - Extração de Dados",
        "description": "Liderou o desenvolvimento de sistemas de extração de dados e infraestrutura backend, implementando soluções eficientes para requisitos complexos de processamento de dados.",
        "tech": ["Python", "AWS", "Data Engineering", "Backend"],
        "rating": 5.00,
        "review": "Tudo foi ótimo, posso sinceramente recomendar o Vinicius!",
        "source": "Upwork",
        "date": "14 de Abril, 2024 - 30 de Maio, 2024",
        "private": true
      },
      {
        "id": "dataScientist",
        "title": "Projeto ETL de Cientistas/Engenheiros de Dados",
        "description": "Desenvolveu pipelines ETL e modelos de machine learning usando serviços AWS, criando soluções escaláveis de processamento de dados.",
        "tech": ["ETL", "ML", "Python", "AWS"],
        "rating": 5.00,
        "review": "Vinicius fez um ótimo trabalho nas tarefas de ETL e ML usando as capacidades da Amazon Web Services (AWS). Estamos felizes em trabalhar com este freelancer novamente.",
        "source": "Upwork",
        "date": "14 de Junho, 2023 - 26 de Junho, 2023",
        "private": true
      },
      {
        "id": "ibgeProject",
        "title": "Projeto de Dados IBGE",
        "description": "Criou pipelines de processamento de dados estatísticos do governo brasileiro, garantindo transformação precisa e eficiente dos dados.",
        "tech": ["Python", "Data Engineering", "ETL"],
        "rating": 5.00,
        "review": "O trabalho foi realizado com profissionalismo e dentro do prazo.",
        "source": "Workana",
        "date": "17 de Março, 2023 - 24 de Abril, 2023",
        "private": true
      },
      {
        "id": "electricityMaps",
        "title": "Mapas de Rede de Distribuição de Energia",
        "description": "Desenvolveu ferramentas de visualização para redes de distribuição de energia elétrica, criando mapas interativos e sistemas de análise de dados.",
        "tech": ["Python", "GIS", "Data Visualization"],
        "rating": 5.00,
        "review": "O trabalho do Vinicius foi incrível. Muito completo e baseado em fontes confiáveis de informação, conseguindo finalizar o trabalho com uma velocidade impressionante e ótima qualidade.",
        "source": "Upwork",
        "date": "13 de Novembro, 2022 - 15 de Novembro, 2022",
        "image": "/assets/south_america_map.jpeg",
        "url": "https://www.upwork.com/freelancers/viniciusg?p=1636909561297944576"
      }
    ]
  },
"contact": {
  "title": "Contato",
  "description": "Vamos nos conectar! Clique abaixo para baixar meu CV.",
  "form": {
    "title": "Preencha o formulário para baixar meu CV",
    "name": "Seu Nome",
    "email": "Seu Email",
    "message": "Sua Mensagem",
    "submit": "Enviar Mensagem"
  },
  "socialTitle": "Onde me encontrar",
  "info": "Entre em contato por essas redes:",
  "downloadCV": "Baixar meu CV",
  "successMessage": "Mensagem enviada com sucesso! O download será iniciado.",
  "errorMessage": "Falha ao enviar a mensagem. Tente novamente mais tarde.",
  "errorIncompleteFields": "Por favor, preencha todos os campos antes de enviar."
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
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
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

/* Add these styles to your index.css */

/* For Webkit browsers (Chrome, Safari) */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #F3F2EF; /* Using your background color */
}

::-webkit-scrollbar-thumb {
  background: #70B5F9; /* Using your accent.light color */
  border-radius: 4px;
  opacity: 0.8;
}

::-webkit-scrollbar-thumb:hover {
  background: #0A66C2; /* Using your primary color on hover */
}

/* For Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #70B5F9 #F3F2EF; /* thumb track */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* For elements that should show scrollbar only on hover */
.show-scrollbar-on-hover {
  scrollbar-width: none;
}

.show-scrollbar-on-hover::-webkit-scrollbar {
  display: none;
}

.show-scrollbar-on-hover:hover {
  scrollbar-width: thin;
}

.show-scrollbar-on-hover:hover::-webkit-scrollbar {
  display: block;
}

/* Optional: Custom scrollbar colors for dark mode if you need it */
@media (prefers-color-scheme: dark) {
  ::-webkit-scrollbar-track {
    background: #004182; /* Using your secondary color */
  }

  ::-webkit-scrollbar-thumb {
    background: #0A66C2; /* Using your primary color */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #70B5F9; /* Using your accent.light color */
  }

  * {
    scrollbar-color: #0A66C2 #004182; /* thumb track */
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

