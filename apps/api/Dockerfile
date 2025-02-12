FROM node:22-alpine

WORKDIR /usr/src/app

# copy all sources
COPY . ./

# install dependencies
RUN npm ci --include-workspace-root -w api --audit=false --fund=false

# build
RUN npx nx run-many -t build -p api

# run server
EXPOSE 8080
ENV PORT=8080

# set env var NODE_ENV to production
ENV NODE_ENV=production

WORKDIR /usr/src/app/apps/api
CMD ["node", "./dist/server.js"]
