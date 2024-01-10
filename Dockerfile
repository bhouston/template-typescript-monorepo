FROM oven/bun:latest

WORKDIR /usr/src/app

COPY . ./

RUN bun install --silent

RUN bun run build --scope=koa-server,react-app --include-filtered-dependencies

ENV PORT=8080
EXPOSE 8080
CMD ["bun", "./apps/koa-server/dist/server.js"]
