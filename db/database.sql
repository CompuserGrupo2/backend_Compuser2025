-- Definición de la base de datos
CREATE DATABASE IF NOT EXISTS db_compuser2025;
USE db_compuser2025;

-- Definición de las tablas
-- Tabla Clientes: almacena información de los clientes
CREATE TABLE Clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20),
    apellido VARCHAR(30),
    direccion VARCHAR(40),
    tipo_cli VARCHAR(20),
    telefono VARCHAR(8),
    cedula VARCHAR(20)
);

-- Tabla Usuarios: almacena credenciales de acceso
CREATE TABLE Usuarios (
	id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(20),
    contraseña VARCHAR(20)
);

-- Tabla Servicios: almacena información de los servicios disponibles
CREATE TABLE Servicios (
    id_ser INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(40),
    costo FLOAT
);

-- Tabla Recepcion: almacena información de las recepciones de cada cliente
CREATE TABLE Recepcion (
    id_recepcion INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE,
    estado_recepcion VARCHAR(30),
    id_cliente INT,
    id_equipocomp INT,
    id_empleado INT
);

-- Tabla Entrega de equipos: almacena información de las entregas que se le hacen a los clientes
CREATE TABLE Entrega_de_equipo (
    id_entregaequipo INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE,
    estado_entrega VARCHAR(30),
    id_equipocomp INT,
    id_cliente INT,
    id_empleado INT
);

-- Tabla Diagnostico: almacena información del diagnostico de los equipos computarizados
CREATE TABLE Diagnostico (
    id_diag INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(40),
    id_equipocomp INT,
    id_cliente INT,
    id_empleado INT
);

-- Tabla Detalle de diagnostico: almacena información del diagnostico
CREATE TABLE Detalle_diagnostico (
    id_detallediag INT AUTO_INCREMENT PRIMARY KEY,
    costo FLOAT,
    id_diag INT,
    id_ser INT
);

-- Tabla Equipo computarizado: almacena información del equipo computarizado
CREATE TABLE EquipoComputarizado (
    id_equipocomp INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(40),
    marca VARCHAR(30),
    color VARCHAR(20),
    modelo VARCHAR(20),
    id_cliente INT
);

-- Tabla Bitacora: almacena información de transacciones de diferentes tablas
CREATE TABLE Bitacora (
    id_bitacora INT AUTO_INCREMENT PRIMARY KEY,
    transaccion VARCHAR(10),
    usuario VARCHAR(50),
    fecha DATE,
    tabla VARCHAR(20) 
);

-- Tabla Calificaciones: almacena información de las calificaciones de los clientes
CREATE TABLE Calificaciones (
    id_cali INT AUTO_INCREMENT PRIMARY KEY,
    calidad_servicio TINYINT,
    fecha_calificacion DATE,
    comentario VARCHAR(100),
	id_cliente INT,
    id_ser INT
);

ALTER TABLE Calificaciones
ADD respuesta_calificacion VARCHAR(100);

-- Tabla Empleados: almacena información de los empleados
CREATE TABLE Empleados (
    id_empleado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20),
    apellido VARCHAR(30),
    direccion VARCHAR(40),
    telefono VARCHAR(8),
    cedula CHAR(20)
);

-- Relaciones entre tablas con ALTER TABLE
-- Relación Recepcion -> Clientes
ALTER TABLE Recepcion
ADD CONSTRAINT fk_cliente_recepcion FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente);

-- Relación Recepcion -> Empleados
ALTER TABLE Recepcion
ADD CONSTRAINT fk_empleado_recepcion FOREIGN KEY (id_empleado) REFERENCES Empleados(id_empleado);

-- Relación Recepcion -> EquipoComputarizado
ALTER TABLE Recepcion
ADD CONSTRAINT fk_equipo_recepcion FOREIGN KEY (id_equipocomp) REFERENCES EquipoComputarizado(id_equipocomp);

-- Relación Entrega_de_equipo -> Clientes
ALTER TABLE Entrega_de_equipo
ADD CONSTRAINT fk_cliente_entrega FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente);

-- Relación Entrega_de_equipo -> Empleados
ALTER TABLE Entrega_de_equipo
ADD CONSTRAINT fk_empleado_entrega FOREIGN KEY (id_empleado) REFERENCES Empleados(id_empleado);

-- Relación Entrega_de_equipo -> EquipoComputarizado
ALTER TABLE Entrega_de_equipo
ADD CONSTRAINT fk_equipo_entrega FOREIGN KEY (id_equipocomp) REFERENCES EquipoComputarizado(id_equipocomp);

