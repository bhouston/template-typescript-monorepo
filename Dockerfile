# Roughly inspired from: https://bun.sh/guides/ecosystem/docker
FROM oven/bun:latest

WORKDIR /usr/src/app

# copy everything
COPY . ./

# install dependencies
RUN bun install --silent

# build all
RUN bun run build

# run app
USER bun
EXPOSE 3000/tcp
CMD ["bun", "./apps/koa-server/dist/server.js"]
