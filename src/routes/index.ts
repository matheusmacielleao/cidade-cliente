import {Router} from 'express';
import {cityRoutes} from './city.router';
import {clientRoutes} from './client.router';
import {docsRoutes} from './docs.router';


const routes = Router();

routes.use(cityRoutes);
routes.use(clientRoutes);
routes.use(docsRoutes);


export {routes};
