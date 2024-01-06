const express = require('express')
let interceptor = require('./interceptor')

const router = express.Router()
router.use(interceptor)

let user = require('../module/user')

router.get('/user/getRoleList', (req, res) => {
  user.getRoleList(req,res)
})
router.post('/user/toLogin', (req, res) => {
  user.toLogin(req,res)
})

module.exports = router 
