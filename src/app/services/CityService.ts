import CityRepository from '../repository/CityRepository';
import {City} from '../entities/City';
import {CityQuery} from '../interfaces/city/CityQuery';
import {Paginated} from '../interfaces/Paginated';
import {CityEqualName} from '../errors/CityEqualName';


export class CityService {
  async create(payload: City): Promise<City> {
    const exists = await CityRepository.findOne({name: payload.name});
    if (exists) {
      throw new CityEqualName();
    }
    const city = await CityRepository.create(payload);
    return city;
  }

  async find(payload : CityQuery): Promise<Paginated<City>> {
    const city = await CityRepository.find(payload);
    return city;
  }
}
