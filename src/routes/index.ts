import {Router} from 'express';
import {cityRoutes} from './city.router';
import {clientRoutes} from './client.router';


const routes = Router();

routes.use(cityRoutes);
routes.use(clientRoutes);


export {routes};
