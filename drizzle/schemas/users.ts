import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: serial("id").notNull().primaryKey(),
	username: varchar("username", { length: 256 }).notNull(),
	email: varchar("email", { length: 256 }).notNull().unique(),
	password: varchar("password", { length: 256 }).notNull(),
	createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
