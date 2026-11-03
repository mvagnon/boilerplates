# Project Instructions

## Introduction

This project is a React application boilerplate.

## Architecture

Use a simple, feature-oriented architecture centered on Orval-generated API code. This layout describes responsibilities, not a file inventory. Create directories only when needed; update this document only when architectural boundaries change.

```text
app/                         # Application shell, providers, routing and global styles
├── api/
│   └── generated/           # Orval-generated HTTP functions, query hooks, types and Zod schemas
├── assets/                  # Shared assets imported by application code
├── ui/                      # Shared presentational UI
├── routes/                  # Pages, route parameters and feature composition
└── features/
    └── <feature>/
        ├── components/      # Feature components
        ├── hooks/           # Feature state and orchestration
        ├── schemas/         # Local Zod validation and extensions, when needed
        ├── utils/           # Pure calculations and transformations, when needed
        └── constants.ts     # Feature constants, when needed
public/                      # Static assets
```

- Keep pages in `app/routes/`, composing feature components and hooks without a separate feature-level `pages/` directory.
- Use generated hooks and functions directly in pages and feature orchestration.
- Use feature hooks for state and orchestration; compose Orval hooks only when adding behavior.
- Keep Orval-generated hooks and schemas in `app/api/generated/`, even when specific to a feature.
- Reuse generated types and schemas instead of duplicating API contracts as domain models.
- Do not introduce ports, adapters, repositories or pass-through wrappers without a concrete need.
- Extract business logic only when actual behavior requires it, not to satisfy architectural layers.

## Components

- Define component prop types in the same file as the component, not in separate type files.
- Keep other local types next to their usage; do not introduce a `types/` directory by default.

## API generation and mocks

- Generate clients, hooks, types, Zod schemas and mocks from `OPENAPI_URL` into `app/api/generated/`; never hand-edit generated files.
- Keep permanent overrides in `orval.config.ts` using documented Orval extension points; normal mocks are stateless UI previews with fixed authenticated/onboarded users when needed.
- Custom handlers and stateful simulations are forbidden in the normal configuration and permanent mock modules.
- For an explicitly requested temporary flow only, create `orval.config.override.ts` from `orval.config.override.example.ts` if absent, extend the base config and isolate case-specific handlers/simulations there using documented Orval extension points.
- The local override is Git-ignored and opt-in through `api:sync:override`; normal `api:sync` must never load it.
- Before publication, regenerate with `api:sync` and review generated diffs; never commit local overrides or temporary generated behavior.
- Mocks do not prove API correctness; use the existing API for real workflow verification when authorized.

## Validation

- Keep Zod as an application dependency and use it for runtime validation.
- Use generated Zod schemas directly when sufficient; keep extensions, compositions and additional validation in the feature's `schemas/`, reusing generated schemas instead of copying them.
- Schema generation alone does not validate HTTP responses; enable response parsing explicitly when required.
