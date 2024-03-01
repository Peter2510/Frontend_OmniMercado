CREATE DATABASE omnimercado;

CREATE USER 'adminomnimercado'@'localhost' IDENTIFIED BY 'Teori@sistemas2';

GRANT ALL PRIVILEGES ON omnimercado.* TO 'adminomnimercado'@'localhost' WITH GRANT OPTION;

FLUSH PRIVILEGES;

USE omnimercado;

CREATE TABLE rol(
    id_rol INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE usuario(
    id_usuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contrasenia BLOB NOT NULL,
    moneda_local_gastada DECIMAL(8,2) NOT NULL,
    moneda_local_ganada DECIMAL(8,2) NOT NULL,
    cantidad_moneda_virtual DECIMAL(8,2) NOT NULL,
    moneda_virtual_gastada DECIMAL(8,2) NOT NULL,
    moneda_virtual_ganada DECIMAL(8,2) NOT NULL,
    cantidad_publicaciones INT NOT NULL,
    id_rol INT NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
);

CREATE TABLE estado_producto(
    id_estado_producto INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE producto(
    id_producto INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    precio_moneda_local DECIMAL(8,2) NOT NULL,
    precio_moneda_virtual DECIMAL(8,2) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_publicacion DATE NOT NULL,
    editado BOOLEAN NOT NULL,
    id_estado_producto INT NOT NULL,   
    url_imagen TEXT NOT NULL,
    FOREIGN KEY (id_estado_producto) REFERENCES estado_producto(id_estado_producto)
);

CREATE TABLE venta(
    id_venta INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_producto INT NOT NULL,
    id_publicador INT NOT NULL,
    fecha_venta DATE NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto),
    FOREIGN KEY (id_publicador) REFERENCES usuario(id_usuario)
);

CREATE TABLE tipo_categoria(
    id_tipo_categoria INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(35) NOT NULL
);

CREATE TABLE producto_categoria(
    id_producto_categoria INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_producto INT NOT NULL,
    id_tipo_categoria INT NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto),
    FOREIGN KEY (id_tipo_categoria) REFERENCES tipo_categoria(id_tipo_categoria)
);

CREATE TABLE categoria_reporte(
    id_categoria_reporte INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(35) NOT NULL
);

