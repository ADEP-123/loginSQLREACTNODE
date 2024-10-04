import React from 'react';

const Movimientos = ({ movimientos, handleCloseMovimientos, formatCurrency }) => {
    return (
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
    );
};

export default Movimientos;
