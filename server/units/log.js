const fs = require('fs')
const path = require('path')
const { formatDate } = require('./index')
// 写日志
function writeLog(writeStream, log) {
  writeStream.write(log + ' ' + formatDate(null, "YY-MM-DD hh:mm:ss") + '\n')
}

function createWriteStream(fileName) {
  const fullWriteFilePath = path.resolve(__dirname, '../', 'logs', fileName)
  const writeStream = fs.createWriteStream(fullWriteFilePath, {
    flags: 'a'
  })
  return writeStream
}

function access(log) {
  const accessWriteStream = createWriteStream(formatDate(null, "YYMMDD") + '.log')
  if (typeof log !== 'string') {
    log = JSON.stringify(log)
  }
  writeLog(accessWriteStream, log)

}
module.exports = {
  access
}
