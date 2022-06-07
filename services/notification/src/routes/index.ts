import { Router } from "express";
import controllers from "../controllers";

const routes = Router();

routes.post('/create', controllers.create);

export default routes;