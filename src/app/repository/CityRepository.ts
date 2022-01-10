import { getRepository } from 'typeorm';
import { City } from '../entities/City';

class CityRepository {
  repo = getRepository(City);

  async create(payload) : Promise<City | Error > {
    const { name, state } = payload;
    const city = this.repo.create({ name, state });
    await this.repo.save(city);
    return city;
  }

  async find(payload) : Promise<City[] | Error > {
    const cities = this.repo.find(payload);
    return cities;
  }
}

export { CityRepository };
