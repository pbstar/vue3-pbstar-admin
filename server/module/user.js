const db = require("../db/mysql")
function getUserList(r, roleList) {
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
function toLogin(r, req, roleList) {
  return new Promise((resolve, reject) => {
    let sql = 'select id,name,account,role,child from user where account = "' + req.account + '" and password = "' + req.password + '" and is_delete=0'
    db.query(sql, result => {
      if (result.length > 0) {
        r.data = result[0]
        for (let i = 0; i < roleList.length; i++) {
          if (roleList[i].id == r.data.role) {
            r.data.authority = roleList[i].authority
            r.data.routeName = roleList[i].authority.split(',')[0]
          }
        }
        resolve(r)
      } else {
        r.code = 101
        r.msg = '账号或密码错误'
        resolve(r)
      }
    })
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
function toDistributionManager(r, req) {
  return new Promise((resolve, reject) => {
    let sql = 'UPDATE user SET child = "' + req.child + '"' + ' WHERE id = "' + req.id + '"'
    db.query(sql, result => {
      if (result.affectedRows > 0) {
        resolve(r)
      }
      else {
        r.code = 101
        r.msg = '分配失败'
        resolve(r)
      }
    })
  })
}
module.exports = {
  getUserList,
  toLogin,
  toEditUserPassword,
  toResetUserPassword,
  toDelUser,
  toAddUser,
  toDistributionManager,
  toEditUser
}