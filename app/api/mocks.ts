import type { HttpHandler } from "msw";
import { network } from "virtual:msw";

const modules = import.meta.glob<Record<string, () => HttpHandler[]>>(
  "./generated/index.msw.ts",
  { eager: true },
);

const overrideModules = import.meta.glob<HttpHandler[]>(
  "./handlers.override.ts",
  {
    eager: true,
    import: "default",
  },
);

network.configure({
  handlers: [
    ...Object.values(overrideModules).flat(),
    ...Object.values(modules).flatMap((module) =>
      Object.values(module).flatMap((getHandlers) => getHandlers()),
    ),
  ],
  onUnhandledFrame: "warn",
});

await network.enable();
