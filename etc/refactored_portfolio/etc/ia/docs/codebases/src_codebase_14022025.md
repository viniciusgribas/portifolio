# __tests__/components/Contact/ContactForm.test.js

```js
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const ContactForm_1 = require("../../components/Contact/ContactForm");
const useEmail_1 = require("../../hooks/useEmail");
// Mock the hooks
jest.mock('@/hooks/useEmail');
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));
describe('ContactForm', () => {
    beforeEach(() => {
        useEmail_1.useEmail.mockReturnValue({
            sendEmail: jest.fn(),
            isLoading: false,
            error: null,
            success: false,
        });
    });
    it('renders form fields correctly', () => {
        (0, react_1.render)(React.createElement(ContactForm_1.ContactForm, null));
        expect(react_1.screen.getByLabelText(/contact.form.name/i)).toBeInTheDocument();
        expect(react_1.screen.getByLabelText(/contact.form.email/i)).toBeInTheDocument();
        expect(react_1.screen.getByLabelText(/contact.form.message/i)).toBeInTheDocument();
    });
    it('handles form submission correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockSendEmail = jest.fn();
        useEmail_1.useEmail.mockReturnValue({
            sendEmail: mockSendEmail,
            isLoading: false,
            error: null,
            success: false,
        });
        (0, react_1.render)(React.createElement(ContactForm_1.ContactForm, null));
        // Fill in the form
        react_1.fireEvent.change(react_1.screen.getByLabelText(/contact.form.name/i), {
            target: { value: 'John Doe' },
        });
        react_1.fireEvent.change(react_1.screen.getByLabelText(/contact.form.email/i), {
            target: { value: 'john@example.com' },
        });
        react_1.fireEvent.change(react_1.screen.getByLabelText(/contact.form.message/i), {
            target: { value: 'Test message' },
        });
        // Submit the form
        react_1.fireEvent.click(react_1.screen.getByText(/contact.form.submit/i));
        yield (0, react_1.waitFor)(() => {
            expect(mockSendEmail).toHaveBeenCalledWith({
                name: 'John Doe',
                email: 'john@example.com',
                message: 'Test message',
            });
        });
    }));
    it('displays loading state during submission', () => {
        useEmail_1.useEmail.mockReturnValue({
            sendEmail: jest.fn(),
            isLoading: true,
            error: null,
            success: false,
        });
        (0, react_1.render)(React.createElement(ContactForm_1.ContactForm, null));
        expect(react_1.screen.getByText(/contact.form.sending/i)).toBeInTheDocument();
    });
    it('displays error message when submission fails', () => {
        useEmail_1.useEmail.mockReturnValue({
            sendEmail: jest.fn(),
            isLoading: false,
            error: 'Test error message',
            success: false,
        });
        (0, react_1.render)(React.createElement(ContactForm_1.ContactForm, null));
        expect(react_1.screen.getByText('Test error message')).toBeInTheDocument();
    });
    it('displays success message when submission succeeds', () => {
        useEmail_1.useEmail.mockReturnValue({
            sendEmail: jest.fn(),
            isLoading: false,
            error: null,
            success: true,
        });
        (0, react_1.render)(React.createElement(ContactForm_1.ContactForm, null));
        expect(react_1.screen.getByText(/contact.form.success/i)).toBeInTheDocument();
    });
});

```

# __tests__/components/Contact/ContactForm.test.tsx

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactForm } from '../../components/Contact/ContactForm';
import { useEmail } from '../../hooks/useEmail';

