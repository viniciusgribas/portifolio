// Import required dependencies
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TypeAnimation } from 'react-type-animation';
import { Workflow, Globe, PencilRuler } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation();
  const specialties = t('hero.specialties', { returnObjects: true }) as string[];

  // Define the icon mapping with a type
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Workflow':
        return <Workflow className="w-8 h-8 text-[#0077B5] mx-auto mb-4" />;
      case 'Globe':
        return <Globe className="w-8 h-8 text-[#0077B5] mx-auto mb-4" />;
      case 'PencilRuler':
        return <PencilRuler className="w-8 h-8 text-[#0077B5] mx-auto mb-4" />;
      default:
        return null;
    }
  };

  return (
    // Main hero section with full viewport height and centered content
    <section className="min-h-screen flex items-center justify-center bg-[#F3F2EF] px-4">
      {/* Main content container with animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto text-center"
      >
        {/* Main heading with fade-in animation */}
        <motion.h1
          className="text-xl font-mono md:text-3xl font-bold mb-6 text-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {t('hero.greeting')}
        </motion.h1>

        {/* Intro text with typing animation */}
        <div className="text-xl md:text-2xl mb-8 text-gray-800">
          <span>{t('hero.intro')} </span>
          {/* TypeAnimation cycles through specialties array */}
          <TypeAnimation
            sequence={[
              ...specialties.flatMap(specialty => [
                specialty,
                2000 // Pause for 2 seconds between each specialty
              ])
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-[#0077B5] font-semibold"
          />
        </div>

        {/* Description paragraph with fade-in animation */}
        <motion.p
          className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t('hero.description')}
        </motion.p>

        {/* Stats grid section with fade-in animation */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {/* Map through stats from translations */}
          {Object.entries(t('hero.stats', { returnObjects: true })).map(([key, stat]: [string, any]) => (
            // Individual stat card with hover animation
            <motion.div
              key={key}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
              className="p-6 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              {/* Stat icon */}
              <div className="text-[#0077B5] mb-4"> 
                {getIcon(stat.icon)}
                {/* Render the icon component based on the icon name from translations */}
                {/* <IconComponent size={48} /> */}
              </div>
              {/* Stat number */}
              <h2 className="text-3xl md:text-4xl font-bold text-[#0077B5] mb-2">
                {stat.number}
              </h2>
              {/* Stat label */}
              <p className="text-gray-600">
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
