import React from 'react'

function Login() {
    return (
        <div>
            <div>
                <form action=''>
                    <div>
                        <label>Usuario:</label>
                        <input type='text' placeholder='Ingrese el usuario' />
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input type='password' placeholder='Ingrese la contraseña' />
                    </div>
                    <button>Ingresar</button>
                    <button>Registrar</button>
                </form>
            </div>
        </div>
    )
}
export default Login