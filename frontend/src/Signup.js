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
                    console.log(res)
                    navigate('/');
                })
                .catch(err => console.error(err));

        } else {
            console.log(errors, values);
        }
    };

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Usuario:</label>
                        <input type='text' name="userName" placeholder='Ingrese su nombre de usuario deseado' onChange={handleInput} />
                        {errors.userName && (
                            <ul>
                                {errors.userName.map((error, index) => (
                                    <li key={index} style={{ color: 'red' }}>{error}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div>
                        <label>Nombre:</label>
                        <input type='text' name="name" placeholder='Ingrese su nombre' onChange={handleInput} />
                        {errors.name && (
                            <ul>
                                {errors.name.map((error, index) => (
                                    <li key={index} style={{ color: 'red' }}>{error}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input type='password' name="password1" placeholder='Ingrese la contraseña' onChange={handleInput} />
                        {errors.password1 && (
                            <ul>
                                {errors.password1.map((error, index) => (
                                    <li key={index} style={{ color: 'red' }}>{error}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div>
                        <label>Repita la contraseña:</label>
                        <input type='password' name="password2" placeholder='Ingrese la contraseña' onChange={handleInput} />
                        {errors.password2 && (
                            <ul>
                                {errors.password2.map((error, index) => (
                                    <li key={index} style={{ color: 'red' }}>{error}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <button type='submit'>Completar Registro</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;