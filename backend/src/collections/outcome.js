import { errors } from "jose";
import getConnection from "../db/database.js";
const connection = getConnection();

class Outcome {
    constructor() { }

    getUserOutcome(username) {
        return new Promise((resolve, reject) => {
            connection.query(
                /*sql*/`
                SELECT 
                    i.id_egreso,
                    i.descripcion,
                    i.monto,
                    i.metodo,
                    i.fecha,
                    i.estado,
                    f.nombre_fuente,
                    f.descripcion AS fuente_descripcion
                FROM egresos i
                JOIN fuente f ON i.id_fuente = f.id_fuente
                WHERE i.user_egreso = ? AND i.estado = 'active'
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

    postNewOutcome(user_egreso, descripcion, monto, fuente, metodo) {
        return new Promise((resolve, reject) => {
            // Paso 1: Obtener el id_fuente correspondiente a la fuente proporcionada
            connection.query(
                /*sql*/`SELECT id_fuente FROM fuente WHERE user_fuente = ? AND nombre_fuente = ? AND estado = 'active'`,
                [user_egreso, fuente],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    // Verificar si se encontró la fuente
                    if (results.length === 0) {
                        return reject(new Error('Fuente no encontrada o no está activa.'));
                    }

                    const id_fuente = results[0].id_fuente;

                    // Paso 2: Insertar el nuevo egreso
                    connection.query(
                        /*sql*/`INSERT INTO egresos (user_egreso, id_fuente, descripcion, monto, metodo, fecha, estado) VALUES (?, ?, ?, ?, ?, CURDATE(), 'active')`,
                        [user_egreso, id_fuente, descripcion, monto, metodo],
                        (error, data) => {
                            if (error) {
                                return reject(error);
                            }

                            // Paso 3: Actualizar el saldo del usuario
                            connection.query(
                                /*sql*/`UPDATE usuario SET saldo = saldo - ? WHERE userName = ?`,
                                [monto, user_egreso],
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

    // Método para actualizar un egreso existente
    updateOutcome(id_egreso, user_egreso, descripcion, monto, fuente, metodo) {        
        return new Promise((resolve, reject) => {
            // Obtener el egreso existente para poder calcular la diferencia en el saldo
            connection.query(
                /*sql*/`SELECT monto FROM egresos WHERE id_egreso = ? AND user_egreso = ? AND estado = 'active'`,
                [id_egreso, user_egreso],
                (error, results) => {
                    if (error) {
                        console.error('Error al obtener el egreso:', error);
                        return reject(new Error(`Error al consultar el egreso: ${error.message}`));
                    }
                    if (results.length === 0) {
                        return reject(new Error('Egreso no encontrado o no pertenece al usuario.'));
                    }
                    
                    const oldMonto = results[0].monto;

                    // Obtener id_fuente
                    connection.query(  
                        /*sql*/`SELECT id_fuente FROM fuente WHERE user_fuente = ? AND nombre_fuente = ? AND estado = 'active'`,
                        [user_egreso, fuente],
                        (error, results) => {
                            if (error) {
                                console.error('Error al obtener el id_fuente:', error);
                                return reject(new Error(`Error al consultar la fuente: ${error.message}`));
                            }
                            if (results.length === 0) {
                                return reject(new Error('Fuente no encontrada o no está activa.'));
                            }
                            const id_fuente = results[0].id_fuente;
                            
                            // Actualizar egreso
                            connection.query(
                                /*sql*/`UPDATE egresos SET id_fuente = ?, descripcion = ?, monto = ?, metodo = ?, fecha_actualizacion = CURRENT_TIMESTAMP WHERE id_egreso = ? AND user_egreso = ?`,
                                [id_fuente, descripcion, monto, metodo, id_egreso, user_egreso],
                                (error, data) => {
                                    if (error) {
                                        console.error('Error al actualizar el egreso:', error);
                                        return reject(new Error(`Error al actualizar el egreso: ${error.message}`));
                                    }
    
                                    // Actualizar saldo del usuario
                                    const diferencia = monto - oldMonto;
                                    connection.query(
                                        /*sql*/`UPDATE usuario SET saldo = saldo + ? WHERE userName = ?`,
                                        [diferencia, user_egreso],
                                        (error, saldoUpdateResult) => {
                                            if (error) {
                                                console.error('Error al actualizar el saldo del usuario:', error);
                                                return reject(new Error(`Error al actualizar el saldo: ${error.message}`));
                                            }
                                            resolve(data);
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );
        });
    }
    
    

    // Método para eliminar un egreso (cambiar estado a 'delete')
    deleteOutcome(id_egreso, user_egreso) {
        return new Promise((resolve, reject) => {
            // Obtener el egreso existente para poder sumar al saldo
            connection.query(
                /*sql*/`SELECT monto FROM egresos WHERE id_egreso = ? AND user_egreso = ? AND estado = 'active'`,
                [id_egreso, user_egreso],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    if (results.length === 0) {
                        return reject(new Error('Egreso no encontrado o no pertenece al usuario.'));
                    }

                    const monto = results[0].monto;

                    // Cambiar el estado del egreso a 'delete'
                    connection.query(
                        /*sql*/`UPDATE egresos SET estado = 'delete', fecha_actualizacion = CURRENT_TIMESTAMP WHERE id_egreso = ? AND user_egreso = ?`,
                        [id_egreso, user_egreso],
                        (error, data) => {
                            if (error) {
                                return reject(error);
                            }

                            // Actualizar saldo del usuario
                            connection.query(
                                /*sql*/`UPDATE usuario SET saldo = saldo - ? WHERE userName = ?`,
                                [monto, user_egreso],
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

export default Outcome;
