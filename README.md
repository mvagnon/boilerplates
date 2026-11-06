[![portfolio](https://img.shields.io/website?url=https%3A%2F%2Fmvagnon.dev&up_message=Visit&label=Portfolio&color=%23007fff)](https://mvagnon.dev)
[![buymeacoffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-Support-yellow?logo=buymeacoffee)](https://buymeacoffee.com/mvagnon)

# Boilerplates

| Application  | Stack                                            | Documentation                              |
| ------------ | ------------------------------------------------ | ------------------------------------------ |
| React        | React Router, Vite, Tailwind CSS, TanStack Query | [React README](./apps/react/README.md)     |
| React Native | Expo, React Native, Expo Router, EAS             | [React Native README](./apps/rn/README.md) |

## Reference

See [AGENTS.md](./AGENTS.md) for technical guidelines.

## Commands

| Command                                          | Purpose                                                            |
| ------------------------------------------------ | ------------------------------------------------------------------ |
| `bun install --frozen-lockfile`                  | Install root and application dependencies from the shared lockfile |
| `bun run dev`                                    | Start both development servers                                     |
| `bun run dev:react`                              | Start only the React web app                                       |
| `bun run dev:rn`                                 | Start only the Expo development server                             |
| `bun run staticchecks`                           | Run lint, TypeScript and Knip checks for both apps                 |
| `bun run staticchecks --filter=@boilerplates/rn` | Check only the mobile app                                          |
| `bun run build`                                  | Build the React web app for production                             |

## CI/CD

### GitHub secrets

| Setting            | Type            | Location                                                                             | Purpose                                                                                                             |
| ------------------ | --------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `EXPO_TOKEN`       | Secret          | Repository Actions secret, or environment secrets in both `preview` and `production` | Required for EAS builds and submissions when releases are enabled                                                   |
| `RELEASE_ENABLED`  | Variable        | Repository Actions variable                                                          | Set to `true` after EAS/store setup to enable mobile release PRs, preview and production builds; disabled otherwise |
| `RELEASE_REVIEWER` | Variable        | Repository Actions variable                                                          | Optional GitHub login to request reviews on release PRs                                                             |
| `GITHUB_TOKEN`     | Automatic token | Provided by GitHub Actions; do not create manually                                   | Authenticate release management                                                                                     |

## Setup for an existing project

Ask your agent:

```text
Use this repository as a reference for Bun workspaces, Turborepo, shared tooling and CI/CD.
Select React, React Native, or both boilerplates; default to both when no selection is specified.
Integrate the selected applications into a single monorepo.
Follow this README's "Agent instructions" and the READMEs of the selected applications.
```

Agent instructions:

1. Use the requested boilerplates: React (`apps/react`), React Native (`apps/rn`), or all; default to all when none are specified.
2. Read this repository at the requested ref and record its commit SHA, including the root configuration and selected application READMEs.
3. Read the target project; its `AGENTS.md` and conventions take precedence.
4. Present the categories below for the selected applications and explicitly ask what to apply or exclude; wait for approval before making changes.
5. Integrate only the approved selection into one monorepo without duplicate tooling or dependency downgrades; preserve independent application configurations and releases.
6. For React Native, preserve the Expo SDK, app identity, signing and runtime policy; keep API URLs device-reachable.
7. Run the affected checks and builds, then report the changes, results and source SHA.

| Category             | Features                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| Architecture         | Independent applications in `apps/*`, app-specific guidelines and a single lockfile               |
| Dependencies & stack | Bun workspaces and Turborepo                                                                      |
| Code quality         | Prettier and application-level ESLint, TypeScript and Knip checks                                 |
| Git hooks            | Staged-file formatting with pretty-quick                                                          |
| CI/CD                | Shared GitHub Actions quality checks, web build, Trivy scan and optional mobile release workflows |
