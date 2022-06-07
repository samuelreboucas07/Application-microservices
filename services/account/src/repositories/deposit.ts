import AccountModel from '../models/account';

const deposit = async (id: string, amount: number) => {
    try {
        await AccountModel.findByIdAndUpdate(id, { $inc: { balance: amount } });
        return true;
    } catch (err) {
        return false;
    }
};

export default deposit;