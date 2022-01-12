import request from 'supertest';
import {app} from '../../src/app';

describe('src :: api :: controllers :: city :: create', () => {
  test('should create a city', async () => {
    const teste = {
      name: 'Fortaleza',
      state: 'CE',
    };
    const response = await request(app).post('city/').send(teste);

    const {body} = response;

    expect(response.status).toBe(201);
    expect(body._id).toBeDefined();
    expect(body.name).toBe('Fortaleza');
    expect(body.state).toBe('CE');
  });
});
