# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: jeremygao.net (MySQL 5.7.21)
# Database: wxapp
# Generation Time: 2018-04-19 05:40:10 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table access
# ------------------------------------------------------------

DROP TABLE IF EXISTS `access`;

CREATE TABLE `access` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `token` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT 'access_token',
  `expires` int(11) NOT NULL COMMENT '过期时间，单位(s)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `access` WRITE;
/*!40000 ALTER TABLE `access` DISABLE KEYS */;

INSERT INTO `access` (`id`, `token`, `expires`)
VALUES
	(4,'8_cuEOR6I9zyYSMRje-tji4g6JFKFwKdOWHv3mF9ZjDvRaIJLU_0Nda_2abRNM9lo86IITgt8L1Sg5Wy7rsyZ15HFVeuKvYOXlO7NddeE5FzV1hQuR-r1KQil4sitpjJs_rezA3-US6rEovpB2VGOcAGAMXF',7200);

/*!40000 ALTER TABLE `access` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table books
# ------------------------------------------------------------

DROP TABLE IF EXISTS `books`;

CREATE TABLE `books` (
  `bkid` int(16) unsigned NOT NULL AUTO_INCREMENT COMMENT '书籍id',
  `bkclass` int(11) DEFAULT NULL COMMENT '书籍类别',
  `bkname` varchar(48) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '书籍名称',
  `bkauthor` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '书籍作者',
  `bkpublisher` varchar(16) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '书籍出版社',
  `bkfile` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '书籍文件地址',
  `bkcover` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '书籍封面',
  `bkprice` int(11) DEFAULT '1' COMMENT '书籍积分',
  PRIMARY KEY (`bkid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;

INSERT INTO `books` (`bkid`, `bkclass`, `bkname`, `bkauthor`, `bkpublisher`, `bkfile`, `bkcover`, `bkprice`)
VALUES
	(1000000001,3,'深入浅出Node.js','朴灵','人民邮电出版社','******** book file ********','https://img3.doubanio.com/lpic/s27269296.jpg',1),
	(1000000002,3,'红宝书','Nicholas C.Zakas','人民邮电出版社','******** book file ********','https://img3.doubanio.com/lpic/s8958650.jpg',1),
	(1000000003,1,'解忧杂货店','东野奎吾','南海出版公司','******** book file ********','https://img3.doubanio.com/lpic/s27264181.jpg',1),
	(1000000004,2,'红楼梦','曹雪芹','人民文学出版社','******** book file ********','https://img1.doubanio.com/lpic/s1070959.jpg',1),
	(1000000005,1,'安徒生童话故事集','汉斯·克里斯蒂安·安徒生 ','人民文学出版社','******** book file ********','https://img3.doubanio.com/lpic/s1034062.jpg',1);

/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table comment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `cmid` int(16) unsigned NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `uid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户openid',
  `uname` varchar(48) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名称',
  `ccontent` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '评论内容',
  `bkname` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '书籍名称',
  `bkid` int(16) NOT NULL COMMENT '书籍ID',
  `uavatar` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户头像',
  `ctime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '评论时间',
  PRIMARY KEY (`cmid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table orders
# ------------------------------------------------------------

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `oid` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '订单ID',
  `uid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户openid',
  `oprice` int(11) DEFAULT '0' COMMENT '书籍价格',
  `otime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '订单创建时间',
  `bkid` int(16) NOT NULL COMMENT '书籍ID',
  PRIMARY KEY (`oid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(64) unsigned NOT NULL AUTO_INCREMENT,
  `uid` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户openid',
  `uname` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '用户微信名',
  `ugender` int(1) DEFAULT NULL COMMENT '用户性别',
  `uaddress` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户地址',
  `ubalance` int(11) DEFAULT NULL COMMENT '用户积分余额',
  `uavatar` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户头像',
  `skey` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户登录态标识',
  `sessionkey` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '微信登录态标识',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '账号注册时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '用户最近登录时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
