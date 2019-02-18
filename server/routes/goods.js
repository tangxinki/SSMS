/*
  users路由模块 主要负责用户管理的路由处理(处理用户模块的所有请求)
*/
const express = require('express');
const router = express.Router();

//引入数据库连接模块
const connection = require('./connect')

// //接受根目录请求
router.get('/', (req, res, next) => {
  res.render('index', { title: '这位是商品处理路由' });
})

//设置多个响应头
router.all('*', (req, res, next) => {
  // 设置响应头
  res.setHeader('Access-Control-Allow-Origin', '*');
  //给其他路由放行
  next();
})
//添加商品
router.post('/addgoods', (req, res) => {
  let { cateName, barCode, goodsName, costPrice, marketPrice, salePrice, goodsNum, goodsWeight, unit, discount, promotion, goodsDesc } = req.body;

  //那这些数据存入数据库
  //构造插入数据库的sql语句
  const sqlStr = 'insert into goods(cateName, barCode, goodsName, salePrice,marketPrice, costPrice, goodsNum, goodsWeight, unit, discount, promotion, goodsDesc) values(?,?,?,?,?,?,?,?,?,?,?,?)';

  //参数列表
  var addSqlParams = [cateName, barCode, goodsName, costPrice, marketPrice, salePrice, goodsNum, goodsWeight, unit, discount, promotion, goodsDesc];
  //执行sql语句
  connection.query(sqlStr, addSqlParams, (err, data) => {
    if (err) {
      throw err;
    } else {
      if (data.affectedRows > 0) {
        res.send({ "rstCode": 1, "message": "商品添加成功!" })
      } else {
        res.send({ "rstCode": 0, "message": "商品添加失败!" })
      }
    }
  })
})
//删除
router.get('/delete?', (req, res) => {
  let { id } = req.query;
  const sqlStr = `delete from goods where id = ${id}`;

  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "message": "商品删除成功!" })
    } else {
      res.send({ "error_code": 1, "message": "商品删除失败!" })
    }
  })
})
//修改
router.get('/goodsedit', (req, res) => {
  let { id } = req.query;
  const sqlStr = `select * from goods where id=${id}`;
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    res.send(data);

  })
})
//保存修改
router.post('/goodseditsave', (req, res) => {
  let { barCode, goodsName, cateName, salePrice, promotion, editId } = req.body;
  const sqlStr = `update goods set barCode='${barCode}', goodsName='${goodsName}', cateName='${cateName}',salePrice='${salePrice}',promotion='${promotion}' where id=${editId}`;
  console.log(sqlStr);
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "message": "商品修改成功!" })
    } else {
      res.send({ "error_code": 1, "message": "商品修改失败!" })
    }
  })
})
//批量删除
router.get('/batchdelete', (req, res) => {
  let { selectedId } = req.query;
  console.log(selectedId);
  const sqlStr = `delete from goods where id in (${selectedId})`;

  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "message": "批量删除成功!" })
    } else {
      res.send({ "error_code": 1, "message": "批量删除失败!" })
    }
  })
})
// 商品查询
router.get('/search', (req, res) => {
  let { cateName, keyWord } = req.query;
  //如果什么都不选,就是查询全部
  let sqlStr = `select * from goods where 1 = 1`;

  //如果有分类名称且分类名称不等于全部 那么拼接分类条件
  if (cateName !== '' && cateName !== '全部') {
    sqlStr += ` and cateName='${cateName}'`;
  }
  if (keyWord !== ''){
    sqlStr += ` and (goodsName like "%${keyWord}%" or barCode like "%${keyWord}%")`
  }
  console.log(sqlStr);
  
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(data);
    }
  })
})

//请求商品数据
router.get('/goodslist', (req, res) => {
  const sqlStr = 'select * from goods order by cdate desc'
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err //如果有错 抛出错误
    } else {
      res.send(data)
    }
  })
})
//商品分页
router.get('/goodslistbypage', (req, res) => {
  let {pageSize, currentPage, cateName, keyWord} = req.query;
  //默认值
  pageSize = pageSize ? pageSize : 3;
  currentPage = currentPage ? currentPage : 1;

  let sqlStr = `select * from goods where 1 = 1`;

  //如果有分类名称且分类名称不等于全部 那么拼接分类条件
  if (cateName !== '' && cateName !== '全部') {
    sqlStr += ` and cateName='${cateName}'`;
  }
  if (keyWord !== ''){
    sqlStr += ` and (goodsName like "%${keyWord}%" or barCode like "%${keyWord}%")`
  }
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      total = data.length;
    }
  })
  //排序
  sqlStr += ` order by cdate desc`;
  
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


module.exports = router;
