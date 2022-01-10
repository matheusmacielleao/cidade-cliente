import { CityRepository } from '../repository/CityRepository';
import { City } from '../entities/City';

export class CityService {
  cityRepository = new CityRepository();

  async create(payload): Promise<City | Error> {
    const city = this.cityRepository.create(payload);
    return city;
  }

  async find(payload): Promise<City[] | Error> {
    const city = this.cityRepository.find(payload);
    return city;
  }
}
