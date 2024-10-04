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

    postNewIncome(user_ingreso, monto, fuente, metodo) {
        return new Promise((resolve, reject) => {
            connection.query(
                /*sql*/`INSERT INTO ingresos(user_ingreso, monto, fuente, metodo)VALUES(?,?,?,?)`,
                [user_ingreso, monto, fuente, metodo],
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

    postNewOutcome(user_ingreso, descripcion, monto, fuente, metodo) {
        return new Promise((resolve, reject) => {
            connection.query(
                /*sql*/`INSERT INTO egresos(user_ingreso, descripcion, monto, fuente, metodo)VALUES(?,?,?,?,?)`,
                [user_ingreso, descripcion, monto, fuente, metodo],
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
                    SELECT 
                        (COALESCE(SUM(ing.monto), 0) - COALESCE(SUM(egr.monto), 0)) AS saldo
                    FROM 
                        usuario u
                    LEFT JOIN 
                        ingresos ing ON u.userName = ing.user_ingreso
                    LEFT JOIN 
                        egresos egr ON u.userName = egr.user_ingreso
                    WHERE 
                        u.userName = ?
                `,
                [user_ingreso],
                (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data[0].saldo);
                    }
                }
            );
        });
    }

    getUsername(id,pass) {
        return new Promise((resolve, reject) => {
            connection.query(
                /*sql*/`SELECT name FROM usuario WHERE userName = ? AND password = ?`,
                [id,pass],
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
}

export default Usuarios;
