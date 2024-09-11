import { DrizzleUsersRepository } from "@/api/repositories/drizzle/user.repository";
import { CreateUserService } from "./create-user.service";
import { GetUserByIdService } from "./get-user-by-id.service";
import { GetAllUsersService } from "./get-all-users.service";
import { UpdateUserService } from "./update-user.service";
import { DeleteUserService } from "./delete-user.service";

export const makeGetUserByIdService = () => {
	const usersRepository = new DrizzleUsersRepository();
	const getUserByIdService = new GetUserByIdService(usersRepository);

	return getUserByIdService;
};

export const makeGetAllUsersService = () => {
	const usersRepository = new DrizzleUsersRepository();
	const getAllUsersService = new GetAllUsersService(usersRepository);

	return getAllUsersService;
};

export const makeCreateUserService = () => {
	const usersRepository = new DrizzleUsersRepository();
	const createUserService = new CreateUserService(usersRepository);

	return createUserService;
};

export const makeUpdateUserService = () => {
	const usersRepository = new DrizzleUsersRepository();
	const updateUserService = new UpdateUserService(usersRepository);

	return updateUserService;
};

export const makeDeleteUserService = () => {
	const usersRepository = new DrizzleUsersRepository();
	const deleteUserService = new DeleteUserService(usersRepository);

	return deleteUserService;
};
