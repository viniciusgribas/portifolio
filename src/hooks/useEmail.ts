import { useState } from 'react';
import emailService from '../api/email.services';
import type { EmailPayload } from '../types/email.types';

/**
 * Custom hook for sending emails using EmailJS service.
 */
const useEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendEmail = async (payload: EmailPayload): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await emailService.send(payload);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendEmail, isLoading, error };
};

export default useEmail;