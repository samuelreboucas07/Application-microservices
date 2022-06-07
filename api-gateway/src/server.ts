import express, { urlencoded } from "express";
import bodyParser from 'body-parser';

import user from './routes/user';
import account from './routes/account';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencoded({ extended: false }));

app.use('/user', user);
app.use('/account', account);

export default app;