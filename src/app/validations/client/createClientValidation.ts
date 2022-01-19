import {Request, Response, NextFunction} from 'express';
const Joi = require('joi').extend(require('@joi/date'));
import {serialize} from '../../serializer/joiErrorSerializer';

export = (req: Request, res: Response, next: NextFunction) => {
  try {
    const entity = Joi.object({
      cityId: Joi.string().uuid().required(),
      name: Joi.string().trim().required(),
      gender: Joi.string().trim().required(),
      birthdate: Joi.date().format('DD/MM/YYYY').required(),

    });

    const {error} = entity.validate(req.body, {abortEarly: false});

    if (error) throw error;

    return next();
  } catch (error) {
    return res.status(400).json(serialize(error));
  }
};
