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