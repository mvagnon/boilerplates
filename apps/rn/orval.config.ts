import type { ConfigExternal } from "orval";

const inputTarget = process.env.OPENAPI_URL;

if (!inputTarget) {
  throw new Error("Set OPENAPI_URL to generate the API.");
}

export default {
  api: {
    input: {
      target: inputTarget,
    },
    output: {
      target: "./src/api/generated/client.ts",
      schemas: { path: "./src/api/generated/models", type: "zod" },
      mode: "tags-split",
      client: "react-query",
      httpClient: "fetch",
      urlEncodeParameters: true,
      baseUrl: { runtime: "process.env.EXPO_PUBLIC_API_URL" },
      override: {
        // mutator: {
        //   path: './src/api/http.ts',
        //   name: 'customFetch',
        // },
        fetch: {
          includeHttpResponseReturnType: false,
          forceSuccessResponse: true,
        },
      },
      mock: false,
    },
  },
} satisfies ConfigExternal;
