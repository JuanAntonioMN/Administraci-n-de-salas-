-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-04-2024 a las 03:02:07
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sala_juntas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservaciones`
--

CREATE TABLE `reservaciones` (
  `id_reservacion` bigint(20) UNSIGNED NOT NULL,
  `id_sala` bigint(20) UNSIGNED NOT NULL,
  `hora_inicial` time DEFAULT NULL,
  `hora_final` time DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `reservaciones`
--

INSERT INTO `reservaciones` (`id_reservacion`, `id_sala`, `hora_inicial`, `hora_final`, `fecha`) VALUES
(2, 12, '19:01:00', '20:01:00', '2024-04-24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salas`
--

CREATE TABLE `salas` (
  `id_sala` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `capacidad` int(11) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `salas`
--

INSERT INTO `salas` (`id_sala`, `nombre`, `capacidad`, `available`) VALUES
(11, 'Sala de matematicas', 100, 0),
(12, 'Sala de ciencias ', 14, 1),
(13, 'Tecnologia', 100, 0);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `view_reservacionesdetalles`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `view_reservacionesdetalles` (
`id_reservacion` bigint(20) unsigned
,`id_sala` bigint(20) unsigned
,`hora_inicial` time
,`hora_final` time
,`fecha` date
,`sala_nombre` varchar(30)
,`capacidad` int(11)
,`sala_disponible` tinyint(1)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `view_reservacionesdetalles`
--
DROP TABLE IF EXISTS `view_reservacionesdetalles`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_reservacionesdetalles`  AS SELECT `reserva`.`id_reservacion` AS `id_reservacion`, `reserva`.`id_sala` AS `id_sala`, `reserva`.`hora_inicial` AS `hora_inicial`, `reserva`.`hora_final` AS `hora_final`, `reserva`.`fecha` AS `fecha`, `sala`.`nombre` AS `sala_nombre`, `sala`.`capacidad` AS `capacidad`, `sala`.`available` AS `sala_disponible` FROM (`reservaciones` `reserva` join `salas` `sala` on(`reserva`.`id_sala` = `sala`.`id_sala`)) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `reservaciones`
--
ALTER TABLE `reservaciones`
  ADD PRIMARY KEY (`id_reservacion`),
  ADD KEY `reservaciones_id_sala_foreign` (`id_sala`);

--
-- Indices de la tabla `salas`
--
ALTER TABLE `salas`
  ADD PRIMARY KEY (`id_sala`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `reservaciones`
--
ALTER TABLE `reservaciones`
  MODIFY `id_reservacion` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `salas`
--
ALTER TABLE `salas`
  MODIFY `id_sala` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `reservaciones`
--
ALTER TABLE `reservaciones`
  ADD CONSTRAINT `reservaciones_id_sala_foreign` FOREIGN KEY (`id_sala`) REFERENCES `salas` (`id_sala`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
