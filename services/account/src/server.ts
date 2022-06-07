import express, { json, urlencoded } from "express";
import routes from "./routes";
import messenger from "./middlewares/messenger";
import configMessenger from "./config/messenger";
import { createUser, depositSuccess, withdrawSuccess } from "./constants/topics";
import create from "./repositories/create";
import deposit from "./repositories/deposit";
import withdraw from "./repositories/withdraw";

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();

app.use(messenger);
app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/', routes);

const consumer = configMessenger.consumer({ groupId: 'account-group' });

async function run() {
    await consumer.connect();
    await consumer.subscribe({ topics: [createUser, depositSuccess, withdrawSuccess] });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const payload = JSON.parse(message!.value!.toString());
            if(topic === depositSuccess){
                //Necessário adicionar camada entre subscribe e repositório, uma espécie de controller.
                await deposit(payload.accountId, payload.amount);
            }
            if(topic === withdrawSuccess){
                //Necessário adicionar camada entre subscribe e repositório, uma espécie de controller.
                await withdraw(payload.accountId, payload.amount);
            } 
            if(topic === createUser){
                create(payload.user.id);
            }
        },
    });
}

run().catch(console.error);


export default app;