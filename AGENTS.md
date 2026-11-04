# Project Instructions

## Introduction

This project is a React application boilerplate.
Give as much information about the project in about ~3-6 lines.

## Architecture

Use a simple, feature-oriented architecture.
This layout describes responsibilities, not a file inventory.

Add feature-style folders at the shared level only when genuinely needed across features.

```text
app/                                  # Shell, providers, routing and global styles
├── api/
│   ├── generated/                    # Orval clients, hooks, types and schemas; reuse directly
│   ├── http.ts                       # Optional shared transport beyond generated behavior
│   ├── openapi.override.json         # Optional versioned full contract; before OPENAPI_URL
│   ├── mocks.ts                      # Development-only MSW setup
│   └── mocks.local/                  # All mock handlers/data must live here; Git-ignored
├── assets/                           # Shared imported assets
├── constants/                        # Shared theme and app constants
├── lib/                              # Cross-feature utilities; no more specific owner
├── ui/                               # Shared presentational UI; colocated props/types, no types/
├── routes/                           # Pages composing features/APIs; no feature pages/
└── features/
    └── <feature>/
        ├── components/               # Feature UI; colocated props/types, no types/
        ├── contexts/                 # Feature contexts/providers, if needed
        ├── hooks/                    # Non-API feature state and behavior
        ├── schemas/                  # UI/form validation + inferred types; not API contracts
        ├── utils/                    # Pure feature calculations/transforms
        └── constants.ts              # Feature constants
public/                               # Static assets
```

## API generation

Generate API clients, hooks, types and Zod schemas into `app/api/generated/` with `api:sync`; Orval uses `app/api/openapi.override.json` if present, otherwise `OPENAPI_URL`, and fails if neither source is available.
Import and use Orval-generated functions, hooks, types and schemas directly from `app/api/generated/`; do not recreate API calls or duplicate generated contracts.
Do not add pass-through wrappers, API facades or custom hooks that only forward generated behavior; introduce an abstraction only when it adds concrete application behavior not already provided by Orval.
Use generated query keys for cache invalidation and generated query options for prefetching instead of recreating them manually.

For frontend-only, frontend-first work or when backend/API changes are out of scope or unavailable:

1. Version a complete backend OpenAPI copy as `app/api/openapi.override.json`, adapt the contract, then run `api:sync`.
2. Add only the missing API behavior or specific scenarios needed for testing in the Git-ignored `app/api/mocks.local/index.ts`, default-exporting an array with `satisfies HttpHandler[]`.
