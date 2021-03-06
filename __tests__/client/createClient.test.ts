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
    const {id} = responseCity.body;
    const teste = {
      'name': 'Matheus',
      'gender': 'M',
      'cityId': id,
      'birthdate': '01/01/2014',
    };

    const response = await request(app).post('/clients').send(teste);
    const {body} = response;
    
    expect(response.status).toBe(201);
    expect(body.id).toBeDefined();
    expect(body.name).toBe('Matheus');
    expect(body.gender).toBe('M');
    expect(body.cityId).toBe(id);
    expect(body.birthdate).toBe('01/01/2014');
  });

  test('should not creat a client with missing atributes', async () => {
    const responseCity = await request(app).post('/cities').send(
        {name: 'Brasilia', state: 'DF'});
    const {id} = responseCity.body;
    const teste = {
      'name': 'Matheus',
    };

    const response = await request(app).post('/clients').send(teste);
    expect(response.status).toBe(400);
  });


});
