import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { env } from "@/config/env";
import { logger } from "@/config/logger";

const app = new Hono();

app.get("*", async (ctx) => {
	return ctx.text("Hello, world!");
});

logger.info(`Server is running on port ${env.PORT}`);

serve({
	fetch: app.fetch,
	port: env.PORT,
});
