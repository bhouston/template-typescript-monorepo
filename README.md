# ESBuild + TypeScript + React Monorepository Tempate

This is a template for a monorepository that uses ESBuild, TypeScript, and React.

It is what @bhouston considers best practice in June 2022.

## Features

- Mono-repository using NPM workspaces
- TypeScript for type safety
- React for UI
- Both react and vanilla JS libraries
- Command line, React, and webserver apps
- ESBuild for fast bundles
- Hot reload of React
- Auto service resetart for the webs erver
- Lerna for managing the monorepo dependencies in parallel builds
- Prettier for code formatting
- ESLint for linting
- VSCode will auto-format on save and paste.
- Jest testing
- NX build caching

## Getting Started

1. Clone this repository
2. Run `npm install`

### Tests

1. Run `npm run test` to run all jest tests

### Continuous Dev Build

1. Run `npm run dev` to start the hot reload development server & build watchers
2. Run `npn run start -2=koa-server` to start the webserver in auto-reload mode
3. Open `http://localhost:8000` in your browser

### Optimized Production Build

1. Run `npm run build` to build the source

### Run the webserver (no reload)

1. Run `npx koa-server` to start the webserver
2. Open `http://localhost:8000` in your browser

### Command Line

1. Run `npx cmdline-app` to run the CLI example
