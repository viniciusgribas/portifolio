import emailjs from '@emailjs/browser';
import { EmailPayload, EmailResponse, EmailServiceConfig } from '../types/email.types';

/**
 * EmailService class implementing the singleton pattern for handling email operations
 * Uses EmailJS for sending emails
 */

export class EmailService {
    private static instance: EmailService;
    private readonly config: EmailServiceConfig;
    private initialized: boolean = false;

    private constructor(){
        // load config from environment variables
        this.config ={
            serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
            templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        };
    }

    /**
     * Get the singleton instance of the EmailService
     * @returns EmailService instance
     */
    
    public static getInstance(): EmailService {
        if(!EmailService.instance){
            EmailService.instance = new EmailService();
        }
        return EmailService.instance;
    }

    /**
     * Initialize EmailJS with public key
     * @throws Error if initialization fails
     */
    private initialize(): void{
        if(!this.initialized){
            try{
                emailjs.init(this.config.publicKey);
                this.initialized = true;
            } catch(error){
                console.error('Failed to initialize EmailJS', error);
                throw new Error('Email service initialization failed');
            }
        }
    }

    /**
     * Validate email payload
     * @param payload - Email payload to validade
     * @throws Error if validation fails
     */

    private validatePayload(payload: EmailPayload): void{
        if(!payload.name?.trim()){
            throw new Error('Name is required');
        }

        if(!payload.email?.trim()){
            throw new Error('Email is required');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(payload.email)){
            throw new Error('Invalid email format');
        }
    }

    /**
     * Send email using EmailJS
     * @param payload - Email content and recipient information
     * @returns Promise resolving to EmailResponse
     */

    public async sendEmail(payload: EmailPayload): Promise<EmailResponse>{
        try{
            // Initialize EmailJS if not already initialized
            this.initialize();

            // Validate payload
            this.validatePayload(payload);

            // Prepare template parameters
            const templateParams = {
                // [ATTENTION]
                //  Latter i wil have to set this into a global variable it is not secure to use my personal e-mail
                to_email: 'viniciusgribas@gmail.com',
                from_name: payload.name,
                from_email: payload.email,
                message: payload.message || 'No message provided'
            };

            // Send email
            const response = await emailjs.send(
                this.config.serviceId,
                this.config.templateId,
                templateParams
            );

            return{
                success: true,
                message: 'Email sent sucessfully',
                data: response
            };
        } catch(error){
            console.error('Failed to send email:', error);
            return{
                success: false,
                message: error instanceof Error? error.message: 'Failed to send email'
            };
        }
    }
}    