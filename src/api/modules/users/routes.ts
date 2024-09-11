import { Router } from "@/utils/router";
import {
	createUserHandler,
	createUserRoute,
} from "./controllers/create-user.controller";
import {
	getUserRoute,
	getUserHandler,
} from "./controllers/get-user.controller";
import {
	getAllUsersHandler,
	getAllUsersRoute,
} from "./controllers/gets-all-users.controller";
import {
	updateUserHandler,
	updateUserRoute,
} from "./controllers/update-user.controller";
import {
	deleteUserHandler,
	deleteUserRoute,
} from "./controllers/delete-user.controller";

export const usersRoutes = Router();

usersRoutes.openapi(createUserRoute, createUserHandler);

usersRoutes.openapi(getUserRoute, getUserHandler);

usersRoutes.openapi(getAllUsersRoute, getAllUsersHandler);

usersRoutes.openapi(updateUserRoute, updateUserHandler);

usersRoutes.openapi(deleteUserRoute, deleteUserHandler);
