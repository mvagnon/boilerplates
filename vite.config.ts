import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { msw } from "msw/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    ...(process.env.VITE_API_MOCKING === "true" ? [msw()] : []),
  ],
  resolve: { tsconfigPaths: true },
});
