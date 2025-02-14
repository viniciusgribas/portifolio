import React, { FC, FormEvent } from 'react';
import { useEmail } from '../../hooks/useEmail';
import { useTranslation } from 'react-i18next';

export const ContactForm: FC = () => {
  const { t } = useTranslation();
  const { sendEmail, isLoading, error, success } = useEmail();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    await sendEmail({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          {t('contact.form.name')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {t('contact.form.email')}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          {t('contact.form.message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
      </div>

      {/* Status messages */}
      {error && (
        <div className="text-red-600 bg-red-50 p-3 rounded-md" role="alert">
          {error}
        </div>
      )}
      
      {success && (
        <div className="text-green-600 bg-green-50 p-3 rounded-md" role="alert">
          {t('contact.form.success')}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            {t('contact.form.sending')}
          </span>
        ) : (
          t('contact.form.submit')
        )}
      </button>
    </form>
  );
};