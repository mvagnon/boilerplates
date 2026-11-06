FROM oven/bun:1.4.4-alpine AS pruner
WORKDIR /app
COPY . .
RUN bunx turbo@2.11.10 prune @boilerplates/react --docker

FROM oven/bun:1.4.4-alpine AS dependencies
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/bun.lock ./bun.lock
RUN SKIP_INSTALL_SIMPLE_GIT_HOOKS=1 bun install --frozen-lockfile

FROM dependencies AS build
COPY --from=pruner /app/out/full/ .
RUN bun run --cwd apps/react --bun build

FROM oven/bun:1.4.4-alpine AS production-dependencies
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/bun.lock ./bun.lock
RUN bun install --frozen-lockfile --production

FROM oven/bun:1.4.4-alpine
WORKDIR /app
COPY --from=production-dependencies /app/node_modules ./node_modules
COPY --from=production-dependencies /app/apps/react/node_modules ./apps/react/node_modules
COPY --from=build /app/apps/react/package.json ./apps/react/package.json
COPY --from=build /app/apps/react/build ./apps/react/build
WORKDIR /app/apps/react
CMD ["bun", "run", "--bun", "start"]
