
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

const Contact: FC = () => {
  const { t } = useTranslation();

  return (
    <section className="contact">
      <h2>{t('contact.title')}</h2>
      <div className="contact-content">
        <ContactForm />
        <ContactInfo />
      </div>
    </section>
  );
};

export default Contact;