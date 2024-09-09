import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { makeGetUserById } from "./users.factory";

export const users = new Hono();

users.get(":id", async (ctx) => {
	const { id } = ctx.req.param();

	const user = await makeGetUserById().execute(id);
	if (!user) throw new HTTPException(404, { message: "User not found" });

	ctx.status(201);
	return ctx.json(user);
});
