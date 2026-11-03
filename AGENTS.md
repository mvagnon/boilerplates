# Project Instructions

## Introduction

This project is a React application boilerplate.

## Architecture

Use lightweight, feature-oriented hexagonal architecture. This layout describes responsibilities, not a file inventory. Create directories only when needed; update this document only when architectural boundaries change.

```text
app/                         # Application shell, providers, routing and global styles
├── api/                     # Orval-generated HTTP functions, query hooks and API types
├── assets/                  # Shared assets imported by application code
├── components/              # Shared presentational UI
├── routes/                  # Route components composing feature UI
└── features/
    └── <feature>/
        ├── domain/          # Business types and pure business rules
        ├── application/     # Use cases and the ports they require
        ├── adapters/        # API adapters and DTO-to-domain mapping
        └── ui/              # Feature presentation and orchestration
public/                      # Static assets
```

## Orval

Generates API functions, query hooks and types in `app/api/` from the backend's OpenAPI endpoint. Set `OPENAPI_URL` and run `bun run api:sync` to sync client with OpenAPI specs when needed; reuse the generated client and never edit it manually.
