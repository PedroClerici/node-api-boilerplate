import { UserEntity } from "@/api/entities/user.entity";
import type { UsersRepository } from "@/api/repositories";
import { instanceToPlain, plainToInstance } from "class-transformer";

export class GetAllUsersService {
	constructor(private usersRepository: UsersRepository) {}

	async execute() {
		const users = this.usersRepository.getAll();
		if (!users) return null;

		const usersEntities = plainToInstance(UserEntity, users);

		return instanceToPlain(usersEntities) as UserEntity[];
	}
}
