declare module 'vitest/internal/browser' {
  interface BrowserCommands {
    openAppPage: () => Promise<{ title: string; bodyText: string }>;
  }
}
