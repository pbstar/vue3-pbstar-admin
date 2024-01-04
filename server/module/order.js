const db = require("../db/mysql")
function getOrderList(r, req) {
  return new Promise((resolve, reject) => {
    let sql1 = 'SELECT r.id,r.name,r.remark,r.user_id,r.state,r.create_time,r.make_date,r.name_type,r.luminosity_left,r.luminosity_right,r.luminosity_type,r.pd,r.urgent,u.name AS user_name FROM `order` r JOIN user u ON r.user_id = u.id where r.is_delete = "0" ORDER BY r.id DESC';
    db.query(sql1, result => {
      let list = []
      for (let i = 0; i < result.length; i++) {
        if (req.dateTime && req.dateTime.length == 2) {
          let date = new Date(result[i].create_time).getTime();
          let startDate = new Date(req.dateTime[0]).getTime();
          let endDate = new Date(req.dateTime[1]).getTime();
          if (date > endDate || date < startDate) continue
        }
        if (req.userId) {
          if (req.userId != result[i].user_id) continue
        }
        if (req.name) {
          if (!result[i].name.includes(req.name)) continue
        }
        if (req.state) {
          if (result[i].state != req.state) continue
        }
        if (result[i].state == 1) result[i].state_name = '已完成'
        else result[i].state_name = '处理中'
        list.push(result[i])
      }
      r.data = list.slice((req.currentPage - 1) * 10, req.currentPage * 10);
      r.total = list.length
      resolve(r)
    })
  })
}
function toAddOrder(r, req) {
  return new Promise((resolve, reject) => {
    let sql = "INSERT INTO `order` (name,remark,create_time,is_delete,state,make_date,name_type,luminosity_left,luminosity_right,luminosity_type,pd,urgent,user_id) VALUES ('" + req.name + "','" + req.remark + "','" + req.create_time + "','0','0','" + req.make_date + "','" + req.name_type + "','" + req.luminosity_left + "','" + req.luminosity_right + "','" + req.luminosity_type + "','" + req.pd + "','" + req.urgent + "','" + req.user_id + "')"
    db.query(sql, result => {
      if (result.affectedRows > 0) {
        resolve(r)
      }
      else {
        r.code = 101
        r.msg = '提交失败'
        resolve(r)
      }
    })
  })

}
function toDelOrder(r, req) {
  return new Promise((resolve, reject) => {
    let sql = 'UPDATE `order` SET is_delete = "1" WHERE id = "' + req.id + '"'
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
function toVerifyOrder(r, req) {
  return new Promise((resolve, reject) => {
    let sql = 'UPDATE `order` SET state = "1" WHERE id = "' + req.id + '"'
    db.query(sql, result => {
      if (result.affectedRows > 0) {
        resolve(r)
      }
      else {
        r.code = 101
        r.msg = '操作失败'
        resolve(r)
      }
    })
  })
}
function toEditOrder(r, req) {
  return new Promise((resolve, reject) => {
    let sql = "UPDATE `order` SET name = '" + req.name + "', remark = '" + req.remark + "', create_time = '" + req.create_time + "', make_date = '" + req.make_date + "', name_type = '" + req.name_type + "', luminosity_left = '" + req.luminosity_left + "', luminosity_right = '" + req.luminosity_right + "', luminosity_type = '" + req.luminosity_type + "', pd = '" + req.pd + "', urgent = '" + req.urgent + "', user_id = '" + req.user_id + "' WHERE id = '" + req.id + "' AND state = '0' AND is_delete = '0'";
    db.query(sql, result => {
      if (result.affectedRows > 0) {
        resolve(r)
      }
      else {
        r.code = 101
        r.msg = '操作失败'
        resolve(r)
      }
    })
  })
}
module.exports = {
  getOrderList,
  toVerifyOrder,
  toAddOrder,
  toDelOrder,
  toEditOrder
}