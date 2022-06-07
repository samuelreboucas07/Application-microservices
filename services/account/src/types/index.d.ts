import { Producer } from "kafkajs";

export {};

declare global {
  namespace Express {
    interface Request {
        producer: Producer;
    }
  }
}