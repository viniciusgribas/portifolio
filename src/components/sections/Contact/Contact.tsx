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

        {/* Auto-updating timezone */}
        <div className="mt-8 text-center text-sm text-gray-500">
          {t('contact.timezone', {
            timezone: new Intl.DateTimeFormat().resolvedOptions().timeZone,
            time: new Date().toLocaleTimeString()
          })}
        </div>
      </motion.div>

      {/* Project Request Modal */}
      {isModalOpen && <ContactFormModal onClose={closeModal} />}
    </section>
  );
};

export default Contact;