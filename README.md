[![portfolio](https://img.shields.io/website?url=https%3A%2F%2Fmvagnon.dev&up_message=Visit&label=Portfolio&color=%23007fff)](https://mvagnon.dev)
[![buymeacoffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-Support-yellow?logo=buymeacoffee)](https://buymeacoffee.com/mvagnon)

# React Boilerplate

## Reference

See [AGENTS.md](./AGENTS.md) for coding guidelines.

## Commands

| Command                | Purpose                                       |
| ---------------------- | --------------------------------------------- |
| `bun install`          | Install dependencies                          |
| `bun run api:sync`     | Regenerate the API client and MSW mocks       |
| `bun run dev`          | Start the development server                  |
| `bun run dev:mock`     | Start development with MSW, without a backend |
| `bun run start`        | Serve the production build                    |
| `bun run lint`         | Check lint rules; warnings fail               |
| `bun run lint:fix`     | Apply automatic lint fixes                    |
| `bun run typecheck`    | Check TypeScript types                        |
| `bun run knip`         | Find unused code and dependencies             |
| `bun run staticchecks` | Run lint, typecheck and Knip                  |
| `bun run build`        | Build for production                          |

## Env variables

| Variable           | Purpose                                                    | Required            | Default  |
| ------------------ | ---------------------------------------------------------- | ------------------- | -------- |
| `OPENAPI_URL`      | Backend OpenAPI URL for `api:sync`                         | Yes, for `api:sync` | None     |
| `VITE_API_MOCKING` | Enable development request interception; set by `dev:mock` | No                  | Disabled |

## Setup for an existing project

Ask your agent:

```text
Use `mvagnon/react-boilerplate` as a reference to adopt boilerplate's conventions, structure, stack, CI/CD, quality scripts, `git` hooks, etc.
Follow its README's "Agent instructions" using `gh` CLI or GitHub MCP.
```

Agent instructions:

1. Read the boilerplate at the requested ref (default: default branch) using `gh` or GitHub MCP; record its commit SHA. Read the target project too; its `AGENTS.md` and conventions take precedence.
2. Present the available features grouped by the categories below. Explicitly ask what to apply and what to exclude in each category. Wait for the user's answer before making changes.
3. Implement only the approved selection, adapting to the target project without duplicates. Use its package manager, update its lockfile, and never downgrade dependencies.
4. Run the affected checks and builds. Report the changes, results and source SHA.

| Category                 | Features                                                            |
| ------------------------ | ------------------------------------------------------------------- |
| Architecture             | Project structure and coding guidelines                             |
| Dependencies & stack     | React, React Router, TypeScript, Vite, Tailwind CSS, TanStack Query |
| CI/CD                    | GitHub Actions workflows                                            |
| Code quality             | ESLint, Prettier, Knip, quality scripts                             |
| `git` hooks              | Pre-commit formatting                                               |
| API generation & mocking | Orval client, hooks, types, Zod schemas and MSW mocks               |
| Docker                   | Production image and build context                                  |
