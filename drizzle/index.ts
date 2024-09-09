import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "drizzle/schemas";
import { env } from "@/config/env";
import postgres from "postgres";

const queryClient = postgres(
	`postgres://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`,
);

export const database = drizzle(queryClient, { schema, logger: true });

export type Database = typeof database;
