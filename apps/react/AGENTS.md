# Project Technical Instructions

## Introduction

This project is a React application boilerplate.
Give as much information about the project in about ~3-6 lines.

## Informational

### Post Clone

Repository root:

```bash
bun install --frozen-lockfile
```

### Dev Server

Application directory:

```bash
bun run dev
```

### Cleanup

Task-owned development servers only; shared instances remain untouched.

### Quality Checks

Application directory:

```bash
bun run staticchecks
```

## Architecture

Use a simple, feature-oriented architecture centered around Orval generations.
Do not use wrappers and abstractions around Orval generations.
This layout describes responsibilities, not a file inventory.
Add feature-style folders at the shared level only when genuinely needed across features.

```text
app/
├── api/
│   ├── generated/                    # Orval clients, hooks, types and schemas; reuse directly
│   └── http.ts                       # Optional shared transport beyond generated behavior
├── assets/                           # Shared imported assets
├── contexts/                         # Shared contexts/providers across features
├── hooks/                            # Shared non-API state and behavior across features
├── lib/                              # Cross-feature utilities; no more specific owner
├── ui/                               # Shared presentational UI; colocated props/types, no types/
├── routes/                           # Pages composing features/APIs; no feature pages/
└── features/
    └── <feature>/
        ├── components/               # Feature UI; colocated props/types, no types/
        ├── contexts/                 # Feature contexts/providers
        ├── hooks/                    # Non-API feature state and behavior
        ├── schemas/                  # UI/form validation and inferred types; not API contracts
        ├── utils/                    # Pure feature calculations/transforms
        └── constants/                # Feature constants
public/                               # Static assets
```
