import { UserRepository } from "@/lib/db/users";
import { withErrorHandling } from "@/lib/errors";
import { LoginBody } from "@/lib/interfaces/auth/interface";
import { AuthUtils } from "@/lib/utils/auth";
import zod from "zod";

const LoginSchema = zod.object({
  username: zod.string().min(3, "Username is required"),
  password: zod
    .string()
    .min(6, "Password should be at least 6 characters long"),
});

export const POST = withErrorHandling(async (request: Request) => {
  const body: LoginBody = await request.json();
  const { username, password } = LoginSchema.parse(body);

  const user = await UserRepository.getUserByUsername({ username });
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await AuthUtils.passwordMatchesDatabaseHash(
    password,
    user.passwordHash
  );
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  // Simulate a successful login response
  return new Response(
    JSON.stringify({ success: true, data: { userId: user.userId } }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
});
