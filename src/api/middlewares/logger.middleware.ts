import type { Context, Next } from "hono";
import { getPath } from "hono/utils/url";

import { logger } from "@/config/logger";

export async function loggerMiddleware(c: Context, next: Next) {
	const { method } = c.req;
	const path = getPath(c.req.raw);

	logger.debug(
		{
			request: {
				method,
				path,
				headers: c.req.header(),
			},
		},
		"Incoming request",
	);
	c.req;

	const start = Date.now();

	await next();

	const { status } = c.res;

	logger.debug(
		{
			response: {
				status,
				ok: String(c.res.ok),
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
