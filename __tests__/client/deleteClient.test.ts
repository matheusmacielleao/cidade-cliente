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
        {name: 'Goiania', state: 'DF'});

    const {id} = responseCity.body;
    const teste = {
      'name': 'Matheus',
      'gender': 'M',
      'cityId': id,
      'birthdate': '2014-01-01',
    };

    const response = await request(app).post('/clients').send(teste);
    const idClient = response.body.id;
    const responseDelete = await request(app).delete(`/clients/${idClient}`);
    expect(responseDelete.status).toBe(204);
  });

  test('should return 404 when id does not correspond to any client', async () => {
    const responseDelete = await request(app).delete(`/clients/qualquerid`);
    expect(responseDelete.status).toBe(404);
  });
});
