import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validation from './signUpValidation.js';
import axios from 'axios';

function Signup() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        userName: '',
        name: '',
        password1: '',
        password2: '',
    });

    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues(prev => {
            const updatedValues = { ...prev, [name]: value };
            setErrors(validation(updatedValues));
            return updatedValues;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.keys(errors).length === 0) {
            const values1 = {
                username: values.userName,
                name: values.name,
                password: values.password1
            }
            axios.post("http://127.9.63.7:5000/contAPP/post/user", values1)
                .then(res => {
                    console.log(res);
                    navigate('/');
                })
                .catch(err => console.error(err));
        } else {
            console.log(errors, values);
        }
    };

    const handleCancel = () => {
        // Redirigir a la ruta principal
        navigate('/');
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center">Registro de Usuario</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Usuario:</label>
                                    <input
                                        type='text'
                                        name="userName"
                                        className="form-control"
                                        placeholder='Ingrese su nombre de usuario deseado'
                                        onChange={handleInput}
                                    />
                                    {errors.userName && (
                                        <ul className="text-danger">
                                            {errors.userName.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Nombre:</label>
                                    <input
                                        type='text'
                                        name="name"
                                        className="form-control"
                                        placeholder='Ingrese su nombre'
                                        onChange={handleInput}
                                    />
                                    {errors.name && (
                                        <ul className="text-danger">
                                            {errors.name.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Contraseña:</label>
                                    <input
                                        type='password'
                                        name="password1"
                                        className="form-control"
                                        placeholder='Ingrese la contraseña'
                                        onChange={handleInput}
                                    />
                                    {errors.password1 && (
                                        <ul className="text-danger">
                                            {errors.password1.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Repita la contraseña:</label>
                                    <input
                                        type='password'
                                        name="password2"
                                        className="form-control"
                                        placeholder='Ingrese la contraseña'
                                        onChange={handleInput}
                                    />
                                    {errors.password2 && (
                                        <ul className="text-danger">
                                            {errors.password2.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <button type='submit' className="btn btn-primary w-100">Completar Registro</button>
                                <button type='button' className="btn btn-secondary w-100 mt-3" onClick={handleCancel}>Cancelar Registro</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
