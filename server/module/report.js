const db = require("../db/mysql")
function getReportTemplateList(r) {
  return new Promise((resolve, reject) => {
    let sql1 = 'select id,name,remark,json,create_time from report_template where is_delete=0';
    db.query(sql1, result => {
      r.data = result
      resolve(r)
    })
  })
}
function getReportList(r, req) {
  return new Promise((resolve, reject) => {
    let sql1 = 'SELECT r.id,r.report_template_id,rt.name AS report_template_name,r.user_id,u.name AS user_name,r.create_time,r.json FROM report r JOIN report_template rt ON r.report_template_id = rt.id JOIN user u ON r.user_id = u.id where r.is_delete="0" ORDER BY r.id DESC';
    db.query(sql1, result => {
      ;
      let list = []
      for (let i = 0; i < result.length; i++) {
        if (req.dateTime && req.dateTime.length == 2) {
          let date = new Date(result[i].create_time).getTime();
          let startDate = new Date(req.dateTime[0]).getTime();
          let endDate = new Date(req.dateTime[1]).getTime();
          if (date > endDate || date < startDate) continue
        }
        if (req.userId) {
          if (!req.userId.includes(result[i].user_id)) continue
        }
        list.push(result[i])
      }
      r.data = list.slice((req.currentPage - 1) * 10, req.currentPage * 10);
      r.total = list.length
      resolve(r)
    })
  })
}
function toAddReportTemplate(r, req) {
  return new Promise((resolve, reject) => {
    let sql = "INSERT INTO report_template (name,remark,json,create_time,is_delete) VALUES ('" + req.name + "','" + req.remark + "','" + req.json + "','" + req.create_time + "','0')"
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
function toDelReportTemplate(r, req) {
  return new Promise((resolve, reject) => {
    let sql = 'UPDATE report_template SET is_delete = "1" WHERE id = "' + req.id + '"'
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
function toDelReport(r, req) {
  return new Promise((resolve, reject) => {
    let sql = 'UPDATE report SET is_delete = "1" WHERE id = "' + req.id + '"'
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
function toAddReport(r, req) {
  return new Promise((resolve, reject) => {
    let sql = "INSERT INTO report (report_template_id,user_id,json,create_time,is_delete) VALUES ('" + req.id + "','" + req.user_id + "','" + req.json + "','" + req.create_time + "','0')"
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
function toEditReport(r, req) {
  return new Promise((resolve, reject) => {
    let sql = "UPDATE report SET user_id = '" + req.user_id + "', json = '" + req.json + "', create_time = '" + req.create_time + "' WHERE id = '" + req.id + "';"
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
  getReportTemplateList,
  toAddReportTemplate,
  toDelReportTemplate,
  getReportList,
  toDelReport,
  toAddReport,
  toEditReport
}