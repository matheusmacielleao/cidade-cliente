import {getConnection} from 'typeorm';
import {Client} from '../entities/Client';
import {NotExists} from '../errors/NotExists';
import {paginateSerialize} from '../serializer/clientSerializer';

class ClientRepository {
  async create(payload) : Promise<Client> {
    const repo = getConnection(process.env.CONNECTION_NAME).getRepository(Client);
    const {name, gender, birthdate, cityId} = payload;
    const client = repo.create({name, gender, birthdate, cityId});
    await repo.save(client);
    return client;
  }

  async find(payload) : Promise<any> {
    const repo = getConnection(process.env.CONNECTION_NAME).getRepository(Client);
    const {page = 1, limit = 100, ...where} = payload;
    const filter = {where, skip: ((page-1)*limit), take: limit};
    const [clients, total] = await repo.findAndCount(filter);
    return paginateSerialize({clients,
      limit, total, offset: page, skip: (page-1)*limit});
  }

  async delete(payload) {
    const repo = getConnection(process.env.CONNECTION_NAME).getRepository(Client);
    const existClient = await repo.findOne({'id': payload});
    if (!existClient) {
      throw new NotExists('Client');
    }
    const deleteResult = await repo.delete({'id': payload});
    return deleteResult;
  }

  async updateName(id: string, name: string) : Promise<Client | Error> {
    const repo =getConnection(process.env.CONNECTION_NAME). getRepository(Client);
    const client = await repo.findOne(id);
    client.name = name ? name:client.name;
    await repo.save(client);
    return client;
  }
}

export {ClientRepository};
