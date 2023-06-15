import { getHelloWorld } from '../index';

// check if hello world is returned
test('hello world', () => {
  expect(getHelloWorld()).toBe('Hello World 1!');
});
