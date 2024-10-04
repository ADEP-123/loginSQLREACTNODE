import axios from 'axios';

export const validateTokenApi = async (token) => {
    if (!token) {
        return false;
    }
    try {
        const response = await axios.get('http://127.9.63.7:5000/contAPP/valtoken', {
            headers: {
                Authorization: token 
            }
        });
        // Si la respuesta es exitosa, el token es válido
        return response.status === 200;
    } catch (error) {
        // Si ocurre un error (token inválido o expirado), devuelve falso
        console.error('Token no válido:', error);
        return false;
    }
};
