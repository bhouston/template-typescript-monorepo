import assert from 'node:assert';
import { test } from 'node:test';

import app from '../../buildFastify.js';

// Example test for the handler
test('GET handler responds with 204 status', async (t) => {
  try {
    const response = await app.inject({
      method: 'get',
      url: 'api/health'
    });
    assert.strictEqual(response.statusCode, 204);
    // your tests
  } catch (err) {
    assert.fail(`${err}`);
  }
});
