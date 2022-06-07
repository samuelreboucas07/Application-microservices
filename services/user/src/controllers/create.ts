import { NextFunction, Request, Response } from "express";
import { createUser } from "../constants/topics";
import UserModel from "../models/user";
import producer from "../services/messenger/producer";

const create = async (request: Request, response: Response) => {
    try {
        const { body } = request;
        const user = await UserModel.create(body);

        const dataUser = {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
        };

        producer(createUser, { user: dataUser }, request.producer);

        return response.status(201).json({ message: 'Usuário criado com sucesso.' });
    } catch (err: any) {
        return response.status(500).json({ message: 'Erro ao criar usuário.' });
    }
};

export default create;