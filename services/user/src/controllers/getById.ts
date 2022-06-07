import { Request, Response } from "express";
import UserModel from "../models/user";

const getById = async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const user = await UserModel.findById(id, '-password');

        if (!user) return response.status(404).json({ message: 'Usuário não encontrado.' });
        
        return response.status(200).json({ user });
    } catch (err: any) {
        return response.status(500).json({ message: 'Erro ao buscar usuário' });
    }
};

export default getById;