import http from "@/api/http";
//获取项目配置
export function getInfoByToken(e) {
  return http.get("/user/getInfoByToken",e)
}