import { Router } from "express";
import controllers from "../controllers";

const routes = Router();

routes.get('/getById/:id?', controllers.getById);
routes.post('/create', controllers.create);
routes.post('/login', controllers.login);

export default routes;