import 'reflect-metadata';
import express from 'express';
import {connection} from './infra/database';
import {routes} from './routes';
import * as dotenv from 'dotenv';

const app = express();
dotenv.config({path: '../../.env'});
connection();

app.use(express.json());
app.use(routes);

export {app};
