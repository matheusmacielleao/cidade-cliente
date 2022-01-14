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

describe('src :: api :: controllers :: city :: create', () => {
  test('should create a city', async () => {
    const teste = {
      'name': 'Pernanbuco',
      'state': 'CE',
    };
    const response = await request(app).post('/cities').send(teste);

    const {body} = response;

    expect(response.status).toBe(201);
    expect(body.id).toBeDefined();
    expect(body.name).toBe('Pernanbuco');
    expect(body.state).toBe('CE');
  });
});
