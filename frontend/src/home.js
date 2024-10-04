import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateTokenApi } from './auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Home() {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const checkToken = async () => {
            const token = sessionStorage.getItem('tkCont');
            const isValid = await validateTokenApi(token);
            if (!isValid) {
                sessionStorage.removeItem("tkCont");
                navigate('/');
            } else {
                console.log('Token válido');
                fetchBalance(token); // Llama a la función para obtener el saldo
            }
        };
        checkToken();
    }, [navigate]);

    const fetchBalance = async (token) => {
        try {
            const response = await axios.get('http://127.9.63.7:5000/contAPP/get/balance', {
                headers: {
                    Authorization: token 
                }
            });
            if (response.data.status) {
                setBalance(response.data.result);
            } else {
                console.error('No se pudo obtener el saldo');
            }
        } catch (error) {
            console.error('Error al obtener el saldo:', error);
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
        }).format(value);
    };

    return (
        <div className="container mt-5">
            {/* Panel de usuario */}
            <div className="row">
                <div className="col">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Bienvenido al Panel de Usuario</h5>
                            <p className="card-text">Aquí puedes gestionar tu cuenta y ver tu saldo.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center mt-4">
                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-body">
                            <img
                                src={require('./imgs/alcancia.png')}
                                alt="Alcancía"
                                className="img-fluid"
                                style={{ width: '100px', height: 'auto' }}
                            />
                            <h5 className="mt-3">Tu saldo:</h5>
                            <p className="h4">{balance !== null ? `${formatCurrency(balance)} COP` : 'Cargando...'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
