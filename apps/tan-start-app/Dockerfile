# syntax=docker/dockerfile:1.6
FROM node:25-alpine

ENV PNPM_HOME="/pnpm" \
    PATH="$PNPM_HOME:$PATH" \
    NODE_ENV=production \
    PORT=8080

EXPOSE 8080

RUN npm install -g pnpm@latest-10

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
# RUN --mount=type=cache,target=/root/.pnpm-store pnpm fetch
RUN pnpm fetch

COPY . .
# RUN --mount=type=cache,target=/root/.pnpm-store pnpm install --frozen-lockfile --offline && pnpm run build
RUN pnpm install --frozen-lockfile --offline && pnpm run build

WORKDIR /app/apps/tan-start-app

CMD ["pnpm", "start"]
