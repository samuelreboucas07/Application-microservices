import { Kafka } from 'kafkajs';
import { depositRequest, withdrawRequest } from './constants/topics';
import deposit from './controllers/deposit';

const kafka = new Kafka({
    brokers: ['localhost:9092'],
    clientId: 'transactions',
});

const consumer = kafka.consumer({ groupId: 'transactions-group-receiver' });

const producer = kafka.producer();

async function run() {
    await producer.connect();
    await consumer.connect();
    await consumer.subscribe({ topics: [depositRequest, withdrawRequest] });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const payload = JSON.parse(message.value.toString());
            if (topic === depositRequest) {
                await deposit(payload, producer);
            }
            if (topic === withdrawRequest) {
                console.log("Saque");
            }
        },
    });
}

run().catch(console.error);