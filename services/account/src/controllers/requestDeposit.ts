import { Request, Response } from 'express';
import { depositRequest } from '../constants/topics';
import getByAccount from '../repositories/getByAccount';
import producer from '../services/messenger/producer';

const deposit = async (request: Request, response: Response) => {
    try {
        const { body: { amount, account, agency, userId } } = request;

        const resultAccount = await getByAccount(account, agency);

        if (!resultAccount) {
            throw new Error('Número de conta inválida.');
        }

        if (amount <= 0) {
            throw new Error('Valor para depósito inválido.');
        }

        producer(depositRequest, { amount, agency, account, userId, accountId: resultAccount._id }, request.producer);

        return response.status(200).json({ message: 'Solicitação de depósito realizado com sucesso.' });
    } catch (err: any) {
        return response.status(500).json({ message: err.message });
    }
};

export default deposit;