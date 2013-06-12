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
-- Definition of table `dic_type`
--

DROP TABLE IF EXISTS `dic_type`;
CREATE TABLE `dic_type` (
  `ID` int(11) NOT NULL auto_increment,
  `DIC_TYPE` varchar(50) character set utf8 NOT NULL default '',
  `DIC_NOTE` varchar(100) character set utf8 default NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dic_type`
--

/*!40000 ALTER TABLE `dic_type` DISABLE KEYS */;
INSERT INTO `dic_type` (`ID`,`DIC_TYPE`,`DIC_NOTE`) VALUES 
 (1,'SYS001','性别'),
 (2,'SYS002','民族'),
 (3,'sys003','人员类型');
/*!40000 ALTER TABLE `dic_type` ENABLE KEYS */;


--
-- Definition of table `dictionary`
--

DROP TABLE IF EXISTS `dictionary`;
CREATE TABLE `dictionary` (
  `ID` int(11) NOT NULL auto_increment,
  `DIC_TYPE` int(11) NOT NULL,
  `DIC_CODE` varchar(30) character set utf8 NOT NULL default '',
  `DIC_NAME` varchar(60) character set utf8 NOT NULL default '',
  `REMARK` varchar(100) character set utf8 default NULL,
  PRIMARY KEY  (`ID`),
  UNIQUE KEY `DIC_CODE_UNIQUE` (`DIC_CODE`,`DIC_TYPE`),
  KEY `FK_dictionary_type` (`DIC_TYPE`),
  CONSTRAINT `FK_dictionary_type` FOREIGN KEY (`DIC_TYPE`) REFERENCES `dic_type` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dictionary`
--

/*!40000 ALTER TABLE `dictionary` DISABLE KEYS */;
INSERT INTO `dictionary` (`ID`,`DIC_TYPE`,`DIC_CODE`,`DIC_NAME`,`REMARK`) VALUES 
 (1,1,'01','男','男'),
 (3,2,'001','汉族','的'),
 (4,1,'02','女',NULL),
 (5,2,'002','回族',NULL),
 (6,2,'003','维吾尔族',NULL),
 (7,3,'01','保安',NULL),
 (8,3,'02','保洁员',NULL);
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
 (1,'100001','系统管理',NULL,NULL,'setting','系统管理','01','02',1,'01','01'),
 (2,'100011','菜单管理','100001','./html/privilege/menu.html','menu',NULL,'01','01',3,'01','01'),
 (4,'100002','其他菜单管理',NULL,NULL,'baseMessage',NULL,'01','02',70,'01','01'),
 (5,'100012','角色管理','100001','./html/privilege/role.html','group','角色管理','01','01',18,'01','01'),
 (6,'100013','用户管理','100001','./html/privilege/userinfo.html','male','用户管理','01','01',12,'01','01'),
 (12,'100003','基础数据维护',NULL,NULL,'repair','基础数据维护','01','02',50,'01','01'),
 (16,'900001','添加角色','100012',NULL,'function',NULL,'02','01',NULL,'01','01'),
 (19,'900002','修改角色','100012',NULL,'function',NULL,'02','01',NULL,'01','01'),
 (20,'900003','删除角色','100012',NULL,'function',NULL,'02','01',NULL,'01','01'),
 (21,'900004','保存权限','100012',NULL,'function',NULL,'02','01',NULL,'01','01');
INSERT INTO `menus` (`ID`,`MENU_ID`,`NAME`,`PARENT_MENU_ID`,`URL`,`ICON`,`DESCRIPTION`,`MENU_TYPE`,`IS_LEAF`,`ORDER_NUM`,`STATUS`,`IS_SYSTEM`) VALUES 
 (22,'10020','公告信息管理','100003','./html/common/notice.html','notice',NULL,'01','01',NULL,'01','01'),
 (23,'100030','数据字典','100032','./html/common/dictionary.html','dictionary',NULL,'01','01',NULL,'01','01'),
 (24,'100031','数据字典类型','100032','./html/common/dicType.html','dictionary',NULL,'01','01',NULL,'01','01'),
 (25,'100032','字典管理','100002',NULL,NULL,NULL,'01','02',NULL,'01','01');
/*!40000 ALTER TABLE `menus` ENABLE KEYS */;


--
-- Definition of table `notice`
--

DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice` (
  `ID` int(11) NOT NULL auto_increment,
  `NOTICE_NAME` varchar(50) character set utf8 default NULL,
  `NOTICE_CONTENT` text character set utf8 NOT NULL,
  `CREATE_USER_ID` int(11) NOT NULL,
  `NOTICE_TIME` date NOT NULL,
  `CREATE_TIME` datetime NOT NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notice`
--

/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` (`ID`,`NOTICE_NAME`,`NOTICE_CONTENT`,`CREATE_USER_ID`,`NOTICE_TIME`,`CREATE_TIME`) VALUES 
 (14,'足球活动通知','<div><font face=\"FangSong_GB2312\"><span style=\"font-size:32px;font-family:nsimsun;\">时&nbsp; 间：的风格</span></font></div>\n<font face=\"FangSong_GB2312\"><span style=\"font-size:32px;font-family:nsimsun;\">===&gt;</span></font>',1,'2009-05-23','2010-06-06 16:18:20'),
 (15,'足球活动通知',' <div>&nbsp; <font size=\"3\">时&nbsp; 间： 2010/5/25（周二） 晚上 18:00 - 20:00<br />\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </font></div>\n<div><font size=\"3\">&nbsp;地&nbsp; 点： 源深体育中<span style=\"background-color:#feed9b;\">心&nbsp;篮</span>球场&nbsp;&nbsp;&nbsp;&nbsp; （羽山路上的篮球场入口）<br />\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </font></div>\n<div><font size=\"3\">&nbsp;&nbsp;&nbsp;&nbsp; 联系人：陈&nbsp; 力&nbsp;&nbsp; 分机6808&nbsp;<span style=\"background-color:#ffed43;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 13564594874</span></font></div>\n<div>&nbsp;</div>\n<div>&nbsp;&nbsp; <font color=\"#0000ff\"><strong>如果天气不好可能延期，届时请关注EDS通告或者和组织者联系1</strong></font></div>\n',1,'2009-05-23','2010-06-06 16:27:17'),
 (17,'满文军孙楠颁奖礼献歌 全明星高尔夫慈善赛收杆1','<p>阿斯顿飞</p>\n',1,'2009-05-27','2009-05-30 20:34:14');
INSERT INTO `notice` (`ID`,`NOTICE_NAME`,`NOTICE_CONTENT`,`CREATE_USER_ID`,`NOTICE_TIME`,`CREATE_TIME`) VALUES 
 (22,'科比一战超湖人两名宿 30+纪录平天勾仅次乔丹','<span style=\"font-size:16px;\">&nbsp;搜狐体育讯&nbsp;北京时间5月30日，湖人在客场以111-103击败太阳，西部决赛以4-2淘汰太阳晋级总决赛，与凯尔特人会师，这是湖人队史第31次晋级总决赛，这也是联盟的纪录。科比在本场比赛以191次季后赛出场纪录超越魔术师，位居湖人队史第一。此外得分达到37分，季后赛得分超越30的次数达到75次，超越史上第三的杰里-韦斯特。纳什助攻超越皮蓬，位居NBA季后赛助攻榜第五位。四节详细比分分别为：37-34、28-19、26-21、20-29（湖人在前）。</span> <p><span style=\"font-size:16px;\">　　湖人四人得分上双，科比贡献37分6个篮板2次助攻，一战超越魔术师和韦斯特两大湖人名宿。阿泰斯特贡献25分，拿下了本赛季季后赛个人得分新高。拜纳姆10分6个篮板，费舍尔11分，加索尔9分7个篮板。太阳队五人得分上双，纳什贡献21分9次助攻，小霸王斯塔德迈尔27分4个篮板，理查德森13分，弗莱和德拉季奇各得12分。</span></p>\n<table align=\"left\">\r\n<tbody>\r\n<tr>\r\n<td>\r\n<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\">\r\n<tbody>\r\n<tr>\r\n<td><a href=\"http://sports.sohu.com/20100530/n272436520.shtml\" target=\"_blank\"><img class=\"img01\" hspace=\"8\" src=\"http://i1.itc.cn/20100530/884_d9f5a444_0034_44bd_b067_87bef2949694_0.jpg\" vspace=\"4\" border=\"1\" /></a></td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n<tr>\r\n<td class=\"title12\" align=\"middle\"><a href=\"http://sports.sohu.com/20100530/n272436520.shtml\" target=\"_blank\"><font color=\"red\"><span style=\"font-size:16px;\">湖人VS太阳精彩组图</span></font></a></td>\n</tr>\n</tbody>\n</table>\n<p><span style=\"font-size:16px;\">　　</span><strong><span style=\"font-size:16px;\">科比试图抢断手指受伤</span></strong></p>\n<p><span style=\"font-size:16px;\">　　首节比赛湖人率先在内线发威 ，拜纳姆转身上篮，纳什突破后还以后仰跳投。科比跳投得手，湖人防守违例，纳什命中罚球。阿泰抢断后快攻暴扣，希尔外线远投得手并造成拜纳姆犯规，完成打四分。拜纳姆转身上篮，弗莱和阿泰斯特相继飚中三分。希尔强打科比轻松中投得手，科比抢断导致左手无名指受伤。阿泰内线勾手，理查德森两罚全中，科比强突完成2+1，此后被替换下场治疗。理查德森再中三分，费舍尔跳投，理查德森突破抛投。科比飚中远投，纳什同样还以三分。费舍尔三罚全中，阿泰转身后仰跳投，纳什突破后单手抛投，弗莱命中漂移跳投。小霸王封盖科比，并造成科比走步失误，不过小斯进攻端同样遭遇奥多姆封盖。阿泰飚中三分，小斯抢断科比，布朗飚中远投。小斯强攻完成2+1，科比强行跳投，湖人以37-34领先太阳。</span></p>\n<p><span style=\"font-size:16px;\">　　</span><strong><span style=\"font-size:16px;\">阿泰斯特17分全场最高 纳什超越皮蓬</span></strong></p>\n<p><span style=\"font-size:16px;\">　　次节比赛武贾西奇和杜德利相继飚中三分，杜德利在防守端封盖奥多姆，阿蒙德森打板中投。奥多姆飞身暴扣，德拉季奇反击上篮。杜德利再度封盖阿泰，湖人连续出现失误，德拉季奇后仰跳投。武贾西奇还以中投，拜纳姆空接暴扣。法玛尔飚中远投，拜纳姆封盖小斯，小霸王中投得手。阿泰再度飚中远投，此后抢断弗莱反身上篮。希尔封盖加索尔，拜纳姆补篮得手，弗莱飚中远投。加索尔转身强攻上篮，理查德森飚中三分，纳什拿下第6次助攻，季后赛职业生涯达到1049次，超越前公牛巨星皮蓬的1048次纪录，位居联盟第五。奥多姆强行上篮，科比命中超远距离三分。湖人在半场以65-53领先太阳12分之多。</span></p>\n<p><span style=\"font-size:16px;\">　</span><strong><span style=\"font-size:16px;\">　阿泰得分创本赛季季后赛新高</span></strong></p>\n<p><span style=\"font-size:16px;\">　　下半场比赛开始后太阳连续进攻不中，费舍尔外线飚中远投，纳什突破后高难度后仰命中。拜纳姆两罚全中，纳什跳投再取两分。科比和弗莱相继跳投得手，纳什转身中投命中。科比造犯规两罚全中，小斯空切暴扣。拜纳姆封盖小斯，阿泰二次进攻上篮得手。科比和理查德森相继依靠罚球取分，阿泰斯特飚中三分，拿下第22分，创造了本赛季季后赛个人得分新高。加索尔两罚全中，阿泰突破后拉杆上篮得手。小斯空切飞身暴扣，科比干拔跳投，巴博萨远投得手。科比后仰跳投接管比赛，巴博萨同样中投命中。科比向底线横移跳投得手，湖人以91-74领先太阳多达17分。</span></p>\n<p><span style=\"font-size:16px;\">　</span><strong><span style=\"font-size:16px;\">　武贾西奇恶意犯规 科比超越韦斯特</span></strong></p>\n<p><span style=\"font-size:16px;\">　　末节比赛德拉季奇突破武贾西奇跳投得手，武贾西奇进攻中故意肘击德拉季奇面部，被吹罚一级恶意犯规。德拉季奇两罚全中，此后连续两次突破上篮，为太阳连取8分。法玛尔中投得手，弗莱远距离跳投命中。小斯强行暴扣，费舍尔跳投得手。小霸王连投带罚拿下4分，随后在防守端封盖奥多姆。科比飞身抛投，巴博萨突破上篮。费舍尔急停跳投得手，小斯两罚全中。纳什跳投得手，科比在两人包夹防守下跳投得手，拿下30分，季后赛得分超越30的次数达到75次，超越史上第三的杰里-韦斯特。科比和小斯各自两罚全中，加索尔二次进攻得手。小斯突破上篮，科比强行干拔跳投得手。纳什飚中三分，湖人连续罚球得手，最终以111-103击败太阳，与凯尔特人会师总决赛。</span></p>\n',1,'2009-05-30','2009-05-30 17:15:20'),
 (23,'科比一战超湖人两名宿','<table align=\"left\">\r\n<tbody>\r\n<tr>\r\n<td>\r\n<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\">\r\n<tbody>\r\n<tr>\r\n<td><img alt=\"\" src=\"/extBase/attached/20100606171201_110.jpg\" border=\"0\" /><a href=\"http://sports.sohu.com/20100530/n272436520.shtml\" target=\"_blank\"></a></td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n<tr>\r\n<td class=\"title12\" align=\"middle\"><a href=\"http://sports.sohu.com/20100530/n272436520.shtml\" target=\"_blank\"><font color=\"red\">湖人VS太阳精彩组图</font></a></td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;<a class=\"articleLink\" href=\"http://data.sports.sohu.com/nba/boxscore_html/boxscore_2010052921.htm\" target=\"_blank\"><strong><font color=\"#ff0000\">数据</font></strong></a><strong><font color=\"#ff0000\"> </font></strong><a class=\"articleLink\" href=\"http://data.sports.sohu.com/nba/nba_shot_chart.php?gamecode=2010052921\" target=\"_blank\"><strong><font color=\"#ff0000\">投篮点</font></strong></a><strong><font color=\"#ff0000\"> </font></strong><a class=\"articleLink\" href=\"http://sports.sohu.com/20100530/n272436520.shtml\" target=\"_blank\"><strong><font color=\"#ff0000\">组图</font></strong></a><strong><font color=\"#ff0000\"> </font></strong><a class=\"articleLink\" href=\"http://sports.sohu.com/20100530/n272438407.shtml\" target=\"_blank\"><strong><font color=\"#ff0000\">调查</font></strong></a><strong><font color=\"#ff0000\"> </font></strong><a class=\"articleLink\" href=\"http://comment2.news.sohu.com/default/debate.shtml?c=140126520&amp;t=272438140\" target=\"_blank\"><strong><font color=\"#ff0000\">辩论</font></strong></a><strong><font color=\"#ff0000\"> </font></strong><a class=\"articleLink\" href=\"http://sports.sohu.com/20100530/n272438408.shtml\" target=\"_blank\"><strong><font color=\"#ff0000\">实录</font></strong></a></p>\n<p>&nbsp;<span style=\"font-size:18px;\">&nbsp;&nbsp;&nbsp;搜狐体育讯&nbsp;北京时间5月30日，湖人在客场以111-103击败太阳，西部决赛以4-2淘汰太阳晋级总决赛，与凯尔特人会师，这是湖人队史第31次晋级总决赛。科比在本场比赛以191次季后赛出场纪录超越魔术师，位居湖人队史第一。此外得分达到37分，季后赛得分超越30的次数达到75次，超越史上第三的杰里-韦斯特。</span></p>\n<p><span style=\"font-size:18px;\">　　在14年的NBA职业生涯，科比已经为湖人征战了191场季后赛，称为湖人队史征战季后赛场次最多的一位球员。不过如果放眼全联盟，那么科比的季后赛出场次数只能排在第八，在他前面一位的是队友费舍尔。费舍尔目前季后赛出战191次，但他有两个赛季是效力</span>爵士，因此为湖人出战的季后赛场次没有科比多。此外，现役球员中季后赛出场次数超越科比的除了费舍尔之后，就只有季后赛出战214场的大鲨鱼奥尼尔了。在NBA历史上，季后赛出场纪录由霍利保持，他一共在季后赛出战了244场，科比至少还需要两个赛季，且全部在季后赛系列赛中打满七场，并且打进总决赛，才有望超越霍利。</p>\n<p>　　此外，科比在本场比赛中拿下37分，这是他季后赛职业生涯第75次得分超过30分。凭借本场比赛再度获得的30+，科比成功超越74次在季后赛获得30+的湖人名宿韦斯特，成为湖人队史上季后赛获得30+次数最多的球员。在NBA历史上，天勾贾巴尔同样在季后赛获得过75次30+的成绩，科比与他并列联盟第二。位居第一的是季后赛获得109次30+得分的飞人乔丹。</p>\n<p>　　此外，科比在本场比赛中出战40分钟，他在季后赛总出场时间达到了7521分钟，超越了季后赛总出场时间为7497的比尔-拉塞尔，成功位居历史第七位，距离魔术师约翰逊的7538分钟出场纪录仅仅差17分钟，有望在下一场比赛中完成超越。</p>\n<p>　　以下是NBA季后赛出场场次前十名纪录：</p>\n<p>　　1、罗伯特-霍利 244次</p>\n<p>　　2、贾巴尔 237次</p>\n<p>　　3、沙克-奥尼尔 214次</p>\n<p>　　4、斯科蒂-皮蓬 208次</p>\n<p>　　5、卡尔-马龙 193次</p>\n<p>　　6、丹尼-安吉 193次</p>\n<p>　　7、德里克-费舍尔 192次</p>\n<p>　　8、科比-布莱恩特 191次</p>\n<p>　　9、魔术师约翰逊 190次</p>\n<p>　　10、朱利斯-欧文 189次（晓月山风）</p>\n',1,'2009-05-30','2010-06-06 17:12:05');
INSERT INTO `notice` (`ID`,`NOTICE_NAME`,`NOTICE_CONTENT`,`CREATE_USER_ID`,`NOTICE_TIME`,`CREATE_TIME`) VALUES 
 (24,'阿泰25分创季后赛新高 绝杀效应助其生死战爆发','&nbsp;&nbsp;搜狐体育讯&nbsp;北京时间5月30日，西部决赛第六战，湖人客场以111比103击败太阳，将总比分改写成4比2，卫冕冠军成功晋级总决赛。阿泰斯特成为了帮助湖人获胜的第二号功臣，他上场41分钟，16投10中，三分球7投4中，贡献25分（创下今年季后赛他个人的得分新高）4篮板2助攻3抢断，没有失误，仅有1次犯规。<p>　　西部决赛里，阿泰斯特的表现相比于前两轮有了明显的进步。前两轮，他一共只有4场比赛得分上双，而这个系列赛的6场比赛里，他有5场比赛得分上双，另外那1场比赛，也就是上一战，他虽然只得到4分，但是却贡献了绝杀。绝杀效应，再加上昨天因为训练迟到而被被罚款，导致了他本场的爆发。</p>\n<p>　　开场后，阿泰斯特呈现火力全开状态，前3次出手全部命中，先是抢断洛佩兹完成快攻一条龙暴扣，接着投中一记定点三分，然后又在低位勾手命中。后半段，他又在禁区附近和三分线外各投中一球。首节，他独得12分，高居全队第一，风头甚至盖过了科比。湖人之所以能够在开局就占据主动，阿泰斯特居功至伟。</p>\n<p>　　第二节，他的手感依然火热，但是他并没有因此而刻意要求更多的持球机会，他的得分基本上都来自于无球接应后的出手，另外，他拼抢前场篮板也非常积极。这一节，他再得5分，上半场临近结束时，他连续送出2次助攻，掀起了一波7比2的小高潮，确保湖人带着两位数的优势进入下半场。上半场，他11投7中，三分球4投3中，贡献17分2篮板2助攻2抢断，没有犯规和失误，表现堪称完美。</p>\n',1,'2009-05-30','2009-05-30 16:23:38');
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;


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
 (1,'超级管理员','管理员','2009-06-01 22:50:30','01','01'),
 (6,'财务人员','asf','2009-06-01 22:50:34','01','01'),
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
 (257,1,100001),
 (258,1,100011),
 (259,1,100012),
 (260,1,900001),
 (261,1,900002),
 (262,1,900003),
 (263,1,900004),
 (264,1,100013),
 (265,1,100002),
 (266,1,100032),
 (267,1,100030),
 (268,1,100031),
 (269,1,100003),
 (270,1,10020),
 (284,7,100001),
 (285,7,100011),
 (286,7,100012),
 (287,7,900001),
 (288,7,900002),
 (289,7,900003),
 (290,7,900004),
 (291,7,100002),
 (292,7,10020),
 (300,6,100001),
 (301,6,100011),
 (302,6,100013),
 (303,6,100002),
 (304,6,100032),
 (305,6,100003);
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
 (1,'wanghua','王华','123',NULL,NULL,NULL,'001','2010-02-24 00:00:00','elfkingw@gmail.com','cell','2009-05-30 00:01:19','2010-02-24 13:17:01','01','01'),
 (5,'admin','admin','123',NULL,NULL,NULL,'001','2010-02-24 00:00:00','elfkingw@gmail.com','cell','2010-06-06 15:39:13','2010-02-24 14:16:59','01','01'),
 (6,'admin1','王华','111111',NULL,NULL,NULL,'001','2010-02-24 00:00:00','elfkingw@hotmail.com','cell','2009-06-01 22:47:41','2010-02-24 22:22:05','01','01'),
 (15,'elfkingw','小芳','111111',NULL,NULL,NULL,'002','2010-03-16 00:00:00','elfkingw@gmail.com',NULL,'2010-06-06 19:40:42',NULL,'01','01'),
 (16,'test','test','111111',NULL,NULL,NULL,'002','2010-03-19 00:00:00','elfkingw@hotmail.com',NULL,'2010-05-09 14:39:38',NULL,'01','01');
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
 (82,1,1),
 (83,1,6),
 (85,6,1),
 (86,6,6),
 (87,5,6),
 (88,5,1),
 (89,15,7);
/*!40000 ALTER TABLE `users_roles_relation` ENABLE KEYS */;




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
