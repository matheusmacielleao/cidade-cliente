import 'reflect-metadata';
import express from 'express';
import {connection} from './infra/database';
import {routes} from './routes';
import cors from 'cors';
const app = express();
connection();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use(express.json());
export {app};
