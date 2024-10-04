// Home.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateTokenApi } from './auth'; // Importa la función de validación

function Home() {
    const navigate = useNavigate(); 

    useEffect(() => {
        const checkToken = async () => {
            const token = sessionStorage.getItem('tkCont');
            const isValid = await validateTokenApi(token);
            if (!isValid) {
                sessionStorage.removeItem("tkCont")
                navigate('/');
            } else {
                console.log('Token válido');
            }
        };
        checkToken();
    }, [navigate]);

    return (
        <h1>Home</h1>
    );
}

export default Home;
