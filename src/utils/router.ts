import { OpenAPIHono } from "@hono/zod-openapi";
import { makeError } from "./errors";

export function Router() {
	return new OpenAPIHono({
		defaultHook: (result, ctx) => {
			if (result.success) return;

			const { error, statusCode } = makeError(result.error);
			return ctx.json(error, { status: statusCode });
		},
	});
}
