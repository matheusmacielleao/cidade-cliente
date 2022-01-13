import request from 'supertest';
import {getConnection} from 'typeorm';
import {app} from '../../src/app';
import {connection} from '../../src/infra/database';

beforeAll(async () => {
  await connection();
});


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
});
