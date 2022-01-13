import request from 'supertest';
import {getConnection} from 'typeorm';
import {app} from '../../src/app';
import {connection} from '../../src/infra/database';

beforeAll(async () => {
  await connection();
});

describe('src :: api :: controllers :: client :: find', () => {
  test('should return a list of clients', async () => {
    const response = await request(app).get('/clients');

    const {body} = response;

    expect(response.status).toBe(200);
  });
});
