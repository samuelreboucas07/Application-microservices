import express, { urlencoded } from "express";
import bodyParser from 'body-parser';

import user from './routes/user';

const app = express();

//Podemos concentrar middleware no API gateway

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencoded({ extended: false }));

app.use('/user', user);

export default app;