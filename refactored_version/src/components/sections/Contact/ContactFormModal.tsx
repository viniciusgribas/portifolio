import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMail } from 'react-icons/fi';
import emailService from '@/api/email.services';

interface Props {
  onClose: () => void;
}

const ContactFormModal: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.message) {
      alert(t('contact.errorIncompleteFields'));
      setIsSubmitting(false);
      return;
    }

    try {
      await emailService.send({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      alert(t('contact.successMessage'));

      const link = document.createElement('a');
      link.href = '/assets/Vinicius_Guerra_e_Ribas_CV.pdf';
      link.download = 'Vinicius_Guerra_e_Ribas_CV.pdf';
      link.click();
      onClose();
    } catch (error) {
      console.error('Email sending failed:', error);
      alert(t('contact.errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-xl p-6 bg-white rounded-xl shadow-xl relative"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
        >
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            onClick={onClose}
          >
            <FiX size={28} />
          </button>

          <h3 className="text-3xl font-bold text-[#0077B5] mb-6 text-center">
            {t('contact.form.title')}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-textPrimary">
                {t('contact.form.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B5] outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-textPrimary">
                {t('contact.form.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B5] outline-none"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-textPrimary">
                {t('contact.form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B5] outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className={`w-full px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0077B5] hover:bg-[#005582]'
              } flex items-center justify-center gap-2`}
              disabled={isSubmitting}
            >
              {t('contact.form.submit')}
              <FiMail />
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactFormModal;
