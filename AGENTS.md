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
│   ├── mocks/                        # Versioned minimal app-access scenarios
│   └── mocks.local/                  # Feature scenarios and overrides; Git-ignored
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
- MSW mocks: follow the procedure [below](#msw-mocks).

### MSW mocks

Keep Orval mock generation disabled (`mock: false`).

- `app/api/mocks/` is versioned and contains minimal app-access scenarios: authenticated session/user, profile, completed onboarding and required bootstrap data, as defined by the contract, without frontend bypasses.
- `app/api/mocks.local/` is Git-ignored and contains feature scenarios and overrides; load its handlers before the versioned baseline so overrides take precedence.

1. Scope the feature, journeys and dependencies against the frontend calls, OpenAPI contract and existing handlers; default to a small successful scenario and include or reuse the app-access baseline.
2. Ask on missing contracts, stale generated APIs or unknown business rules; present covered routes, assumptions and estimated net line diff before editing.
3. Edit `app/api/mocks/` for the minimal baseline and `app/api/mocks.local/` for feature scenarios; never stage local mocks, call the real backend or modify application code, generated files, contracts, dependencies or shared configuration as part of this work.
4. Preserve existing handlers and records; ask before replacing datasets or removing routes, and default-export handlers from each directory's `index.ts` using `satisfies HttpHandler[]`.
5. Immediately invoke `diff-check`; ensure formatting, lint and types include ignored files, then report coverage, scenario switches, reload reset behavior and actual checks without claiming runtime verification.

- Reuse generated types, schemas and URL helpers with the installed MSW APIs; honor methods, origins, parameters, filtering, sorting, pagination, response shapes and statuses, including errors, no-content and binary responses.
- Use fixed synthetic records with stable IDs and dates; no personal data, credentials, Faker, random values or response factories.
- Share in-memory state across reads and mutations, reset it on full reload, and derive counts from it; validate writes and keep permissions, transitions, associations and subsequent reads consistent with the contract.
- Keep authentication consistent and failure, empty-state and delay switches explicit and opt-in; block unsupported operations on covered routes without broad catch-alls affecting unrelated traffic.
- Report unsupported streaming, uploads or cross-runtime state instead of faking success; no persistence, new dependencies, generic mock framework, runtime AI, startup generation, tests, simulations or builds.
