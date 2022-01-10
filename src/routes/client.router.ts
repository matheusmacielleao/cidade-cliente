import {Router} from 'express';
import {ClientController} from '../app/controllers/ClientController';

const clientRoutes = Router();

clientRoutes.post('/clients', new ClientController().create);
clientRoutes.get('/clients', new ClientController().find);
clientRoutes.delete('/clients/:id', new ClientController().delete);

export {clientRoutes};
