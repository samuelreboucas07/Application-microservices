import { randomInt } from 'mathjs';
import AccountModel from '../models/account';
//Padrão de repositório não aplicado.
const create = async (user: string) => {
    try {
        const account = await AccountModel.create({
            user,
            balance: 0,
            type: 'thrift',
            account: randomInt(10000, 50000),
            agency: randomInt(10, 100)
        });
        return account;
    } catch (err: any) {
        console.log(err)
        return;
    }
};

export default create;