import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiLinkedin, FiGithub } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

interface Props {
  openModal: () => void;
}

const ContactInfo: React.FC<Props> = ({ openModal }) => {
  const { t } = useTranslation();
  
  // ... existing code ...

  return (
    <div className="text-center">
      <div className="flex justify-center space-x-6 mb-8">
        {/* ... existing social links ... */}
      </div>

      <button
        onClick={openModal}
        className="mt-6 px-8 py-4 bg-[#0077B5] text-white text-xl font-semibold rounded-lg shadow-lg hover:bg-[#005582] transition-all flex items-center gap-2 mx-auto"
      >
        {t('contact.cta')}
      </button>
    </div>
  );
};

export default ContactInfo;
