import AccountModel from '../models/account';

const getByAccount = async (account: string, agency: string) => {
    try{
        const accountResult = await AccountModel.findOne({account, agency});
        return accountResult;
    } catch(err){
        return;
    }
};

export default getByAccount;