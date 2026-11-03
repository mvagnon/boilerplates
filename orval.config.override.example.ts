import type { ConfigExternal } from "orval";
import config from "./orval.config";

export default {
  ...config,
  api: {
    ...config.api,
    output: {
      ...config.api.output,
      override: {
        ...config.api.output.override,
      },
    },
  },
} satisfies ConfigExternal;
