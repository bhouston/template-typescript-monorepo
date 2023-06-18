# ESBuild + TypeScript + React Monorepository Tempate

This is a template for a monorepository that uses ESBuild, TypeScript, and React.

## Features

- Mono-repository using NPM workspaces
- TypeScript for type safety
- React for UI
- Both react and vanilla JS libraries
- Command line, React, and webserver apps
- ESBuild for fast builds
- Hot reload of React
- Auto service resetart for webservers
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

### Run the webserver

1. Run `npx koa-server` to start the webserver
2. Open `http://localhost:8000` in your browser

### Command Line

2. Run `npx cmdline-app` to run the CLI example
