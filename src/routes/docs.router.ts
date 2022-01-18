import {Router} from 'express';
import swaggerUi from 'swagger-ui-express';
const swagger = require(')../../../swagger.json');

const docsRoutes = Router();

docsRoutes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));


export {docsRoutes};
