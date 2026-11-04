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
│   ├── mocks.ts                      # Development setup; custom handlers first
│   ├── handlers.override.ts          # Personal handlers/state; Git-ignored
│   └── handlers.override.example.ts  # Versioned handler template
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

Generate API code and stateless mocks into `app/api/generated/` with `api:sync`; Orval uses `app/api/openapi.override.json` if present, otherwise `OPENAPI_URL`, and fails if neither source is available.
Keep permanent generation overrides in `orval.config.ts` using documented Orval extension points.
Use generated query keys for cache invalidation and generated query options for prefetching instead of recreating them manually.
Create optional `app/api/http.ts` only for shared transport behavior such as session refresh; enable the commented mutator configuration only after implementing its named export.

For frontend-only, frontend-first work or when backend/API changes are out of scope or unavailable:

- Contract changes: version a complete backend OpenAPI copy as `app/api/openapi.override.json`, edit it and run `api:sync`; keep imports in `generated/`, never hand-edit its code or replace its types/hooks.
- Response scenarios: copy `handlers.override.example.ts` to `handlers.override.ts` and default-export an array typed with `satisfies HttpHandler[]`, reusing generated types/factories; no regeneration needed.
- Handlers run before generated ones only with `dev:mock`; the first response wins, and deleting `handlers.override.ts` restores defaults.
- Once the backend supports the changes, remove `openapi.override.json` and obsolete handlers, then regenerate from `OPENAPI_URL`.

Mocks verify UI behavior, not API correctness; use the real backend when authorized.
