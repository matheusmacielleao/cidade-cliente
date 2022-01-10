import {ClientRepository} from '../repository/ClientRepository';
import {Client} from '../entities/Client';

const clientRepository = new ClientRepository();

export class ClientService {
  async create(payload): Promise<Client | Error> {
    const client = await clientRepository.create(payload);
    return client;
  }

  async find(payload): Promise<Client[] | Error> {
    const client = await clientRepository.find(payload);
    return client;
  }
  async delete(payload) {
    const client = await clientRepository.delete(payload);
    return client;
  }
}
