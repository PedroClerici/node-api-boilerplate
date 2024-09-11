import type { User } from "drizzle/schemas/users";
import { z } from "@hono/zod-openapi";

export const userSchema = z.object({
	id: z.string().uuid(),
	username: z
		.string()
		.min(2, "Username must be at least 2 characters long")
		.max(32, "Username must be at most 32 characters long")
		.regex(
			/^(?!.*?(\.|_){2,})[a-zA-Z0-9_\.]+$/,
			"Username must contain only alphanumeric characters, underscores, and dots, and cannot contain consecutive dots or underscores",
		)
		.openapi({
			example: "john_doe",
		}),
	email: z.string().email().openapi({
		example: "example@example.com",
	}),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.max(128, "Password must be at most 128 characters long")
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
			"Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
		)
		.openapi({
			example: "MyP@ssw0rd!",
		}),
	createdAt: z.string().openapi({
		example: new Date().toISOString(),
	}),
	updatedAt: z.string().openapi({
		example: new Date().toISOString(),
	}),
}) satisfies z.ZodType<User>;
