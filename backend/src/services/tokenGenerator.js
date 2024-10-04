import 'reflect-metadata'
import dotenv from 'dotenv';
import { SignJWT } from 'jose';
import Usuarios from '../collections/users.js';
import config from '../config.js';

dotenv.config();
const appToken = async (req, res) => {    
    try {
        const { user, pass } = req.query;        
        if (!user || !pass) {
            res.status(400).send({ message: "Recuerde enviar el user y pass" })
        } else {
            const usuario = new Usuarios()
            const userObject = {user,pass}
            const result = await usuario.getUsuarios(user, pass)
            if (result[0].count>0) {
                const encoder = new TextEncoder();
                const jwtconstructor = new SignJWT(Object.assign({}, Object.assign(userObject)));
                const jwt = await jwtconstructor
                    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
                    .setIssuedAt()
                    .setExpirationTime("2h")
                    .sign(encoder.encode(config.jwktKey));
                req.data = jwt;
                res.status(201).send({ status: 201, message: jwt });
            }else{
                res.status(201).send({status:201, message:"Usuario no registrado"})
            }
        }
    } catch (error) {
        res.status(404).send({ status: 404, message: error.message });
    }
}

export default appToken