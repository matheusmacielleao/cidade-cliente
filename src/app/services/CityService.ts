import {CityRepository} from '../repository/CityRepository';
import {City} from '../entities/City';
import {CityQuery} from '../interfaces/city/CityQuery';
import {Paginated} from '../interfaces/Paginated';

const cityRepository = new CityRepository();

export class CityService {
  async create(payload: City): Promise<City> {
    const city = await cityRepository.create(payload);
    return city;
  }

  async find(payload : CityQuery): Promise<Paginated<City>> {
    const city = await cityRepository.find(payload);
    return city;
  }
}
