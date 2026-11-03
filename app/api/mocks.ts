import type { HttpHandler } from "msw";
import { network } from "virtual:msw";

const modules = import.meta.glob<Record<string, () => HttpHandler[]>>(
  "./generated/index.msw.ts",
  { eager: true },
);

const localModules = import.meta.glob<HttpHandler[]>("./mocks.local.ts", {
  eager: true,
  import: "default",
});

network.configure({
  handlers: [
    ...Object.values(localModules).flat(),
    ...Object.values(modules).flatMap((module) =>
      Object.values(module).flatMap((getHandlers) => getHandlers()),
    ),
  ],
  onUnhandledFrame: "warn",
});

await network.enable();
