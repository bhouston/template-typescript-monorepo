FROM node:21-alpine

WORKDIR /usr/src/app

COPY . ./

RUN npm ci

RUN npx nx run-many -t build -p koa-server react-app

ENV PORT=8080
EXPOSE 8080
CMD ["node", "./apps/koa-server/dist/server.js"]
