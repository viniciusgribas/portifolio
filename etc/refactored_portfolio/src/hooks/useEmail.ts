import { useState } from 'react';
import { EmailService } from '../api/email.service';
import { EmailPayload, EmailResponse } from '../types/email.types';

interface EmailHookReturn {
    sendEmail: (payload: EmailPayload) => Promise<void>;
    isLoading: boolean;
    error: string | null ;
    success: boolean;
}

/**
 * Custom hook for handling email operations
 * @returns Object containing email sending function and status
 */

export const useEmail = (): EmailHookReturn => {
    const [ isLoading , setIsLoading ] = useState(false);
    const [error , setError ] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const sendEmail = async (payload: EmailPayload): Promise<void> =>{
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try{
            const emailService = EmailService.getInstance();
            const response = await emailService.sendEmail(payload);

            if (response.success){
                setSuccess(true);  
            } else {
                setError(response.message);                
            }
        }catch(error){
                setError(error instanceof Error ? error.message: 'Failed to send Email');
            } finally{
                setIsLoading(false);
            }
        };
        return {
            sendEmail,
            isLoading,
            error,
            success
        };
    };