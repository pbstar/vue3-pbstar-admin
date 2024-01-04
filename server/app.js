const express = require('express')
const router = require('./router')
let app = express()
app.use('/api', router)
app.use(express.static('public'))
app.listen(8091, () => {
    console.log('服务器开启成功：' + '\x1B[36mhttp://localhost:8091\x1B[0m')
})