-- Relación Diagnostico -> Clientes
ALTER TABLE Diagnostico
ADD CONSTRAINT fk_cliente_diagnostico FOREIGN KEY (Id_cliente) REFERENCES Clientes (Id_cliente);

-- Relación Diagnostico -> Empleados
ALTER TABLE Diagnostico
ADD CONSTRAINT fk_empleado_diagnostico FOREIGN KEY (id_empleado) REFERENCES Empleados(id_empleado);

-- Relación Diagnostico -> EquipoComputarizado
ALTER TABLE Diagnostico
ADD CONSTRAINT fk_equipo_diagnostico FOREIGN KEY (id_equipocomp) REFERENCES EquipoComputarizado(id_equipocomp);

-- Relación Detalle_diagnostico -> Diagnostico
ALTER TABLE Detalle_diagnostico
ADD CONSTRAINT fk_diag_detalle FOREIGN KEY (id_diag) REFERENCES Diagnostico(id_diag);

-- Relación Detalle_diagnostico -> Servicios
ALTER TABLE Detalle_diagnostico
ADD CONSTRAINT fk_servicio_detalle FOREIGN KEY (id_ser) REFERENCES Servicios(id_ser);

-- Relación Calificaciones -> Clientes
ALTER TABLE Calificaciones
ADD CONSTRAINT fk_cliente_calificacion FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente);

-- Relación Calificaciones -> Servicios
ALTER TABLE Calificaciones
ADD CONSTRAINT fk_servicio_calificacion FOREIGN KEY (id_ser) REFERENCES Servicios(id_ser);

-- Relación EquipoComputarizado -> Clientes
ALTER TABLE EquipoComputarizado
ADD CONSTRAINT fk_cliente_equipo FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente);

-- Inserciones lógicas secuenciales
-- Orden: tablas independientes primero, luego las dependientes

-- Inserciones en Clientes (independiente)
INSERT INTO Clientes (nombre, apellido, direccion, tipo_cli, telefono, cedula) 
VALUES 
('Lorenzo', 'Perez', 'Remasa', 'Regular', '12345678', '001-123456-0001A'),
('Jimena', 'Gomez', 'Avenida Central', 'Premium', '87654321', '002-654321-0002B');

-- Inserciones en Usuarios (independiente)
INSERT INTO Usuarios (usuario, contraseña) 
VALUES 
('admin', 'admin123'),
('empleado1', 'password123'),
('Snaijder Vargas', 'Noni123'),
('David Oporta', 'ldavidor7'),
('Heidy Luna', 'tini250'),
('Iris Ortega', 'tini250');

-- Inserciones en servicios (independiente)
INSERT INTO Servicios (descripcion, costo) 
VALUES 
('Instalación de Programas', 700),
('Mantenimiento preventivo', 700);

-- Inserciones en Empleados (independiente)
INSERT INTO Empleados (nombre, apellido, direccion, telefono, cedula) 
VALUES 
('Luis', 'Oporta', 'Barrio LomaLinda', '12345678', '121-130783-0001A'),
('Gabriel', 'Vargas', 'Barrio Padre Miguel', '87654321', '121-200898-1001F');

-- Inserciones de EquipoComputarizado (depende de Clientes)
INSERT INTO EquipoComputarizado (tipo, marca, color, modelo, id_cliente) 
VALUES 
('Laptop', 'Dell', 'Negro', 'Inspiron 15', 1),
('Computadora', 'HP', 'Blanco', 'Pavilion', 2);

-- Inserciones de Recepcion (depende de Clientes, Empleados y EquiposComputarizados)
INSERT INTO Recepcion (fecha, estado_recepcion, id_cliente, id_equipocomp, id_empleado) 
VALUES 
('2024-06-11', 'En proceso', 1, 1, 1),
('2024-06-01', 'Finalizado', 2, 2, 2);
select * from Recepcion;

-- Inserciones de Diagnostico (depende de EquiposComputarizados, Clientes y Empleados)
INSERT INTO Diagnostico (descripcion, id_equipocomp, id_cliente, id_empleado) 
VALUES 
('Pantalla dañada', 1, 1, 1),
('Problema en disco duro', 2, 2, 2);

-- Inserciones de Detalle_diagnostico (depende de Diagnostico y Servicios)
INSERT INTO Detalle_diagnostico (costo, id_diag, id_ser) 
VALUES 
(100.00, 1, 1),
(50.00, 2, 2);

