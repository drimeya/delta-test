-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Фев 07 2023 г., 21:58
-- Версия сервера: 5.7.27-30-log
-- Версия PHP: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `paulinnnya`
--

-- --------------------------------------------------------

--
-- Структура таблицы `data`
--

CREATE TABLE `data` (
  `id` int(255) NOT NULL,
  `paymentMethod` text NOT NULL,
  `clientId` int(255) NOT NULL,
  `removeBeforePay` int(255) NOT NULL,
  `removeAfterPay` int(255) NOT NULL,
  `summ` int(255) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `data`
--

INSERT INTO `data` (`id`, `paymentMethod`, `clientId`, `removeBeforePay`, `removeAfterPay`, `summ`, `date`) VALUES
(1, 'nal', 1, 150, 0, 2450, '2023-02-06'),
(2, 'nal', 2, 0, 0, 1080, '2023-02-06'),
(3, 'card', 3, 0, 0, 200, '2023-02-06'),
(4, 'credit', 4, 0, 0, 2000, '2023-02-06'),
(5, 'card', 5, 0, 140, 1478, '2023-02-06'),
(6, 'card', 6, 150, 0, 1356, '2023-02-06'),
(7, 'nal', 1, 0, 0, 120, '2023-02-06'),
(8, 'credit', 7, 0, 0, 5700, '2023-02-06'),
(9, 'nal', 8, 0, 0, 1200, '2023-02-06'),
(10, 'nal', 2, 0, 0, 2556, '2023-02-05'),
(11, 'card', 3, 0, 3457, 8755, '2023-02-05'),
(12, 'nal', 4, 0, 0, 2000, '2023-02-05'),
(13, 'card', 5, 0, 140, 1478, '2023-02-05'),
(14, 'card', 1, 0, 0, 1356, '2023-02-05'),
(15, 'nal', 1, 0, 0, 120, '2023-02-05'),
(16, 'credit', 7, 0, 0, 5700, '2023-02-05'),
(17, 'nal', 8, 0, 0, 1200, '2023-02-05'),
(18, 'nal', 2, 0, 0, 1080, '2023-02-05'),
(19, 'card', 3, 0, 0, 200, '2023-02-05'),
(20, 'credit', 4, 0, 0, 2000, '2023-02-05'),
(21, 'card', 5, 0, 140, 1478, '2023-02-05'),
(22, 'card', 6, 150, 0, 1356, '2023-02-05'),
(23, 'nal', 1, 0, 0, 120, '2023-02-06'),
(24, 'credit', 7, 0, 0, 5700, '2023-02-06'),
(25, 'nal', 8, 0, 0, 1200, '2023-02-06'),
(26, 'nal', 2, 0, 0, 1080, '2023-02-04'),
(27, 'card', 3, 0, 0, 200, '2023-02-04'),
(28, 'credit', 8, 0, 0, 4600, '2023-02-04'),
(29, 'card', 5, 0, 140, 1478, '2023-02-04'),
(30, 'card', 6, 300, 0, 1356, '2023-02-04'),
(31, 'nal', 12, 0, 0, 120, '2023-02-04'),
(32, 'credit', 7, 0, 0, 120, '2023-02-04'),
(33, 'nal', 8, 0, 0, 1200, '2023-02-04'),
(34, 'nal', 2, 0, 0, 1080, '2023-02-03'),
(35, 'card', 3, 0, 500, 200, '2023-02-03'),
(36, 'credit', 4, 0, 0, 2000, '2023-02-03'),
(37, 'card', 5, 0, 140, 1478, '2023-02-03'),
(38, 'card', 6, 150, 0, 1356, '2023-02-04'),
(39, 'nal', 1, 0, 0, 120, '2023-02-03'),
(40, 'nal', 7, 0, 0, 2600, '2023-02-03'),
(41, 'nal', 8, 0, 0, 1500, '2023-02-03'),
(42, 'nal', 2, 0, 0, 1080, '2023-02-02'),
(43, 'card', 3, 0, 0, 200, '2023-02-02'),
(44, 'credit', 4, 0, 0, 2000, '2023-02-02'),
(45, 'card', 5, 0, 140, 1478, '2023-02-06'),
(46, 'card', 6, 150, 0, 1356, '2023-02-02'),
(47, 'nal', 1, 0, 0, 120, '2023-02-02'),
(48, 'credit', 7, 0, 0, 5700, '2023-02-02'),
(49, 'nal', 8, 0, 0, 1200, '2023-02-02'),
(50, 'nal', 2, 0, 0, 1600, '2023-02-01'),
(51, 'card', 3, 0, 0, 200, '2023-02-01'),
(52, 'card', 4, 0, 0, 5000, '2023-02-01'),
(53, 'card', 5, 0, 140, 1478, '2023-02-01'),
(54, 'card', 6, 500, 0, 1356, '2023-02-01'),
(55, 'nal', 2, 0, 0, 0, '2023-02-01'),
(56, 'credit', 7, 0, 0, 577, '2023-02-01'),
(57, 'nal', 2, 0, 0, 1080, '2023-02-07'),
(58, 'card', 3, 0, 0, 200, '2023-02-07'),
(59, 'credit', 4, 0, 0, 2000, '2023-02-07'),
(60, 'card', 5, 0, 140, 1478, '2023-02-07'),
(61, 'card', 6, 150, 0, 1356, '2023-02-07'),
(62, 'nal', 1, 0, 0, 120, '2023-02-07'),
(63, 'credit', 7, 0, 0, 5700, '2023-02-07'),
(64, 'nal', 8, 0, 0, 1200, '2023-02-07'),
(65, 'nal', 76, 54, 0, 3450, '2023-02-07'),
(66, 'nal', 4, 54, 0, 3450, '2023-02-07'),
(67, 'nal', 2, 0, 0, 2500, '2023-02-07'),
(68, 'card', 1, 54, 0, 1800, '2023-02-07'),
(69, 'credit', 76, 0, 0, 3450, '2023-02-07'),
(70, 'nal', 9, 0, 0, 3450, '2023-02-08'),
(71, 'nal', 8, 54, 0, 3450, '2023-02-08'),
(72, 'nal', 5, 0, 0, 3450, '2023-02-08'),
(73, 'nal', 5, 54, 0, 2300, '2023-02-08'),
(74, 'nal', 0, 54, 0, 3450, '2023-02-08');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `data`
--
ALTER TABLE `data`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
