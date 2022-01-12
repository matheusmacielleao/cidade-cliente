import {Request, Response} from 'express';

import {ClientService} from '../services/ClientService';

const clientService = new ClientService();

class ClientController {
  async create(request: Request, response: Response) {
    try {
      const result = await clientService.create(request.body);
      return response.status(201).json(result);
    } catch (err) {
      return response.status(400).json(err);
    }
  }

  async find(request: Request, response: Response) {
    try {
      const result = await clientService.find(request.query);
      return response.status(201).json(result);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
  async delete(request: Request, response: Response) {
    try {
      await clientService.delete(request.params.id);
      return response.status(204).json({});
    } catch (err) {
      return response.status(404).json(err);
    }
  }

  async updateName(request: Request, response: Response) {
    try {
      await clientService.updateName(request.params.id, request.body.name);
      return response.status(204).json({});
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}

export {ClientController};
