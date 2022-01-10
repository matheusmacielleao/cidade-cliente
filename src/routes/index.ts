import { Router } from "express";
import { cityRoutes } from "./city.router";
const routes = Router();

routes.use(cityRoutes);

export{routes}