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
