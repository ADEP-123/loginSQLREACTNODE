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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center">Iniciar Sesión</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Usuario:</label>
                                    <input
                                        type="text"
                                        name="user"
                                        className="form-control"
                                        placeholder="Ingrese el usuario"
                                        onChange={handleInput}
                                    />
                                    {errors.user && <span className="text-danger">{errors.user}</span>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Contraseña:</label>
                                    <input
                                        type="password"
                                        name="pass"
                                        className="form-control"
                                        placeholder="Ingrese la contraseña"
                                        onChange={handleInput}
                                    />
                                    {errors.pass && <span className="text-danger">{errors.pass}</span>}
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Ingresar</button>
                                <div className="mt-3 text-center">
                                    <Link to="/signup" className="link-secondary">¿No tienes cuenta? Regístrate aquí</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
