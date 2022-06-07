import { Producer } from 'kafkajs';
import { depositFailed, depositSuccess } from '../constants/topics';
import serviceDeposit from './../services/deposit';

interface IProps {
    amount: number;
    account: string;
    agency: string;
    accountId: string;
    userId: string;
}

const deposit = async ({ amount, account, agency, accountId, userId }: IProps, producer: Producer) => {
    try {
        const { data } = await serviceDeposit(amount, account, agency);
        if (data.status === 'success') {
            producer.send({ topic: depositSuccess, messages: [{ value: JSON.stringify({ amount, accountId, userId }) }] });
            return;
        } else {
            producer.send({ topic: depositFailed, messages: [{ value: JSON.stringify({ amount, accountId, userId }) }] });
            return;
        }
    } catch (err) {
        producer.send({ topic: depositFailed, messages: [{ value: JSON.stringify({ amount, accountId, userId }) }] });
    }
};

export default deposit;