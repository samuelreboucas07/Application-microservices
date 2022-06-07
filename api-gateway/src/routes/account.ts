import { Router, Request, Response } from 'express';
import auth from '../middlewares/auth';
import { ACCOUNT_API_URL } from '../config/urlsRedirect';
import httpProxy from 'http-proxy';

const routes = Router();

const proxy = httpProxy.createProxyServer({});

proxy.on('proxyReq', function (proxyReq: any, req: any) {
    if (req.body) {
        let bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
    }
});

routes.post('/deposit', auth, (request: Request, response: Response) => proxy.web(request, response, { target: ACCOUNT_API_URL }));
routes.post('/withdraw', (request: Request, response: Response) => proxy.web(request, response, { target: ACCOUNT_API_URL }));

export default routes;
