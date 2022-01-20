import {Request, Response, NextFunction} from 'express';
import Joi from 'joi';
import {serialize} from '../../serializer/joiErrorSerializer';

export = (req: Request, res: Response, next: NextFunction) => {
  try {
    const entity = Joi.object({
      name: Joi.string().trim().optional(),
      state: Joi.string().trim().optional(),
    });

    const {error} = entity.validate(req.query, {abortEarly: false});

    if (error) throw error;

    return next();
  } catch (error) {
    return res.status(400).json(serialize(error));
  }
};
