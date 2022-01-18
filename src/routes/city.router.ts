import {Router} from 'express';
import CityController from '../app/controllers/CityController';
import createCityValidation from '../app/validations/city/createCityValidation';
import getCityValidation from '../app/validations/city/getCityValidation';

const cityRoutes = Router();

cityRoutes.post('/cities', createCityValidation, CityController.create);
cityRoutes.get('/cities', getCityValidation, CityController.find);

export {cityRoutes};
