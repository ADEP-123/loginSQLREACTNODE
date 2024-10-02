CREATE DATABASE contabilidad;
USE contabilidad;

/* Creacion de tablas */
CREATE TABLE usuario(
    userName VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (userName)
);

CREATE TABLE ingresos(
    id_ingreso INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_ingreso VARCHAR(50) NOT NULL,
    monto REAL NOT NULL,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fuente TEXT,
    metodo TEXT,
    FOREIGN KEY (user_ingreso) REFERENCES usuario(userName)
)

CREATE TABLE egresos(
    id_ingreso INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_ingreso VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    monto REAL NOT NULL,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fuente TEXT,
    metodo TEXT,
    FOREIGN KEY (user_ingreso) REFERENCES usuario(userName)
)


/* Insercion de datos */
INSERT INTO usuario(userName,name,password)
VALUES
    ("adep123","Andres Elizalde", "ADEPadep123456");
INSERT INTO ingresos(user_ingreso, monto, fuente, metodo)
VALUES
    ('adep123', 1500.00, 'Salario', 'Transferencia'),
    ('adep123', 200.00, 'Venta de productos', 'Efectivo'),
    ('adep123', 500.00, 'Inversión', 'Cheque'),
    ('adep123', 300.00, 'Regalo', 'Transferencia');
INSERT INTO egresos (user_ingreso, descripcion, monto, fuente, metodo) 
VALUES 
    ('adep123', 'Compra de materiales', 300.00, 'Proveedores', 'Tarjeta de crédito'),
    ('adep123', 'Pago de servicios', 150.00, 'Servicios Públicos', 'Efectivo');