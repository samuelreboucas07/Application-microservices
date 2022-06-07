
import express, { json, urlencoded } from "express";

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

export default app;