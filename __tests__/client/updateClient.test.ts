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
  test('should update a client name', async () => {
    const responseCity = await request(app).post('/cities').send(
        {name: 'Brasilia', state: 'DF'});
    const {id} = responseCity.body;
    const teste = {
      'name': 'Matheus',
      'gender': 'M',
      'cityId': id,
      'birthdate': '2014-01-01',
    };

    const response = await request(app).post('/clients').send(teste);
    const {body} = response;

    const updateName =await request(app).put(`/clients/${body.id}/updateName`).send({'name':'Matheus Leão'})
    const bodyUpdated =updateName.body;
    
    expect(updateName.status).toBe(201);
    expect(bodyUpdated.id).toBe(body.id);
    expect(bodyUpdated.name).toBe('Matheus Leão');
    expect(bodyUpdated.gender).toBe(body.gender);
    expect(bodyUpdated.cityId).toBe(body.cityId);
    expect(bodyUpdated.birthdate).toBe(body.birthdate);
  });

});
