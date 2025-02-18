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