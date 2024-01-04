const fs = require('fs')
const path = require('path')

// 写日志
function writeLog(writeStream, log) {
  writeStream.write(log + ' ' + getNowFormatDate(2) + '\n')
}

function createWriteStream(fileName) {
  const fullWriteFilePath = path.resolve(__dirname, '../', 'logs', fileName)

  // 创建这个
  const writeStream = fs.createWriteStream(fullWriteFilePath, {
    flags: 'a' //  打开文件进行追加。 如果文件不存在，则创建该文件。
  })
  return writeStream
}

function access(log) {
  const accessWriteStream = createWriteStream(getNowFormatDate(1) + '.log')
  if (typeof log !== 'string') {
    log = JSON.stringify(log)
  }
  writeLog(accessWriteStream, log)

}
//获取当前日期函数
function getNowFormatDate(type) {
  let date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    strDate = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds()
  if (month < 10) month = addZero(month)
  if (strDate < 10) strDate = addZero(strDate)
  if (hour < 10) hour = addZero(hour)
  if (minute < 10) minute = addZero(minute)
  if (second < 10) second = addZero(second)
  if (type == 1) {
    return `${year}${month}${strDate}`
  } else if (type == 2) {
    return `${year}-${month}-${strDate} ${hour}:${minute}:${second}`
  }

}
function addZero(i) {
  return i < 10 ? ('0' + i) : i
}
module.exports = {
  access
}
