import { config } from "dotenv";
import { z } from "zod";
import { logger } from "./logger";

config();

const envSchema = z.object({
	PORT: z.coerce.number(),

	DB_USER: z.string(),
	DB_PASSWORD: z.string(),
	DB_HOST: z.string(),
	DB_PORT: z.coerce.number(),
	DB_NAME: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (parsedEnv.success === false) {
	logger.fatal(parsedEnv.error.format(), "Invalid environment variables.");

	throw new Error("Invalid environment variables.");
}

export const env = Object.freeze(parsedEnv.data);
