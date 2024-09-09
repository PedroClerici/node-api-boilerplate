import { GetUserByIdService } from "./get-user-by-id.service";
import { DrizzleUsersRepository } from "@/api/repositories/drizzle/user.repository";

export const makeGetUserById = () => {
	const usersRepository = new DrizzleUsersRepository();
	const getUserByIdService = new GetUserByIdService(usersRepository);

	return getUserByIdService;
};
