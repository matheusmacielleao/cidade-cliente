import {getRepository} from 'typeorm';
import {City} from '../entities/City';

class CityRepository {
  async create(payload) : Promise<City | Error > {
    const repo = getRepository(City);
    const {name, state} = payload;
    const city = repo.create({name, state});
    await repo.save(city);
    return city;
  }

  async find(payload) : Promise<City[] | Error > {
    const repo = getRepository(City);
    const cities = await repo.find(payload);
    return cities;
  }
}

export {CityRepository};
