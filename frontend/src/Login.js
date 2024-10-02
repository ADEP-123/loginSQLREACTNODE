import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import validation from './LoginValidation.js'

function Login() {
    const [values, setValues] = useState({
        user: '',
        password: '',
    })

    const [errors, setErrors] = useState({

    })

    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: [e.target.value] }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validation(values))
    }

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
                        <input type='password' name="password" placeholder='Ingrese la contraseña' onChange={handleInput} />
                        {errors.password && <span>{errors.password}</span>}
                    </div>
                    <button type='submit'>Ingresar</button>
                    <Link to="/signup">Registrar</Link>
                </form>
            </div>
        </div>
    )
}
export default Login