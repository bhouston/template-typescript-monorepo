import { describe, expect, it } from 'vitest';

import { toCamelCase } from './toCamelCase.js';

describe('toCamelCase', () => {
  it('should convert first letter to uppercase', () => {
    expect(toCamelCase('hello world!')).toBe('Hello world!');
  });
});
