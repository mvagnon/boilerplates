import type { HttpHandler } from "msw";
import { network } from "virtual:msw";

const modules = import.meta.glob<Record<string, () => HttpHandler[]>>(
  "./api/generated/index.msw.ts",
  { eager: true },
);

network.configure({
  handlers: Object.values(modules).flatMap((module) =>
    Object.values(module).flatMap((getHandlers) => getHandlers()),
  ),
  onUnhandledFrame: "warn",
});

await network.enable();
