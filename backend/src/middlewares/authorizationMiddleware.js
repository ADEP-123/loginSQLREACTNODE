import { jwtVerify } from 'jose';
import 'reflect-metadata'
import config from '../config.js';

export const authorizationMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    
    if(!authorization) return res.status(400).send({status:400,token:"No se encontró el token"});
    try {
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            authorization,
            encoder.encode(config.jwktKey)
        );
        req.data = jwtData;
        next();
    } catch (error) {
        res.status(400).send({status:400,error})
    }
}