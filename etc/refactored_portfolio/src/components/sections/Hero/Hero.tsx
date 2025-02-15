
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Hero: FC = () => {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('hero.title')}
      </motion.h1>
      {/* Hero content */}
    </section>
  );
};

export default Hero;