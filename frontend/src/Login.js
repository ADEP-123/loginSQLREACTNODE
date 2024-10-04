import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './LoginValidation.js';
import axios from 'axios';

function Login() {
    const [values, setValues] = useState({
        user: '',
        pass: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Hook para redireccionar

    // Verificar si ya existe un token en sessionStorage
    useEffect(() => {
        const token = sessionStorage.getItem("tkCont");
        if (token) {
            // Si existe el token, redirigir a Home
            navigate('/home');
        }
    }, [navigate]);

    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log(values);

            axios.get("http://127.9.63.7:5000/contAPP/login", {
                params: values
            })
            .then(res => saveToken(res))
            .catch(err => console.error(err));
        }
    };

    const saveToken = (res) => {
        if (res.data.status === 201) {
            sessionStorage.setItem("tkCont", res.data.message);
            // Redirigir a Home después de guardar el token
            navigate('/home');
        }
    };

    return (
        <div>
            <div>
                <form action='' onSubmit={handleSubmit}>
                    <div>
                        <label>Usuario:</label>
                        <input type='text' name="user" placeholder='Ingrese el usuario' onChange={handleInput} />
                        {errors.user && <span>{errors.user}</span>}
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input type='password' name="pass" placeholder='Ingrese la contraseña' onChange={handleInput} />
                        {errors.pass && <span>{errors.pass}</span>}
                    </div>
                    <button type='submit'>Ingresar</button>
                    <Link to="/signup">Registrar</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
