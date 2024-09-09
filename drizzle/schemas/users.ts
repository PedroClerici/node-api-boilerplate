import { pgTable, uuid, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type { z } from "zod";

export const users = pgTable("users", {
	id: uuid("id").primaryKey(),
	username: varchar("username", { length: 256 }).notNull(),
	email: varchar("email", { length: 256 }).notNull().unique(),
	password: varchar("password", { length: 256 }).notNull(),
	createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const userSchema = createInsertSchema(users);

export type User = Required<z.infer<typeof userSchema>>;
