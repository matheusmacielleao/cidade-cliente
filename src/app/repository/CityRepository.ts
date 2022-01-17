import {City} from '../entities/City';
import {CityQuery} from '../interfaces/city/CityQuery';
import {Repository} from './Repository';

class CityRepository extends Repository<CityQuery, City> {
  constructor() {
    super(City);
  }
}

export default new CityRepository();
