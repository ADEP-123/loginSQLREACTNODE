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

    getUserIncome(username) {
        return new Promise((resolve, reject) => {
            connection.query(
                /*sql*/`SELECT * FROM ingresos WHERE user_ingreso = ?`,
                [username],
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

    getUserOutcome(username) {
        return new Promise((resolve, reject) => {
            connection.query(
                /*sql*/`SELECT * FROM egresos WHERE user_ingreso = ?`,
                [username],
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
}

export default Usuarios;
