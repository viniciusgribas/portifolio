import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMail, FiLoader } from 'react-icons/fi';
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
      await emailService.send(formData);
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
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-2xl relative"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
        >
          <motion.button
            className="absolute top-6 right-6 text-gray-500 hover:text-red-500 transition-colors duration-300"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiX size={32} />
          </motion.button>

          <h3 className="text-4xl font-bold text-[#0077B5] mb-8 text-center">
            {t('contact.form.title')}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {['name', 'email', 'message'].map((field) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: ['name', 'email', 'message'].indexOf(field) * 0.1 }}
              >
                <label htmlFor={field} className="block text-lg font-medium text-gray-700 mb-2">
                  {t(`contact.form.${field}`)}
                </label>
                {field === 'message' ? (
                  <textarea
                    id={field}
                    name={field}
                    rows={5}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0077B5] focus:border-transparent outline-none transition-all duration-300 resize-none"
                  />
                ) : (
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    name={field}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    className="w-full p-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0077B5] focus:border-transparent outline-none transition-all duration-300"
                  />
                )}
              </motion.div>
            ))}

            <motion.button
              type="submit"
              className={`w-full px-8 py-4 rounded-xl text-white text-xl font-semibold transition-all duration-300 ${
                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0077B5] hover:bg-[#005582]'
              } flex items-center justify-center gap-3`}
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <FiLoader className="animate-spin" size={24} />
              ) : (
                <>
                  {t('contact.form.submit')}
                  <FiMail size={24} />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactFormModal;