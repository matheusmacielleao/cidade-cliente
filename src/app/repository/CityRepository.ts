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

  async find(payload) : Promise<{} | Error > {
    const repo = getRepository(City);
    const {page = 1, limit = 100, ...query} = payload;
    const filter = {query, skip: ((page-1)*limit), take: limit};
    const [cities, total] = await repo.findAndCount(filter);
    return {cities,
      limit, total, offset: page, skip: (page-1)*limit};
  }
}

export {CityRepository};
