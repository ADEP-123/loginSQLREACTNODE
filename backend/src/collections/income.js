import { errors } from "jose";
import getConnection from "../db/database.js";
const connection = getConnection();

class Income {
    constructor() { }

    getUserIncome(username) {
        return new Promise((resolve, reject) => {
            connection.query(
                /*sql*/`
                SELECT 
                    i.id_ingreso,
                    i.descripcion,
                    i.monto,
                    i.metodo,
                    i.fecha,
                    i.estado,
                    f.nombre_fuente,
                    f.descripcion AS fuente_descripcion
                FROM ingresos i
                JOIN fuente f ON i.id_fuente = f.id_fuente
                WHERE i.user_ingreso = ? AND i.estado = 'active'
                `,
                [username],
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

    postNewIncome(user_ingreso, monto, fuente, metodo) {
        return new Promise((resolve, reject) => {
            // Paso 1: Obtener el id_fuente correspondiente a la fuente proporcionada
            connection.query(
                /*sql*/`SELECT id_fuente FROM fuente WHERE user_fuente = ? AND nombre_fuente = ? AND estado = 'active'`,
                [user_ingreso, fuente],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    // Verificar si se encontró la fuente
                    if (results.length === 0) {
                        return reject(new Error('Fuente no encontrada o no está activa.'));
                    }

                    const id_fuente = results[0].id_fuente;

                    // Paso 2: Insertar el nuevo ingreso
                    connection.query(
                        /*sql*/`INSERT INTO ingresos (user_ingreso, id_fuente, descripcion, monto, metodo, fecha, estado) VALUES (?, ?, ?, ?, ?, CURDATE(), 'active')`,
                        [user_ingreso, id_fuente, 'Nuevo ingreso', monto, metodo],
                        (error, data) => {
                            if (error) {
                                return reject(error);
                            }

                            // Paso 3: Actualizar el saldo del usuario
                            connection.query(
                                /*sql*/`UPDATE usuario SET saldo = saldo + ? WHERE userName = ?`,
                                [monto, user_ingreso],
                                (error, saldoUpdateResult) => {
                                    if (error) {
                                        return reject(error);
                                    }
                                    resolve(data);
                                }
                            );
                        }
                    );
                }
            );
        });
    }


}

export default Income;
