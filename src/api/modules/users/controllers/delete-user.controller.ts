import { createRoute, type z } from "@hono/zod-openapi";
import type { Handler } from "hono";
import { userSchema } from "./user.schema";
import { makeDeleteUserService } from "../services/users.factory";
import { logger } from "@/config/logger";

const deleteUserSchema = {
	params: userSchema.pick({ id: true }),
};

type DeleteUserParams = z.infer<typeof deleteUserSchema.params>;

export const deleteUserRoute = createRoute({
	method: "delete",
	path: "/{id}",
	tags: ["User"],
	summary: "Deletes a user",
	request: {
		params: deleteUserSchema.params,
	},
	responses: {
		200: {
			description: "User deleted successfully",
		},
	},
});

export const deleteUserHandler: Handler = async (c) => {
	const { id } = c.req.param() as DeleteUserParams;

	logger.debug(`Deleting user with ID ${id}`);
	await makeDeleteUserService().execute(id);

	return c.json({});
};
