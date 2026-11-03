import type { ConfigExternal } from "orval";

export default {
  api: {
    input: {
      target: process.env.OPENAPI_URL!,
    },
    output: {
      target: "./app/api/generated/client.ts",
      schemas: { path: "./app/api/generated/models", type: "zod" },
      mode: "tags-split",
      client: "react-query",
      httpClient: "fetch",
      urlEncodeParameters: true,
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
      mock: { indexMockFiles: true, generators: [{ type: "msw" }] },
      formatter: "prettier",
    },
  },
} satisfies ConfigExternal;
