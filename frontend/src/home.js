import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateTokenApi } from './auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Home() {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(null);
    const [movimientos, setMovimientos] = useState([]);
    const [showMovimientos, setShowMovimientos] = useState(false);
    const [userName, setUserName] = useState(''); // Nuevo estado para el nombre de usuario

    useEffect(() => {
        const checkToken = async () => {
            const token = sessionStorage.getItem('tkCont');
            const isValid = await validateTokenApi(token);
            if (!isValid) {
                sessionStorage.removeItem("tkCont");
                localStorage.removeItem("movimientos");
                navigate('/');
            } else {
                console.log('Token válido');
                fetchBalance(token);
                fetchUserName(token); // Llamar a la función para obtener el nombre de usuario
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

    // Nueva función para obtener el nombre de usuario
    const fetchUserName = async (token) => {
        try {
            const response = await axios.get('http://127.9.63.7:5000/contAPP/get/username', {
                headers: {
                    Authorization: token
                }
            });
            if (response.data.status) {
                setUserName(response.data.result[0].name);
                console.error('No se pudo obtener el nombre del usuario');
            }
        } catch (error) {
            console.error('Error al obtener el nombre del usuario:', error);
        }
    };

    const fetchMovimientos = async (token) => {
        try {
            const [egresosResponse, ingresosResponse] = await Promise.all([
                axios.get('http://127.9.63.7:5000/contAPP/get/egresos', {
                    headers: { Authorization: token }
                }),
                axios.get('http://127.9.63.7:5000/contAPP/get/ingresos', {
                    headers: { Authorization: token }
                })
            ]);

            const egresosData = egresosResponse.data.result;
            const ingresosData = ingresosResponse.data.result;

            // Formatear los movimientos
            const formattedMovimientos = [
                ...egresosData.map(egreso => ({
                    fecha: new Date(egreso.fecha),
                    metodo: egreso.metodo,
                    descripcion: egreso.descripcion,
                    monto: -egreso.monto
                })),
                ...ingresosData.map(ingreso => ({
                    fecha: new Date(ingreso.fecha),
                    metodo: ingreso.metodo,
                    descripcion: ingreso.fuente, // Mostrar fuente como descripción
                    monto: ingreso.monto
                }))
            ];

            // Ordenar los movimientos por fecha y hora
            formattedMovimientos.sort((a, b) => b.fecha - a.fecha); // Ordenar de más reciente a más antiguo

            setMovimientos(formattedMovimientos);
            setShowMovimientos(true); // Muestra la tabla de movimientos
        } catch (error) {
            console.error('Error al obtener los movimientos:', error);
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
        localStorage.removeItem("movimientos");
        navigate('/');
    };

    const handleShowMovimientos = () => {
        const token = sessionStorage.getItem('tkCont');
        fetchMovimientos(token);
    };

    const handleCloseMovimientos = () => {
        setShowMovimientos(false);
        setMovimientos([]);
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
                                    <h5 className="card-title mb-1">Bienvenido, {userName}</h5> {/* Mensaje actualizado */}
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
                            <button className="btn btn-primary mt-3" onClick={handleShowMovimientos}>
                                Ver últimos movimientos
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showMovimientos && (
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="card-title mx-auto">Últimos Movimientos</h5>
                                    <button className="btn-close" onClick={handleCloseMovimientos} aria-label="Close"></button>
                                </div>
                                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Fecha</th>
                                                <th>Método</th>
                                                <th>Descripción</th>
                                                <th>Monto</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {movimientos.map((movimiento, index) => (
                                                <tr key={index} style={{ color: movimiento.monto < 0 ? 'red' : 'black' }}>
                                                    <td>{movimiento.fecha.toLocaleString()}</td>
                                                    <td>{movimiento.metodo}</td>
                                                    <td>{movimiento.descripcion}</td>
                                                    <td style={{ color: movimiento.monto < 0 ? 'red' : 'black' }}>
                                                        {formatCurrency(movimiento.monto)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
