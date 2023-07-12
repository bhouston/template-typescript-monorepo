# ESBuild + TypeScript + React Monorepository Tempate

This is a template for a monorepository that uses ESBuild, TypeScript, and React.

It is what @bhouston considers best practice in June 2023.

## The end result

<img width="687" alt="Screenshot 2023-06-19 at 7 10 00 AM" src="https://github.com/bhouston/esbuild-ts-monorepo/assets/588541/ba6d1764-f4d6-4a31-8a98-957e954d95eb">

(Aside, it is ridiculous that this installs +1000 packages, but it is what it is.)

## Features

- Mono-repository using NPM workspaces
- TypeScript for type safety
- ES Modules for fast builds
- NodeNext node resolution
- React for UI
- Both react and vanilla JS libraries
- Command line, React app, and web server
- Vite for Bundling, CSS Handling, Live Reloading.
- Hot reload of React
- Auto service restart for the web server
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

#### Start Webserver with Auto-Reload

1. Run `npn run start` to start the webserver in auto-reload mode
2. Open `http://localhost:8000` in your browser

### Optimized Production Build

1. Run `npm run build` to build the source

### Run the webserver (no reload)

1. Run `npx koa-server` to start the webserver
2. Open `http://localhost:8000` in your browser

### Command Line

1. Run `npx cmdline-app` to run the CLI example
