
import type { EmailPayload } from '@/types/email.types';

/**
 * Email service for sending emails using EmailJS.
 */
const emailService = {
  /**
   * Sends an email using the EmailJS service.
   * @param {EmailPayload} payload - The email payload.
   * @returns {Promise<void>}
   */
  send: async (payload: EmailPayload): Promise<void> => {
    // EmailJS send logic here
  },
};

export default emailService;