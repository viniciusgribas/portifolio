import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheckCircle } from 'react-icons/fi';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import useEmail from '@/hooks/useEmail';

interface ProjectFormData {
  name: string;
  email: string;
  phone?: string;
  country: string;
  preferredLanguage: string;
  projectTypes: string[];
  details: string;
  contactPreference: string;
}

interface Props {
  onClose: () => void;
}

const ContactFormModal: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();
  const { sendEmail, isLoading, error } = useEmail();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    email: '',
    phone: '',
    country: '',
    preferredLanguage: 'en',
    projectTypes: [],
    details: '',
    contactPreference: 'email'
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const countries = countryList().getData();

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      errors.name = t('contact.form.name.error');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t('contact.form.email.error');
    }

    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      errors.phone = t('contact.form.phone.error');
    }

    if (formData.details.length > 500) {
      errors.details = t('contact.form.details.error');
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await sendEmail({
        ...formData,
        projectTypes: formData.projectTypes.join(', '),
        message: ''
      });
      setIsSubmitted(true);
      setTimeout(onClose, 5000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}
                  className="flex justify-center mb-6"
                >
                  <FiCheckCircle className="text-green-500" size={64} />
        </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold text-gray-800">
                    {t('contact.form.successTitle')}
                  </h3>

                  <p className="text-gray-600">
                    {t('contact.form.successMessage')}
                  </p>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-blue-800">
                      {t('contact.form.responseTime')}
                    </p>
                  </div>

                  <motion.div
                    className="w-full bg-gray-200 h-1 mt-6 rounded-full overflow-hidden"
                    initial={{ width: "100%" }}
                  >
                    <motion.div
                      className="h-full bg-green-500"
                      initial={{ width: "100%" }}
                      animate={{ width: "0%" }}
                      transition={{ duration: 10, ease: "linear" }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-2xl font-bold mb-6">{t('contact.form.title')}</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t('contact.form.name.label')}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 w-full p-2 border rounded-md"
                      placeholder={t('contact.form.name.placeholder')}
                    />
                    {validationErrors.name && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t('contact.form.email.label')}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 w-full p-2 border rounded-md"
                      placeholder={t('contact.form.email.placeholder')}
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t('contact.form.phone.label')}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1 w-full p-2 border rounded-md"
                      placeholder={t('contact.form.phone.placeholder')}
                    />
                    {validationErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t('contact.form.country.label')}
                    </label>
                    <Select
                      options={countries}
                      value={countries.find(country => country.value === formData.country)}
                      onChange={(option) => setFormData({ ...formData, country: option?.value || '' })}
                      className="mt-1"
                      placeholder={t('contact.form.country.placeholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t('contact.form.preferredLanguage.label')}
                    </label>
                    <select
                      value={formData.preferredLanguage}
                      onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                      className="mt-1 w-full p-2 border rounded-md"
                    >
                      <option value="en">{t('contact.form.preferredLanguage.options.en')}</option>
                      <option value="pt">{t('contact.form.preferredLanguage.options.pt')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t('contact.form.projectTypes.label')}
                    </label>
                    <p className="text-sm text-gray-500 mb-2">
                      {t('contact.form.projectTypes.description')}
                    </p>
                    <div className="space-y-2">
                      {Object.entries(t('contact.form.projectTypes.options', { returnObjects: true })).map(([key, value]) => (
                        <label key={key} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.projectTypes.includes(key)}
                            onChange={(e) => {
                              const newTypes = e.target.checked
                                ? [...formData.projectTypes, key]
                                : formData.projectTypes.filter(type => type !== key);
                              setFormData({ ...formData, projectTypes: newTypes });
                            }}
                            className="mr-2"
                          />
                          {value}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t('contact.form.details.label')}
                    </label>
                    <textarea
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="mt-1 w-full p-2 border rounded-md"
                      rows={4}
                      maxLength={500}
                      placeholder={t('contact.form.details.placeholder')}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {formData.details.length}/500
                    </p>
                    {validationErrors.details && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.details}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t('contact.form.contactPreference.label')}
                    </label>
                    <select
                      value={formData.contactPreference}
                      onChange={(e) => setFormData({ ...formData, contactPreference: e.target.value })}
                      className="mt-1 w-full p-2 border rounded-md"
                    >
                      {Object.entries(t('contact.form.contactPreference.options', { returnObjects: true })).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
                      isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0077B5] hover:bg-[#005582]'
                    }`}
                  >
                    {isLoading ? '...' : t('contact.form.submit')}
                  </button>

                  {error && (
                    <p className="text-red-500 text-sm text-center">
                      {t('contact.form.error')}
                    </p>
                  )}
                </form>
              </motion.div>
            )}
    </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactFormModal;
