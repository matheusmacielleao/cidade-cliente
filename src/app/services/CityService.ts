import { CityRepository } from "../repository/CityRepository";
import  {City} from "../entities/City";
const cityRepository = new CityRepository();
type CityRequest ={
    name: string;
    description: string;
}

export class CityService {
    async create(payload) : Promise<City | Error> {

        const city = cityRepository.create(payload);

        return city;
        
    }
    async find(payload) : Promise<City[] | Error> {

        const city = cityRepository.find(payload);

        return city;
        
    }
}