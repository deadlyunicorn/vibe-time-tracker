import { LoginBody } from "@/lib/interfaces/auth/interface";
import zod from "zod";

const LoginSchema = zod.object({
  username: zod.string().min(3, "Username is required"),
  password: zod
    .string()
    .min(6, "Password should be at least 6 characters long"),
});

export const POST = async (request: Request) => {
  const body: LoginBody = await request.json();
  const { username, password } = LoginSchema.parse(body);
  // Handle login logic here
  console.log("Login:", { username, password });

  // Simulate a successful login response
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
};
