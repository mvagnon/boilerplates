# Project Technical Instructions

## Introduction

This project is a React application boilerplate.
Give as much information about the project in about ~3-6 lines.

## Project Initialization and Quality Checks

### Post Clone Tasks

After a fresh clone, run from the project root:

```bash
bun install --frozen-lockfile
```

### Run Dev Server

Run from the project root:

```bash
bun run dev
```

### Cleanup Dev Server

Stop the dev server you started when it is no longer needed.

### Quality Checks

Run static checks from the application directory:

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
