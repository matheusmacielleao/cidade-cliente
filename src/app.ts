import 'reflect-metadata';
import express from 'express';
import {connection} from './infra/database';
import {routes} from './routes';

const app = express();
connection();

app.use(express.json());
app.use(routes);

export {app};
