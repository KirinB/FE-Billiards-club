import { MESSAGES } from "@/constants/message";
import z from "zod";

export const role = ["STAFF", "ADMIN"];

export const updateUserSchema = z.object({
  name: z.string().min(3, MESSAGES.VALIDATION.NAME_LENGTH),
  email: z.string().email(MESSAGES.VALIDATION.EMAIL_NOT_AVAILABLE),
  role: z.enum(role),
  username: z.string().min(3, MESSAGES.VALIDATION.USER_NAME_LENGTH),
});

export type IUpdateUserSchema = z.infer<typeof updateUserSchema>;
