import request from 'supertest';
import {getConnection} from 'typeorm';
import {app} from '../../src/app';
import {connection} from '../../src/infra/database';

beforeAll(async () => {
  await connection();
});

afterEach(async () => {
  const data = getConnection().entityMetadatas;
  let repo;
  data.forEach(async (entity) => {
    repo = getConnection().getRepository(entity.name);
    await repo.delete({});
  });
});


describe('src :: api :: controllers :: client :: create', () => {
  test('should create a client', async () => {
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
    expect(response.status).toBe(201);
    expect(body.id).toBeDefined();
    expect(body.name).toBe('Matheus');
    expect(body.gender).toBe('M');
    expect(body.cityId).toBe(id);
    expect(body.birthdate).toBe('2014-01-01');
  });
});
