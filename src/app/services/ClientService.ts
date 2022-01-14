import {ClientRepository} from '../repository/ClientRepository';
import moment from 'moment';

const clientRepository = new ClientRepository();

export class ClientService {
  async create(payload): Promise<any> {
    payload.birthdate = moment(payload.birthdate, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const client = await clientRepository.create(payload);
    return client;
  }

  async find(payload): Promise<{} | Error> {
    const client = await clientRepository.find(payload);
    return client;
  }
  async delete(payload) {
    const client = await clientRepository.delete(payload);
    return client;
  }
  async updateName(id:string, name:string): Promise<any> {
    const client = await clientRepository.updateName(id, name);
    return client;
  }
}
