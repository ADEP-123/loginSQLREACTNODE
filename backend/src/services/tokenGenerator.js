import 'reflect-metadata'
import dotenv from 'dotenv';
import { SignJWT } from 'jose';
import Usuarios from '../collections/users.js';

dotenv.config();
const appToken = async (req, res) => {
    try {
        const { user, pass } = req.body;
        if (!user || !pass) {
            res.status(500).send({ message: "Recuerde enviar el user y pass" })
        } else {
            const usuario = new Usuarios()
            const result = await usuario.getUsuarios(user, pass)
            if (result) {
                // const encoder = new TextEncoder();
                // const jwtconstructor = new SignJWT(Object.assign({}, Object.assign(rol[0])));
                // const jwt = await jwtconstructor
                //     .setProtectedHeader({ alg: "HS256", typ: "JWT" })
                //     .setIssuedAt()
                //     .setExpirationTime("2h")
                //     .sign(encoder.encode(config.jwktKey));
                // req.data = jwt;
                // res.status(201).send({ status: 201, message: jwt });
                res.status(201).send({ status: 201, message: "Maquia",result});
            }
        }
    } catch (error) {
        res.status(404).send({ status: 404, message: error.message });
    }
}

export default appToken