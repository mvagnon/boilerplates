# Project Instructions

## Introduction

This project is a React application boilerplate.
Give as much information about the project in about ~3-6 lines.

## Architecture

Use a simple, feature-oriented architecture and reuse Orval-generated functions, hooks, types and schemas directly; no pass-through wrappers, duplicated contracts or abstractions without concrete behavior.
This layout describes responsibilities, not a file inventory.

```text
app/                         # Application shell, providers, routing and global styles
├── api/
│   ├── generated/           # All Orval-generated HTTP functions, hooks, types and Zod schemas; reuse directly
│   ├── http.ts              # Optional custom HTTP transport, only for behavior the generated client cannot provide
│   └── mocks*.ts            # Development mock setup, local overrides and example
├── assets/                  # Shared assets imported by application code
├── constants/               # Shared theme tokens and application constants
├── contexts/                # Optional cross-feature contexts and their providers
├── lib/                     # Optional cross-feature utilities/integrations; no feature logic or code with a more specific owner
├── ui/                      # Shared presentational UI; types/props in component files, no types/ directory
├── routes/                  # Pages composing feature components/hooks and generated APIs; no feature-level pages/
└── features/
    └── <feature>/
        ├── components/      # Feature components; types/props in component files, no types/ directory
        ├── contexts/        # Feature-owned contexts and their providers, when needed
        ├── hooks/           # Feature state/orchestration; compose generated hooks only to add behavior
        ├── schemas/         # Local extensions of generated Zod schemas, when needed; export inferred types alongside schemas
        ├── utils/           # Pure calculations and transformations, when needed
        └── constants.ts     # Feature constants, when needed
public/                      # Static assets
```

## API generation and mocks

Generate API code and stateless mocks from `OPENAPI_URL` into `app/api/generated/` with `api:sync`; never hand-edit generated files.
Keep permanent generation overrides in `orval.config.ts` using documented Orval extension points.
Use generated query keys for cache invalidation and generated query options for prefetching instead of recreating them manually.
Create optional `app/api/http.ts` only for shared transport behavior such as session refresh; enable the commented mutator configuration only after implementing its named export.

For explicitly requested scenarios only, isolate temporary handlers/state in Git-ignored `app/api/mocks.local.ts`, default-exporting an array typed with `satisfies HttpHandler[]`.
It loads only in development with `dev:mock`; never commit it or regenerate the API just to change a scenario.
Mocks verify UI behavior, not API correctness; use the real backend when authorized.
