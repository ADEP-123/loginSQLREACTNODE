import getConnection from "../db/database.js";
const connection = getConnection();

class Fuentes {
    constructor() { }

    // Obtener todas las fuentes del usuario
    getUserFuentes(user_fuente) {
        return new Promise((resolve, reject) => {
            connection.query(
                /*sql*/`SELECT * FROM fuente WHERE user_fuente = ? AND estado = 'active'`,
                [user_fuente],
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

    // Crear nueva fuente
    createFuente(user_fuente, nombre_fuente, descripcion) {
        return new Promise((resolve, reject) => {
            connection.query(
                /*sql*/`INSERT INTO fuente (user_fuente, nombre_fuente, descripcion) VALUES (?, ?, ?)`,
                [user_fuente, nombre_fuente, descripcion],
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

    // Modificar fuente existente
    updateFuente(id_fuente, user_fuente, nombre_fuente, descripcion) {
        return new Promise((resolve, reject) => {
            connection.query(
                /*sql*/`UPDATE fuente SET nombre_fuente = ?, descripcion = ?, fecha_actualizacion = CURRENT_TIMESTAMP WHERE id_fuente = ? AND user_fuente = ? AND estado = 'active'`,
                [nombre_fuente, descripcion, id_fuente, user_fuente],
                (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (data.affectedRows === 0) {
                            return reject(new Error('Fuente no encontrada o no pertenece al usuario.'));
                        }
                        resolve(data);
                    }
                }
            );
        });
    }

    // Eliminar fuente (cambiar estado a 'delete')
    deleteFuente(id_fuente, user_fuente) {
        return new Promise((resolve, reject) => {
            connection.query(
                /*sql*/`UPDATE fuente SET estado = 'delete', fecha_actualizacion = CURRENT_TIMESTAMP WHERE id_fuente = ? AND user_fuente = ?`,
                [id_fuente, user_fuente],
                (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (data.affectedRows === 0) {
                            return reject(new Error('Fuente no encontrada o no pertenece al usuario.'));
                        }
                        resolve(data);
                    }
                }
            );
        });
    }
}

export default Fuentes;
