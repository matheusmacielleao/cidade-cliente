import ClientRepository from '../repository/ClientRepository';
import moment from 'moment';
import {Client} from '../entities/Client';
import {ClientQuery} from '../interfaces/client/ClientQuery';
import {Paginated} from '../interfaces/Paginated';


export class ClientService {
  async create(payload : Client): Promise<Client> {
    payload.birthdate = new Date(moment(payload.birthdate, 'DD/MM/YYYY').format('YYYY-MM-DD'));
    payload.gender = payload.gender.toUpperCase();
    const client = await ClientRepository.create(payload);
    return client;
  }

  async find(payload: ClientQuery): Promise<Paginated<Client>> {
    const client = await ClientRepository.find(payload);
    return client;
  }
  async delete(id : string): Promise<void> {
    await ClientRepository.delete(id);
  }
  async updateName(id:string, payload:string): Promise<Client> {
    const client = await ClientRepository.update(id, {name: payload});
    return client;
  }
}
