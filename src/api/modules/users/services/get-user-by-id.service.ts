import { UserEntity } from "@/api/entities/user.entity";
import type { UsersRepository } from "@/api/repositories";
import { instanceToPlain, plainToInstance } from "class-transformer";

export class GetUserByIdService {
	constructor(private usersRepository: UsersRepository) {}

	async execute(id: string) {
		const user = this.usersRepository.getById(id);
		if (!user) return null;

		const userEntity = plainToInstance(UserEntity, user);

		return instanceToPlain(userEntity) as UserEntity;
	}
}
