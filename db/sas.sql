-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-03-2023 a las 04:29:50
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aseguradora`
--

CREATE TABLE aseguradora (
  id_aseguradora int(11) NOT NULL,
  id_vehiculo int(11) NOT NULL,
  nombre_aseguradora varchar(30) NOT NULL,
  fecha_expedicion date NOT NULL,
  fecha_vencimiento date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla aseguradora
--

INSERT INTO aseguradora (id_aseguradora, id_vehiculo, nombre_aseguradora, fecha_expedicion, fecha_vencimiento) VALUES
(1, 5, 'SURA', '2022-11-29', '2023-07-29'),
(2, 9, 'Allianz Seguros', '2022-09-09', '2023-05-19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla entrada_salida
--

CREATE TABLE entrada_salida (
  id_entrada_salida int(11) NOT NULL,
  id_usuarios int(11) NOT NULL,
  fecha_ingreso date NOT NULL,
  hora_ingreso time NOT NULL,
  id_vehiculo int(11) NOT NULL,
  fecha_salida date NOT NULL,
  hora_salida time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla entrada_salida
--

INSERT INTO entrada_salida (id_entrada_salida, id_usuarios, fecha_ingreso, hora_ingreso, id_vehiculo, fecha_salida, hora_salida) VALUES
(1, 2, '2023-03-08', '03:22:00', 5, '2023-04-01', '05:35:00'),
(2, 2, '2023-03-25', '05:00:00', 9, '2023-04-01', '06:30:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla factura
--

CREATE TABLE factura (
  id_factura int(11) NOT NULL,
  id_usuarios int(11) DEFAULT NULL,
  id_vehiculo int(11) DEFAULT NULL,
  fecha_venta date NOT NULL,
  valor int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla factura
--

INSERT INTO factura (id_factura, id_usuarios, id_vehiculo, fecha_venta, valor) VALUES
(1, 1, 9, '2023-03-08', 3000),
(2, 3, 5, '2023-05-07', 3500);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla reportes
--

CREATE TABLE reportes (
  id_reportes int(11) NOT NULL,
  id_usuarios int(11) DEFAULT NULL,
  descripcion text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla reportes
--

INSERT INTO reportes (id_reportes, id_usuarios, descripcion) VALUES
(1, 1, 'El carro se volco y se arruinaron todos los documentos que estaban dentro de el.'),
(2, NULL, 'hubo un temblor y se rompieron los vidrios'),
(5, NULL, 'buenas tardes'),
(6, NULL, 'hubo un temblor y se rompieron los vidrios traseros del carro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla usuarios
--

CREATE TABLE usuarios (
  id_usuarios int(11) NOT NULL,
  nombre varchar(30) NOT NULL,
  apellido varchar(30) NOT NULL,
  correo varchar(30) NOT NULL,
  contrasena varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla usuarios
--

INSERT INTO usuarios (id_usuarios, nombre, apellido, correo, contrasena) VALUES
(1, 'Stiven', 'Benjumea', 'stevenbenjumea9@gmail.com', 'Stigmata14'),
(2, 'Estefania', 'Valencia', 'evp77190@gmail.com', 'Sorteffa'),
(3, 'Carlos', 'Eduardo', 'carlos@gmail.com', 'SoyElMejor76'),
(6, 'mateo', 'Oquendo', 'Mateo123@gmail.com', 'Soymateoelmejor'),
(98, 'Estefania', 'Valencia', 'evp77191@gmail.com', '$2a$10$SwSWAMosOnd7zdqY78FJ0.3Xq5jTuglg4INSgKC.qoKzbBgGOI2nu'),
(99, 'Estefania', 'Valencia', 'hola@gmail.com', '$2a$10$vUkRmfrqLhW6y9stvuPtmOV5ulZjEUvDBL/kIrJIRSlcyWEGO7jdy');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla vehiculos
--

CREATE TABLE vehiculos (
  id_vehiculo int(11) NOT NULL,
  id_usuarios int(11) DEFAULT NULL,
  placa varchar(8) NOT NULL,
  marca varchar(30) NOT NULL,
  modelo varchar(30) NOT NULL,
  color varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla vehiculos
--

INSERT INTO vehiculos (id_vehiculo, id_usuarios, placa, marca, modelo, color) VALUES
(5, NULL, 'dsd-732', 'chevrolet', 'acoord', 'rojo'),
(9, NULL, 'sdw-431', 'chevrolet', 'acoord 2030', 'negro');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla aseguradora
--
ALTER TABLE aseguradora
  ADD PRIMARY KEY (id_aseguradora),
  ADD KEY id_vehiculo (id_vehiculo);

--
-- Indices de la tabla entrada_salida
--
ALTER TABLE entrada_salida
  ADD PRIMARY KEY (id_entrada_salida),
  ADD KEY id_usuarios (id_usuarios),
  ADD KEY id_vehiculo (id_vehiculo);

--
-- Indices de la tabla factura
--
ALTER TABLE factura
  ADD PRIMARY KEY (id_factura),
  ADD KEY id_usuarios (id_usuarios,id_vehiculo),
  ADD KEY id_vehiculo (id_vehiculo);

--
-- Indices de la tabla reportes
--
ALTER TABLE reportes
  ADD PRIMARY KEY (id_reportes),
  ADD KEY id_admin (id_usuarios);

--
-- Indices de la tabla usuarios
--
ALTER TABLE usuarios
  ADD PRIMARY KEY (id_usuarios);

--
-- Indices de la tabla vehiculos
--
ALTER TABLE vehiculos
  ADD PRIMARY KEY (id_vehiculo),
  ADD KEY id_usuarios (id_usuarios);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla aseguradora
--
ALTER TABLE aseguradora
  MODIFY id_aseguradora int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla entrada_salida
--
ALTER TABLE entrada_salida
  MODIFY id_entrada_salida int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla factura
--
ALTER TABLE factura
  MODIFY id_factura int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla reportes
--
ALTER TABLE reportes
  MODIFY id_reportes int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla usuarios
--
ALTER TABLE usuarios
  MODIFY id_usuarios int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT de la tabla vehiculos
--
ALTER TABLE vehiculos
  MODIFY id_vehiculo int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla aseguradora
--
ALTER TABLE aseguradora
  ADD CONSTRAINT aseguradora_ibfk_1 FOREIGN KEY (id_vehiculo) REFERENCES vehiculos (id_vehiculo);

--
-- Filtros para la tabla entrada_salida
--
ALTER TABLE entrada_salida
  ADD CONSTRAINT entrada_salida_ibfk_1 FOREIGN KEY (id_usuarios) REFERENCES usuarios (id_usuarios),
  ADD CONSTRAINT entrada_salida_ibfk_2 FOREIGN KEY (id_vehiculo) REFERENCES vehiculos (id_vehiculo);

--
-- Filtros para la tabla factura
--
ALTER TABLE factura
  ADD CONSTRAINT factura_ibfk_1 FOREIGN KEY (id_usuarios) REFERENCES usuarios (id_usuarios),
  ADD CONSTRAINT factura_ibfk_2 FOREIGN KEY (id_vehiculo) REFERENCES vehiculos (id_vehiculo);

--
-- Filtros para la tabla reportes
--
ALTER TABLE reportes
  ADD CONSTRAINT reportes_ibfk_1 FOREIGN KEY (id_usuarios) REFERENCES usuarios (id_usuarios);

--
-- Filtros para la tabla vehiculos
--
ALTER TABLE vehiculos
  ADD CONSTRAINT vehiculos_ibfk_1 FOREIGN KEY (id_usuarios) REFERENCES usuarios (id_usuarios);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
