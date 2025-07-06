import { ZodError } from "zod";

export class ClientFriendlyError extends Error {
  name: string;
  message: string;
  status: number;

  constructor(name: string, message: string, status?: number, stack?: string) {
    super();
    this.name = name;
    this.message = message;
    this.status = status ?? 500;
    this.stack = stack;
  }
}

const trustedErrorHandle = (error: unknown) => {
  if (error instanceof ZodError) {
    return {
      name: "Validation error",
      message: error.message,
      status: 500,
    };
  }

  if (error instanceof ClientFriendlyError)
    return {
      name: error.name,
      message: error.message,
      status: error.status,
    };

  throw error;
};

export const withErrorHandling =
  async (handler: (request: Request) => Promise<Response>) =>
  async (request: Request) => {
    try {
      return await handler(request);
    } catch (error) {
      trustedErrorHandle(error);
    }
  };
