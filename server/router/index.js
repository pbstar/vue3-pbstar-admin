const express = require('express')
let interceptor = require('./interceptor')
// 创建路由对象
const router = express.Router()
router.use(interceptor)

let roleList = require('../json/role.json')

let role = require('../module/role')
// let order = require('./module/order')
// let report = require('./module/report')
// let user = require('./module/user')
// 挂载具体路由
router.get('/role/getRoleList', (req, res) => {
  role.getRoleList(req,res, roleList)
})
router.get('/user/add', (req, res) => {
  res.send('Add new user.')
})

// 向外导出路由对象
module.exports = router 
