import express, { json, urlencoded } from "express";
import routes from "./routes";
import messenger from "./middlewares/messenger";
import bodyParser from 'body-parser';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();

app.use(bodyParser.json());

app.use(messenger);
app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/', routes);

export default app;