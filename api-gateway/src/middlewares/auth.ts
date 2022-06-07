import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const auth = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { JWT_SECRET } = process.env;
        if (!JWT_SECRET) return;

        const token = request!.headers!.authorization!.split(' ')[1];
        const decodedToken: any = jwt.verify(token, JWT_SECRET);
        const userId = decodedToken.userId;
        if (request.body.userId && request.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            request.body.userId = userId;
            next();
        }
    } catch {
        response.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};
export default auth;
