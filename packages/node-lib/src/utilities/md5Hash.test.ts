import { stringToMd5Hash } from '../index.js';

// check if hello world is returned
test('hello world', () => {
  expect(stringToMd5Hash('Hello World!')).toBe(
    'ed076287532e86365e841e92bfc50d8c'
  );
});
