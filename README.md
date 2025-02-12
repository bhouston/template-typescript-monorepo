# TypeScript + Cli + Rest API + React App Mono Repository

This is a template for a monorepo that uses best practices for TypeScript, Web Services and React.

It is what @bhouston considers best practice in February 2025.

This app is maintained in part by https://mycoder.ai

## The end result

<img width="573" alt="Screenshot 2024-01-09 at 4 53 45 PM" src="https://github.com/bhouston/template-typescript-monorepo/assets/588541/3a7e6b62-ff16-492d-9f20-b409ab84f104">

## Features

- Mono-repository using pnpm workspaces
- TypeScript for type safety
- ES Modules for fast builds
- NodeNext node resolution
- React for UI
- Tailwindcss for styling
- Both react and vanilla JS libraries
- Command line, React app, and web server
- Vite for Bundling, CSS Handling, Live Reloading
- CLI via @yargs + file commands
- @TanStack/start for router, SSR, server API
- Fastify for server with file-based router
- Hot reload of React
- Auto service restart for the web server
- Prettier for code formatting
- ESLint for linting
- VSCode will auto-format on save and paste
- Vitest for testing with coverage support
- Github action CI

## Getting Started

1. Clone this repository
2. Run `pnpm install`

### Tests

1. Run `pnpm test` to run all tests
2. Run `pnpm test:watch` for watch mode during development
3. Run `pnpm test:coverage` to generate test coverage report

### Continuous Dev Build

1. Run `pnpm dev` to start the hot reload development server & build watchers

### Optimized Production Build

1. Run `pnpm build` to build the source

### Command Line

1. Run `pnpm cli` to run the CLI example
