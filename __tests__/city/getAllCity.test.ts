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


describe('src :: api :: controllers :: city :: create', () => {
  test('should return a list of cities', async () => {
    const teste = {
      'name': 'Pernanbuco',
      'state': 'CE',
    };
    await request(app).post('/cities').send(teste);

    const response = request(app).get('/cities');

    const {body} = response;

    expect(response.status).toBe(200);
  });
});
