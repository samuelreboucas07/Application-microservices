import { Request, Response } from "express";
import UserModel from "../models/user";
import jwt from 'jsonwebtoken';

const login = async (request: Request, response: Response) => {
    try {
        const { JWT_SECRET } = process.env;

        if (!JWT_SECRET) return;

        const { body: { email, password } } = request;
        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new Error('Usuário inválido.');
        }

        const token = await jwt.sign({ userId: user._id, email: user.email, type: 'user' }, JWT_SECRET, { expiresIn: '2h' });

        return response.status(201).json({ message: 'Usuário logado com sucesso.', token });
    } catch (err: any) {
        console.log(err.message)
        return response.status(500).json({ message: 'Erro ao logar usuário.' });
    }
};

export default login;