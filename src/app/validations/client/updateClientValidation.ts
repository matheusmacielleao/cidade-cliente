import {Request, Response, NextFunction} from 'express';
import Joi from 'joi';
import {serialize} from '../../serializer/joiErrorSerializer';

export = (req: Request, res: Response, next: NextFunction) => {
  try {
    const entity = Joi.object({
      name: Joi.string().trim().required(),
    });

    const {error} = entity.validate(req.body, {abortEarly: false});

    if (error) throw error;

    return next();
  } catch (error) {
    return res.status(400).json(serialize(error));
  }
};
