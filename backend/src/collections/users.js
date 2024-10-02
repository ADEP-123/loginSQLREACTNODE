import getConnection from "../db/database.js";
const connection = getConnection();

class Usuarios {
    constructor() { }
    
    getUsuarios(user, password) {
        return new Promise((resolve, reject) => {
            connection.query(
                /*sql*/`SELECT * FROM usuario WHERE userName = ? AND password = ?`,
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
}

export default Usuarios;
