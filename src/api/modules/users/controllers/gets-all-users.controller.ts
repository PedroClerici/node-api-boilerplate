import { createRoute, z } from "@hono/zod-openapi";
import type { Handler } from "hono";
import { userSchema } from "./user.schema";
import { makeGetAllUsersService } from "../services/users.factory";

const getAllUsersSchema = {
	response: z.array(
		userSchema.omit({
			password: true,
		}),
	),
};

type GetAllUsersResponse = z.infer<typeof getAllUsersSchema.response>;

export const getAllUsersRoute = createRoute({
	method: "get",
	path: "/",
	tags: ["User"],
	summary: "Gets all users",
	responses: {
		200: {
			content: {
				"application/json": {
					schema: getAllUsersSchema.response,
				},
			},
			description: "Retrieved all users",
		},
	},
});

export const getAllUsersHandler: Handler = async (ctx) => {
	const users = await makeGetAllUsersService().execute();
	if (!users) throw new Error("Couldn't fetch users");

	return ctx.json<GetAllUsersResponse>(users);
};
