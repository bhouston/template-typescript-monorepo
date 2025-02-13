FROM node:22-alpine

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile

ENV NODE_ENV=production

RUN pnpm run build

ENV PORT=8080
EXPOSE 8080
WORKDIR /app/apps/tan-start-app
CMD ["pnpm", "start"]
