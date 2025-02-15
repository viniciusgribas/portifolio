// Current definition might look like this:
export interface EmailPayload {
  name: string;
  email: string;
  message: string;
}

// Update it to this:
export interface EmailPayload extends Record<string, unknown> {
  name: string;
  email: string;
  message: string;
}