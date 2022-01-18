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

describe('src :: api :: controllers :: client :: find', () => {
  test('should return a list of clients', async () => {
    const response = await request(app).get('/clients');

    const {body} = response;

    expect(response.status).toBe(200);

    
  });
  test('should work with  query params', async () => {

    const response = await request(app).get('/clients/?name=pernanbuco');
  
    expect(response.status).toBe(200);
    });

  test('should return nothing with invalid query params', async () => {

    const response = await request(app).get('/clients/?invalidparam=invalid');
  
    expect(response.status).toBe(500);
    });
});
