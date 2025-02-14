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