# api/email.services.ts

```ts
import emailjs from '@emailjs/browser';
import type { EmailPayload } from '@/types/email.types';

const emailService = {
  send: async (payload: EmailPayload): Promise<void> => {
    try {
      // Convert the payload to the expected type
      const emailjsPayload: Record<string, unknown> = {
        from_name: payload.name,
        from_email: payload.email,
        message: payload.message,
        // Add any other fields needed by your EmailJS template
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        emailjsPayload,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }
  },
};

export default emailService;
```

# App.tsx

```tsx
import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar, Hero, About, Projects, Contact } from './components/sections';

const App: FC = () => {

  return (
    <Router>
      <div className="app">
        <Navbar />
        {/* Added responsive spacer: visible on mobile only. */}
        <div className="block sm:hidden h-16"></div>
        <div className="container mx-auto">
          <div className="content">
          <section id="hero">
            <Hero />
          </section>
          <section id="about" className="mt-16">
            <About />
          </section>
          <section id="projects" className="mt-16">
            <Projects />
          </section>
          <section id="contact" className="mt-16">
            <Contact />
          </section>
          </div>
        </div>
        <footer>{/* Footer */}</footer>
      </div>
    </Router>
  );
};

export default App;

```

# components/sections/About/About.tsx

```tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { BiData } from 'react-icons/bi';
import { FaRobot, FaChartLine } from 'react-icons/fa';
import { BsCloudFill } from 'react-icons/bs';
import { AiOutlineCode } from 'react-icons/ai';
import { TbMathFunction } from 'react-icons/tb';
import { ChevronDown } from 'lucide-react';

interface SkillCategory {
  icon: React.ElementType;
  skills: string[];
}

interface SkillsByCategory {
  [key: string]: SkillCategory;
}

const skillsByCategory: SkillsByCategory = {
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
    skills: ['Python', 'React + JavaScript + TypeScript + Node.js', 'SQL', 'CSS + HTML', 'Backend', 'Frontend', 'Agile Methodologies']
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

  return (
    <motion.section
      id="about"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="mb-16 max-w-4xl mx-auto">
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-bold text-[#0A66C2] mb-8 text-center"
        >
          {t('about.title')}
        </motion.h2>
        <motion.div
          variants={itemVariants}
          className="space-y-6 text-gray-700"
        >
          <p className="text-xl leading-relaxed">{t('about.description')}</p>
          <p className="text-xl leading-relaxed">{t('about.description2')}</p>
          <p className="text-xl leading-relaxed">{t('about.description3')}</p>
          <p className="text-xl leading-relaxed">{t('about.description4')}</p>
        </motion.div>
      </div>

      <div className="mb-8">
        <motion.h3
          variants={itemVariants}
          className="text-3xl font-semibold text-[#0A66C2] mb-10 text-center"
        >
          {t('about.expertise')}
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skillsByCategory).map(([key, category], index) => {
            const Icon = category.icon;
            const isExpanded = expandedCategory === key;

            return (
              <motion.div
                key={key}
                variants={itemVariants}
                className="bg-white rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <button
                  onClick={() => setExpandedCategory(isExpanded ? null : key)}
                  className="w-full p-6 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors"
                      >
                        <Icon className="text-2xl text-[#0A66C2]" />
                      </motion.div>
                      <h4 className="text-xl font-medium text-gray-900">
                        {t(`about.skills.categories.${key}`)}
                      </h4>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="text-gray-500 w-5 h-5" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <div className="space-y-3 pr-2">
                          {category.skills.map((skill) => (
                            <motion.div
                              key={skill}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-center gap-3 text-gray-600 text-lg"
                            >
                              <span className="w-2 h-2 rounded-full bg-[#0A66C2]" />
                              {skill}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
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
import { motion } from 'framer-motion';
import { FiLinkedin, FiGithub, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import ContactFormModal from './ContactFormModal';

const Contact: FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: <FiLinkedin size={35} />,
      url: 'https://www.linkedin.com/in/vinicius-guerra-e-ribas/',
      color: 'hover:text-[#0A66C2]'
    },
    {
      name: 'GitHub',
      icon: <FiGithub size={35} />,
      url: 'https://github.com/viniciusgribas',
      color: 'hover:text-[#333]'
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp size={35} />,
      url: 'https://wa.me/+5561981657050', // Replace with your WhatsApp number
      color: 'hover:text-[#25D366]'
    },
    { name: 'Email',
      icon: <FiMail size={35} />,
      url: 'mailto:viniciusgribas@gmail.com',
      color: 'hover:text-[#EA4335]'
    }    
  ];

  return (
    <section id="contact" className="section-container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg max-w-xl mx-auto p-8"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#0077B5]">
            {t('contact.title')}
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            {t('contact.description')}
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          {/* Social Links */}
          <div className="flex justify-center space-x-8">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-600 ${link.color} transition-transform hover:scale-125`}
                aria-label={link.name}
              >
                {link.icon}
                <span className="sr-only">{link.name}</span>
              </a>
            ))}
          </div>

          {/* Project Request Button */}
          <motion.button
            onClick={openModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[#0077B5] text-white text-xl font-semibold rounded-lg 
                     shadow-lg hover:bg-[#005582] transition-all flex items-center gap-2"
          >
            {t('contact.cta')}
          </motion.button>
        </div>

      </motion.div>

      {/* Project Request Modal */}
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
import { FiX, FiCheckCircle } from 'react-icons/fi';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import useEmail from '@/hooks/useEmail';

interface ProjectFormData {
  name: string;
  email: string;
  phone?: string;
  country: string;
  preferredLanguage: string;
  projectTypes: string[];
  details: string;
  contactPreference: string;
}

interface Props {
  onClose: () => void;
}

const ContactFormModal: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();
  const { sendEmail, isLoading, error } = useEmail();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    email: '',
    phone: '',
    country: '',
    preferredLanguage: 'en',
    projectTypes: [],
    details: '',
    contactPreference: 'email'
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const countries = countryList().getData();

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      errors.name = t('contact.form.name.error');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t('contact.form.email.error');
    }

    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      errors.phone = t('contact.form.phone.error');
    }

    if (formData.details.length > 500) {
      errors.details = t('contact.form.details.error');
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await sendEmail({
        ...formData,
        projectTypes: formData.projectTypes.join(', '),
        message: ''
      });
      setIsSubmitted(true);
      setTimeout(onClose, 5000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}
                  className="flex justify-center mb-6"
                >
                  <FiCheckCircle className="text-green-500" size={64} />
        </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold text-gray-800">
                    {t('contact.form.successTitle')}
                  </h3>

                  <p className="text-gray-600">
                    {t('contact.form.successMessage')}
                  </p>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-blue-800">
                      {t('contact.form.responseTime')}
                    </p>
                  </div>

                  <motion.div
                    className="w-full bg-gray-200 h-1 mt-6 rounded-full overflow-hidden"
                    initial={{ width: "100%" }}
                  >
                    <motion.div
                      className="h-full bg-green-500"
                      initial={{ width: "100%" }}
                      animate={{ width: "0%" }}
                      transition={{ duration: 10, ease: "linear" }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-2xl font-bold mb-6">{t('contact.form.title')}</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t('contact.form.name.label')}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 w-full p-2 border rounded-md"
                      placeholder={t('contact.form.name.placeholder')}
                    />
                    {validationErrors.name && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t('contact.form.email.label')}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 w-full p-2 border rounded-md"
                      placeholder={t('contact.form.email.placeholder')}
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t('contact.form.phone.label')}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1 w-full p-2 border rounded-md"
                      placeholder={t('contact.form.phone.placeholder')}
                    />
                    {validationErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t('contact.form.country.label')}
                    </label>
                    <Select
                      options={countries}
                      value={countries.find(country => country.value === formData.country)}
                      onChange={(option) => setFormData({ ...formData, country: option?.value || '' })}
                      className="mt-1"
                      placeholder={t('contact.form.country.placeholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t('contact.form.preferredLanguage.label')}
                    </label>
                    <select
                      value={formData.preferredLanguage}
                      onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                      className="mt-1 w-full p-2 border rounded-md"
                    >
                      <option value="en">{t('contact.form.preferredLanguage.options.en')}</option>
                      <option value="pt">{t('contact.form.preferredLanguage.options.pt')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t('contact.form.projectTypes.label')}
                    </label>
                    <p className="text-sm text-gray-500 mb-2">
                      {t('contact.form.projectTypes.description')}
                    </p>
                    <div className="space-y-2">
                      {Object.entries(t('contact.form.projectTypes.options', { returnObjects: true })).map(([key, value]) => (
                        <label key={key} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.projectTypes.includes(key)}
                            onChange={(e) => {
                              const newTypes = e.target.checked
                                ? [...formData.projectTypes, key]
                                : formData.projectTypes.filter(type => type !== key);
                              setFormData({ ...formData, projectTypes: newTypes });
                            }}
                            className="mr-2"
                          />
                          {value}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t('contact.form.details.label')}
                    </label>
                    <textarea
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="mt-1 w-full p-2 border rounded-md"
                      rows={4}
                      maxLength={500}
                      placeholder={t('contact.form.details.placeholder')}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {formData.details.length}/500
                    </p>
                    {validationErrors.details && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.details}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t('contact.form.contactPreference.label')}
                    </label>
                    <select
                      value={formData.contactPreference}
                      onChange={(e) => setFormData({ ...formData, contactPreference: e.target.value })}
                      className="mt-1 w-full p-2 border rounded-md"
                    >
                      {Object.entries(t('contact.form.contactPreference.options', { returnObjects: true })).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
                      isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0077B5] hover:bg-[#005582]'
                    }`}
                  >
                    {isLoading ? '...' : t('contact.form.submit')}
                  </button>

                  {error && (
                    <p className="text-red-500 text-sm text-center">
                      {t('contact.form.error')}
                    </p>
                  )}
                </form>
              </motion.div>
            )}
    </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactFormModal;

```

# components/sections/Contact/index.ts

```ts

export { default as Contact } from './Contact';
```

# components/sections/Hero/Hero.tsx

```tsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TypeAnimation } from 'react-type-animation';
import { Workflow, Globe, PencilRuler } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation();
  const specialties = t('hero.specialties', { returnObjects: true }) as string[];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Workflow':
        return <Workflow className="w-12 h-12 text-[#0077B5] mx-auto mb-4" />;
      case 'Globe':
        return <Globe className="w-12 h-12 text-[#0077B5] mx-auto mb-4" />;
      case 'PencilRuler':
        return <PencilRuler className="w-12 h-12 text-[#0077B5] mx-auto mb-4" />;
      default:
        return null;
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#F3F2EF] px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto text-center"
      >
        <motion.div
          className="space-y-6 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 font-mono">
          {t('hero.greeting')}
        </motion.h1>

          <div className="text-2xl md:text-3xl text-gray-800 font-light">
          <span>{t('hero.intro')} </span>
          <TypeAnimation
            sequence={[
              ...specialties.flatMap(specialty => [
                specialty,
                  2000
                ])
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            className="text-[#0077B5] font-semibold"
          />
        </div>

          <div className="max-w-3xl mx-auto space-y-6">
        {['hero.description1', 'hero.description2', 'hero.description3', 'hero.description4'].map((descKey, idx) => (
          <motion.p
            key={idx}
                className="text-xl text-gray-600 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
          >
            {t(descKey)}
          </motion.p>
        ))}
              </div>
            </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {Object.entries(t('hero.stats', { returnObjects: true })).map(([key, stat]: [string, any]) => (
            <motion.div
              key={key}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 8px 12px -1px rgba(0, 0, 0, 0.1), 0 4px 8px -1px rgba(0, 0, 0, 0.06)'
              }}
              className="p-8 bg-white rounded-xl shadow-md border border-gray-200 transition-all duration-300"
            >
              <div className="text-[#0077B5]">
                {getIcon(stat.icon)}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0077B5] mb-4">
                {stat.number}
              </h2>
              <p className="text-lg text-gray-600 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
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
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GB, BR } from 'country-flag-icons/react/3x2';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LanguageChangerProps {
  scrolled: boolean;
}

const LanguageChanger: React.FC<LanguageChangerProps> = ({ scrolled }) => {
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
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${scrolled
            ? 'bg-white hover:bg-gray-50 border border-gray-200 text-gray-700'
            : 'bg-[#0077B5] hover:bg-[#004182] text-white'
          }`}
      >
        <currentLanguage.flag className="w-5 h-auto" title={currentLanguage.title} />
        <span className={`text-sm font-medium ${scrolled ? 'text-gray-700' : 'text-white'
          }`}>
          {currentLanguage.label}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${scrolled ? 'text-gray-700' : 'text-white'
            } ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 text-black">
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
import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { Menu, X, Home, User, FolderGit2, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageChanger from '../LanguageChanger/LanguageChanger';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('navbar.home'), to: 'home', icon: Home },
    { name: t('navbar.about'), to: 'about', icon: User },
    { name: t('navbar.projects'), to: 'projects', icon: FolderGit2 },
    { name: t('navbar.contact'), to: 'contact', icon: Mail },
  ];

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-[#0077B5]'
      }`}
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Language Changer - Moved to left */}
          <div className="flex items-center gap-4">
          <LanguageChanger scrolled={scrolled} />
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0"
            >
              <Link
                to="home"
                smooth={true}
                className={`text-2xl font-bold cursor-pointer ${
                  scrolled ? 'text-[#0077B5]' : 'text-white'
                }`}
              >
                {t('navbar.logo')}
              </Link>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.to}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.to}
                  smooth={true}
                  className={`flex items-center gap-2 text-lg font-medium transition-colors ${
                    scrolled 
                      ? 'text-gray-700 hover:text-[#004182]' 
                      : 'text-white hover:text-gray-200'
                  }`}
                >
                  <item.icon size={20} />
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-50 shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  smooth={true}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-base font-medium text-gray-700 hover:text-[#004182] hover:bg-gray-100 rounded-md transition-colors"
                >
                  <item.icon size={20} />
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
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
    <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white rounded-xl shadow-lg">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-[#0A66C2] text-center mb-8 tracking-tight">
          {t('projects.title')}
        </h2>
        <p className="text-gray-600 text-center mb-16 text-lg max-w-3xl mx-auto leading-relaxed">
          {t('projects.description')}
        </p>

        <div 
          ref={carouselRef}
          className="overflow-x-hidden relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex gap-8 py-4">
            {[...projects, ...projects].map((project, index) => (
              <motion.div
                key={`${project.id}-${index}`}
                className="flex-none w-[400px] bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <div>
                  {/* Title and Links */}
                  <div className="flex justify-between items-start mb-4">
                    <motion.h3 
                      className="text-2xl font-bold text-[#0A66C2]"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      {project.title}
                    </motion.h3>
                    {project.url && (
                      <motion.a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base text-[#0A66C2] hover:underline flex items-center gap-2 font-medium"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>{t('projects.viewProject')}</span>
                        <FiExternalLink className="w-5 h-5" />
                      </motion.a>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-4 text-base leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech: string) => (
                      <motion.span
                        key={tech}
                        className="text-sm font-medium px-3 py-1.5 rounded-full bg-[#E6F0F8] text-[#0A66C2]"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Rating and Review */}
                  <div className="mb-4">
                    <motion.div 
                      className="flex items-center gap-2 mb-2"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {renderStars(project.rating)}
                      <span className="text-gray-500 text-base">({project.rating.toFixed(1)})</span>
                    </motion.div>
                    <p className="italic text-base text-gray-600 leading-relaxed">
                      "{project.review}"
                    </p>
                    <div className="text-sm text-gray-500 mt-2 font-medium">
                      <span className="font-bold">{project.source}</span> • {project.date}
                    </div>
                  </div>

                  {/* Footer Links */}
                  <div className="flex items-center justify-between mt-6">
                    {project.private && (
                      <div className="text-sm text-gray-500 italic">
                        {t('projects.privateProject')}
                      </div>
                    )}
                  </div>

                  {/* Image */}
                  {project.image && (
                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative group mt-6 h-48 overflow-hidden rounded-xl border border-gray-200">
                        <div className="absolute inset-0 bg-[#0077B5]/20 transition-opacity duration-300 group-hover:opacity-0" />
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Auto Scroll Indicator */}
        <motion.div 
          className="flex justify-center mt-8 text-base text-gray-500 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {isHovered ? t('projects.hoverPause') : t('projects.autoScroll')}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Projects
        
```

# configuration/python/create_linkedin_banner.py

```py
#!/usr/bin/env python3
"""
LinkedIn Banner Generator with SVG and JPG export
Requirements:
    pip install pillow cairosvg
"""

import os
from string import Template
import html
import cairosvg
from PIL import Image
import io

class LinkedInBannerGenerator:
    def __init__(self):
        self.svg_template = '''<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1584 396">
  <defs>
    <!-- Simplified background gradient -->
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FFFFFF"/>
      <stop offset="100%" style="stop-color:#F8FAFC"/>
    </linearGradient>

    <!-- Code pattern with increased visibility -->
    <pattern id="codeSnippets" x="0" y="0" width="300" height="100" patternUnits="userSpaceOnUse">
      <text x="10" y="15" fill="#0A66C2" opacity="0.12" font-family="monospace" font-size="14">
        ${code_snippet1}
      </text>
      <text x="20" y="35" fill="#0A66C2" opacity="0.12" font-family="monospace" font-size="14">
        ${code_snippet2}
      </text>
      <text x="10" y="55" fill="#0A66C2" opacity="0.12" font-family="monospace" font-size="14">
        ${code_snippet3}
      </text>
      <!-- Additional code snippets for more coverage -->
      <text x="150" y="25" fill="#0A66C2" opacity="0.12" font-family="monospace" font-size="14">
        class DataPipeline:
      </text>
      <text x="160" y="45" fill="#0A66C2" opacity="0.12" font-family="monospace" font-size="14">
        def transform(self):
      </text>
      <text x="170" y="65" fill="#0A66C2" opacity="0.12" font-family="monospace" font-size="14">
        return processed_data
      </text>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1584" height="396" fill="url(#bgGradient)"/>
  <rect width="1584" height="396" fill="url(#codeSnippets)"/>

  <!-- Logo Section with enhanced visibility -->
  <g transform="translate(50,50)">
    <!-- Background highlight for logo -->
    <rect x="-10" y="-10" width="200" height="80" fill="#FFFFFF" opacity="0.9" rx="5"/>
    <text font-family="monospace" font-size="48" fill="#0A66C2">
      <tspan x="0" y="40" font-weight="600">${logo_text}</tspan>
    </text>
    <text font-family="monospace" font-size="20" fill="#0A66C2">
      <tspan x="0" y="70" font-weight="400">${logo_subtitle}</tspan>
    </text>
  </g>

  <!-- Main Content -->
  <g transform="translate(800,80)">
    <!-- Name and Title -->
    <g class="header">
      <text font-family="Inter, system-ui, sans-serif">
        <tspan x="0" y="0" font-size="42" font-weight="600" fill="#0A66C2">
          ${full_name}
        </tspan>
        <tspan x="0" y="45" font-size="24" fill="#666666" font-weight="400">
          ${job_title}
        </tspan>
      </text>
    </g>

    <!-- Expertise Areas with enhanced visibility -->
    <g transform="translate(0,80)">
      <!-- Area 1 -->
      <g transform="translate(0,0)">
        <rect x="0" y="0" width="150" height="34" rx="17" 
              fill="#FFFFFF" stroke="#0A66C2" stroke-width="2"/>
        <text x="75" y="22" text-anchor="middle" 
              font-family="Inter, system-ui, sans-serif" font-size="15" 
              fill="#0A66C2" font-weight="500">
          ${skill_1}
        </text>
      </g>

      <!-- Area 2 -->
      <g transform="translate(170,0)">
        <rect x="0" y="0" width="220" height="34" rx="17" 
              fill="#FFFFFF" stroke="#0A66C2" stroke-width="2"/>
        <text x="110" y="22" text-anchor="middle" 
              font-family="Inter, system-ui, sans-serif" font-size="15" 
              fill="#0A66C2" font-weight="500">
          ${skill_2}
        </text>
      </g>

      <!-- Area 3 -->
      <g transform="translate(410,0)">
        <rect x="0" y="0" width="150" height="34" rx="17" 
              fill="#FFFFFF" stroke="#0A66C2" stroke-width="2"/>
        <text x="75" y="22" text-anchor="middle" 
              font-family="Inter, system-ui, sans-serif" font-size="15" 
              fill="#0A66C2" font-weight="500">
          ${skill_3}
        </text>
      </g>
    </g>

    <!-- Connect section -->
    <g transform="translate(0,180)">
      <text font-family="monospace" font-size="16" font-weight="500">
        <tspan x="0" y="0" fill="#666666">$ connect_with_me</tspan>
        <tspan x="200" y="0" fill="#0A66C2">${website}</tspan>
      </text>
    </g>
  </g>

  <!-- Simple decorative elements -->
  <g class="decorative-elements">
    <path d="M1200 50 Q 1300 100, 1400 50 T 1584 50" 
          stroke="#0A66C2" stroke-width="1" fill="none" opacity="0.2"/>
    <path d="M1200 250 Q 1300 300, 1400 250 T 1584 250" 
          stroke="#0A66C2" stroke-width="1" fill="none" opacity="0.2"/>
  </g>
</svg>
'''
        self.default_code_snippets = [
            "def process_data(df):",
            "    df = clean_data(df)",
            "    return analyze(df)"
        ]

    def escape_xml(self, text):
        """Escape special characters for XML"""
        return html.escape(text, quote=False)

    def generate_banner(self, config):
        """Generate LinkedIn banner with custom configuration"""
        # Set default values
        default_config = {
            'logo_text': '<vgr/>',
            'logo_subtitle': 'engineer',
            'code_snippets': self.default_code_snippets
        }

        # Update with provided config
        merged_config = {**default_config, **config}

        # Escape special characters in all text fields
        template_vars = {
            'full_name': self.escape_xml(merged_config['full_name']),
            'job_title': self.escape_xml(merged_config['job_title']),
            'logo_text': self.escape_xml(merged_config['logo_text']),
            'logo_subtitle': self.escape_xml(merged_config['logo_subtitle']),
            'skill_1': self.escape_xml(merged_config['skill_1']),
            'skill_2': self.escape_xml(merged_config['skill_2']),
            'skill_3': self.escape_xml(merged_config['skill_3']),
            'website': self.escape_xml(merged_config['website']),
            'code_snippet1': self.escape_xml(merged_config['code_snippets'][0]),
            'code_snippet2': self.escape_xml(merged_config['code_snippets'][1]),
            'code_snippet3': self.escape_xml(merged_config['code_snippets'][2])
        }

        # Generate SVG content
        template = Template(self.svg_template)
        svg_content = template.safe_substitute(template_vars)

        # Save to file
        output_path = merged_config.get('output_path', 'linkedin_banner.svg')
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(svg_content)

        return output_path

    def export_to_jpg(self, svg_path, output_path=None):
        """
        Convert SVG to JPG with LinkedIn dimensions
        
        Args:
            svg_path: Path to the SVG file
            output_path: Path for the output JPG file (optional)
        Returns:
            Path to the generated JPG file
        """
        if output_path is None:
            output_path = svg_path.rsplit('.', 1)[0] + '.jpg'

        try:
            # Convert SVG to PNG first (intermediate step)
            png_data = cairosvg.svg2png(
                url=svg_path,
                output_width=1584,
                output_height=396,
                background_color='white'
            )

            # Convert PNG to JPG
            image = Image.open(io.BytesIO(png_data))
            
            # Convert to RGB mode (required for JPEG)
            if image.mode in ('RGBA', 'LA'):
                background = Image.new('RGB', image.size, 'white')
                background.paste(image, mask=image.split()[-1])
                image = background
            
            # Save as JPEG with high quality
            image.save(output_path, 'JPEG', quality=95)
            return output_path

        except Exception as e:
            print(f"Error converting to JPG: {str(e)}")
            print("Please make sure you have the required dependencies installed:")
            print("pip install pillow cairosvg")
            print("For Ubuntu/Debian systems, you might also need:")
            print("sudo apt-get install libcairo2-dev")
            return None

# Example usage
if __name__ == "__main__":
    generator = LinkedInBannerGenerator()
    
    config = {
        'full_name': 'Vinicius Guerra e Ribas',
        'job_title': 'Software Engineer and Data Specialist',
        'skill_1': 'Data Engineering',
        'skill_2': 'Data Science & Analytics',
        'skill_3': 'Python Developer',
        'website': 'viniciusgribas.netlify.app',
        'output_path': 'linkedin_banner.svg'
    }

    # Generate SVG first
    svg_path = generator.generate_banner(config)
    print(f"SVG banner generated: {svg_path}")

    # Convert to JPG
    jpg_path = generator.export_to_jpg(svg_path)
    if jpg_path:
        print(f"JPG banner generated: {jpg_path}")
```

# configuration/python/create_portfolio_meta_image.py

```py
#!/usr/bin/env python3
"""
Meta image generator for portfolio website.
This module creates a LinkedIn-style meta image for social sharing.
"""

# pylint: disable=import-error
from PIL import Image, ImageDraw, ImageFont
import os

# Create base image with LinkedIn-style dimensions
width, height = 1200, 630
image = Image.new("RGB", (width, height), color="#FFFFFF")  # White background
draw = ImageDraw.Draw(image)

# LinkedIn brand colors
linkedin_blue = "#0A66C2"  # LinkedIn primary blue
text_primary = "#000000"   # Black for main text
text_secondary = "#666666" # Gray for secondary text

# Draw blue border/moldure
border_width = 20
draw.rectangle([0, 0, width-1, height-1], outline=linkedin_blue, width=border_width)

# Define fonts
font_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 72)
font_name = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 48)
font_role = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 36)
font_tagline = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 32)

# Insert text with LinkedIn light theme colors
draw.text((100, 100), "<VGR>", font=font_title, fill=linkedin_blue)
draw.text((100, 200), "Vinicius Guerra e Ribas", font=font_name, fill=text_primary)
draw.text((100, 280), "Software Developer & Data Specialist", font=font_role, fill=text_secondary)

# Add tagline with highlight box
tagline = "Building Scalable Data Solutions"
tagline_bbox = draw.textbbox((0, 0), tagline, font=font_tagline)
tagline_width = tagline_bbox[2] - tagline_bbox[0]
tagline_x = 100
tagline_y = 380

# Draw highlight box with LinkedIn-style colors
highlight_padding = 20
highlight_box = [
    tagline_x - highlight_padding,
    tagline_y - highlight_padding,
    tagline_x + tagline_width + highlight_padding,
    tagline_y + 40
]
draw.rectangle(highlight_box, fill="#E9F0F8")  # Light blue background
draw.text((tagline_x, tagline_y), tagline, font=font_tagline, fill=text_primary)

# Add subtle separator line
draw.line([(100, 340), (400, 340)], fill=linkedin_blue, width=2)

# Save the image
generated_image_path = os.path.join(os.path.dirname(__file__), '../../../public/assets/meta_image.png')
image.save(generated_image_path)
print(f"Professional LinkedIn-style image generated and saved at: {generated_image_path}")
```

# configuration/python/linkedin_banner.jpg

This is a binary file of the type: Image

# configuration/python/linkedin_banner.svg

This is a file of the type: SVG Image

# hooks/index.ts

```ts
export { default as useEmail } from './useEmail';
```

# hooks/useEmail.ts

```ts
import { useState } from 'react';
import emailService from '../api/email.services';
import type { EmailPayload } from '../types/email.types';

/**
 * Custom hook for sending emails using EmailJS service.
 */
const useEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

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
    "title": "Welcome to My Portfolio 🚀",
    "greeting": "👋 Hi There! I'm Vinicius. (:",
    "intro": "⚙️",
    "specialties": [
      "Data Engineering",
      "Data Science",
      "Artificial Intelligence",
      "Software Engineering",
      "Software Development",
      "Web Development",
      "Business Intelligence"
    ],
    "stats": {
      "projects": {
        "icon": "Workflow",
        "number": "50+",
        "label": "Projects & Data Pipelines"
      },
      "countries": {
        "icon": "Globe",
        "number": "10+",
        "label": "Worldwide Projects"
      },
      "experience": {
        "icon": "PencilRuler",
        "number": "5+",
        "label": "Years in Engineering & Data"
      }
    },
    "description1": "Welcome to my personal portfolio. ",
    "description2": "In this space, you'll discover information about my journey, the technologies I specialize in, and notable projects that have achieved significant success." ,
    "description3": "Additionally, you can find my contact details and a dedicated form for discussing potential collaborations. I am an interdisciplinary and approachable professional, always open to new opportunities." ,
    "description4": " Feel free to explore and reach out!"
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
    "title": "About Me 💡",
    "description": "I have over 8 years of experience working with data technologies, involving projects for government entities, multinational corporations, and various-sized companies and individuals with different complexities.",
    "description2": "I graduated as an energy engineer from the University of Brasília, where I was part of a multidisciplinary program that allowed me to engage with software disciplines from the start of my studies. My specializations include Software Engineering, Data Science, and Analytics, all attained from the University of São Paulo.",
    "description3": "I develop specialized data software products using the latest market technologies, ensuring scalability, security, robustness, and quality.",
    "description4": "My projects follow agile development principles, focusing on personalized, functional solutions that surpass expectations.",
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
        "tech": [
          "Python",
          "NLP",
          "Machine Learning",
          "Web Scraping",
          "Plotly",
          "Sentiment Analysis"
        ],
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
        "tech": [
          "Python",
          "Data Analysis",
          "Plotly",
          "GeoDataFrame",
          "Data Visualization"
        ],
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
        "tech": [
          "Python",
          "Data Engineering",
          "Streamlit",
          "Data Visualization"
        ],
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
        "tech": [
          "Python",
          "AWS",
          "Data Engineering",
          "Backend"
        ],
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
        "tech": [
          "ETL",
          "ML",
          "Python",
          "AWS"
        ],
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
        "tech": [
          "Python",
          "Data Engineering",
          "ETL"
        ],
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
        "tech": [
          "Python",
          "GIS",
          "Data Visualization"
        ],
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
    "title": "Let's Work Together 🤝",
    "description": "Ready to start a project? Let me know what you have in mind!",
    "availability": "Available for new projects",
    "responseTime": "Usually responds within 2 business days",
    "cta": "I want a project 🚀!",
    "form": {
      "title": "Project Request Form",
      "name": {
        "label": "Your Name",
        "placeholder": "Enter your full name",
        "error": "Please enter a valid name (letters only)"
      },
      "email": {
        "label": "Your Email",
        "placeholder": "Enter your email address",
        "error": "Please enter a valid email address"
      },
      "phone": {
        "label": "Phone Number (Optional)",
        "placeholder": "+1 (234) 567-8900",
        "error": "Please enter a valid phone number"
      },
      "country": {
        "label": "Your Country",
        "placeholder": "Select your country"
      },
      "preferredLanguage": {
        "label": "Preferred Communication Language",
        "options": {
          "en": "English",
          "pt": "Portuguese"
        }
      },
      "projectTypes": {
        "label": "Project Type(s)",
        "description": "Select all that apply",
        "options": {
          "dataEngineering": "Data Engineering",
          "dataScience": "Data Science",
          "devops": "DevOps & Cloud",
          "softwareDev": "Software Development",
          "webDev": "Web Development",
          "ai": "Artificial Intelligence"
        }
      },
      "details": {
        "label": "Project Details",
        "placeholder": "Tell me about your project idea (max 500 characters)",
        "error": "Please provide project details (max 500 characters)"
      },
      "contactPreference": {
        "label": "Preferred Contact Method",
        "options": {
          "email": "Email",
          "phone": "Phone",
          "whatsapp": "WhatsApp",
          "linkedin": "LinkedIn"
        }
      },
      "submit": "Submit Project Request",
      "success": "Thank you! I'll review your project request and get back to you soon.",
      "error": "Something went wrong. Please try again.",
      "successTitle": "Thank You! 🎉",
      "successMessage": "Your project request has been received successfully. I appreciate your interest in working together!",
      "responseTime": "I'll review your request and get back to you within 2 business days."
    },
    "cta": "I want a project! 🚀",
    "socialTitle": "Or connect with me here:"
  }
}

```

# i18n/pt.json

```json
{
    "hero": {
      "greeting": "👋 Olá! Eu sou o Vinicius.",
      "intro": "⚙️",
      "specialties": [
        "Engenharia de Dados",
        "Ciência de Dados",
        "Inteligência Artificial",
        "Engenharia de Software",
        "Desenvolvimento de Software",
        "Desenvolvimento Web",
        "Inteligência de Negócios"
      ],
      "stats": {
        "projects": {
          "icon": "Workflow",
          "number": "50+",
          "label": "Projetos e Pipelines de Dados"
        },
        "countries": {
          "icon": "Globe",
          "number": "10+",
          "label": "Projetos pelo mundo"
        },
        "experience": {
          "icon": "PencilRuler",
          "number": "5+",
          "label": "Anos em Engenharia e Dados"
        }
      },
    "description1": "Bem-vindo ao meu portfólio pessoal.",
    "description2": "Aqui você encontrará informações sobre minha trajetória, as tecnologias que domino e alguns projetos interessantes que resultaram em grandes sucessos.",
      "description3": "Por fim, estão disponíveis meus contatos e um formulário dedicado para que possamos discutir possíveis colaborações. Sou um profissional interdisciplinar, acessível e sempre aberto a novas oportunidades.",
      "description4": "Fique à vontade para explorar meu portfólio e entrar em contato comigo!" 
    
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
      "description": "Trabalho com tecnologias de dados há mais de 8 anos. Tenho experiência em projetos para o Governo, Multinacionais, Empresas e pessoas de diversos tamanhos e complexidades.",
      "description2": "Sou graduado engenheiro de energia pela universidade de Brasília, em um campos multidisciplinar que me habilitou contato com disciplinas de software desde o início de minha graduação. ⁠Minhas especializações são em Engenharia de Software , Ciência de Dados e Analytics. Todas pela Universidade de São Paulo.",
      "description3": "⁠Desenvolvo produtos de software especializados em dados, com as melhores tecnologias do mercado, garantindo escalabilidade, segurança, robustez e qualidade.",
      "description4": "Meus projetos são orientados pelos princípios da metodologia ágil de desenvolvimento, priorizando soluções personalizadas, funcionais e que superem expectativas.",   


      "title": "Sobre Mim 💡",
      "expertise": "Áreas de Especialização & Tecnologias",
      "skills": {
        "instructions": "Clique para expandir/juntar habilidades",
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
      "title": "Vamos Trabalhar Juntos 🤝",
      "description": "Pronto para iniciar um projeto? Me conte sua ideia!",
      "form": {
        "title": "Formulário de Solicitação de Projeto",
        "name": {
          "label": "Seu Nome",
          "placeholder": "Digite seu nome completo",
          "error": "Por favor, digite um nome válido (apenas letras)"
        },
        "email": {
          "label": "Seu Email",
          "placeholder": "Digite seu endereço de email",
          "error": "Por favor, digite um email válido"
        },
        "phone": {
          "label": "Telefone (Opcional)",
          "placeholder": "+55 (11) 98765-4321",
          "error": "Por favor, digite um número de telefone válido"
        },
        "country": {
          "label": "Seu País",
          "placeholder": "Selecione seu país"
        },
        "preferredLanguage": {
          "label": "Idioma de Comunicação Preferido",
          "options": {
            "en": "Inglês",
            "pt": "Português"
          }
        },
        "projectTypes": {
          "label": "Tipo(s) de Projeto",
          "description": "Selecione todas as opções aplicáveis",
          "options": {
            "dataEngineering": "Engenharia de Dados",
            "dataScience": "Ciência de Dados",
            "devops": "DevOps & Cloud",
            "softwareDev": "Desenvolvimento de Software",
            "webDev": "Desenvolvimento Web",
            "ai": "Inteligência Artificial"
          }
        },
        "details": {
          "label": "Detalhes do Projeto",
          "placeholder": "Conte-me sobre sua ideia de projeto (máximo 500 caracteres)",
          "error": "Por favor, forneça detalhes do projeto (máximo 500 caracteres)"
        },
        "contactPreference": {
          "label": "Método de Contato Preferido",
          "options": {
            "email": "Email",
            "phone": "Telefone",
            "whatsapp": "WhatsApp",
            "linkedin": "LinkedIn"
          }
        },
        "submit": "Enviar Solicitação de Projeto",
        "success": "Obrigado! Analisarei sua solicitação e retornarei em breve.",
        "error": "Algo deu errado. Por favor, tente novamente.",
        "successTitle": "Obrigado! 🎉",
      "successMessage": "Sua solicitação de projeto foi recebida com sucesso. Agradeço seu interesse em trabalharmos juntos!",
      "responseTime": "Analisarei sua solicitação e retornarei em até 2 dias úteis."
      },
      "cta": "Quero um projeto! 🚀",
      "socialTitle": "Ou conecte-se comigo aqui:"
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
    position: relative; /* Ensure the navbar is positioned relative to its container */
    z-index: 10; /* Set a higher z-index to ensure it stays above the scrollbar */
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

/* Modern and beautiful scrollbar styles with white base and subtle gray details */

/* For Webkit browsers (Chrome, Safari) */
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-track {
  background: #FFFFFF; /* Pure white background */
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #E0E0E0; /* Light gray thumb */
  border-radius: 10px;
  border: 3px solid #FFFFFF; /* White padding around thumb */
}

::-webkit-scrollbar-thumb:hover {
  background: #B0B0B0; /* Slightly darker gray on hover */
}

/* For Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #E0E0E0 #FFFFFF; /* Light gray thumb and white track */
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
    background: #333333; /* Dark gray background */
  }

  ::-webkit-scrollbar-thumb {
    background: #555555; /* Medium gray thumb */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #777777; /* Lighter gray on hover */
  }

  * {
    scrollbar-color: #555555 #333333; /* Medium gray thumb and dark gray track */
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
// Current definition might look like this:
export interface EmailPayload {
  name: string;
  email: string;
  message: string;
}

// Update it to this:
export interface EmailPayload extends Record<string, unknown> {
  name: string;
  email: string;
  message: string;
}
```

