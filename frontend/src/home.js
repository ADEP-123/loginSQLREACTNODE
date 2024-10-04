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
                fetchBalance(token);
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

    const handleLogout = () => {
        sessionStorage.removeItem("tkCont"); 
        navigate('/'); 
    };

    return (
        <div className="container mt-5">
            {/* Panel de usuario */}
            <div className="row">
                <div className="col">
                    <div className="card text-center">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <button className="btn btn-danger me-2" onClick={handleLogout}>
                                    Salir
                                </button>
                                <div className="flex-grow-1 text-center">
                                    <h5 className="card-title mb-1">Bienvenido al Panel de Usuario</h5>
                                    <p className="card-text mb-0">Aquí puedes gestionar tu cuenta y ver tu saldo.</p>
                                </div>
                            </div>
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
                            <p className="h4">{balance !== null ? formatCurrency(balance) : 'Cargando...'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;