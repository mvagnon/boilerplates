# React Boilerplate

## Reference

See [AGENTS.md](./AGENTS.md) for technical guidelines.

## Commands

| Command                | Purpose                                          |
| ---------------------- | ------------------------------------------------ |
| `bun install`          | Install dependencies                             |
| `bun run api:sync`     | Regenerate API clients, hooks, types and schemas |
| `bun run dev`          | Start the development server                     |
| `bun run start`        | Serve the production build                       |
| `bun run lint`         | Check lint rules; warnings fail                  |
| `bun run lint:fix`     | Apply automatic lint fixes                       |
| `bun run typecheck`    | Check TypeScript types                           |
| `bun run knip`         | Find unused code and dependencies                |
| `bun run staticchecks` | Run lint, typecheck and Knip                     |
| `bun run build`        | Build for production                             |

## Env variables

| Variable       | Purpose                                                    | Required            | Default             |
| -------------- | ---------------------------------------------------------- | ------------------- | ------------------- |
| `OPENAPI_URL`  | OpenAPI URL or file path for `api:sync`                    | Yes, for `api:sync` | None                |
| `VITE_API_URL` | API base URL; set in `.env.local` or the build environment | No                  | Empty (same origin) |
