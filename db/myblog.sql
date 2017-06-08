#设置SQL语句的编码方式//必须
SET NAMES UTF8;
#删除数据库myblog
DROP DATABASE IF EXISTS myblog;
#重建数据库myblog，数据编码使用UTF8			
CREATE DATABASE myblog CHARSET=UTF8;
#进入数据库myblog
USE myblog;

CREATE TABLE user(
	uid INT PRIMARY KEY AUTO_INCREMENT,#自增ID
	account VARCHAR(20),#账号
	password VARCHAR(50),#密码
	name VARCHAR(30),#名称
	createtime DATETIME,#注册时间
	phone VARCHAR(20),#手机号
	email VARCHAR(50),#邮箱号
	spic VARCHAR(50),#小头像
	bpic VARCHAR(50),#大头像
	hobby VARCHAR(300),#兴趣
	skills VARCHAR(500)#技能
);
INSERT INTO user VALUES(
	1,'victor','888999','Victor Wu','2016-10-12 16:52:08',
	'18150084782','524223270@qq.com','images/02_small.jpg','images/02.jpg',
	'音乐、篮球、游泳、唱歌...','{"HTML":"95%","CSS":"95%","JS":"90%","PHP":"50%"}'
);
INSERT INTO user VALUES(
	2,'bingo','admin123','Bingo Chen','2016-10-12 10:52:08',
	'18150084782','456789@sohu.com','images/01_small.jpg','images/01.jpg',
	'吃，吃，还是吃...','{"HTML":"95%","CSS":"95%","JS":"90%","PHP":"50%"}'
);

CREATE TABLE moods(
	mid INT PRIMARY KEY AUTO_INCREMENT,#自增ID
	mcontent VARCHAR(130),
	createtime DATETIME,#注册时间
	userid INT
);
INSERT INTO moods VALUES
(1,'今天的天气真是不错啊！','2016-09-06 20:27:08',1),
(2,'今天天气很适合睡觉！','2016-10-06 20:27:08',1),
(3,'今天中午想吃饺子！','2016-10-14 09:27:08',1);

CREATE TABLE note(
	nid INT PRIMARY KEY AUTO_INCREMENT,#自增ID
	ntitle VARCHAR(30),
	createtime DATETIME,
	ncontent TEXT,
	userid INT
);
INSERT INTO note VALUES
(1,'如何规划blog的标签（tag）和分类','2016-09-19 10:16:02','标签(tag)是比较新兴的一种信息管理方式。与分类最大的不同是每个项目(Item)可以有多个标签。标签之间没有关系，但是通过内容可以使不同的标签之间产生关联。 如果某个项目（Item)具有多个标签，那么这多个标签之间就产生了某种相关性。相关性可以表达任何一种关系，可以用相关性表示出一颗分类树，也可以表示出一张图（Graph）。 增加标签的代价非常小，完全可以在产生项目（Item）之后再按需增加标签，并通过关联使新的标签与原来的标签之间产生相关性关系。由于标签更加灵活强大，变更的代价又很小，在很多同时支持分类和标签的系统或软件工具中都在逐步淡化分类的作用。比如，gmail中的分类功能就是用标签实现的；evernote中的笔记本只支持两级划分（笔记本组和笔记本）；博客园的博客系统只支持一级分类。',1),
(2,'R学习笔记(1)：R是什么','2016-09-20 19:22:54','R语言是一种面向对象的语言，所有的对象都有两个内在属性：元素类型和长度。 元素类型是对象内元素的基本类型，包括：数值(numeric),字符型(character),复数型(complex)、逻辑型（logical）、函数（function）等，通过mode函数可以查看一个对象的类型。长度是对象中元素的数目，通过函数length()可以查看对象的长度。除了元素类型外，对象本身也有不同的“类型”，表示不同的数据结构（struct)。R中的对象类型主要包括：向量(vector): 由一系列有序元素构成。因子(factor）：对同长的其他向量元素进行分类（分组）的向量对象。R 同时提供有序（ordered）和无序（unordered）因子。数组(array)：带有多个下标的类型相同的元素的集合矩阵(matrix)：矩阵仅仅是一个双下标的数组。R提供了一下函数专门处理二维数组（矩阵）。数据框(data frame)：和矩阵类似的一种结构。在数据框中，列可以是不同的对象。时间序列(time series)：包含一些额外的属性,如频率和时间.列表（list）:是一种泛化（general form）的向量。它没有要求所有元素是同一类型，许多时候就是向量和列表类型。列表为统计计算的结果返回提供了一种便利的方法。',1),
(3,'前端学习笔记','2016-10-02 15:22:22','学习内容来自：《JavaScript高级程序设计（第三版）》正文：我们知道，在js中，函数实际上是一个对象，每个函数都是Function类型的实例，并且都与其他引用类型一样具有属性和方法。因此，函数名实际上是指向函数对象的指针，不与某个函数绑定。在常见的两种定义方式（见下文）之外，还有一种定义的方式能更直观的体现出这个概念。',1),
(4,'js排序算法总结','2016-10-10 19:30:50','加入我们进行升序排列，我们假设数组第一项为最小值，然后将第一项与其他项分别比较，如果其他项小于第一项，则交换位置，这样第一次循环结束我们可以保证第一项为最小值。然后第二项做类似操作，然后以此类推，具体如下图所示',1),
(5,'H5图片压缩与上传','2016-10-14 10:25:45','需要说明的是有两点，这里的resImg是一个预览图片，是已经存在于文档中的，如果你不需要预览，而只是创建一个img用来压缩(document.createElement("img"))，这会少一个tagName属性。你可以修改源码或者自己加上这个属性。源码中会根据tagName进行判断，不存在的话会报错。',1);

