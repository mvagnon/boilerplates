import type { ConfigExternal } from "orval";

export default {
  api: {
    input: {
      target: process.env.OPENAPI_URL ?? "http://localhost:3000/openapi.json",
    },
    output: {
      target: "./app/api/generated.ts",
      schemas: "./app/api/models",
      mode: "tags-split",
      client: "react-query",
      httpClient: "fetch",
      urlEncodeParameters: true,
      override: {
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
