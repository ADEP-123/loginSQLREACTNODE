import React from 'react';

const BalanceCard = ({ balance, formatCurrency, handleShowMovimientos }) => {
    return (
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
    );
};

export default BalanceCard;
