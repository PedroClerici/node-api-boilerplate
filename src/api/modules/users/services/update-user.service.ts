import { UserEntity } from "@/api/entities/user.entity";
import type { UsersRepository } from "@/api/repositories";
import { instanceToPlain, plainToInstance } from "class-transformer";
import type { User } from "drizzle/schemas/users";

export class UpdateUserService {
	constructor(private usersRepository: UsersRepository) {}

	async execute(id: string, data: User) {
		const user = this.usersRepository.update(id, data);
		if (!user) return null;

		const userEntity = plainToInstance(UserEntity, user);

		return instanceToPlain(userEntity) as UserEntity;
	}
}
