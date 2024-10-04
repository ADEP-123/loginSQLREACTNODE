import React from 'react';
import { Dropdown } from 'react-bootstrap';

const DropdownMenu = ({ onNuevoIngreso, onNuevoEgreso, onSalir }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Opciones
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={onNuevoIngreso}>Nuevo Ingreso</Dropdown.Item>
                {/* Aquí puedes llamar a onNuevoEgreso si implementaste esa función */}
                <Dropdown.Item onClick={onNuevoEgreso}>Nuevo Egreso</Dropdown.Item>
                <Dropdown.Item onClick={onSalir}>Salir</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DropdownMenu;
