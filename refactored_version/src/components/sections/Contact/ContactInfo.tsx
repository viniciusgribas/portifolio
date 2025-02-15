import React from 'react';
import { useTranslation } from 'react-i18next';
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
      icon: <FiMail size={35} />,
      href: 'mailto:viniciusgribas@gmail.com',
      color: 'hover:text-[#EA4335]',
    },
    {
      name: 'LinkedIn',
      icon: <FiLinkedin size={35} />,
      href: 'https://www.linkedin.com/in/vinicius-guerra-e-ribas/',
      color: 'hover:text-[#0077B5]',
    },
    {
      name: 'GitHub',
      icon: <FiGithub size={35} />,
      href: 'https://github.com/viniciusgribas',
      color: 'hover:text-gray-800',
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp size={35} />,
      href: 'https://wa.me/+5561981657050',
      color: 'hover:text-[#25D366]',
    },
  ];

  return (
    <div className="flex flex-col items-center text-center space-y-6 bg-[#F3F2EF] p-6 rounded-xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all max-w-sm">
      <h3 className="text-2xl font-bold text-[#0077B5]">{t('contact.socialTitle')}</h3>
      <p className="text-gray-600 text-lg">{t('contact.info')}</p>
      <div className="flex gap-6">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-600 ${link.color} transition-transform hover:scale-125`}
          >
            {link.icon}
            <span className="sr-only">{link.name}</span>
          </a>
        ))}
      </div>

      <button
        onClick={openModal}
        className="mt-6 px-6 py-3 bg-[#0077B5] text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-[#005582] transition-all flex items-center gap-2"
      >
        {t('contact.downloadCV')}
        <FiDownload />
      </button>
    </div>
  );
};

export default ContactInfo;
