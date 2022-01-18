import request from 'supertest';
import {getConnection} from 'typeorm';
import {app} from '../../src/app';
import {connection} from '../../src/infra/database';

beforeAll(async () => {
  await connection();
});

afterAll(async () => {
  const entities = getConnection(process.env.CONNECTION_NAME).entityMetadatas;
  for (const entity of entities) {
    const repository = await getConnection(process.env.CONNECTION_NAME).getRepository(entity.name);
    await repository.query(`TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`);
  }
})

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

  test('should return nothing with invalid query params', async () => {

    const response = await request(app).get('/cities/?invalidparam=invalid');
    expect(response.status).toBe(400);
  });
});
