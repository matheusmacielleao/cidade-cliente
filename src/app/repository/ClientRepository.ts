import {getConnection} from 'typeorm';
import {Client} from '../entities/Client';
import {NotExists} from '../errors/NotExists';
import {ClientQuery} from '../interfaces/client/ClientQuery';
import {Paginated} from '../interfaces/Paginated';

class ClientRepository {
  async create(payload : Client) : Promise<Client> {
    const repo = getConnection(process.env.CONNECTION_NAME ).getRepository(Client);
    const {name, gender, birthdate, cityId} = payload;
    const client = repo.create({name, gender, birthdate, cityId});
    await repo.save(client);
    return client;
  }

  async find(payload: ClientQuery) : Promise<Paginated<Client>> {
    const repo = getConnection(process.env.CONNECTION_NAME ).getRepository(Client);
    const {page = 1, limit = 100, ...where} = payload;
    const filter = {where, skip: ((page-1)*limit), take: limit};
    const [docs, total] = await repo.findAndCount(filter);
    return {docs,
      limit, total, offset: page, skip: (page-1)*limit};
  }

  async delete(id : string) {
    const repo = getConnection(process.env.CONNECTION_NAME ).getRepository(Client);
    const existClient = await repo.findOne(id);
    if (!existClient) {
      throw new NotExists('Client');
    }
    const deleteResult = await repo.delete(id);
    return deleteResult;
  }

  async updateName(id: string, name: string) : Promise<Client> {
    const repo =getConnection(process.env.CONNECTION_NAME ). getRepository(Client);
    const client = await repo.findOne(id);
    if (!client) {
      throw new Error('notfound');
    }
    client.name = name ? name:client.name;
    await repo.save(client);
    return client;
  }
}

export {ClientRepository};
