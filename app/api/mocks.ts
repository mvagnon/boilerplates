import type { HttpHandler } from "msw";
import { network } from "virtual:msw";
import baselineHandlers from "./mocks/index";

const localModules = import.meta.glob<HttpHandler[]>("./mocks.local/index.ts", {
  eager: true,
  import: "default",
});

const handlers = [...Object.values(localModules).flat(), ...baselineHandlers];

if (handlers.length === 0) {
  throw new Error("MSW mocks are missing or empty.");
}

network.configure({
  handlers,
  onUnhandledFrame: "warn",
});

await network.enable();
