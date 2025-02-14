
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