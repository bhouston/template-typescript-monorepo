import assert from 'node:assert';
import { test } from 'node:test';

import { toCamelCase } from './toCamelCase.js';

// Example test for the handler
await test('hello world', (t) => {
  assert.strictEqual(toCamelCase('hello world!'), 'Hello world!');
});
