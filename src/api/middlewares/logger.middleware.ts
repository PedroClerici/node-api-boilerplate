import type { Context, Next } from "hono";
import { getPath } from "hono/utils/url";

import { logger } from "@/config/logger";

export async function loggerMiddleware(ctx: Context, next: Next) {
	const { method } = ctx.req;
	const path = getPath(ctx.req.raw);

	logger.info(
		{
			request: {
				method,
				path,
				headers: ctx.req.header(),
			},
		},
		"Incoming request",
	);
	ctx.req;

	const start = Date.now();

	await next();

	const { status } = ctx.res;

	logger.info(
		{
			response: {
				status,
				ok: String(ctx.res.ok),
				time: time(start),
			},
		},
		"Request completed",
	);
}

function humanize(times: string[]): string {
	const [delimiter, separator] = [",", "."];
	const orderTimes = times.map((v) =>
		v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${delimiter}`),
	);

	return orderTimes.join(separator);
}

function time(start: number): string {
	const delta = Date.now() - start;

	return humanize([
		delta < 1000 ? `${delta}ms` : `${Math.round(delta / 1000)}s`,
	]);
}
