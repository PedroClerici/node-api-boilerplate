import { createRoute, type z } from "@hono/zod-openapi";
import type { Handler } from "hono";
import { userSchema } from "./user.schema";
import { makeGetUserByIdService } from "../services/users.factory";
import { NotFoundError } from "@/utils/errors";

const getUserSchema = {
	params: userSchema.pick({ id: true }),
	response: userSchema.omit({
		password: true,
	}),
};

type GetUserParams = z.infer<typeof getUserSchema.params>;
type GetUserResponse = z.infer<typeof getUserSchema.response>;

export const getUserRoute = createRoute({
	method: "get",
	path: "/{id}",
	tags: ["User"],
	summary: "Gets a user",
	request: {
		params: getUserSchema.params,
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: getUserSchema.response,
				},
			},
			description: "Retrieved the user",
		},
	},
});

export const getUserHandler: Handler = async (ctx) => {
	const { id } = ctx.req.param() as GetUserParams;

	const user = await makeGetUserByIdService().execute(id);
	if (!user) throw new NotFoundError("User not found");

	return ctx.json<GetUserResponse>(user, { status: 200 });
};
