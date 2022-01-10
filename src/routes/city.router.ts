import { Router } from "express";
import { CityController } from "../app/controllers/CityController";

const cityRoutes = Router();

cityRoutes.post("/cities", new CityController().create);

export{cityRoutes}