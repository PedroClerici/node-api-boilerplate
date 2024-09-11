import { createRoute, type z } from "@hono/zod-openapi";
import type { Handler } from "hono";
import { userSchema } from "./user.schema";
import { makeUpdateUserService } from "../services/users.factory";

const updateUserSchema = {
	params: userSchema.pick({ id: true }),
	body: userSchema.pick({ username: true, password: true, email: true }),
	response: userSchema.omit({
		password: true,
	}),
};

type UpdateUserParams = z.infer<typeof updateUserSchema.params>;
type UpdateUserBody = z.infer<typeof updateUserSchema.body>;
type UpdateUserResponse = z.infer<typeof updateUserSchema.response>;

export const updateUserRoute = createRoute({
	method: "put",
	path: "/{id}",
	tags: ["User"],
	summary: "Updates a user",
	request: {
		body: {
			content: {
				"application/json": {
					schema: updateUserSchema.body,
				},
			},
		},
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: updateUserSchema.response,
				},
			},
			description: "User updated successfully",
		},
	},
});

export const updateUserHandler: Handler = async (c) => {
	const { id } = c.req.param() as UpdateUserParams;
	const body = await c.req.json<UpdateUserBody>();

	const updatedUser = await makeUpdateUserService().execute(id, body);
	if (!updatedUser) throw Error("Couldn't update user");

	return c.json<UpdateUserResponse>(updatedUser);
};
