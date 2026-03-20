# syntax=docker/dockerfile:1.6
FROM node:25-alpine

ENV PNPM_HOME="/pnpm" \
    PATH="$PNPM_HOME:$PATH" \
    NODE_ENV=production \
    PORT=8080

EXPOSE 8080

RUN npm install -g pnpm@latest-10

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm fetch

COPY . .
# Prefer offline after fetch; fall back to network if needed (e.g. platform-specific deps)
RUN pnpm install --frozen-lockfile --prefer-offline && pnpm build

WORKDIR /app/apps/tan-start-app

CMD ["pnpm", "start"]
