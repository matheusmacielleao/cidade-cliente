import {getConnection} from 'typeorm';
import {City} from '../entities/City';
import {CityEqualName} from '../errors/CityEqualName';

class CityRepository {
  async create(payload ) : Promise<City | Error > {
    const repo = getConnection(process.env.CONNECTION_NAME).getRepository(City);
    const {name, state} = payload;
    const exists = await repo.findOne({name: name});
    if (exists) {
      throw new CityEqualName();
    }
    const city = repo.create({name, state});
    await repo.save(city);
    return city;
  }

  async find(payload) : Promise<{} | Error > {
    const repo = getConnection(process.env.CONNECTION_NAME).getRepository(City);
    const {page = 1, limit = 100, ...where} = payload;
    const filter = {where, skip: ((page-1)*limit), take: limit};
    const [cities, total] = await repo.findAndCount(filter);
    return {cities,
      limit, total, offset: page, skip: (page-1)*limit};
  }
}

export {CityRepository};
