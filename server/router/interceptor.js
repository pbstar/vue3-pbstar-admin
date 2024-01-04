const { access } = require('../units/log')
module.exports = (req, res, next)=>{
  console.log({
    url: req.url,
    query: req.query,
    params: req.params
  });
  if (req.method=='POST') {
    access({
      url: req.url,
      query: req.query,
      params: req.params
    })
  }
  next()
}