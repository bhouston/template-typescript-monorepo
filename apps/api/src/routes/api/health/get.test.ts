import assert from 'node:assert';
import { test } from 'node:test';

import app from '../../../buildFastify.js';
import { errorToString } from '@bhouston/common-lib';

// Example test for the handler
await test('GET handler responds with 204 status', async () => {
  try {
    const response = await app.inject({
      method: 'get',
      url: 'api/health',
    });
    assert.strictEqual(response.statusCode, 204);
    // your tests
  } catch (err) {
    assert.fail(`${errorToString(err)}`);
  }
});
