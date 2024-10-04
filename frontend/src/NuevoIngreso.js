import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function NuevoIngreso({ handleCancelIngreso, token, onSuccess }) {
    const [monto, setMonto] = useState('');
    const [fuente, setFuente] = useState('');
    const [metodo, setMetodo] = useState('Transferencia');
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = async () => {
        const nuevoIngreso = {
            monto,
            fuente,
            metodo,
        };

        try {
            const response = await axios.post('http://127.9.63.7:5000/contAPP/post/income', nuevoIngreso, {
                headers: { Authorization: token },
            });

            if (response.data.status) {
                // Ingreso exitoso: Limpiar el formulario
                setMonto('');
                setFuente('');
                setMetodo('Efectivo');
                setShowConfirm(false);
                handleCancelIngreso(); // Cierra el formulario
                onSuccess(); // Llama a la función para actualizar balance y movimientos
                alert('Ingreso registrado exitosamente'); // Alert de éxito
            }
        } catch (error) {
            console.error('Error al registrar el ingreso:', error);
            alert('Error al registrar el ingreso. Inténtalo de nuevo.'); // Alert de error
        }
    };

    return (
        <div>
            <h4>Nuevo Ingreso</h4>
            <form>
                <div className="mb-3">
                    <label htmlFor="monto" className="form-label">Monto</label>
                    <input
                        type="number"
                        className="form-control"
                        id="monto"
                        value={monto}
                        onChange={(e) => setMonto(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fuente" className="form-label">Fuente</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fuente"
                        value={fuente}
                        onChange={(e) => setFuente(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="metodo" className="form-label">Método</label>
                    <select
                        className="form-control"
                        id="metodo"
                        value={metodo}
                        onChange={(e) => setMetodo(e.target.value)}
                        required
                    >
                        <option value="Transferencia">Transferencia</option>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Cheque">Cheque</option>
                    </select>
                </div>
                <div className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={handleCancelIngreso}>
                        Cancelar Ingreso
                    </Button>
                    <Button variant="primary" onClick={() => setShowConfirm(true)}>
                        Confirmar Ingreso
                    </Button>
                </div>
            </form>

            <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Ingreso</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Estás seguro de registrar este ingreso?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default NuevoIngreso;
