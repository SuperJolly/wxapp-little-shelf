### 项目简述

本项目为《9小时搞定微信小程序开发》课程的实战项目「小书架」示例源码，包含了 `书籍列表`、`个人中心`、`用户登录`、 `书籍详情`、`模板消息推送`、`书籍详情`、`用户评论`、`已购书籍`等模块。

### 如何部署

本项目需要依赖服务端及数据库等应用，所以需要大家进行服务端及数据库部署，这里以本地服务及数据库搭建为例，具体步骤如下：

* 安装并启动 mysql， 参考文章[Windows 环境下 MySQL 5.7 安装配置指南](https://www.jianshu.com/p/710e5861c198)和[Mac下安装与配置MySQL](https://www.jianshu.com/p/a8e4068a7a8a)
* 新建数据库，可参考我的这篇文章[手把手教会你小程序登录鉴权](https://juejin.im/post/5ac9b72cf265da23906c486a)来让数据库表支持emoji存储
* 导入 `db` 目录下的所有数据表
* 将 `client` 目录作为小程序项目根目录，在开发者工具面板上添加项目，并导入该目录
* 进入 `server` 目录，使用命令 `$ npm install & npm start` (需要先安装nodejs)

#### 导入数据库表

1. 创建并选择数据库

```shell
mysql> create database wxapp;
mysql> use wxapp;
```

2. 设置数据库编码

```shell
mysql> set names utf8mb4;
```

3. 导入数据

```shell
mysql> source [sql文件路径]
```
