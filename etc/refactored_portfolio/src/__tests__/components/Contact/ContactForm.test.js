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
