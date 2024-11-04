import assert from 'node:assert';
import { test } from 'node:test';

import { toCamelCase } from './toCamelCase.js';

// Example test for the handler
test('hello world', async (t) => {
  assert.strictEqual(toCamelCase('hello world!'), 'Hello world!');
});
