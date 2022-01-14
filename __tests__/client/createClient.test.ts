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

describe('src :: api :: controllers :: client :: create', () => {
  test('should create a client', async () => {
    const responseCity = await request(app).post('/cities').send(
        {name: 'Brasilia', state: 'DF'});
    console.log(responseCity.body);
    const {id} = responseCity.body;
    const teste = {
      'name': 'Matheus',
      'gender': 'M',
      'cityId': id,
      'birthdate': '2014-01-01',
    };

    const response = await request(app).post('/clients').send(teste);
    const {body} = response;
    
    expect(response.status).toBe(201);
    expect(body.id).toBeDefined();
    expect(body.name).toBe('Matheus');
    expect(body.gender).toBe('M');
    expect(body.cityId).toBe(id);
    expect(body.birthdate).toBe('2014-01-01T00:00:00.000Z');
  });
});
