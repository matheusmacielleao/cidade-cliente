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
      'birthdate': '01/01/2014',
    };

    const response = await request(app).post('/clients').send(teste);
    const idClient = response.body.id;
    const responseDelete = await request(app).delete(`/clients/${idClient}`);
    expect(responseDelete.status).toBe(204);
  });
  test('should return 400 when id format is invalid', async () => {
    const responseDelete = await request(app).delete(`/clients/kkkk`);
    expect(responseDelete.status).toBe(400);
  });

  test('should return 404 when id does not correspond to any client', async () => {
    const responseDelete = await request(app).delete(`/clients/dd45b3f7-4960-4bae-81f1-56329c0e213f`);
    expect(responseDelete.status).toBe(404);
  });
});
