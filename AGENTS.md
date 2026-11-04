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
- Local mocks: follow the procedure [below](#local-msw-mocks).

### Local MSW mocks

1. Resolve the current feature, journeys and scenario from the request; ask when unclear and default to a small realistic dataset with successful actions, never the whole application.
2. Inspect project instructions, Orval configuration, MSW setup, existing mocks, relevant frontend calls and matching OpenAPI operations, including reads after mutations and required dependencies such as authentication.
3. Stop on missing contracts, stale generated APIs, conflicting rules or essential unknown behavior; ask for clarification or API synchronization instead of inventing contracts or business rules.
4. Present coverage, required dependency routes, scenario, assumptions and estimated net line diff before editing; preserve existing handlers, matching order and records, and ask before replacing datasets or removing routes.
5. Author only files under `app/api/mocks.local/`; keep them Git-ignored and never stage or force-add them, modify application code, generated APIs, contracts, dependencies or shared configuration, or call the real backend.
6. Immediately after implementation, invoke `diff-check`; verify formatting, lint and types include the ignored files, review the consistency rules below, and report external blockers without editing outside the directory.

Implementation rules:

- Default-export the handler array from `index.ts` using `satisfies HttpHandler[]`; extend existing modules or start with `data.ts` and `handlers.ts`, splitting only when needed.
- Reuse generated types, schemas and URL helpers directly with the installed MSW HTTP APIs; never duplicate DTOs or use Faker, response factories, random values or request-time seed generation.
- Use fixed synthetic records, stable unique identifiers, fixed initial dates and safe example URLs; never copy personal data, credentials, tokens or production records.
- Initialize shared in-memory state once per module lifecycle, reset to the same seed on full reload, and reuse each entity across list, detail, association and mutation responses; derive counts and pagination metadata from that state.
- Honor the contract's methods, API origin or path prefix, parameters, filters, sorting, pagination, envelopes, content types, status codes and error shapes, including no-content and binary responses.
- Parse mutation bodies with generated types and available schemas, enforce documented permissions and transition constraints, and update subsequent reads, associations, revisions and metrics consistently; return documented not-found, validation and conflict errors when applicable.
- Keep authentication consistent across routes; make failure, empty-state and delay switches explicit and opt-in inside local modules, never random or implemented in application code.
- Prevent unsupported operations on covered feature routes from silently reaching a real backend without masking other features through namespace-wide catch-alls; leave unrelated routes, assets, tooling and origins unaffected.
- Report unsupported streaming, uploads and cross-runtime shared-state requirements instead of pretending success; do not introduce persistence, new dependencies, a generic CRUD framework, runtime AI or startup mock generation.
- Do not create or run tests, simulations or builds; report covered methods and paths, dependencies, scenario switches, reset behavior, assumptions and actual static-check results without claiming browser or real-backend correctness.
