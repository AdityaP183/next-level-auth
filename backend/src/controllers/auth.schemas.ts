import { z } from "zod";

export const emailSchema = z.string().email().min(1).max(255);
const passwordSchema = z.string().min(1).max(255);

export const loginSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
	userAgent: z.string().min(1).max(255),
});

export const registerSchema = loginSchema
	.extend({
		confirmPassword: z.string().min(1).max(255),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export const verificationCodeSchema = z.string().min(1).max(24);

export const requestPasswordSchema = z.object({
	password: passwordSchema,
	verificationCode: verificationCodeSchema,
});
