import { NextFunction, Request, Response } from "express";
import configMessenger from "../config/messenger";

const messenger = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const producer = await configMessenger.producer();

        await producer.connect();

        producer.on('producer.connect', () => {
            console.log(`KafkaProvider: connected`);
        });

        producer.on('producer.disconnect', () => {
            console.log(`KafkaProvider: could not connect`);
        });

        request.producer = producer;
        return next();
    } catch (err: any) {
        response.status(401).send(err.message);
    }
};

export default messenger;