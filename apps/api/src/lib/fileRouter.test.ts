import { describe, expect, it } from 'vitest';

import { toRoute } from './fileRouter.js';

describe('toRoute', () => {
  it('maps file paths to methods and OpenAPI paths', () => {
    expect(toRoute('api/health/get.ts')).toEqual({ method: 'get', path: '/api/health' });
    expect(toRoute('api/health/error.get.js')).toEqual({ method: 'get', path: '/api/health/error' });
    expect(toRoute('api.users.$id.put.ts')).toEqual({ method: 'put', path: '/api/users/{id}' });
    expect(toRoute('(auth)/api/users/$userName/get.ts')).toEqual({ method: 'get', path: '/api/users/{userName}' });
    expect(toRoute('api/files/$.get.ts')).toEqual({ method: 'get', path: '/api/files/*' });
  });

  it('rejects bad methods and segments', () => {
    expect(() => toRoute('api/health/fetch.ts')).toThrow('Invalid method');
    expect(() => toRoute('api/v1[.]0/get.ts')).toThrow('Invalid segment');
  });
});
