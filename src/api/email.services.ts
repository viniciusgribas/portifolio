import emailjs from '@emailjs/browser';
import type { EmailPayload } from '@/types/email.types';

const emailService = {
  send: async (payload: EmailPayload): Promise<void> => {
    try {
      // Convert the payload to the expected type
      const emailjsPayload: Record<string, unknown> = {
        from_name: payload.name,
        from_email: payload.email,
        message: payload.message,
        // Add any other fields needed by your EmailJS template
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        emailjsPayload,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }
  },
};

export default emailService;