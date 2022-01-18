import {EntityTarget, getConnection} from 'typeorm';
import NotFound from '../errors/NotFound';
import {Paginated} from '../interfaces/Paginated';
import {Pagination} from '../interfaces/Pagination';

class Repository<Query extends Pagination, Content> {
  constructor(private repository :EntityTarget<Content>) {}
  async create(payload : Content) : Promise<Content> {
    const repo = getConnection(process.env.CONNECTION_NAME).getRepository(this.repository);
    const content = repo.create(payload);
    await repo.save(content);
    return content;
  }

  async find(payload: Query) : Promise<Paginated<Content>> {
    const repo = getConnection(process.env.CONNECTION_NAME ).getRepository(this.repository);
    const {page = 1, limit = 100, ...where} = payload;
    const filter = {where, skip: ((page-1)*limit), take: limit};
    const [docs, total] = await repo.findAndCount(filter);
    return {docs,
      limit, total, offset: page, skip: (page-1)*limit};
  }

  async findOne(where : Query): Promise<Content | undefined> {
    return getConnection(process.env.CONNECTION_NAME).getRepository(this.repository).findOne({where});
  }

  async delete(id : string) {
    const repo = getConnection(process.env.CONNECTION_NAME ).getRepository(this.repository);
    const existContent = await repo.findOne(id);
    if (!existContent) {
      throw new NotFound(id);
    }
    const deleteResult = await repo.delete(id);
    return deleteResult;
  }

  async update(id: string, payload: {}) : Promise<Content> {
    const repo =getConnection(process.env.CONNECTION_NAME ).getRepository(this.repository);
    const content = await repo.findOne(id) as Content;
    if (!content) {
      throw new NotFound('id');
    }
    const result = await repo.createQueryBuilder().update(this.repository, payload).where('id = :id', {id}).returning('*').updateEntity(true).execute().then((response) => {
      return response.raw[0];
    });

    return result as Content;
  }
}

export {Repository};