CREATE TABLE tag(
	tid INT PRIMARY KEY AUTO_INCREMENT,#自增ID
	tname VARCHAR(10)
);
INSERT INTO tag VALUES
(1,'学习'),
(2,'HTML'),
(3,'tag标签'),
(4,'R语言');

CREATE TABLE ntag(
	ntid INT PRIMARY KEY AUTO_INCREMENT,#自增ID
	noteid INT,
	tagid INT
);
INSERT INTO ntag VALUES
(1,1,1),
(2,1,2),
(3,1,3),
(4,2,1),
(5,2,4);

CREATE TABLE album(
	aid INT PRIMARY KEY AUTO_INCREMENT,#自增ID
	aname VARCHAR(10),
	createtime DATETIME,
	acover VARCHAR(50),
	userid INT
);
INSERT INTO album VALUES
(1,'相册1','2016-09-25 04:16:02','images/106.jpg',1),
(2,'相册2','2016-09-24 03:16:02','images/106.jpg',1),
(3,'相册3','2016-09-23 02:16:02','images/106.jpg',1),
(4,'相册4','2016-09-22 01:16:02','images/106.jpg',1),
(5,'相册5','2016-09-21 12:16:02','images/106.jpg',1),
(6,'相册6','2016-09-20 11:16:02','images/106.jpg',1),
(7,'相册7','2016-09-19 10:16:02','images/106.jpg',1);

CREATE TABLE message(
	mid INT PRIMARY KEY AUTO_INCREMENT,#自增ID
	mname VARCHAR(30),#发信人名称
	email VARCHAR(100),
	createtime DATETIME,
	mcontent VARCHAR(100),
	userid INT
);
INSERT INTO message VALUES
(1,'Bingo Chen','456789@sohu.com','2016-09-25 04:16:02','要运用上面的str1，必须运用下面的要领先转化为JSON对象：',1),
(2,'小明','12345@hotmail.com','2016-09-25 04:16:02','上面的多个要领中，除了eval()函数是js自带的之外，其他的多个要领都来自json.js包。',1),
(3,'小红','23456@163.com','2016-09-25 04:16:02',' 数组是值（value）的有序集合。一个数组以“[”（左中括号）开始，“]”（右中括号）结束。值之间运用 “,”（逗号）分隔。',1),
(4,'Victor Wu','573864600@qq.com','2016-09-25 04:16:02','要运用上面的str1，必须运用下面的要领先转化为JSON对象：',1),
(5,'今天明天每一天','666666@gmail.com','2016-09-25 04:16:02','JSON数据不须要任何特殊的 API 或工具包。',1);

CREATE TABLE photo(
	pid INT PRIMARY KEY AUTO_INCREMENT,#自增ID
	createtime DATETIME,
	mcontent VARCHAR(300),
	userid INT
);
