
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

const ContactInfo: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="contact-info">
      <p>{t('contact.info')}</p>
      {/* Contact info */}
    </div>
  );
};

export default ContactInfo;