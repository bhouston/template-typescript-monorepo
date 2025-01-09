import assert from 'node:assert';
import { test } from 'node:test';

import { stringToMd5Hash } from './md5Hash.js';

// Example test for the handler
await test('hello world', (t) => {
  assert.strictEqual(
    stringToMd5Hash('Hello World!'),
    'ed076287532e86365e841e92bfc50d8c'
  );
});
