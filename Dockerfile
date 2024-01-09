FROM node:21-alpine

WORKDIR /usr/src/app

# copy everything
COPY . ./

# install dependencies
RUN npm ci

# build all
RUN npm run build --scope=koa-server,react-app --include-filtered-dependencies

# run app
ENV PORT=8080
EXPOSE 8080
CMD ["node", "./apps/koa-server/dist/server.js"]