-- Inserciones de Entrega_de_equipo (depende de Clientes, equiposcomputarizados y empleados)
INSERT INTO Entrega_de_equipo (fecha, estado_entrega, id_cliente, id_equipocomp, id_empleado) 
VALUES 
('2024-09-06', 'Entregado', 1, 1, 1),
('2024-10-04', 'Pendiente', 2, 2, 2);

-- Inserciones de Calificaciones (dependen de Clientes y Servicios)
INSERT INTO Calificaciones (id_cliente, id_ser, calidad_servicio, fecha_calificacion, comentario) 
VALUES 
(1, 1, 5, '2024-08-01', 'Muy buen servicio'),
(2, 2, 4, '2024-06-25', 'Satisfecho pero puede mejorar');

-- Inserciones de Bitácora (puede registrar transacciones de cualquier tabla)
INSERT INTO Bitacora (transaccion, usuario, fecha, tabla) 
VALUES 
('INSERT', 'admin', '2025-01-25', 'Clientes'),
('UPDATE', 'empleado1', '2025-03-03', 'Diagnostico');

-- Sentencias de actualización (un registro por tabla)
-- Actualizar Clientes (id_cliente = 1)
UPDATE Clientes
SET nombre = 'Lujania', direccion = 'Salida de la libertad'
WHERE id_cliente = 1;

-- Actualizar Usuarios (usuario = 'SnaijderSuarez')
UPDATE Usuarios
SET contraseña = 'newpass2025'
WHERE usuario = 'SnaijderSuarez';

-- Actualizar Servicios (id_ser = 1)
UPDATE Servicios
SET costo = 55.00
WHERE id_ser = 1;

-- Actualizar Empleados (id_empleado = 1)
UPDATE Empleados
SET telefono = '99887766'
WHERE id_empleado = 1;

-- Actualizar EquipoComputarizado (id_equipocomp = 1)
UPDATE EquipoComputarizado
SET modelo = 'Inspiron 16'
WHERE id_equipocomp = 1;

-- Actualizar Recepcion (id_recepcion = 1)
UPDATE Recepcion
SET estado_recepcion = 'Finalizado'
WHERE id_recepcion = 1;

-- Actualizar Diagnostico (id_diag = 1)
UPDATE Diagnostico
SET descripcion = 'Pantalla con problemas de conexión'
WHERE id_diag = 1;

-- Actualizar Detalle_diagnostico (id_detallediag = 1)
UPDATE Detalle_diagnostico
SET costo = 120.00
WHERE id_detallediag = 1;

-- Actualizar Entrega_de_equipo (id_entregaequipo = 1)
UPDATE Entrega_de_equipo
SET estado_entrega = 'Entregado'
WHERE id_entregaequipo = 1;

-- Actualizar Calificaciones (id_cali = 1)
UPDATE Calificaciones
SET calidad_servicio = 5, comentario = 'Servicio excelente'
WHERE id_cali = 1;

-- Actualizar Bitacora (id_bitacora = 1)
UPDATE Bitacora
SET usuario = 'SnaijderSuarez'
WHERE id_bitacora = 1;


-- Sentencias de eliminación (un registro por tabla)
-- Orden: primero tablas dependientes, luego independientes

-- Eliminar Calificaciones (id_cali = 1)
DELETE FROM Calificaciones WHERE id_cali = 1;

-- Eliminar Detalle_diagnostico (id_detallediag = 1)
DELETE FROM Detalle_diagnostico WHERE id_detallediag = 1;

-- Eliminar Diagnostico (id_diag = 1)
DELETE FROM Diagnostico WHERE id_diag = 1;

-- Eliminar Entrega_de_equipo (id_entregaequipo = 1)
DELETE FROM Entrega_de_equipo WHERE id_entregaequipo = 1;

-- Eliminar Recepcion (id_recepcion = 1)
DELETE FROM Recepcion WHERE id_recepcion = 1;

-- Eliminar EquipoComputarizado (id_equipocomp = 1)
DELETE FROM EquipoComputarizado WHERE id_equipocomp = 1;

-- Eliminar Servicios (id_ser = 1)
DELETE FROM Servicios WHERE id_ser = 1;

-- Eliminar Empleados (id_empleado = 1)
DELETE FROM Empleados WHERE id_empleado = 1;

-- Eliminar Clientes (id_cliente = 1)
DELETE FROM Clientes WHERE id_cliente = 1;

-- Eliminar Usuarios (usuario = 'admin')
DELETE FROM Usuarios WHERE usuario = 'SnaijderSuarez';

-- Eliminar Bitacora (id_bitacora = 1)
DELETE FROM Bitacora WHERE id_bitacora = 1;
