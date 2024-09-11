import "reflect-metadata";
import { serve } from "@hono/node-server";
import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";

import { env } from "@/config/env";
import { logger } from "@/config/logger";
import { loggerMiddleware } from "@/api/middlewares/logger";
import { errorHandlerMiddleware } from "@/api/middlewares/error-handler";
import { usersRoutes } from "@/api/modules/users/routes";

const app = new OpenAPIHono();

app.use(loggerMiddleware);
app.onError(errorHandlerMiddleware);

app.route("/users", usersRoutes);

app.doc("/openapi.json", {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "Node API Boilerplate",
	},
});

app.get("/", apiReference({ spec: { url: "/openapi.json" } }));

logger.info(`Server is running on port ${env.PORT}`);

serve({
	fetch: app.fetch,
	port: env.PORT,
});
