/*
  users路由模块 主要负责用户管理的路由处理(处理用户模块的所有请求)
*/
const express = require('express');
const router = express.Router();

//引入数据库连接模块
const connection = require('./connect');

const jwt = require('jsonwebtoken');
//定义密钥
const secretKey = 'itsource';
// //接受根目录请求
// router.get('/', (req, res) => {
//   res.send('这是后端路由,这里是users');
// })

//设置多个响应头
router.all('*', (req, res, next) => {
  // 设置响应头
  res.setHeader('Access-Control-Allow-Origin', '*');
  //给其他路由放行
  next();
})


//添加账号
router.post('/adduser', (req, res) => {
  let { username, password, usergroup } = req.body;

  //那这些数据存入数据库
  //构造插入数据库的sql语句
  const sqlStr = `insert into users (username, password, usergroup) values (?, ?, ?)`;
  var addSqlParams = [username, password, usergroup];
  //执行sql语句
  connection.query(sqlStr, addSqlParams, (err, data) => {
    if (err) {
      throw err;
    } else {
      if (data.affectedRows > 0) {
        res.send({ "rstCode": 1, "message": "账号添加成功!" })
      } else {
        res.send({ "rstCode": 0, "message": "账号添加失败!" })
      }
    }
  })

})
//请求所有账号数据
// router.get('/userlist', (req, res) => {

//   const sqlStr = 'select * from users order by cdate desc'
//   connection.query(sqlStr, (err, data) => {
//     if (err) {
//       throw err //如果有错 抛出错误
//     } else {
//       res.send(data)
//     }
//   })
// })

//删除
router.get('/delete', (req, res) => {

  //接受id
  let { id } = req.query
  const sqlStr = `delete from users where id = ${id}`
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err
    } else {
      if (data.affectedRows > 0) {
        res.send({ 'rstCode': 1, "message": "删除成功!" })
      } else {
        res.send({ 'rstCode': 0, 'message': "删除失败!" })
      }
    }
  })
})

//修改
router.get('/accountedit', (req, res) => {
  //接收id
  let {id} = req.query;
  //sql语句
  const sqlStr = `select * from users where id=${id}`;
  connection.query(sqlStr, (err, data) => {
    if(err) throw err;
    res.send(data)
  })
})

//保存修改
router.post('/accounteditsave', (req, res) => {
  // 接收修改后的新数据 和 原来的id
  let { username, usergroup, editId } = req.body;
  // 构造sql
  const sqlStr = `update users set username='${username}', usergroup='${usergroup}' where id=${editId}`;
  
  // 执行sql
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    // 受影响行数大于0 就是修改成功
    if (data.affectedRows > 0) {
      // 返回成功的数据对象给前端
      res.send({"error_code": 0, "message":"修改账号成功"});
    } else {
      // 返回失败的数据对象给前端
      res.send({"error_code": 1, "message":"修改账号失败"});
    }
  })
})

//批量删除
router.get('/batchdelete', (req, res) => {
  //接受id
  let {selectedId} = req.query;
  
  const sqlStr = `delete from users where id in (${selectedId})`;
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    if (data.affectedRows > 0){
      res.send({"error_code":0, "message":"批量删除成功!"})
    }else {
      res.send({"error_code":0, "message":"批量删除成功!"})
    }
  })
})
//分页
router.get('/userlistbypage', (req, res) => {
  let {pageSize, currentPage} = req.query;
  //默认值
  pageSize = pageSize ? pageSize : 3;
  currentPage = currentPage ? currentPage : 1;
  let sqlStr = `select * from users order by cdate desc`;
  
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //计算总条数
    let total = data.length;
    //分页条件
    let n = (currentPage - 1) * pageSize;
    //拼接分页的sql语句
    sqlStr += ` limit ${n}, ${pageSize}`;
    connection.query(sqlStr, (err, data) => {
      if (err) throw err;
      //返回总条数total 和对应页面的data
      res.send({total, data})
    })
  })
})


//登陆验证
router.post('/login', (req, res) => {
  let {username, password} = req.body;
  const sqlStr = `select * from users where username='${username}' and password='${password}'`;
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    if (!data.length){
      res.send({"error_code":1, "message":"请检查用户名和密码!"})
    }else{
      //当前登陆账号数据
      const obj = data[0];
      //转为字符串
      const objStr = JSON.stringify(obj);
      const accountInfo = JSON.parse(objStr); 
      //生成token
      const token = jwt.sign(accountInfo, secretKey, {expiresIn: 60 * 60})
      
      res.send({"error_code":0, "message":"欢迎您,登陆成功!", "username":accountInfo.username, token})
    }
  })
})

//修改密码
router.get('/oldpwd', (req, res) => {
  let {username, oldPwd} =req.query;
  const sqlStr = `select * from users where username='${username}'and password='${oldPwd}'`;
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    if (data.length){
      res.send({"error_code": 0, "message": "旧密码正确!"})
    }else {
      res.send({"error_code": 1, "message": "旧密码错误!"})
    }
  })
})

//保存密码修改
router.post('/pwdedit', (req, res) => {
  let {username, oldPwd, newPwd} =req.body;
  const sqlStr = `update users set password='${newPwd}' where username='${username}' and password='${oldPwd}'`;
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    if (data.affectedRows > 0) {
      res.send({"error_code": 0, "message": "密码修改成功!"})
    }else {
      res.send({"error_code": 1, "message": "密码修改失败!"})
    }
  })
})

module.exports = router;
