function getRoleList(r,roleList){
  let list = []
  for (let i = 0; i < roleList.length; i++) {
    if (roleList[i].isDelete == 0&&(roleList[i].id==2||roleList[i].id==3)) {
      list.push(roleList[i])
    }
  }
  r.data = list
  return r
}
module.exports = {
  getRoleList
}