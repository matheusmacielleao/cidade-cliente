import { Request, Response } from 'express';

import { CityService } from '../services/CityService';

class CityController {
  cityService = new CityService();

  async create(request: Request, response: Response) {
    try {
      const result = await this.cityService.create(request.body);
      return response.status(201).json(result);
    } catch (err) {
      return response.status(400).json(err);
    }
  }

  async find(request: Request, response: Response) {
    try {
      const result = await this.cityService.find(request.query);
      return response.status(201).json(result);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}

export { CityController };
