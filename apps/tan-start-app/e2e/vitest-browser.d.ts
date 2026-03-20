declare module 'vitest/browser' {
  interface BrowserCommands {
    openAppPage: () => Promise<{ title: string; bodyText: string }>;
  }
}
