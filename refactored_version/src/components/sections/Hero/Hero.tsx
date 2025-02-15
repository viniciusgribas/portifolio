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

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden">
      {/* Background SVG */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 z-0">
        <img src="/code.svg" alt="Decorative Background" className="w-full h-full object-contain" />
      </div>

      <motion.div
        className="w-full max-w-4xl mx-auto text-center relative z-10"
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
          <div className="bg-[white] p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-[#0077B5] mb-3"><FaProjectDiagram className="w-8 h-8" /></div>
            <div className="text-2xl md:text-3xl font-bold text-[#0077B5] mb-2">
              {t('hero.stats.projects.number')}
            </div>
            <div className="text-gray-600 text-sm">{t('hero.stats.projects.label')}</div>
          </div>

          <div className="bg-[white] p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-[#0077B5] mb-3"><FaGlobeAmericas className="w-8 h-8" /></div>
            <div className="text-2xl md:text-3xl font-bold text-[#0077B5] mb-2">
              {t('hero.stats.countries.number')}
            </div>
            <div className="text-gray-600 text-sm">{t('hero.stats.countries.label')}</div>
          </div>

          <div className="bg-[white] p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-[#0077B5] mb-3"><FaBuilding className="w-8 h-8" /></div>
            <div className="text-2xl md:text-3xl font-bold text-[#0077B5] mb-2">
              {t('hero.stats.experience.number')}
            </div>
            <div className="text-gray-600 text-sm">{t('hero.stats.experience.label')}</div>
          </div>
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
          <a
            href="#about"
            className="px-6 py-3 rounded-full border-2 border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-colors text-sm md:text-base font-semibold"
          >
            {t('about.title')}
          </a>
          <a
            href="#projects"
            className="px-6 py-3 rounded-full border-2 border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-colors text-sm md:text-base font-semibold"
          >
            {t('projects.title')}
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full border-2 border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-colors text-sm md:text-base font-semibold"
          >
            {t('contact.title')}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
