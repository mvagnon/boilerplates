# React Native Boilerplate

## Reference

See [AGENTS.md](./AGENTS.md) for technical guidelines.

## Commands

| Command                                        | Purpose                                                              |
| ---------------------------------------------- | -------------------------------------------------------------------- |
| `bun install`                                  | Install dependencies                                                 |
| `OPENAPI_URL='<url-or-path>' bun run api:sync` | Regenerate API clients, hooks, types and schemas                     |
| `bun run pull` / `pull:preview`                | Pull EAS variables into `.env.local`                                 |
| `bun run prebuild`                             | Regenerate Android and iOS projects (replaces generated directories) |
| `bun run ios` / `android`                      | Build and run on a device; Metro starts separately                   |
| `bun run start` / `web`                        | Start Metro for development builds / start the web app               |
| `bun run lint` / `typecheck` / `knip`          | Run individual checks                                                |
| `bun run staticchecks`                         | Run lint, typecheck and Knip                                         |
| `bun run preview` / `prod`                     | Build both platforms and submit store candidates                     |
| `bun run preview:ios` / `prod:ios`             | Build and submit to TestFlight                                       |
| `bun run preview:android` / `prod:android`     | Build Android without submitting                                     |
| `bun run update --message "Fix description"`   | Publish a production OTA update                                      |

## Env variables

| Variable              | Purpose                                            | Required           | Default |
| --------------------- | -------------------------------------------------- | ------------------ | ------- |
| `EXPO_PUBLIC_API_URL` | Device-reachable API base URL; `.env.local` or EAS | Yes, for API calls | None    |
