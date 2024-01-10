const mysql = require('mysql');
const { access } = require('../units/log')
var databaseConfig = require('./mysql.config');
module.exports = {
  query: function (sql, callback) {
    var connection = mysql.createConnection(databaseConfig);
    connection.connect(function (err) {
      if (err) {
        return err;
      }
      connection.query(sql, function (err, results, fields) {
        if (err) {
          access('数据操作失败：' + sql)
          access(err)
        } else {
          callback && callback(results);
        }
        connection.end(function (err) {
          if (err) {
            return err;
          }
        });
      });
    });
  }
};
