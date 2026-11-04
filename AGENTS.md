# Project Instructions

## Introduction

This project is a React application boilerplate.
Give as much information about the project in about ~3-6 lines.

## Architecture

Use a simple, feature-oriented architecture and reuse Orval-generated functions, hooks, types and schemas directly; no pass-through wrappers, duplicated contracts or abstractions without concrete behavior.
This layout describes responsibilities, not a file inventory.

Add feature-style folders at the shared level only when genuinely needed across features.

```text
app/                                  # Shell, providers, routing and global styles
├── api/
│   ├── generated/                    # Orval clients, hooks, types and schemas; reuse directly
│   ├── http.ts                       # Optional shared transport beyond generated behavior
│   ├── openapi.override.json         # Optional versioned full contract; before OPENAPI_URL
│   ├── mocks.ts                      # Development-only MSW setup
│   └── mocks.local/                  # AI-authored handlers and data; Git-ignored
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

## API generation and mocks

Generate API clients, hooks, types and Zod schemas into `app/api/generated/` with `api:sync`; Orval uses `app/api/openapi.override.json` if present, otherwise `OPENAPI_URL`, and fails if neither source is available.
Use generated query keys for cache invalidation and generated query options for prefetching instead of recreating them manually.

For frontend-only, frontend-first work or when backend/API changes are out of scope or unavailable:

- Contract changes: version a complete backend OpenAPI copy as `app/api/openapi.override.json`, edit it and run `api:sync`; keep imports in `generated/`, never hand-edit its code or replace its types/hooks.
- Local mocks: use the `frontend-mocks` skill to generate mocks in `app/api/mocks.local/`.
