# syntax=docker/dockerfile:1.6
FROM --platform=linux/amd64 node:25-slim AS base

ENV PNPM_HOME="/pnpm" \
    PATH="$PNPM_HOME:$PATH" \
    NODE_ENV=production \
    PORT=8080 \
    CI=true

RUN npm install -g pnpm@10.17.0

WORKDIR /app

# Copy dependency manifests first so this layer is cacheable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Fetch deps so optional/platform deps install for this platform
RUN pnpm fetch --reporter=silent

COPY . .

RUN pnpm install --frozen-lockfile --prefer-offline && pnpm build

WORKDIR /app/apps/tan-start-app

EXPOSE 8080
CMD ["node", ".output/server/index.mjs"]
