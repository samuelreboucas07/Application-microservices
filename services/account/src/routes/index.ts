import { Router } from "express";
import controllers from "../controllers";

const routes = Router();

routes.post('/deposit', controllers.requestDeposit);
routes.post('/withdraw/:id?', controllers.requestWithdraw);

export default routes;