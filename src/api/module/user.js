import http from "@/api/http";

export function getInfoByToken(e) {
  return http.get("/user/getInfoByToken", e)
}
export function getUserList(e) {
  return http.get("/user/getUserList", e)
}
export function getRoleList(e) {
  return http.get("/user/getRoleList", e)
}
export function toLogin(e) {
  return http.post("/user/toLogin", e)
}
export function toLogout(e) {
  return http.post("/user/toLogout", e)
}
export function toEditUserPassword(e) {
  return http.post("/user/toEditUserPassword", e)
}
export function toAddUser(e) {
  return http.post("/user/toAddUser", e)
}
export function toDelUser(e) {
  return http.post("/user/toDelUser", e)
}
export function toResetUserPassword(e) {
  return http.post("/user/toResetUserPassword", e)
}
export function toEditUser(e) {
  return http.post("/user/toEditUser", e)
}