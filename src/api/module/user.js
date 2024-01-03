import http from "@/api/http";

export function getInfoByToken(e) {
  return http.get("/user/getInfoByToken", e)
}
export function toLogin(e) {
  return http.post("/user/toLogin", e)
}