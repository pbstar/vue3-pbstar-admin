function getRoleList(req,res, roleList){
  let list = []
  for (let i = 0; i < roleList.length; i++) {
    if (roleList[i].id==2||roleList[i].id==3) {
      list.push(roleList[i])
    }
  }
  res.send({
    code: 200,
    data: list,
    msg: '获取成功'
  })
}
module.exports = {
  getRoleList
}