FROM node:22-alpine

WORKDIR /usr/src/app

# copy all sources
COPY . ./

# install dependencies
RUN npm ci --include-workspace-root -w @saas-template/website --audit=false --fund=false


# build
RUN npx nx run-many -t build -p @saas-template/website

# run server
EXPOSE 8080

# set env var NODE_ENV to production
ENV NODE_ENV=production

WORKDIR /usr/src/app/services/website
CMD ["node", "--no-warnings", "--experimental-strip-types", "--experimental-transform-types", "./server/server.ts"]


