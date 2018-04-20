const mysql = require('mysql');
const config = require('../conf/db').mysql;

// 创建数据库连接池
const pool = mysql.createPool(config);
module.exports = pool;