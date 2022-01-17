export interface ClientQuery{
    id?: string;
    name?: string;
    birthdate?: string | Date;
    gender?: string;
    cityId?: string;
    page?: number;
    limit?: number;
}
