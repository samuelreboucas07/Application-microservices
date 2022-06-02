import { NextFunction, Router, Request, Response } from 'express';
import httpProxy from 'express-http-proxy';
import { USERS_API_URL } from '../config/urlsRedirect';

const routes = Router();
const userServiceProxy = httpProxy(USERS_API_URL);

routes.get('/getById/:id?', (request: Request, response: Response, next: NextFunction) => userServiceProxy(request, response, next));
routes.post('/create', (request: Request, response: Response, next: NextFunction) => userServiceProxy(request, response, next));

export default routes;
