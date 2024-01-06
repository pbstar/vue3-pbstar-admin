const { access } = require('../units/log')
module.exports = (req, res, next) => {
  if (req.method == 'POST') req.p = req.body
  else if (req.method == 'GET') req.p = req.query
  if (req.method == 'POST') {
    access({
      url: req.url,
      method: req.method,
      p: req.p
    })
  }
  next()
}