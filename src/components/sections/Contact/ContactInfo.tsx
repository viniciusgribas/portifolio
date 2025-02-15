import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiLinkedin, FiGithub } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

interface Props {
  openModal: () => void;
}

const ContactInfo: React.FC<Props> = ({ openModal }) => {
  const { t } = useTranslation();

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: <FiLinkedin size={35} />,
      url: 'https://www.linkedin.com/in/vinicius-guerra-e-ribas/',
      color: 'hover:text-[#0A66C2]',
      delay: 0.1
    },
    {
      name: 'GitHub',
      icon: <FiGithub size={35} />,
      url: 'https://github.com/viniciusGuerras',
      color: 'hover:text-[#333]',
      delay: 0.2
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp size={35} />,
      url: 'https://wa.me/+5511999999999', // Replace with your WhatsApp number
      color: 'hover:text-[#25D366]',
      delay: 0.3
    }
  ];

  return (
    <div className="text-center">
      {/* Social Links */}
      <div className="flex justify-center space-x-8 mb-8">
        {socialLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-600 ${link.color} transition-all duration-300`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: link.delay }}
            whileHover={{ 
              scale: 1.2,
              transition: { type: "spring", stiffness: 300 }
            }}
            whileTap={{ scale: 0.9 }}
            aria-label={link.name}
          >
            {link.icon}
            <span className="sr-only">{link.name}</span>
          </motion.a>
        ))}
      </div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8 text-gray-600"
      >
        <p className="text-lg mb-2">{t('contact.availability')}</p>
        <p className="text-sm opacity-75">{t('contact.timezone')}</p>
      </motion.div>

      {/* Project Request Button */}
      <motion.button
        onClick={openModal}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ 
          scale: 1.05,
          backgroundColor: '#005582',
          transition: { type: "spring", stiffness: 400 }
        }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 px-8 py-4 bg-[#0077B5] text-white text-xl font-semibold 
                 rounded-lg shadow-lg transition-all flex items-center gap-2 mx-auto
                 hover:shadow-xl"
      >
        {t('contact.cta')}
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut"
          }}
        >
          →
        </motion.span>
      </motion.button>

      {/* Response Time Indicator */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 text-sm text-gray-500 italic"
      >
        {t('contact.responseTime')}
      </motion.p>
    </div>
  );
};

export default ContactInfo;