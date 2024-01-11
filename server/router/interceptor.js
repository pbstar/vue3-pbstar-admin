const { access } = require('../units/log')
let user = require('../module/user')
module.exports = (req, res, next) => {
  if (req.method == 'POST') req.p = req.body
  else if (req.method == 'GET') req.p = req.query
  if (req.method == 'POST') {
    access({
      url: req.url,
      method: req.method,
      p: req.p
    })
    let whileList = ['/user/toLogin', '/user/logout']
    if (whileList.includes(req.url)) {
      next()
    } else {
      user.toCheckToken(req, res, next)
    }
  } else {
    next()
  }
}