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
    ingresos (
        user_ingreso,
        monto,
        fuente,
        metodo
    )
VALUES (
        'adep123',
        1500.00,
        'Salario',
        'Transferencia'
    ),
    (
        'adep123',
        200.00,
        'Venta de productos',
        'Efectivo'
    ),
    (
        'adep123',
        500.00,
        'Inversión',
        'Cheque'
    ),
    (
        'adep123',
        300.00,
        'Regalo',
        'Transferencia'
    );

INSERT INTO
    egresos (
        user_ingreso,
        descripcion,
        monto,
        fuente,
        metodo
    )
VALUES (
        'adep123',
        'Compra de materiales',
        300.00,
        'Proveedores',
        'Tarjeta de crédito'
    ),
    (
        'adep123',
        'Pago de servicios',
        150.00,
        'Servicios Públicos',
        'Efectivo'
    );