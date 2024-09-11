import { defineConfig } from "drizzle-kit";
import { env } from "@/config/env";

export default defineConfig({
	dialect: "postgresql",
	schema: "./drizzle/schemas/*",
	out: "./drizzle/migrations",
	dbCredentials: {
		user: env.DB_USER,
		password: env.DB_PASSWORD,
		host: env.DB_HOST,
		port: env.DB_PORT,
		database: env.DB_NAME,
	},
	// verbose: true,
	strict: true,
});
