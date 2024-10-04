import React from 'react';
import { Dropdown } from 'react-bootstrap';

const DropdownMenu = ({ onNuevoIngreso, onSalir }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Opciones
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={onNuevoIngreso}>Nuevo Ingreso</Dropdown.Item>
                <Dropdown.Item onClick={() => alert('Nuevo Egreso aún no implementado')}>Nuevo Egreso</Dropdown.Item>
                <Dropdown.Item onClick={onSalir}>Salir</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DropdownMenu;
