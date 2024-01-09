# Roughly inspired from: https://bun.sh/guides/ecosystem/docker
FROM oven/bun:latest

WORKDIR /usr/src/app

# copy everything
COPY . ./

# install dependencies
RUN bun install --silent

# build all
RUN bun run build --scope=koa-server,react-app --include-filtered-dependencies

# run app
USER bun
ENV PORT=8080
EXPOSE 8080
CMD ["bun", "./apps/koa-server/dist/server.js"]
