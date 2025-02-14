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
