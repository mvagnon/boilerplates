# Project Technical Instructions

## Applications

Before changing an application, read its instructions:

| Application  | Instructions                      |
| ------------ | --------------------------------- |
| React        | [AGENTS.md](apps/react/AGENTS.md) |
| React Native | [AGENTS.md](apps/rn/AGENTS.md)    |

App-specific commands run from the corresponding app directory, except dependency installation always runs from the repository root.

## Informational

### Post Clone

Repository root:

```bash
bun install --frozen-lockfile
```

### Dev Server

React and Expo Web; repository root:

```bash
bun run dev
```

### Cleanup

Task-owned development servers only; shared instances remain untouched.

### Quality Checks

Repository root:

```bash
bun run staticchecks
```
