import {Router} from 'express';
import {ClientController} from '../app/controllers/ClientController';
import createClientValidation from '../app/validations/client/createClientValidation';

const clientRoutes = Router();

clientRoutes.post('/clients', createClientValidation, new ClientController().create);
clientRoutes.get('/clients', new ClientController().find);
clientRoutes.delete('/clients/:id', new ClientController().delete);
clientRoutes.put('/clients/:id/updateName', new ClientController().updateName);


export {clientRoutes};
