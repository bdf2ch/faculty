-- phpMyAdmin SQL Dump
-- version 4.6.0
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Июн 23 2016 г., 13:52
-- Версия сервера: 5.5.23
-- Версия PHP: 5.5.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `g92103q5_faculty`
--

-- --------------------------------------------------------

--
-- Структура таблицы `disciplines`
--

CREATE TABLE `disciplines` (
  `id` int(11) NOT NULL,
  `title` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `disciplines`
--

INSERT INTO `disciplines` (`id`, `title`) VALUES
(1, 'Теория системного анализа'),
(2, 'Высшая математика');

-- --------------------------------------------------------

--
-- Структура таблицы `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(500) CHARACTER SET utf8 NOT NULL,
  `user_id` int(11) NOT NULL,
  `timestamp` int(11) NOT NULL,
  `preview` varchar(500) CHARACTER SET utf8 NOT NULL,
  `content` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `results`
--

CREATE TABLE `results` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `professor_id` int(11) NOT NULL,
  `discipline_id` int(11) NOT NULL,
  `timestamp` int(11) NOT NULL,
  `value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `specialities`
--

CREATE TABLE `specialities` (
  `id` int(11) NOT NULL,
  `title` varchar(500) NOT NULL,
  `duration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `specialities`
--

INSERT INTO `specialities` (`id`, `title`, `duration`) VALUES
(3, '09.03.01 Информатика и вычислительная техника', 4),
(4, '09.03.02 Информационные системы и технологии (профиль: Геоинформационные системы)', 4),
(5, '09.03.03 Прикладная информатика', 4),
(10, '09.04.01 Информатика и вычислительная техника (Компьютерный анализ и интерпретация данных)', 2),
(11, '09.04.03 Прикладная информатика (Прикладная информатика в аналитической деятельности)', 2),
(12, '09.06.01 Информатика и вычислительная техника (Автоматизация и управление технологическими процессами и производствами, Математическое моделирование, численные методы и комплексы программ)', 4);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `surname` varchar(500) NOT NULL,
  `name` varchar(500) NOT NULL,
  `fname` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `is_professor` int(11) NOT NULL DEFAULT '0',
  `password` varchar(200) NOT NULL,
  `speciality_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `surname`, `name`, `fname`, `email`, `is_professor`, `password`, `speciality_id`) VALUES
(1, 'Васянов', 'Васян', 'Васянович', 'vasyan@mail.ru', 0, 'qwerty', 5),
(4, 'Тестов', 'Тест', 'Тестович', 'test@mail.ru', 0, 'qwerty', 4),
(9, 'Романовская', 'Юлия', 'Владимировна', 'romanovskayayuv@mstu.edu.ru', 1, 'romanovskayayuv@mstu.edu.ru', 0),
(10, 'Намгаладзе', 'Александр', 'Андреевич', 'namgaladzeaa@mstu.edu.ru', 1, 'namgaladzeaa@mstu.edu.ru', 0),
(11, 'Зуев', 'Юрий', 'Анатольевич', 'zuevyua@mstu.edu.ru', 1, 'zuevyua@mstu.edu.ru', 0),
(12, 'Качала', 'Вадим', 'Васильевич', 'kachalavv@mstu.edu.ru', 1, 'kachalavv@mstu.edu.ru', 0),
(13, 'Ковальчук', 'Владимир', 'Васильевич', 'kovalichukvv@mstu.edu.ru', 1, 'kovalichukvv@mstu.edu.ru', 0),
(14, 'Пантелеев', 'Владимир', 'Петрович', 'panteleevvp@mstu.edu.ru', 1, 'panteleevvp@mstu.edu.ru', 0),
(15, 'Лазарева', 'Ирина', 'Михайловна', 'lazarevaim@mstu.edu.ru', 1, 'lazarevaim@mstu.edu.ru', 0),
(16, 'Жарких', 'Александр', 'Александрович', 'zharkihaa@mstu.edu.ru', 1, 'zharkihaa@mstu.edu.ru', 0),
(17, 'Беляев', 'Владимир', 'Яковлевич', 'belyaevvya@mstu.edu.ru', 1, 'belyaevvya@mstu.edu.ru', 0),
(18, 'Богомолов', 'Роман', 'Анатольевич', 'bogomolovra@mstu.edu.ru', 1, 'bogomolovra@mstu.edu.ru', 0),
(19, 'Гомонов', 'Александр', 'Дмитриевич', 'gomonovad@mstu.edu.ru', 1, 'gomonovad@mstu.edu.ru', 0),
(20, 'Мартынов', 'Олег', 'Михайлович', 'martynovom@mstu.edu.ru', 1, 'martynovom@mstu.edu.ru', 0),
(21, 'Кацуба', 'Валентина', 'Сергеевна', 'katsubavs@mstu.edu.ru', 1, 'katsubavs@mstu.edu.ru', 0),
(22, 'Борисова', 'Людмила', 'Федоровна', 'borisovalf@mstu.edu.ru', 1, 'borisovalf@mstu.edu.ru', 0),
(23, 'Луковкин', 'Сергей', 'Борисович', 'lukovkinsb@mstu.edu.ru', 1, 'lukovkinsb@mstu.edu.ru', 0),
(24, 'Хохлова', 'Людмила', 'Ивановна', 'hohlovali@mstu.edu.ru', 1, 'hohlovali@mstu.edu.ru', 0),
(25, 'Авдеева', 'Елена', 'Николаевна', 'avdeevaen@mstu.edu.ru', 1, 'avdeevaen@mstu.edu.ru', 0),
(26, 'Качала', 'Надежда', 'Михайловна', 'kachalanm@mstu.edu.ru', 1, 'kachalanm@mstu.edu.ru', 0),
(27, 'Кириченко', 'Александр', 'Эдуардович', 'kirichenkoae@mstu.edu.ru', 1, 'kirichenkoae@mstu.edu.ru', 0),
(28, 'Котомин', 'Александр', 'Борисович', 'kotominab@mstu.edu.ru', 1, 'kotominab@mstu.edu.ru', 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `disciplines`
--
ALTER TABLE `disciplines`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `specialities`
--
ALTER TABLE `specialities`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `disciplines`
--
ALTER TABLE `disciplines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT для таблицы `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `results`
--
ALTER TABLE `results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `specialities`
--
ALTER TABLE `specialities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
