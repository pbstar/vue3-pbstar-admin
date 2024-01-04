const express = require('express')
let interceptor = require('./interceptor')

const router = express.Router()
router.use(interceptor)

let role = require('../module/role')
let user = require('../module/user')

router.get('/role/getRoleList', (req, res) => {
  role.getRoleList(req,res)
})
router.post('/user/toLogin', (req, res) => {
  user.toLogin(req,res)
})

module.exports = router 