// Mock the hooks
jest.mock('@/hooks/useEmail');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('ContactForm', () => {
  beforeEach(() => {
    (useEmail as jest.Mock).mockReturnValue({
      sendEmail: jest.fn(),
      isLoading: false,
      error: null,
      success: false,
    });
  });

  it('renders form fields correctly', () => {
    render(<ContactForm />);
    
    expect(screen.getByLabelText(/contact.form.name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact.form.email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact.form.message/i)).toBeInTheDocument();
  });

  it('handles form submission correctly', async () => {
    const mockSendEmail = jest.fn();
    (useEmail as jest.Mock).mockReturnValue({
      sendEmail: mockSendEmail,
      isLoading: false,
      error: null,
      success: false,
    });

    render(<ContactForm />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/contact.form.name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/contact.form.email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/contact.form.message/i), {
      target: { value: 'Test message' },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/contact.form.submit/i));

    await waitFor(() => {
      expect(mockSendEmail).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
      });
    });
  });

  it('displays loading state during submission', () => {
    (useEmail as jest.Mock).mockReturnValue({
      sendEmail: jest.fn(),
      isLoading: true,
      error: null,
      success: false,
    });

    render(<ContactForm />);
    expect(screen.getByText(/contact.form.sending/i)).toBeInTheDocument();
  });

  it('displays error message when submission fails', () => {
    (useEmail as jest.Mock).mockReturnValue({
      sendEmail: jest.fn(),
      isLoading: false,
      error: 'Test error message',
      success: false,
    });

    render(<ContactForm />);
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('displays success message when submission succeeds', () => {
    (useEmail as jest.Mock).mockReturnValue({
      sendEmail: jest.fn(),
      isLoading: false,
      error: null,
      success: true,
    });

    render(<ContactForm />);
    expect(screen.getByText(/contact.form.success/i)).toBeInTheDocument();
  });
});
```

# api/email.service.js

```js
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const browser_1 = __importDefault(require("@emailjs/browser"));
/**
 * EmailService class implementing the singleton pattern for handling email operations
 * Uses EmailJS for sending emails
 */
class EmailService {
    constructor() {
        this.initialized = false;
        // load config from environment variables
        this.config = {
            serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
            templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        };
    }
    /**
     * Get the singleton instance of the EmailService
     * @returns EmailService instance
     */
    static getInstance() {
        if (!EmailService.instance) {
            EmailService.instance = new EmailService();
        }
        return EmailService.instance;
    }
    /**
     * Initialize EmailJS with public key
     * @throws Error if initialization fails
     */
    initialize() {
        if (!this.initialized) {
            try {
                browser_1.default.init(this.config.publicKey);
                this.initialized = true;
            }
            catch (error) {
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
    validatePayload(payload) {
        var _a, _b;
        if (!((_a = payload.name) === null || _a === void 0 ? void 0 : _a.trim())) {
            throw new Error('Name is required');
        }
        if (!((_b = payload.email) === null || _b === void 0 ? void 0 : _b.trim())) {
            throw new Error('Email is required');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(payload.email)) {
            throw new Error('Invalid email format');
        }
    }
    /**
     * Send email using EmailJS
     * @param payload - Email content and recipient information
     * @returns Promise resolving to EmailResponse
     */
    sendEmail(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
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
                const response = yield browser_1.default.send(this.config.serviceId, this.config.templateId, templateParams);
                return {
                    success: true,
                    message: 'Email sent sucessfully',
                    data: response
                };
            }
            catch (error) {
                console.error('Failed to send email:', error);
                return {
                    success: false,
                    message: error instanceof Error ? error.message : 'Failed to send email'
                };
            }
        });
    }
}
exports.EmailService = EmailService;

```

# api/email.service.ts

```ts
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
```

# api/i18n.service.js

```js
"use strict";

```

# api/i18n.service.ts

```ts

```

# components/Contact/ContactForm.tsx

```tsx
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
```

# hooks/useEmail.js

```js
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEmail = void 0;
const react_1 = require("react");
const email_service_1 = require("../api/email.service");
/**
 * Custom hook for handling email operations
 * @returns Object containing email sending function and status
 */
const useEmail = () => {
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [success, setSuccess] = (0, react_1.useState)(false);
    const sendEmail = (payload) => __awaiter(void 0, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const emailService = email_service_1.EmailService.getInstance();
            const response = yield emailService.sendEmail(payload);
            if (response.success) {
                setSuccess(true);
            }
            else {
                setError(response.message);
            }
        }
        catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to send Email');
        }
        finally {
            setIsLoading(false);
        }
    });
    return {
        sendEmail,
        isLoading,
        error,
        success
    };
};
exports.useEmail = useEmail;

```

# hooks/useEmail.ts

```ts
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
```

# types/email.types.js

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

```

# types/email.types.ts

```ts
export interface EmailPayload {
  name: string;
  email: string;
  message?: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface EmailServiceConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}
```

# vite-env.d.ts

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_EMAILJS_SERVICE_ID: string;
    VITE_EMAILJS_TEMPLATE_ID: string;
    VITE_EMAILJS_PUBLIC_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
} 
```

