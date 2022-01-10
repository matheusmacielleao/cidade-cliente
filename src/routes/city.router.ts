import { Router } from "express";
import { CityController } from "../app/controllers/CityController";

const cityRoutes = Router();

cityRoutes.post("/cities", new CityController().create);
cityRoutes.get("/cities", new CityController().find);

export{cityRoutes}