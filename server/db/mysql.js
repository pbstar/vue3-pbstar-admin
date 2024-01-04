const mysql = require('mysql');
const { access } = require('../utils/log')
var databaseConfig = require('./mysql.config');
module.exports = {
  query: function (sql, callback) {
    var connection = mysql.createConnection(databaseConfig);
    connection.connect(function (err) {
      if (err) {
        console.log('数据库链接失败');
        return err;
      }
      connection.query(sql, function (err, results, fields) {
        if (err) {
          access('数据操作失败' + sql)
          access(err)
          console.log('数据操作失败');
        } else {
          callback && callback(results);
        }
        connection.end(function (err) {
          if (err) {
            console.log('关闭数据库连接失败！');
            return err;
          }
        });
      });
    });
  }
};
