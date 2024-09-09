import "reflect-metadata";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { env } from "@/config/env";
import { logger } from "@/config/logger";
import { users } from "./api/modules/users/users.controller";

const app = new Hono();

app.route("/users", users);

logger.info(`Server is running on port ${env.PORT}`);

serve({
	fetch: app.fetch,
	port: env.PORT,
});
