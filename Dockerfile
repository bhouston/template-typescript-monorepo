FROM node:18

WORKDIR /usr/src/app

# install dependencies
COPY lerna.json ./
COPY package*.json ./
COPY packages/react-lib/package*.json ./packages/react-lib/
COPY packages/vanilla-lib/package*.json ./packages/vanilla-lib/
COPY apps/cmdline-app/package*.json ./apps/cmdline-app/
COPY apps/react-app/package*.json ./apps/react-app/
COPY apps/koa-server/package*.json ./apps/koa-server/
RUN npm ci

# copy all sources
COPY . ./

# build
RUN npm run build

# run server
EXPOSE 8080
CMD ["node", "./apps/koa-server/dist/src/server.js"]
