-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2024-01-12 16:17:32
-- 服务器版本： 5.5.62-log
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `v3_pbstar_admin`
--

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `account` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `create_time` varchar(255) DEFAULT NULL,
  `is_delete` varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `name`, `account`, `password`, `role`, `token`, `create_time`, `is_delete`) VALUES
(1, '开发', 'root', '1', '-1', 'TVE9PV9NVGN3TlRBek1UTTVOekUwTWc9PV9iRzEzZWc9PQ==', '2023-12-19 18:52:12', '0'),
(2, '超管', 'admin', '12345678', '1', 'Mg==_MTcwNDc2NTE1OTM3Mw==_NTZnag==', '2023-12-19 18:52:12', '0'),
(3, '店铺管理员', 'dianpu', '12345678', '2', '', '2023-12-19 18:52:12', '0'),
(4, '店长1', 'dianzhang1', '12345678', '3', '', '2023-12-19 18:52:12', '0'),
(5, '店长2', 'dianzhang2', '12345678', '3', '', '2023-12-19 18:52:12', '0'),
(6, '店长3', 'dianzhang3', '12345678', '3', '', '2023-12-19 18:52:12', '0'),
(7, '店长4', 'dianzhang4', '12345678', '3', '', '2023-12-19 18:52:12', '0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
