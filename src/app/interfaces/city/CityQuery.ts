import {Pagination} from '../Pagination';

export interface CityQuery extends Pagination{
    id?: string;
    name?: string;
    state?: string;
    page?: number;
    limit?:number;
}

