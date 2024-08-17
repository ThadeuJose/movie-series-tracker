import request from 'supertest';
import { app } from '../src/app';

describe('Router', () => {
  test('should return 404', async () => {
    await request(app).get('/NOT-EXIST').expect(404);
  });
});
