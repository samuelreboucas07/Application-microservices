import { Producer } from 'kafkajs';
import { withdrawSuccess, withdrawFailed } from '../constants/topics';
import serviceWithdraw from './../services/withdraw';

interface IProps {
    amount: number;
    account: string;
    agency: string;
    accountId: string;
    userId: string;
}

const withdraw = async ({ amount, account, agency, accountId, userId }: IProps, producer: Producer) => {
    try {
        const { data } = await serviceWithdraw(amount, account, agency);
        if (data.status === 'success') {
            producer.send({ topic: withdrawSuccess, messages: [{ value: JSON.stringify({ amount, accountId, userId }) }] });
            return;
        } else {
            producer.send({ topic: withdrawFailed, messages: [{ value: JSON.stringify({ amount, accountId, userId }) }] });
            return;
        }
    } catch (err) {
        producer.send({ topic: withdrawFailed, messages: [{ value: JSON.stringify({ amount, accountId, userId }) }] });
    }
};

export default withdraw;