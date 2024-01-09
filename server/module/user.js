const db = require("../db/mysql")
const { strToBase64, base64ToStr,getRandomStr } = require('../units/index')
let roleList = require('../json/role.json')
function getRoleList(req, res) {
  let list = []
  for (let i = 0; i < roleList.length; i++) {
    if (roleList[i].id > 1) {
      list.push(roleList[i])
    }
  }
  res.send({
    code: 200,
    data: list,
    msg: '获取成功'
  })
}
function getUserList(r) {
  return new Promise((resolve, reject) => {
    let sql1 = 'select * from user where is_delete=0';
    db.query(sql1, result => {
      let list = []
      for (let i = 0; i < result.length; i++) {
        if (result[i].role == 2 || result[i].role == 3) {
          let obj = {}
          obj.id = result[i].id
          obj.name = result[i].name
          obj.account = result[i].account
          obj.role = result[i].role
          obj.role_name = ""
          for (let j = 0; j < roleList.length; j++) {
            if (roleList[j].id == result[i].role) {
              obj.role_name = roleList[j].name
            }
          }
          obj.create_time = result[i].create_time
          obj.child = result[i].child
          list.push(obj)
        }
      }
      r.data = list
      resolve(r)
    })
  })
}
function toLogin(req, res) {
  let r = {
    code: 200,
    data: null
  }
  let sql = 'select id,name,account,role from user where account = "' + req.p.account + '" and password = "' + req.p.password + '" and is_delete=0'
  db.query(sql, result => {
    if (result.length > 0) {
      r.data = {
        info: result[0],
      }
      for (let i = 0; i < roleList.length; i++) {
        if (roleList[i].id == r.data.info.role) {
          r.data.info.authority = roleList[i].authority
          r.data.routeName = roleList[i].authority.split(',')[0]
        }
      }
      let token = strToBase64(r.data.info.id) + "_" + strToBase64(new Date().getTime()) + "_" + strToBase64(getRandomStr(4))
      token = strToBase64(token)
      let sql2 = 'UPDATE user SET token = "' + token + '" WHERE id = "' + r.data.info.id + '"'
      db.query(sql2, result => {
        if (result.affectedRows > 0) {
          r.data.token = token
          res.send(r)
        }
        else {
          r.code = 102
          r.msg = '生成token失败'
          res.send(r)
        }
      })
    } else {
      r.code = 101
      r.msg = '账号或密码错误'
      res.send(r)
    }
  })
}
function getInfoByToken(req, res){
  if(req.p.token == null || req.p.token == ''){
    res.send({
      code: 101,
      data: null,
      msg: 'token无效'
    })
    return
  }
  let tokenArr=base64ToStr(req.p.token).split('_')
  for(let i=0;i<tokenArr.length;i++){
    tokenArr[i]=base64ToStr(tokenArr[i])
  }
  if(tokenArr.length!=3){
    res.send({
      code: 101,
      data: null,
      msg: 'token无效'
    })
    return
  }
  if (tokenArr[1]<new Date().getTime()-3*24*60*60*1000){
    res.send({
      code: 101,
      data: null,
      msg: 'token无效'
    })
    return
  }
  let sql = 'select id,name,account,role from user where token = "' + req.token + '"'
  db.query(sql, result => {
    if (result.length > 0) {
      res.send({
        code: 101,
        data: result[0],
        msg: '获取成功'
      })
      return
    } else {
      res.send({
        code: 101,
        data: null,
        msg: 'token无效'
      })
      return
    }
  })
}
function toEditUserPassword(r, req) {
  return new Promise((resolve, reject) => {
    let sql = 'UPDATE user SET password = "' + req.password + '" WHERE id = "' + req.id + '"'
    db.query(sql, result => {
      if (result.affectedRows > 0) {
        resolve(r)
      }
      else {
        r.code = 101
        r.msg = '修改失败'
        resolve(r)
      }
    })
  })
}
function toEditUser(r, req) {
  return new Promise((resolve, reject) => {
    let sql = 'UPDATE user SET name = "' + req.name + '",account = "' + req.account + '",role = "' + req.role + '" WHERE id = "' + req.id + '"'
    db.query(sql, result => {
      if (result.affectedRows > 0) {
        resolve(r)
      }
      else {
        r.code = 101
        r.msg = '修改失败'
        resolve(r)
      }
    })
  })
}
function toResetUserPassword(r, req) {
  return new Promise((resolve, reject) => {
    let sql = 'UPDATE user SET password = "12345678" WHERE id = "' + req.id + '"'
    db.query(sql, result => {
      if (result.affectedRows > 0) {
        resolve(r)
      }
      else {
        r.code = 101
        r.msg = '修改失败'
        resolve(r)
      }
    })
  })
}
function toDelUser(r, req) {
  return new Promise((resolve, reject) => {
    let sql = 'UPDATE user SET is_delete = "1" WHERE id = "' + req.id + '"'
    db.query(sql, result => {
      if (result.affectedRows > 0) {
        resolve(r)
      }
      else {
        r.code = 101
        r.msg = '删除失败'
        resolve(r)
      }
    })
  })
}
function toAddUser(r, req) {
  return new Promise((resolve, reject) => {
    let sql = 'INSERT INTO user (name,account,password,role,create_time,is_delete) VALUES ("' + req.name + '","' + req.account + '","' + req.password + '","' + req.role + '","' + req.create_time + '","0")'
    db.query(sql, result => {
      if (result.affectedRows > 0) {
        resolve(r)
      }
      else {
        r.code = 101
        r.msg = '添加失败'
        resolve(r)
      }
    })
  })
}
module.exports = {
  getUserList,
  toLogin,
  getInfoByToken,
  toEditUserPassword,
  toResetUserPassword,
  toDelUser,
  toAddUser,
  toEditUser,
  getRoleList
}