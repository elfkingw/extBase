-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.0.16-nt


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema extbase
--

CREATE DATABASE IF NOT EXISTS extbase;
USE extbase;

--
-- Definition of table `dictionary`
--

DROP TABLE IF EXISTS `dictionary`;
CREATE TABLE `dictionary` (
  `ID` int(11) NOT NULL auto_increment,
  `DIC_KEY` varchar(5) NOT NULL,
  `DIC_VALUE` varchar(100) NOT NULL,
  `DIC_CODE` varchar(3) NOT NULL,
  `DIC_COMMENT` varchar(100) default NULL,
  `STATUS` varchar(2) NOT NULL default '01',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dictionary`
--

/*!40000 ALTER TABLE `dictionary` DISABLE KEYS */;
/*!40000 ALTER TABLE `dictionary` ENABLE KEYS */;


--
-- Definition of table `menus`
--

DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus` (
  `ID` bigint(50) NOT NULL auto_increment COMMENT '自增id',
  `MENU_ID` varchar(50) NOT NULL default '' COMMENT '菜单id',
  `NAME` varchar(100) NOT NULL default '' COMMENT '菜单名字',
  `PARENT_MENU_ID` varchar(50) default '' COMMENT '父菜单id',
  `URL` varchar(200) default NULL COMMENT '菜单链接地址',
  `ICON` varchar(50) default NULL COMMENT '菜单样式',
  `DESCRIPTION` varchar(200) default NULL COMMENT '描述',
  `MENU_TYPE` varchar(2) NOT NULL default '01' COMMENT '菜单类型 01：菜单 02：功能',
  `IS_LEAF` varchar(2) NOT NULL default '01' COMMENT '是否叶子节点 01：是 02：否',
  `ORDER_NUM` int(11) default NULL COMMENT '排序',
  `STATUS` varchar(2) NOT NULL default '01' COMMENT '状态 01有效 02无效',
  `IS_SYSTEM` varchar(2) NOT NULL default '01' COMMENT '是否是系统菜单 01：是02 ：否',
  PRIMARY KEY  (`ID`),
  UNIQUE KEY `unique_menu_id` (`MENU_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `menus`
--

/*!40000 ALTER TABLE `menus` DISABLE KEYS */;
INSERT INTO `menus` (`ID`,`MENU_ID`,`NAME`,`PARENT_MENU_ID`,`URL`,`ICON`,`DESCRIPTION`,`MENU_TYPE`,`IS_LEAF`,`ORDER_NUM`,`STATUS`,`IS_SYSTEM`) VALUES 
 (1,'100001','系统管理',NULL,NULL,'systemManage','系统管理','01','02',1,'01','01'),
 (2,'100011','菜单管理','100001','./html/privilege/menu.html','menu',NULL,'01','01',3,'01','01'),
 (4,'100002','其他菜单',NULL,NULL,'systemManage',NULL,'01','01',70,'01','01'),
 (5,'100012','角色管理','100001','./html/privilege/role.html','group','角色管理','01','01',18,'01','01'),
 (6,'100013','用户管理','100001','./html/privilege/userinfo.html','male','用户管理','01','01',12,'01','01'),
 (12,'100003','基础数据维护',NULL,NULL,'refresh','基础数据维护','01','02',50,'01','01'),
 (16,'900001','添加角色','100012',NULL,'function',NULL,'02','01',NULL,'01','01'),
 (19,'900002','修改角色','100012',NULL,'function',NULL,'02','01',NULL,'01','01'),
 (20,'900003','删除角色','100012',NULL,'function',NULL,'02','01',NULL,'01','01'),
 (21,'900004','保存权限','100012',NULL,'function',NULL,'02','01',NULL,'01','01');
/*!40000 ALTER TABLE `menus` ENABLE KEYS */;


--
-- Definition of table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `ID` int(11) NOT NULL auto_increment,
  `ROLE_NAME` varchar(100) NOT NULL default '',
  `DESCRIPTION` varchar(200) default NULL,
  `CREATE_TIME` datetime NOT NULL,
  `STATUS` varchar(2) NOT NULL default '01',
  `IS_SYSTEM` varchar(2) NOT NULL default '01',
  PRIMARY KEY  (`ID`,`CREATE_TIME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--

/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` (`ID`,`ROLE_NAME`,`DESCRIPTION`,`CREATE_TIME`,`STATUS`,`IS_SYSTEM`) VALUES 
 (1,'超级管理员','管理员','2010-03-03 22:35:03','01','01'),
 (6,'财务人员',NULL,'2010-03-27 14:35:04','01','01'),
 (7,'总经理','啊那个','2010-03-27 16:26:43','01','01');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;


--
-- Definition of table `roles_menu_relation`
--

DROP TABLE IF EXISTS `roles_menu_relation`;
CREATE TABLE `roles_menu_relation` (
  `ID` int(11) NOT NULL auto_increment,
  `ROLE_ID` int(11) NOT NULL,
  `MENU_ID` int(11) NOT NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles_menu_relation`
--

/*!40000 ALTER TABLE `roles_menu_relation` DISABLE KEYS */;
INSERT INTO `roles_menu_relation` (`ID`,`ROLE_ID`,`MENU_ID`) VALUES 
 (189,5,100001),
 (190,5,100011),
 (191,5,100012),
 (192,5,900001),
 (193,5,900002),
 (194,5,900003),
 (195,5,900004),
 (196,5,100013),
 (197,5,100002),
 (198,5,100003),
 (228,1,100001),
 (229,1,100011),
 (230,1,100012),
 (231,1,900001),
 (232,1,900002),
 (233,1,900003),
 (234,1,900004),
 (235,1,100013),
 (236,1,100002),
 (237,1,100003),
 (248,6,100002),
 (249,6,100003),
 (250,7,100001),
 (251,7,100011),
 (252,7,100012),
 (253,7,900001),
 (254,7,900002),
 (255,7,900003),
 (256,7,900004);
/*!40000 ALTER TABLE `roles_menu_relation` ENABLE KEYS */;


--
-- Definition of table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `ID` int(11) NOT NULL auto_increment,
  `USER_NAME` varchar(50) NOT NULL,
  `CNNAME` varchar(100) NOT NULL,
  `PASSWORD` varchar(100) NOT NULL,
  `STATION_CODE` varchar(30) default NULL,
  `STATION_PWD` varchar(200) default NULL,
  `DEFAULT_SKILL` varchar(50) default NULL,
  `SEX` varchar(5) NOT NULL,
  `BIRTHDAY` datetime default NULL,
  `EMAIL` varchar(50) NOT NULL,
  `CELL` varchar(50) default '',
  `CREATE_TIME` datetime NOT NULL,
  `LAST_LOGIN_TIME` datetime default NULL,
  `STATUS` varchar(2) NOT NULL default '01',
  `IS_SYSTEM` varchar(2) NOT NULL default '01',
  PRIMARY KEY  (`ID`),
  UNIQUE KEY `U_IDEX_USERS_NAME` (`USER_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`ID`,`USER_NAME`,`CNNAME`,`PASSWORD`,`STATION_CODE`,`STATION_PWD`,`DEFAULT_SKILL`,`SEX`,`BIRTHDAY`,`EMAIL`,`CELL`,`CREATE_TIME`,`LAST_LOGIN_TIME`,`STATUS`,`IS_SYSTEM`) VALUES 
 (1,'wanghua','王华','123',NULL,NULL,NULL,'001','2010-02-24 00:00:00','elfkingw@gmail.com','cell','2010-03-27 21:38:29','2010-02-24 13:17:01','01','01'),
 (5,'admin','王华','123',NULL,NULL,NULL,'001','2010-02-24 00:00:00','elfkingw@gmail.com','cell','2010-03-27 18:31:03','2010-02-24 14:16:59','01','01'),
 (6,'admin1','王华','111111',NULL,NULL,NULL,'001','2010-02-24 00:00:00','elfkingw@hotmail.com','cell','2010-03-27 18:26:53','2010-02-24 22:22:05','01','01'),
 (15,'tttt','t','111111',NULL,NULL,NULL,'001','2010-03-16 00:00:00','elfkingw@gmail.com',NULL,'2010-04-13 21:42:08',NULL,'01','01'),
 (16,'test','test','111111',NULL,NULL,NULL,'002','2010-03-19 00:00:00','elfkingw@hotmail.com',NULL,'2010-03-20 19:22:53',NULL,'01','01');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;


--
-- Definition of table `users_roles_relation`
--

DROP TABLE IF EXISTS `users_roles_relation`;
CREATE TABLE `users_roles_relation` (
  `ID` int(11) NOT NULL auto_increment,
  `USER_ID` int(11) NOT NULL,
  `ROLE_ID` int(11) NOT NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users_roles_relation`
--

/*!40000 ALTER TABLE `users_roles_relation` DISABLE KEYS */;
INSERT INTO `users_roles_relation` (`ID`,`USER_ID`,`ROLE_ID`) VALUES 
 (3,12,1),
 (4,13,1),
 (6,14,1),
 (45,16,1),
 (68,6,1),
 (69,5,6),
 (70,1,1),
 (71,1,6),
 (72,15,1),
 (73,15,7);
/*!40000 ALTER TABLE `users_roles_relation` ENABLE KEYS */;




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
