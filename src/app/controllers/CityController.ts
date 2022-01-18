import {Request, Response} from 'express';

import {CityService} from '../services/CityService';

const cityService = new CityService();

class CityController {
  async create(request: Request, response: Response) {
    try {
      const result = await cityService.create(request.body);
      return response.status(201).json(result);
    } catch (err) {
      return response.status(400).json(err);
    }
  }

  async find(request: Request, response: Response) {
    try {
      const result = await cityService.find(request.query);
      return response.status(200).json(result);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}

export default new CityController;
