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
