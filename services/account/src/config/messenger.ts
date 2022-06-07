import { Kafka } from "kafkajs";

const configMessenger = new Kafka({
    clientId: 'api-account',
    brokers: ['localhost:9092'],
    retry: {
        initialRetryTime: 300, //Retentativa em tempo exponencial
        retries: 10
    },
});

export default configMessenger;