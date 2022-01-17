import {Client} from '../entities/Client';
import {ClientQuery} from '../interfaces/client/ClientQuery';
import {Repository} from './Repository';

class ClientRepository extends Repository<ClientQuery, Client> {
  constructor() {
    super(Client);
  }
}

export default new ClientRepository();
