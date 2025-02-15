import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ContactFormModal from './ContactFormModal';
import ContactInfo from './ContactInfo';

const Contact: FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="section-container py-20 bg-white rounded-xl shadow-xl max-w-2xl mx-auto mb-20"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center px-6"
      >
        <h2 className="text-6xl font-bold mb-8 text-[#0077B5] tracking-tight">
          {t('contact.title')}
        </h2>
        <p className="text-gray-600 mb-16 text-2xl leading-relaxed">
          {t('contact.description')}
        </p>
      </motion.div>

      <div className="flex flex-col items-center gap-12 px-6">
        <ContactInfo openModal={openModal} />
      </div>

      {isModalOpen && <ContactFormModal onClose={closeModal} />}
    </motion.section>
  );
};

export default Contact;