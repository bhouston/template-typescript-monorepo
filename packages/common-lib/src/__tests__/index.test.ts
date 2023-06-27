import { toCamelCase } from '../index';

// check if hello world is returned
test('hello world', () => {
  expect(toCamelCase('hello world!')).toBe('Hello world!');
});
