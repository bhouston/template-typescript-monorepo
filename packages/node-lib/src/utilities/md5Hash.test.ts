import { expect, test } from 'vitest';

import { stringToMd5Hash } from './md5Hash.js';

test('hello world', () => {
  expect(stringToMd5Hash('Hello World!')).toBe(
    'ed076287532e86365e841e92bfc50d8c',
  );
});
