import AccountModel from '../models/account';

const getById = async (id: string) => {
    try {
        const accountResult = await AccountModel.findById(id);
        return accountResult;
    } catch (err) {
        return;
    }
};

export default getById;