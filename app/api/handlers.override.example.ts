import type { HttpHandler } from "msw";
// import { http, HttpResponse } from "msw/http";
// import { delay } from "msw/utils/delay";

/**
 * Copy this file to app/api/handlers.override.ts.
 * Add handlers to the exported array; local responses override generated ones.
 * Replace the example URL and payloads with your API contract, reusing generated types and factories.
 * Choose one handler per route below: the first handler returning a response wins.
 * Delete the local file to disable overrides.
 */
export default [
  // Fixed data:
  // http.get("/api/items", () =>
  //   HttpResponse.json([{ id: "demo", name: "Example" }]),
  // ),
  // Empty list:
  // http.get("/api/items", () => HttpResponse.json([])),
  // Server error:
  // http.get("/api/items", () =>
  //   HttpResponse.json({ message: "Unavailable" }, { status: 500 }),
  // ),
  // Slow response to inspect loading states:
  // http.get("/api/items", async () => {
  //   await delay(3000);
  //   return HttpResponse.json([]);
  // }),
] satisfies HttpHandler[];
