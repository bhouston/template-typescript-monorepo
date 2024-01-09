# Roughly inspired from: https://bun.sh/guides/ecosystem/docker
FROM node:20

# install bun
RUN curl -fsSL https://bun.sh/install | bash

WORKDIR /usr/src/app

# copy everything
COPY . ./

# install dependencies
RUN bun install --silent

# build all
RUN bun run build

# run app
USER bun
ENV PORT=8080
EXPOSE 8080
CMD ["bun", "./apps/koa-server/dist/server.js"]
