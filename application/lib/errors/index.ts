import { NextRequest } from "next/server";
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
      message: JSON.parse(error.message)[0].message,
      status: 500,
    };
  }

  if (error instanceof Error && error.name === "MongoServerSelectionError") {
    return {
      name: "Connection error",
      message: "We were unable to establish a connection with the database",
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
  (handler: (request: NextRequest) => Promise<Response>) =>
  async (request: NextRequest) => {
    try {
      return await handler(request);
    } catch (error) {
      console.warn(error);

      const { status, ...body } = trustedErrorHandle(error);

      return new Response(JSON.stringify(body), {
        headers: { "Content-Type": "application/json" },
        status,
      });
    }
  };

export const parseErrorFromResponse = async (response: Response) => {
  const json = await response.json().catch((_) => {
    return null;
  });

  if (
    typeof json !== "object" ||
    json === null ||
    !Object.keys(json).includes("name") ||
    !Object.keys(json).includes("message")
  ) {
    return new ClientFriendlyError("Unknown error", "Unexpected error");
  }

  const validatedJson = json as { name: string; message: string };

  return new ClientFriendlyError(
    validatedJson["name"]!,
    validatedJson["message"]!
  );
};
