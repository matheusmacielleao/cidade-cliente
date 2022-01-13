import request from 'supertest';
import {getConnection} from 'typeorm';
import {app} from '../../src/app';
import {connection} from '../../src/infra/database';

beforeAll(async () => {
  await connection();
});

describe('src :: api :: controllers :: city :: find', () => {
  test('should return a list of cities', async () => {
    const teste = {
      'name': 'Recife',
      'state': 'CE',
    };
    await request(app).post('/cities').send(teste);

    const response = await request(app).get('/cities');

    const {body} = response;

    expect(response.status).toBe(200);
  });
});
