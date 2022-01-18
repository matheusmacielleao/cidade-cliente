import {Router} from 'express';
import CityController from '../app/controllers/CityController';
import createCityValidation from '../app/validations/city/createCityValidation';

const cityRoutes = Router();

cityRoutes.post('/cities', createCityValidation, CityController.create);
cityRoutes.get('/cities', CityController.find);

export {cityRoutes};
