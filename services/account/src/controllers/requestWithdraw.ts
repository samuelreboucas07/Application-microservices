import { Request, Response } from 'express';
import { withdrawRequest } from '../constants/topics';
import getById from '../repositories/getById';
import producer from '../services/messenger/producer';

const withdraw = async (request: Request, response: Response) => {
    try {
        const { body: { accountId, amount, userId } } = request;
        const accountResult = await getById(accountId);

        if (!accountResult) {
            throw new Error('Conta inválida.');
        }
        if (!amount || !Number(amount) || amount > accountResult.balance) {
            throw new Error('Valor inválido.');
        }

        if (accountResult.user.toString() !== userId) {
            throw new Error('Usuário inválido.');
        }

        const { _id, agency, account } = accountResult;

        producer(withdrawRequest, { amount, agency, account, userId, accountId: _id }, request.producer);

        return response.status(200).json({ message: 'Solicitação de saque realizado com sucesso.' });
    } catch (err: any) {
        return response.status(500).json({ message: err.message });
    }
};

export default withdraw;