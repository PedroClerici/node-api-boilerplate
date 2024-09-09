import { instanceToPlain, plainToInstance } from "class-transformer";

import type { UsersRepository } from "@/api/repositories";
import { UserEntity } from "@/api/entities/user.entity";

export class GetUserByIdService {
	constructor(private usersRepository: UsersRepository) {}

	async execute(id: string) {
		const user = this.usersRepository.getById(id);

		if (!user) return null;

		const userEntity = plainToInstance(UserEntity, user);

		return instanceToPlain(userEntity);
	}
}
