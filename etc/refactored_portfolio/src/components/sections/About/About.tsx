
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