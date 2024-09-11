import type { UsersRepository } from "@/api/repositories";

export class DeleteUserService {
	constructor(private usersRepository: UsersRepository) {}

	async execute(id: string) {
		await this.usersRepository.delete(id);
	}
}
