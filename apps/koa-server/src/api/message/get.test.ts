import request from 'supertest';

import { getTestApp } from '../../app.js';

const testServer = getTestApp().listen();

afterAll(async () => {
  testServer.close();
});

describe('GET /api/products', () => {
  it('should return 200 OK', (done) => {
    request(testServer)
      .get(`/api/message`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({
        message: 'World',
        random: 'f5a7924e621e84c9280a9a27e1bcb7f6'
      })
      .end(done);
  });
});
