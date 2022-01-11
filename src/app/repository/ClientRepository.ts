import {getRepository} from 'typeorm';
import {Client} from '../entities/Client';

class ClientRepository {
  async create(payload) : Promise<Client | Error > {
    const repo = getRepository(Client);
    const {name, sex, birthdate, cityId} = payload;
    const client = repo.create({name, sex, birthdate, cityId});
    await repo.save(client);
    return client;
  }

  async find(payload) : Promise<Client[] | Error > {
    const repo = getRepository(Client);
    const clients = await repo.find(payload);
    return clients;
  }

  async delete(payload) {
    const repo = getRepository(Client);
    const client = await repo.delete({'id': payload});
    return client;
  }

  async updateName(id: string, name: string) : Promise<Client | Error> {
    const repo = getRepository(Client);
    const client = await repo.findOne(id);
    client.name = name ? name:client.name;
    await repo.save(client);

    return client;
  }
}

export {ClientRepository};
