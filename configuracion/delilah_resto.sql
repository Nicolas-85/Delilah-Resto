-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-09-2020 a las 00:44:45
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilah resto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `Id` int(11) NOT NULL,
  `metodoPago` enum('efectivo','tarjeta') NOT NULL,
  `total` float NOT NULL,
  `userID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`Id`, `metodoPago`, `total`, `userID`) VALUES
(3, 'efectivo', 3000, NULL),
(4, 'efectivo', 3000, NULL),
(5, 'efectivo', 3000, NULL),
(6, 'efectivo', 3000, NULL),
(7, 'efectivo', 3000, NULL),
(8, 'efectivo', 3000, NULL),
(10, 'efectivo', 3000, NULL),
(11, 'efectivo', 3000, NULL),
(12, 'efectivo', 3000, NULL),
(13, 'efectivo', 3000, NULL),
(14, 'efectivo', 3000, NULL),
(15, 'efectivo', 3000, NULL),
(16, 'efectivo', 3000, NULL),
(17, 'efectivo', 3000, NULL),
(18, 'efectivo', 3000, NULL),
(19, 'efectivo', 3000, 2),
(20, 'efectivo', 3000, 1),
(21, 'efectivo', 3000, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `Id` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `categoria` enum('comida','bebida','postre') NOT NULL,
  `precio` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`Id`, `nombre`, `categoria`, `precio`) VALUES
(2, 'vino', 'bebida', 500),
(3, 'casata', 'postre', 1000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productopedido`
--

CREATE TABLE `productopedido` (
  `Id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `subtotal` float NOT NULL,
  `pedidoId` int(11) DEFAULT NULL,
  `productoId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productopedido`
--

INSERT INTO `productopedido` (`Id`, `cantidad`, `subtotal`, `pedidoId`, `productoId`) VALUES
(1, 2, 0, NULL, NULL),
(2, 2, 0, NULL, NULL),
(3, 2, 0, NULL, NULL),
(4, 2, 0, NULL, NULL),
(5, 2, 0, NULL, NULL),
(6, 2, 0, NULL, NULL),
(7, 2, 0, NULL, NULL),
(8, 2, 0, NULL, NULL),
(9, 2, 0, NULL, NULL),
(10, 2, 0, NULL, NULL),
(11, 2, 0, NULL, NULL),
(12, 2, 0, NULL, NULL),
(13, 2, 0, NULL, NULL),
(14, 2, 0, NULL, NULL),
(15, 2, 0, NULL, NULL),
(16, 2, 0, NULL, NULL),
(17, 2, 0, NULL, NULL),
(18, 2, 0, NULL, NULL),
(19, 2, 0, NULL, NULL),
(20, 2, 0, NULL, NULL),
(21, 2, 0, NULL, NULL),
(22, 2, 0, NULL, NULL),
(23, 2, 0, NULL, NULL),
(24, 2, 0, NULL, NULL),
(25, 2, 0, NULL, NULL),
(26, 2, 0, NULL, NULL),
(27, 2, 2000, NULL, NULL),
(28, 2, 1000, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `Id` int(11) NOT NULL,
  `Username` text NOT NULL,
  `Password` text NOT NULL,
  `Email` text NOT NULL,
  `Telefono` text NOT NULL,
  `direccion` text NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`Id`, `Username`, `Password`, `Email`, `Telefono`, `direccion`, `isAdmin`) VALUES
(1, 'Nicoas', 'asd123', 'sasd123@gmail.com', '+asd2eqw232', 'tesd23123', 0),
(2, 'wacho', 'asd123', 'nico@appok', '+asd2eqw232', 'tesd23123', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Id` (`Id`),
  ADD KEY `userID` (`userID`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Id` (`Id`);

--
-- Indices de la tabla `productopedido`
--
ALTER TABLE `productopedido`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Id` (`Id`),
  ADD UNIQUE KEY `productopedido_productoId_pedidoId_unique` (`pedidoId`,`productoId`),
  ADD KEY `productoId` (`productoId`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Id` (`Id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `productopedido`
--
ALTER TABLE `productopedido`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `usuario` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `productopedido`
--
ALTER TABLE `productopedido`
  ADD CONSTRAINT `productopedido_ibfk_1` FOREIGN KEY (`pedidoId`) REFERENCES `pedido` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productopedido_ibfk_2` FOREIGN KEY (`productoId`) REFERENCES `producto` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
