import { existsSync } from "node:fs";
import type { ConfigExternal } from "orval";

const overridePath = "./app/api/openapi.override.json";
const inputTarget = existsSync(overridePath)
  ? overridePath
  : process.env.OPENAPI_URL;

if (!inputTarget) {
  throw new Error(
    `Set OPENAPI_URL or provide ${overridePath} to generate the API.`,
  );
}

export default {
  api: {
    input: {
      target: inputTarget,
    },
    output: {
      target: "./app/api/generated/client.ts",
      schemas: { path: "./app/api/generated/models", type: "zod" },
      mode: "tags-split",
      client: "react-query",
      httpClient: "fetch",
      urlEncodeParameters: true,
      baseUrl: { runtime: '(import.meta.env.VITE_API_URL ?? "")' },
      override: {
        // mutator: {
        //   path: "./app/api/http.ts",
        //   name: "customFetch",
        // },
        requestOptions: { credentials: "include" },
        fetch: {
          includeHttpResponseReturnType: false,
          forceSuccessResponse: true,
        },
      },
      mock: false,
      formatter: "prettier",
    },
  },
} satisfies ConfigExternal;
