import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(2, "Username must be atleast of 2 characters long"),
  email: z.string().trim().toLowerCase().email("Invalid email format"),
  password: z.string().min(6, "Password must be alteast of 6 characters long."),
});

export const signinSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email format"),
  password: z.string("Password must be a valid string.").min(6, "Password must be alteast of 6 characters long."),
});
