import {Request, Response, NextFunction} from 'express';
import {paginateSerialize, serialize} from '../serializer/clientSerializer';

import {ClientService} from '../services/ClientService';

const clientService = new ClientService();

class ClientController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const result = await clientService.create(request.body);
      return response.status(201).json(serialize(result));
    } catch (err) {
      return next(err);
    }
  }

  async find(request: Request, response: Response, next: NextFunction) {
    try {
      const result = await clientService.find(request.query);
      return response.status(200).json(paginateSerialize(result));
    } catch (err) {
      return next(err);
    }
  }
  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      await clientService.delete(request.params.id);
      return response.status(204).json({});
    } catch (err) {
      return next(err);
    }
  }

  async updateName(request: Request, response: Response, next: NextFunction) {
    try {
      const result = await clientService.updateName(request.params.id, request.body.name);
      return response.status(200).json(serialize(result));
    } catch (err) {
      return next(err);
    }
  }
}

export default new ClientController();
