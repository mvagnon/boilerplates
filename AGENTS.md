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

## Orval

Generates API functions, query hooks, types and Zod schemas in `app/api/generated/` from the backend's OpenAPI endpoint. Set `OPENAPI_URL` and run `bun run api:sync` to sync client with OpenAPI specs when needed; reuse the generated client.
Do not edit generated files by default; manual edits require explicit user approval.

## Validation

- Keep Zod as an application dependency and use it for runtime validation.
- Use generated Zod schemas directly when sufficient; keep extensions, compositions and additional validation in the feature's `schemas/`, reusing generated schemas instead of copying them.
- Schema generation alone does not validate HTTP responses; enable response parsing explicitly when required.
