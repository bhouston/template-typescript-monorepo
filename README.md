# ESBuild + TypeScript + React Monorepository Tempate

This is a template for a monorepository that uses ESBuild, TypeScript, and React.

## Features

- Mono-repository using NPM workspaces
- TypeScript for type safety
- React for UI
- Both react and vanilla JS libraries
- Command line, React, and webserver apps
- ESBuild for fast builds
- Hot reload of everything
- Lerna for managing the monorepo dependencies in parallel builds
- Prettier for code formatting
- ESLint for linting

## Getting Started

1. Clone this repository
2. Run `npm install`

### Enable Typechecking

1. Run `npm run types` to watch for type errors

### Web Server

1. Run `npm run dev` to start the hot reload development server & build watchers
2. Open `http://localhost:8000` in your browser

### Command Line

1. Run `npm run build` to build the source
2. Run `npx cmdline-app` to run the CLI example

