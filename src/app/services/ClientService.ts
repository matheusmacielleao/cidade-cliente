import {ClientRepository} from '../repository/ClientRepository';
import moment from 'moment';
import {Client} from '../entities/Client';
import {ClientQuery} from '../interfaces/client/ClientQuery';
import {Paginated} from '../interfaces/Paginated';

const clientRepository = new ClientRepository();

export class ClientService {
  async create(payload : Client): Promise<Client> {
    payload.birthdate = new Date(moment(payload.birthdate, 'DD/MM/YYYY').format('YYYY-MM-DD'));
    const client = await clientRepository.create(payload);
    return client;
  }

  async find(payload: ClientQuery): Promise<Paginated<Client>> {
    const client = await clientRepository.find(payload);
    return client;
  }
  async delete(id : string): Promise<any> {
    await clientRepository.delete(id);
  }
  async updateName(id:string, name:string): Promise<Client> {
    const client = await clientRepository.updateName(id, name);
    return client;
  }
}
