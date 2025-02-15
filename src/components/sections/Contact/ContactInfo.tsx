import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiGithub, FiDownload } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

interface Props {
  openModal: () => void;
}

const ContactInfo: React.FC<Props> = ({ openModal }) => {
  const { t } = useTranslation();
  const socialLinks = [
    {
      name: 'Email',
      icon: <FiMail size={40} />,
      href: 'mailto:viniciusgribas@gmail.com',
      color: 'hover:text-[#EA4335]',
    },
    {
      name: 'LinkedIn',
      icon: <FiLinkedin size={40} />,
      href: 'https://www.linkedin.com/in/vinicius-guerra-e-ribas/',
      color: 'hover:text-[#0077B5]',
    },
    {
      name: 'GitHub',
      icon: <FiGithub size={40} />,
      href: 'https://github.com/viniciusgribas',
      color: 'hover:text-gray-800',
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp size={40} />,
      href: 'https://wa.me/+5561981657050',
      color: 'hover:text-[#25D366]',
    },
  ];

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center text-center space-y-8 bg-[#F3F2EF] p-10 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 max-w-xl w-full"
    >
      <h3 className="text-3xl font-bold text-[#0077B5]">{t('contact.socialTitle')}</h3>
      <p className="text-gray-600 text-xl leading-relaxed">{t('contact.info')}</p>
      
      <div className="flex gap-8 my-6">
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-600 ${link.color} transition-all duration-300`}
            whileHover={{ scale: 1.2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {link.icon}
            <span className="sr-only">{link.name}</span>
          </motion.a>
        ))}
      </div>

      <motion.button
        onClick={openModal}
        className="group px-8 py-4 bg-[#0077B5] text-white text-xl font-semibold rounded-xl shadow-lg hover:bg-[#005582] transition-all duration-300 flex items-center gap-3"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {t('contact.downloadCV')}
        <FiDownload className="group-hover:translate-y-0.5 transition-transform" />
      </motion.button>
    </motion.div>
  );
};

export default ContactInfo;