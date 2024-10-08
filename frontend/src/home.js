import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateTokenApi } from './auth';
import axios from 'axios';
import BalanceCard from './BalanceCard';
import Movimientos from './Movimientos';
import NuevoIngreso from './NuevoIngreso';
import DropdownMenu from './DropdownMenu';
import NuevoEgreso from './NuevoEgreso';

function Home() {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(null);
    const [movimientos, setMovimientos] = useState([]);
    const [showMovimientos, setShowMovimientos] = useState(false);
    const [showNuevoIngreso, setShowNuevoIngreso] = useState(false);
    const [showNuevoEgreso, setShowNuevoEgreso] = useState(false);
    const [userName, setUserName] = useState('');
    const token = sessionStorage.getItem('tkCont');

    useEffect(() => {
        const checkToken = async () => {
            const isValid = await validateTokenApi(token);
            if (!isValid) {
                sessionStorage.removeItem('tkCont');
                localStorage.removeItem('movimientos');
                navigate('/');
            } else {
                fetchBalance(token);
                fetchUserName(token);
            }
        };
        checkToken();
    }, [navigate]);

    const fetchBalance = async (token) => {
        try {
            const response = await axios.get('http://127.9.63.7:5000/contAPP/get/balance', {
                headers: { Authorization: token },
            });
            if (response.data.status) {
                setBalance(response.data.result);
            }
        } catch (error) {
            console.error('Error al obtener el saldo:', error);
        }
    };

    const fetchUserName = async (token) => {
        try {
            const response = await axios.get('http://127.9.63.7:5000/contAPP/get/username', {
                headers: { Authorization: token },
            });
            if (response.data.status) {
                setUserName(response.data.result[0].name);
            }
        } catch (error) {
            console.error('Error al obtener el nombre del usuario:', error);
        }
    };

    const handleShowMovimientos = () => {
        setShowNuevoIngreso(false);
        setShowNuevoEgreso(false);
        fetchMovimientos(token);
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
            // console.error('Error al obtener los movimientos:', error);
        }
    };

    const handleCloseMovimientos = () => {
        setShowMovimientos(false);
    };

    const handleNuevoIngreso = () => {
        setShowNuevoEgreso(false);
        setShowMovimientos(false);
        setShowNuevoIngreso(true);
    };

    const handleCancelIngreso = () => {
        setShowNuevoIngreso(false);
    };

    const handleSalir = () => {
        sessionStorage.removeItem('tkCont');
        localStorage.removeItem('movimientos');
        navigate('/');
    };

    const handleNuevoEgreso = () => {
        setShowMovimientos(false);
        setShowNuevoIngreso(false);
        setShowNuevoEgreso(true);
    };

    const handleCancelEgreso = () => {
        setShowNuevoEgreso(false);
    };

    const handleSuccess = async () => {
        await fetchBalance(token);
        fetchMovimientos(token);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <h5 className='card-title mx-auto'>Bienvenido, {userName}</h5>
                            <div className="ml-auto">
                                <DropdownMenu onNuevoIngreso={handleNuevoIngreso} onNuevoEgreso={handleNuevoEgreso} onSalir={handleSalir} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    {/* Componente para mostrar el balance */}
                    <BalanceCard balance={balance} formatCurrency={formatCurrency} handleShowMovimientos={handleShowMovimientos} />
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    {/* Componente para mostrar los movimientos */}
                    {showMovimientos && <Movimientos movimientos={movimientos} handleCloseMovimientos={handleCloseMovimientos} formatCurrency={formatCurrency} />}
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    {/* Componente para nuevo ingreso */}
                    {showNuevoIngreso && <NuevoIngreso handleCancelIngreso={() => setShowNuevoIngreso(false)} token={token} onSuccess={handleSuccess} />}
                    {/* Componente para nuevo egreso */}
                    {showNuevoEgreso && <NuevoEgreso handleCancelEgreso={() => setShowNuevoEgreso(false)} token={token} onSuccess={handleSuccess} />}
                </div>
            </div>
        </div>
    );
}

export default Home;