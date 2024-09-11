import { createRoute, type z } from "@hono/zod-openapi";
import type { Handler } from "hono";
import { userSchema } from "./user.schema";
import { makeCreateUserService } from "../services/users.factory";

const createUserSchema = {
	body: userSchema.pick({ username: true, password: true, email: true }),
	response: userSchema.omit({
		password: true,
	}),
};

type CreateUserBody = z.infer<typeof createUserSchema.body>;
type CreateUserResponse = z.infer<typeof createUserSchema.response>;

export const createUserRoute = createRoute({
	method: "post",
	path: "/",
	tags: ["User"],
	summary: "Creates a user",
	request: {
		body: {
			content: {
				"application/json": {
					schema: createUserSchema.body,
				},
			},
		},
	},
	responses: {
		201: {
			content: {
				"application/json": {
					schema: createUserSchema.response,
				},
			},
			description: "User created successfully",
		},
	},
});

export const createUserHandler: Handler = async (c) => {
	const body = await c.req.json<CreateUserBody>();

	const userCreated = await makeCreateUserService().execute(body);
	if (!userCreated) throw Error("Couldn't create user");

	return c.json<CreateUserResponse>(userCreated);
};
