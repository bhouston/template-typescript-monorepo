import { stringToMd5Hash } from '../index.js';

// check if hello world is returned
test('hello world', () => {
  expect(stringToMd5Hash('Hello World!')).toBe('Hello World 1!');
});
