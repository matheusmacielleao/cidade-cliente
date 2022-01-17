import {Pagination} from '../Pagination';

export interface ClientQuery extends Pagination{
    id?: string;
    name?: string;
    birthdate?: string | Date;
    gender?: string;
    cityId?: string;
    page?: number;
    limit?:number;
}
