import { expect, test } from 'vitest';
// @ts-expect-error -- TS 7 drops the value exports of vitest/browser when the optional webdriverio/preview providers are not installed
import { commands as browserCommands } from 'vitest/browser';

import type { OpenAppPageResult } from './openAppPage';

const commands: { openAppPage: () => Promise<OpenAppPageResult> } = browserCommands;

test('home page loads and shows app content', async () => {
  const { title, bodyText } = await commands.openAppPage();

  expect(title).toBeDefined();
  expect(title.length).toBeGreaterThan(0);
  // Root document title from __root.tsx or index route meta
  expect(title.includes('Template App') || title.includes('Ben Houston') || title.includes('TypeScript')).toBe(true);

  // Home page shows the HelloWorld component with name "@TanStack/Start"
  expect(bodyText).toContain('@TanStack/Start');
});
