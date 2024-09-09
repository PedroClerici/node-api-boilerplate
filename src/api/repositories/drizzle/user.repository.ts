import type { UsersRepository } from "..";
import { database } from "drizzle";
import { users } from "drizzle/schemas";
import { eq } from "drizzle-orm";
import type { User } from "drizzle/schemas/users";

export class DrizzleUsersRepository implements UsersRepository {
	async getAll(): Promise<User[]> {
		const allUsers = await database.select().from(users);

		return allUsers;
	}

	async getById(id: string) {
		const [user] = await database.select().from(users).where(eq(users.id, id));

		return user;
	}

	async create(data: User) {
		const [user] = await database.insert(users).values(data).returning();
		return user;
	}

	async update(id: string, data: User) {
		const result = await database
			.update(users)
			.set(data)
			.where(eq(users.id, id))
			.returning();

		return result[0];
	}

	async delete(id: string): Promise<void> {
		database.delete(users).where(eq(users.id, id));
	}
}
