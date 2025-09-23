# syntax=docker/dockerfile:1.6
FROM node:24-alpine

ENV PNPM_HOME="/pnpm" \
    PATH="$PNPM_HOME:$PATH" \
    NODE_ENV=production \
    PORT=8080

EXPOSE 8080

RUN corepack enable

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm fetch

COPY . .
RUN pnpm install --frozen-lockfile --offline && pnpm run build

WORKDIR /app/apps/tan-start-app

CMD ["pnpm", "start"]
