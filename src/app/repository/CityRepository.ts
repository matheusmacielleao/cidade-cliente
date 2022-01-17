import {getConnection} from 'typeorm';
import {City} from '../entities/City';
import {CityEqualName} from '../errors/CityEqualName';
import {CityQuery} from '../interfaces/city/CityQuery';
import {Paginated} from '../interfaces/Paginated';
const connection = process.env.CONNECTION_NAME + '';

class CityRepository {
  async create(payload: City ) : Promise<City> {
    const repo = getConnection(connection).getRepository(City);
    const {name, state} = payload;
    const exists = await repo.findOne({name: name});
    if (exists) {
      throw new CityEqualName();
    }
    const city = repo.create({name, state});
    await repo.save(city);
    return city;
  }

  async find(payload: CityQuery) : Promise<Paginated<City>> {
    const repo = getConnection(connection).getRepository(City);
    const {page = 1, limit = 100, ...where} = payload;
    const filter = {where, skip: ((page-1)*limit), take: limit};
    const [docs, total] = await repo.findAndCount(filter);
    return {docs,
      limit, total, offset: page, skip: (page-1)*limit};
  }
}

export {CityRepository};
