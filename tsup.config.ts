import type { Options } from "tsup";

export const tsup: Options = {
	entry: ["src/**/*.ts", "!**/*.spec.ts"],
	clean: true,
	platform: "node",
};
