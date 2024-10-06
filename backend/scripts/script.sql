DROP DATABASE contabilidad;
CREATE DATABASE contabilidad;

USE contabilidad;

/* Creacion de tablas */
CREATE TABLE usuario (
    userName VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (userName),
    saldo REAL DEFAULT 0
);


CREATE TABLE fuente (
    id_fuente INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_fuente VARCHAR(50) NOT NULL, 
    nombre_fuente VARCHAR(100) NOT NULL,
    descripcion TEXT,
    estado ENUM('active', 'delete') DEFAULT 'active', 
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_fuente) REFERENCES usuario (userName)
);

CREATE TABLE ingresos (
    id_ingreso INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_ingreso VARCHAR(50) NOT NULL,
    id_fuente INTEGER NOT NULL,
    metodo TEXT,
    descripcion TEXT NOT NULL,
    monto REAL NOT NULL,
    fecha DATE NOT NULL,
    estado ENUM('active', 'delete') DEFAULT 'active',
    fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_ingreso) REFERENCES usuario (userName),
    FOREIGN KEY (user_ingreso, id_fuente) REFERENCES fuente (user_fuente,id_fuente)
)

CREATE TABLE egresos (
    id_ingreso INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_ingreso VARCHAR(50) NOT NULL,
    id_fuente INTEGER NOT NULL,
    metodo TEXT,
    descripcion TEXT NOT NULL,
    monto REAL NOT NULL,
    fecha DATE NOT NULL ,
    estado ENUM('active', 'delete') DEFAULT 'active',
    fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_ingreso) REFERENCES usuario (userName),
    FOREIGN KEY (user_ingreso, id_fuente) REFERENCES fuente (user_fuente,id_fuente)
)


/* Insercion de datos */
INSERT INTO
    usuario (userName, name, password)
VALUES (
        "adep123",
        "Andres Elizalde",
        "ADEPadep123456"
    );
INSERT INTO
    fuente (user_fuente, nombre_fuente, descripcion)
VALUES 
    ('adep123', 'Salario', 'Ingresos por salario mensual'),
    ('adep123', 'Venta de productos', 'Ingresos por ventas de productos diversos'),
    ('adep123', 'Inversión', 'Ingresos por inversiones'),
    ('adep123', 'Regalo', 'Ingresos recibidos como regalos'),
    ('adep123', 'Proveedores', 'Egresos por compra a proveedores'),
    ('adep123', 'Servicios Públicos', 'Egresos por pago de servicios públicos');

-- Ingresos
INSERT INTO
    ingresos (user_ingreso, id_fuente, descripcion, monto, metodo, fecha)
VALUES
    ('adep123', 1, 'Salario mensual', 150000.00, 'Transferencia', CURDATE()),  
    ('adep123', 2, 'Venta de productos diversos', 200000.00, 'Efectivo', CURDATE()),  
    ('adep123', 3, 'Inversión en fondos', 500000.00, 'Cheque', CURDATE()),  
    ('adep123', 4, 'Regalo de cumpleaños', 300000.00, 'Transferencia', CURDATE());

-- Actualización del saldo del usuario
UPDATE usuario
SET saldo = saldo + 150000.00
WHERE userName = 'adep123';

UPDATE usuario
SET saldo = saldo + 200000.00
WHERE userName = 'adep123';

UPDATE usuario
SET saldo = saldo + 500000.00
WHERE userName = 'adep123';

UPDATE usuario
SET saldo = saldo + 300000.00
WHERE userName = 'adep123';


-- Egresos
INSERT INTO
    egresos (user_ingreso, id_fuente, descripcion, monto, metodo, fecha)
VALUES
    ('adep123', 5, 'Compra de materiales a proveedores', 350000.00, 'Tarjeta de crédito', CURDATE()), 
    ('adep123', 6, 'Pago de servicios públicos', 250000.00, 'Efectivo', CURDATE());

-- Actualización del saldo del usuario
UPDATE usuario
SET saldo = saldo - 350000.00
WHERE userName = 'adep123';

UPDATE usuario
SET saldo = saldo - 250000.00
WHERE userName = 'adep123';