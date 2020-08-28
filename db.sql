CREATE DATABASE IF NOT EXISTS `dbusers` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `dbusers`;

CREATE TABLE IF NOT EXISTS `tblusers` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `dob` varchar(12) NOT NULL,
  `gender` int(2) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `tblusers` (`id`, `username`, `password`, `name`,`dob`, `gender`) VALUES (1, 'test', 'test', 'test user', '1990-01-01', 0);

ALTER TABLE `tblusers` ADD PRIMARY KEY (`id`);
ALTER TABLE `tblusers` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;