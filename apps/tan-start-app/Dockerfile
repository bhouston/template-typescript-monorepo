# syntax=docker/dockerfile:1.6
FROM node:24-alpine

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copy lockfiles and workspace config first
COPY pnpm-lock.yaml pnpm-workspace.yaml ./

# Prefetch dependencies into pnpm store based on lockfile
RUN --mount=type=cache,target=/root/.pnpm-store pnpm fetch

# Copy the rest of the repository
COPY . .

# Install deps offline from prefilled store
RUN --mount=type=cache,target=/root/.pnpm-store pnpm install --frozen-lockfile --offline

ENV NODE_ENV=production

RUN pnpm run build

ENV PORT=8080
EXPOSE 8080
WORKDIR /app/apps/tan-start-app
CMD ["pnpm", "start"]
