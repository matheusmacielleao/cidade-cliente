import { getRepository } from "typeorm";
import  {City} from "../entities/City";

type CityRequest ={
    name: string;
    state: string;
}

export class CityRepository {
    
    async create(payload) : Promise<City | Error > {
        const{name,state} = payload;
        const repo = getRepository(City);
        const city = repo.create({name, state});
        await repo.save(city);
        return city;
        
    }
}