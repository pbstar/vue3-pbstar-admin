const db = require("../db/mysql")
const { strToBase64, base64ToStr, getRandomStr, formatDate } = require('../units/index')
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
function getUserList(req, res) {
  let sql1 = 'select id,name,account,role,create_time from user where is_delete=0';
  db.query(sql1, result => {
    let list = []
    for (let i = 0; i < result.length; i++) {
      if (result[i].role == 2 || result[i].role == 3) {
        result[i].role_name = ""
        for (let j = 0; j < roleList.length; j++) {
          if (roleList[j].id == result[i].role) {
            result[i].role_name = roleList[j].name
          }
        }
        list.push(result[i])
      }
    }
    res.send({
      code: 200,
      data: list,
      msg: '获取成功'
    })
  })
}
function toLogin(req, res) {
  let sql = 'select id,name,account,role from user where account = "' + req.p.account + '" and password = "' + req.p.password + '" and is_delete=0'
  db.query(sql, result => {
    if (result.length > 0) {
      let data = {
        info: result[0],
      }
      for (let i = 0; i < roleList.length; i++) {
        if (roleList[i].id == data.info.role) {
          data.info.authority = roleList[i].authority
          data.routeName = roleList[i].authority.split(',')[0]
        }
      }
      let token = strToBase64(data.info.id) + "_" + strToBase64(new Date().getTime()) + "_" + strToBase64(getRandomStr(4))
      token = strToBase64(token)
      let sql2 = 'UPDATE user SET token = "' + token + '" WHERE id = "' + data.info.id + '"'
      db.query(sql2, result => {
        if (result.affectedRows > 0) {
          data.token = token
          res.send({
            code: 200,
            data: data,
            msg: '登录成功'
          })
        }
        else {
          res.send({ code: 102, msg: '生成token失败' })
        }
      })
    } else {
      res.send({ code: 101, msg: '账号或密码错误' })
    }
  })
}
function checkTokenFnc(type, req, res, next) {
  if (req.p.token == null || req.p.token == '' || req.p.token == undefined) {
    res.send({ code: 101, msg: 'token缺失' })
    return
  }
  let tokenArr = base64ToStr(req.p.token).split('_')
  for (let i = 0; i < tokenArr.length; i++) {
    tokenArr[i] = base64ToStr(tokenArr[i])
  }
  if (tokenArr.length != 3) {
    res.send({ code: 102, msg: 'token无效' })
    return
  }
  if (tokenArr[1] < new Date().getTime() - 3 * 24 * 60 * 60 * 1000) {
    res.send({ code: 103, msg: 'token过期' })
    return
  }
  let sql = 'select id,name,account,role from user where token = "' + req.p.token + '"'
  db.query(sql, result => {
    if (result.length > 0) {
      if (type == 'getInfo') {
        let data = {
          info: result[0],
          tokenInfo: {
            token: req.p.token,
            userId: tokenArr[0],
            time: formatDate(tokenArr[1], "YY-MM-DD hh:mm:ss"),
          }
        }
        for (let i = 0; i < roleList.length; i++) {
          if (roleList[i].id == data.info.role) {
            data.info.authority = roleList[i].authority
            data.routeName = roleList[i].authority.split(',')[0]
          }
        }
        res.send({
          code: 200,
          msg: '成功',
          data: data
        })
      } else if (type == 'checkToken') {
        next()
      }
    } else {
      res.send({ code: 104, msg: 'token失效' })
    }
  })
}
function toCheckToken(req, res, next) {
  checkTokenFnc('checkToken', req, res, next)
}

function getInfoByToken(req, res) {
  checkTokenFnc('getInfo', req, res)
}
function toEditUserPassword(req, res) {
  let sql = 'UPDATE user SET password = "' + req.p.password + '" WHERE id = "' + req.p.id + '"'
  db.query(sql, result => {
    if (result.affectedRows > 0) {
      res.send({ code: 200, msg: '修改成功' })
    } else {
      res.send({ code: 101, msg: '修改失败' })
    }
  })
}
function toEditUser(req, res) {
  let sql = 'UPDATE user SET name = "' + req.p.name + '",account = "' + req.p.account + '",role = "' + req.p.role + '" WHERE id = "' + req.p.id + '"'
  db.query(sql, result => {
    if (result.affectedRows > 0) {
      res.send({ code: 200, msg: '修改成功' })
    } else {
      res.send({ code: 101, msg: '修改失败' })
    }
  })
}
function toResetUserPassword(req, res) {
  let sql = 'UPDATE user SET password = "12345678" WHERE id = "' + req.p.id + '"'
  db.query(sql, result => {
    if (result.affectedRows > 0) {
      res.send({ code: 200, msg: '重置成功' })
    } else {
      res.send({ code: 101, msg: '重置失败' })
    }
  })
}
function toDelUser(req, res) {
  let sql = 'UPDATE user SET is_delete = "1" WHERE id = "' + req.p.id + '"'
  db.query(sql, result => {
    if (result.affectedRows > 0) {
      res.send({ code: 200, msg: '删除成功' })
    } else {
      res.send({ code: 101, msg: '删除失败' })
    }
  })
}
function toAddUser(req, res) {
  let sql = 'INSERT INTO user (name,account,password,role,create_time,is_delete) VALUES ("' + req.p.name + '","' + req.p.account + '","' + req.p.password + '","' + req.p.role + '","' + req.p.create_time + '","0")'
  db.query(sql, result => {
    if (result.affectedRows > 0) {
      res.send({ code: 200, msg: '添加成功' })
    } else {
      res.send({ code: 101, msg: '添加失败' })
    }
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
  getRoleList,
  toCheckToken
}