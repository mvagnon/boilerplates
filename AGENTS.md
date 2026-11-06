# Project Technical Instructions

## Applications

Before changing an application, read its instructions:

| Application  | Instructions                      |
| ------------ | --------------------------------- |
| React        | [AGENTS.md](apps/react/AGENTS.md) |
| React Native | [AGENTS.md](apps/rn/AGENTS.md)    |

App-specific commands run from the corresponding app directory, except dependency installation always runs from the repository root.

## Project Initialization

### Post Clone Tasks

After a fresh clone, install all workspace dependencies from the repository root:

```bash
bun install --frozen-lockfile
```

### Run Dev Server

Run from the repository root to start both the React and Expo development servers:

```bash
bun run dev
```

### Cleanup Dev Server

Stop the development servers you started when they are no longer needed.
