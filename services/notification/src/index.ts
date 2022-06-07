import { Kafka } from 'kafkajs';
import { createUser, depositSuccess } from './constants/topics';
import createUserController from './controllers/createUser';
import depositSuccessController from './controllers/depositSuccess';
import database from './config/database';

database.connection.on('Error', console.error.bind(console, 'Database connection error'));

const kafka = new Kafka({
    brokers: ['localhost:9092'],
    clientId: 'notification',
});

const consumer = kafka.consumer({ groupId: 'send-notification-group-receiver' });
async function run() {
    await consumer.connect();
    await consumer.subscribe({ topics: [createUser, depositSuccess] });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const payload = JSON.parse(message.value.toString());
            if(topic === createUser){
                createUserController(payload.user.email, payload.user.name);
            } 
            if(topic ===  depositSuccess){
                depositSuccessController(payload.userId, payload.amount);
            }
        },
    });
}

run().catch(console.error);