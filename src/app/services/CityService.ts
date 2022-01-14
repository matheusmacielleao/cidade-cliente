import {CityRepository} from '../repository/CityRepository';
import {City} from '../entities/City';

const cityRepository = new CityRepository();

export class CityService {
  async create(payload: City): Promise<City> {
    const city = await cityRepository.create(payload);
    return city;
  }

  async find(payload): Promise<{} | Error> {
    const city = await cityRepository.find(payload);
    return city;
  }
}
