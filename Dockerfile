FROM node:22-alpine

WORKDIR /usr/src/app

# copy all sources
COPY . ./

# install dependencies
RUN npm ci --include-workspace-root -w remix-app --audit=false --fund=false

# build
RUN npx nx run-many -t build -p remix-app

# run server
EXPOSE 8080
# set env var NODE_ENV to production
ENV NODE_ENV=production

WORKDIR /usr/src/app/apps/remix-server
CMD ["node", "--no-warnings", "--experimental-strip-types", "--experimental-transform-types", "./src/server.ts"]
