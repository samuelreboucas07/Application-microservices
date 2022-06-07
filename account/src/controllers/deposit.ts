import {Request, Response} from 'express';

const create = async (request: Request, response: Response) => {
    try{
        const {body} = request;

        // const account = await 
        return response.status(200).json({message: 'Depósito realizado com sucesso.'});
    } catch(err: any){
        return response.status(500).json({message: 'Erro ao realizar depósito.'});
    }
};

export default create;