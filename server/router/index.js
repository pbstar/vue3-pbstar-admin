const express = require('express')
let interceptor = require('./interceptor')

const router = express.Router()
router.use(interceptor)

let user = require('../module/user')

router.get('/user/getRoleList', (req, res) => {
  user.getRoleList(req,res)
})
router.get('/user/getUserList', (req, res) => {
  user.getUserList(req,res)
})
router.post('/user/toLogin', (req, res) => {
  user.toLogin(req,res)
})
router.post('/user/toLogout', (req, res) => {
  user.toLogout(req,res)
})
router.get('/user/getInfoByToken', (req, res) => {
  user.getInfoByToken(req,res)
})
router.post('/user/toEditUserPassword', (req, res) => {
  user.toEditUserPassword(req,res)
})
router.post('/user/toResetUserPassword', (req, res) => {
  user.toResetUserPassword(req,res)
})
router.post('/user/toAddUser', (req, res) => {
  user.toAddUser(req,res)
})
router.post('/user/toDelUser', (req, res) => {
  user.toDelUser(req,res)
})
router.post('/user/toEditUser', (req, res) => {
  user.toEditUser(req,res)
})

module.exports = router 
