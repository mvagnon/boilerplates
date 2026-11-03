# Project Instructions

## Introduction

This project is a React application boilerplate.
Give as much information about the project in about ~3-6 lines.

## Architecture

Use a simple, feature-oriented architecture and reuse Orval-generated functions, hooks, types and schemas directly; no pass-through wrappers, duplicated contracts or abstractions without concrete behavior. This layout describes responsibilities, not a file inventory. Create directories only when needed; update this document only when architectural boundaries change.

```text
app/                         # Application shell, providers, routing and global styles
├── api/
│   └── generated/           # All Orval-generated HTTP functions, hooks, types and Zod schemas; reuse directly
├── assets/                  # Shared assets imported by application code
├── ui/                      # Shared presentational UI; types/props in component files, no types/ directory
├── routes/                  # Pages composing feature components/hooks and generated APIs; no feature-level pages/
└── features/
    └── <feature>/
        ├── components/      # Feature components; types/props in component files, no types/ directory
        ├── hooks/           # Feature state/orchestration; compose generated hooks only to add behavior
        ├── schemas/         # Local validation extending generated Zod schemas, when needed
        ├── utils/           # Pure calculations and transformations, when needed
        └── constants.ts     # Feature constants, when needed
public/                      # Static assets
```

## API generation and mocks

Generate API code and stateless mocks from `OPENAPI_URL` into `app/api/generated/` with `api:sync`; never hand-edit generated files.
Keep permanent generation overrides in `orval.config.ts` using documented Orval extension points.

For explicitly requested scenarios only, isolate temporary handlers/state in Git-ignored `app/mocks.local.ts`, default-exporting an array typed with `satisfies HttpHandler[]`.
It loads only in development with `dev:mock`; never commit it or regenerate the API just to change a scenario.
Mocks verify UI behavior, not API correctness; use the real backend when authorized.
