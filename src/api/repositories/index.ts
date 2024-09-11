import type { User } from "drizzle/schemas/users";

export interface UsersRepository {
	getAll(): Promise<User[]>;

	getById(id: string): Promise<User | undefined>;

	create(data: User): Promise<User | undefined>;

	update(id: string, data: User): Promise<User | undefined>;

	delete(id: string): Promise<void>;
}
