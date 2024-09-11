import { OpenAPIHono } from "@hono/zod-openapi";
import { makeError } from "./errors";

export function Router() {
	return new OpenAPIHono({
		defaultHook: (result, c) => {
			if (result.success) return;

			const { error, statusCode } = makeError(result.error);
			return c.json(error, { status: statusCode });
		},
	});
}
