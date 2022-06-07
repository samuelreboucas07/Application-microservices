import { Producer } from "kafkajs";

const producer = async (topic: string, message: object, producer: Producer) => {
    producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],

    });
    return true;
};

export default producer;