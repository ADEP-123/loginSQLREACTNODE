import { errors } from "jose";
import getConnection from "../db/database.js";
const connection = getConnection();

class Usuarios {
    constructor() { }

    getUsuarios(user, password) {
        return new Promise((resolve, reject) => {
            connection.query(
                /*sql*/`SELECT COUNT(*) as count FROM usuario WHERE userName = ? AND password = ?`,
                [user, password],
                (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                }
            );
        });
    }

    createUser(username, name, password) {
        return new Promise((resolve, reject) => {
            connection.query(
                /*sql*/`INSERT INTO usuario(userName,name,password)VALUES(?,?,?)`,
                [username, name, password],
                (error, data) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(data)
                    }
                }
            )
        })
    }   

    getUserBalance(user_ingreso) {
        return new Promise((resolve, reject) => {
            connection.query(
                /*sql*/`
                SELECT saldo FROM usuario WHERE userName = ?;
                `,
                [user_ingreso],
                (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (data.length === 0) {
                            return reject(new Error('Usuario no encontrado.'));
                        }
                        resolve(data[0].saldo);
                    }
                }
            );
        });
    }
}

export default Usuarios;
