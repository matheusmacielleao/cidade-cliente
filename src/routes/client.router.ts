import {Router} from 'express';
import ClientController from '../app/controllers/ClientController';
import createClientValidation from '../app/validations/client/createClientValidation';
import getClientValidation from '../app/validations/client/getClientValidation';
import updateClientValidation from '../app/validations/client/updateClientValidation';

const clientRoutes = Router();

clientRoutes.post('/clients', createClientValidation, ClientController.create);
clientRoutes.get('/clients', getClientValidation, ClientController.find);
clientRoutes.delete('/clients/:id', ClientController.delete);
clientRoutes.put('/clients/:id/updateName', updateClientValidation, ClientController.updateName);


export {clientRoutes};
