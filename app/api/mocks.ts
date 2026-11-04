import type { HttpHandler } from "msw";
import { network } from "virtual:msw";

const localModules = import.meta.glob<HttpHandler[]>("./mocks.local/index.ts", {
  eager: true,
  import: "default",
});

network.configure({
  handlers: Object.values(localModules).flat(),
  onUnhandledFrame: "bypass",
});

await network.enable();
