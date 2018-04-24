### 项目简述

本项目为《9小时搞定微信小程序开发》课程的实战项目「小书架」示例源码，包含了 `书籍列表`、`个人中心`、`用户登录`、 `书籍详情`、`模板消息推送`、`书籍详情`、`用户评论`、`已购书籍`等模块。

### 如何部署

本项目需要依赖服务端及数据库等应用，所以需要大家进行服务端及数据库部署，这里以本地服务及数据库搭建为例，具体步骤如下：

* 安装并启动 mysql， 参考文章[Windows 环境下 MySQL 5.7 安装配置指南](https://www.jianshu.com/p/710e5861c198)和[Mac下安装与配置MySQL](https://www.jianshu.com/p/a8e4068a7a8a)
* 新建数据库，可参考我的这篇文章[手把手教会你小程序登录鉴权](https://juejin.im/post/5ac9b72cf265da23906c486a)来让数据库表支持emoji存储
* 导入 `db` 目录下的所有数据表
* 更改数据库里`books`数据表里的`bkfile`字段，添加书籍文件地址（由于版权等敏感信息，不便使用课程demo里的文件地址，可自行添加）
* 更改 `client` 下 `config/config.js` 文件中的 `baseUrl`，将 `[your port]` 改为后台服务对应的端口，默认为`3003`
* 更改 `server` 下 `conf/app.js` 文件中的 `appid` 和 `secret` ，填入自己小程序对应的 appid 和 小程序密钥
* 更改 `server` 下 `conf/db.js` 文件中的相关配置，如下：

| 配置参数 | 描述 |
| ------ | ---- |
| host | 本地：127.0.0.1，远程：服务器ip |
| user | 数据库账户 |
| password | 数据库账户密码 |
| database | 数据库 |
| port | 数据库服务端口，默认为3306 |

* 进入 `server` 目录，使用命令 `$ npm install && npm start` (需要先安装nodejs)
* 将 `client` 目录作为小程序项目根目录，在开发者工具面板上添加项目，并导入该目录

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
