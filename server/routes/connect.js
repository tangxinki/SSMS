//连接数据库公用模块
//引入mysql
const mysql = require('mysql');
//使用mysql创建连接
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'smms'
  });
   
  connection.connect();
  //执行连接
  connection.connect(() => {
      console.log('数据库连接成功!');
  })

  //暴漏出去
  module.exports = connection  