CREATE TABLE reporte_producto(
    id_reporte_producto INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_categoria_reporte INT NOT NULL,
    id_producto INT NOT NULL,
    FOREIGN KEY (id_categoria_reporte) REFERENCES categoria_reporte(id_categoria_reporte),
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

CREATE TABLE estado_voluntariado(
    id_estado_voluntariado INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE voluntariado(
    id_voluntariado INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(45) NOT NULL,
    retribucion_moneda_virtual DECIMAL(8,2),
    descripcion TEXT NOT NULL,
    lugar VARCHAR(35) NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    pais VARCHAR(35) NOT NULL,
    departamento VARCHAR(65) NOT NULL,
    url_imagen TEXT NOT NULL,
    id_estado INT NOT NULL,
    id_publicador INT NOT NULL,
    FOREIGN KEY (id_publicador) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_estado) REFERENCES estado_voluntariado(id_estado_voluntariado)
);


CREATE TABLE voluntariado_realizado(
    id_voluntariado_realizado INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_voluntariado INT NOT NULL,
    id_colaborador INT NOT NULL,
    FOREIGN KEY (id_voluntariado) REFERENCES voluntariado(id_voluntariado),
    FOREIGN KEY (id_colaborador) REFERENCES usuario(id_usuario)
);


CREATE TABLE voluntariado_categoria(
    id_voluntariado_categoria INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_voluntariado INT NOT NULL,
    id_tipo_categoria INT NOT NULL,
    FOREIGN KEY (id_voluntariado) REFERENCES voluntariado(id_voluntariado),
    FOREIGN KEY (id_tipo_categoria) REFERENCES tipo_categoria(id_tipo_categoria)
);

CREATE TABLE reporte_voluntariado(
    id_reporte_voluntariado INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_categoria_reporte INT NOT NULL,
    id_voluntariado INT NOT NULL,
    FOREIGN KEY (id_categoria_reporte) REFERENCES categoria_reporte(id_categoria_reporte),
    FOREIGN KEY (id_voluntariado) REFERENCES voluntariado(id_voluntariado)
);

/*INSERTANDO ROLES*/
INSERT INTO rol(nombre) VALUES ('admin'),('usuario');

/*INSERTANDO USUARIOS*/
INSERT INTO usuario (nombre, correo, contrasenia, moneda_local_gastada, moneda_local_ganada, cantidad_moneda_virtual, moneda_virtual_gastada, moneda_virtual_ganada, cantidad_publicaciones, id_rol)
VALUES
('Carmen Lucia Romero Martinez', 'c1@correo.com', SHA2 ( '123a', 256 ), 100.00, 50.00, 200.00, 150.00, 100.00, 5, 1),
('Lucas Hernández García', 'c2@example.com', SHA2 ( '123a', 256 ), 150.00, 100.00, 250.00, 200.00, 150.00, 8, 1),
('Valentina Torres Ramírez', 'c3@example.com', SHA2 ( '123a', 256 ), 200.00, 150.00, 300.00, 250.00, 200.00, 10, 1),
('Andrea Moreno López', 'c4@example.com', SHA2 ( '123a', 256 ), 120.00, 80.00, 180.00, 140.00, 120.00, 6, 1),
('Alejandro Castro Herrera', 'c5@example.com', SHA2 ( '123a', 256 ), 180.00, 120.00, 240.00, 200.00, 180.00, 9, 1),
('Sofia Martín García', 'c6@example.com', SHA2 ( '123a', 256 ), 220.00, 180.00, 280.00, 240.00, 220.00, 12, 1),
('Diego González Sánchez', 'c7@example.com', SHA2 ( '123b', 256 ), 90.00, 60.00, 150.00, 120.00, 90.00, 4, 2),
('Isabella Silva Rodríguez', 'c8@example.com', SHA2 ( '123b', 256 ), 130.00, 90.00, 190.00, 160.00, 130.00, 7, 2),
('Mateo López Martínez', 'c9@example.com', SHA2 ( '123b', 256 ), 170.00, 130.00, 230.00, 200.00, 170.00, 10, 2);

INSERT INTO estado_producto(nombre) values
('Disponible'),
('Vendido');

INSERT INTO producto (nombre, precio_moneda_local, precio_moneda_virtual, descripcion, fecha_publicacion, editado, id_estado_producto, url_imagen)
VALUES
  ('Smartphone Galaxy S21', 799.99, 0.1, 'El último smartphone de Samsung con pantalla AMOLED y cámara de 108 MP.', '2024-03-01', TRUE, 1, 'galaxy_s21.jpg'),
  ('Portátil HP Spectre x360', 1299.50, 0.08, 'Potente portátil 2 en 1 con procesador Intel Core i7 y pantalla táctil 4K.', '2024-03-02', FALSE, 1, 'hp_spectre.jpg'),
  ('Cámara Mirrorless Sony A7 III', 1999.99, 0.12, 'Cámara profesional con sensor full-frame y capacidad de grabación de video 4K.', '2024-03-03', TRUE, 1, 'sony_a7iii.jpg'),
  ('Auriculares Inalámbricos Apple AirPods Pro', 249.50, 0.15, 'Auriculares con cancelación de ruido y sonido envolvente de alta calidad.', '2024-03-04', FALSE, 1, 'airpods_pro.jpg'),
  ('TV OLED LG CX 65"', 2399.25, 0.11, 'Televisor OLED con resolución 4K, Dolby Vision, y sonido Dolby Atmos.', '2024-03-05', TRUE, 1, 'lg_cx65.jpg'),
  ('Laptop Dell XPS 13', 1199.00, 0.09, 'Laptop ultradelgada con procesador Intel Core i5 y pantalla InfinityEdge.', '2024-03-06', FALSE, 1, 'dell_xps13.jpg'),
  ('Teclado Mecánico Corsair K95 RGB Platinum', 199.99, 0.13, 'Teclado mecánico premium con retroiluminación RGB personalizable y switches Cherry MX.', '2024-03-07', TRUE, 1, 'corsair_k95.jpg'),
  ('Impresora 3D Creality Ender 3', 229.50, 0.07, 'Impresora 3D de nivel de entrada con gran volumen de impresión y montaje fácil.', '2024-03-08', FALSE, 1, 'ender3_printer.jpg'),
  ('Robot Aspirador Roomba i7+', 599.75, 0.1, 'Robot aspirador inteligente con mapeo y capacidad de vaciado automático del depósito.', '2024-03-09', TRUE, 1, 'roomba_i7.jpg'),
  ('Monitor Gaming ASUS ROG Swift PG279Q', 499.99, 0.14, 'Monitor gaming de 27" con resolución 1440p, frecuencia de actualización de 165Hz y G-Sync.', '2024-03-10', FALSE, 1, 'asus_rog_swift.jpg');

