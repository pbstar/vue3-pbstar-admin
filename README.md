# 【vue3-pbstar-admin】一款基于vue3和nodejs的简洁后台管理系统
Vue3-pbstar-admin 是一个简洁的后台解决方案，提供了基础的用户体系和页面接口权限配置，方便进行自定义开发，避免不必要的代码冗余。该方案结合了 Vue3、Element-Plus、Pinia 和 Vite 等先进技术，实现高效的页面布局、状态管理和构建体验。同时，后端采用基于 Node.js 的 Express 框架和 MySQL 数据库，提供稳定的数据存储和高效的后台服务。

## 项目开始
项目GitHub地址： [https://github.com/pbstar/vue3-pbstar-admin](https://github.com/pbstar/vue3-pbstar-admin)
项目演示地址： [https://vue3-pbstar-admin.mcweb.club/](https://vue3-pbstar-admin.mcweb.club/)
### 安装项目
```
1.nodejs环境要求
nodejs版本要求：18+
2.从GitHub上克隆项目
git clone https://github.com/pbstar/vue3-pbstar-admin.git
```
### 前端模块
```
1.进入项目目录
cd vue3-pbstar-admin
2.安装依赖
npm install
3.运行项目前端模块
npm run dev
4.打包项目前端模块
npm run build
```
### 后端模块
```
1.进入项目目录
cd vue3-pbstar-admin
cd server
2.配置数据库
导入db/v3_pbstar-admin.sql文件到数据库中
修改db/mysql.config.js文件中的数据库配置
3.安装依赖
npm install
4.运行项目后端模块
npm run start
```
## 项目目录结构
```
├── public             # 静态资源
├── server             # 服务端模块
│ ├── db               # 数据库相关
│ ├── json             # json文件 
│ ├── logs             # 日志 
│ ├── module           # 业务模块 
│ ├── public           # 前端服务器
│ ├── router           # 路由
│ ├── units            # 工具类
│ ├── package.json     # package配置
│ └── app.js           # 服务端入口文件 
├── src                # 源代码 
│ ├── api              # 接口 
│ ├── assets           # 静态资源 
│ ├── components       # 组件 
│ ├── config           # 配置文件
│ ├── router           # 路由 
│ ├── stores           # 状态管理
│ ├── units            # 工具类
│ ├── views            # 所有页面 
│ ├── App.vue          # 根页面 
│ └── main.js          # 入口文件 
├── .gitignore         # git配置文件 
├── index.html         # html入口文件
├── vite.config.js     # vite配置 
└── package.json       # package配置
```
## 项目前端
前端模块使用vue3 + vite + element-plus + axios + vue-router + pinia + sass
### 接口封装
#### 1.axios封装
##### axios响应拦截器
主要处理请求异常后重复请求
```
axios.interceptors.response.use((response) => {
  return response
}, error => {
  var config = error.config;
  if (!config || !config.retry) return Promise.reject(error);
  config.__retryCount = config.__retryCount || 0;
  if (config.__retryCount >= config.retry) {
    alert('请求异常：' + error.message + '!')
    return Promise.reject(error);
  }
  config.__retryCount++;
  var backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, config.retryDelay || 1);
  });
  return backoff.then(function () {
    return axios(config);
  });
})
```
##### get、post请求封装
为了防止浏览器缓存，get请求的参数中添加一个时间戳；为了方便接口鉴权，post请求的参数中添加token。
```
function get(url, d) {
  NProgress.start()
  let data = new Object()
  if (d) data = d
  data.axiosTime = new Date().getTime()
  return new Promise((resolve, reject) => {
    axios
      .get(baseURL + url, {
        params: data,
      })
      .then((response) => {
        NProgress.done()
        resolve(response.data);
      })
      .catch((err) => {
        NProgress.done()
        reject(err);
      });
  });
}
function post(url, d) {
  NProgress.start()
  let data = new Object()
  if (d) data = d
  data.token = units.getLocalStorage('token')
  return new Promise((resolve, reject) => {
    axios
      .post(baseURL + url, data)
      .then((response) => {
        NProgress.done()
        resolve(response.data);
      })
      .catch((err) => {
        NProgress.done()
        reject(err);
      });
  });
}
```
#### 2.接口请求封装
将不同模块的接口请求封装成方法，统一调用。
```
import http from "@/api/http";

export function getInfoByToken(e) {
  return http.get("/user/getInfoByToken", e)
}
```
### 组件封装
封装组件主要为了模块化和可复用性。例如将后台顶部和左侧菜单进行组件封装，使其模块更加独立。封装验证码组件，使其复用更加便利。
### 项目配置文件
```
export default {
  title: "初辰后台管理系统", //网站默认标题
  version: "2024.1.13.1", //版本号
  // baseUrl: "http://localhost:8091/api", //请求接口域名
  baseUrl: "", //请求接口域名
  timeOut: "10000", //请求超时时长
  proName:"vue3-pbstar-admin", //项目名称
  checkTokenTime: "600000", //检测token是否过期的最小时间间隔
  isLoginVerificationCode: true, //是否开启登录验证码
}
```
### 路由
#### 1.前置路由守卫
前置路由守卫主要用来验证用户是否登录，以及验证用户是否有权限访问该页面。
```
router.beforeEach((to, from, next) => {
  if (to.matched.length > 0 && to.matched[0].name == "admin") {
    let token = units.getLocalStorage("token")
    if (!token) {
      toLogin(next)
    } else {
      if (lastRequestTime && new Date().getTime() - lastRequestTime < config.checkTokenTime) {
        toCheckAuthority(next, to)
      } else {
        lastRequestTime = new Date().getTime();
        toCheckToken(next, token, to)
      }
    }
  } else {
    NProgress.start()
    next()
  }
})
```
#### 2.后置路由守卫
后置路由守卫主要用来处理路由跳转后页面标题的变化。
```
router.afterEach((to, from) => {
  NProgress.done()
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    if (to.matched[0] && to.matched[0].meta.title) {
      document.title = to.matched[0].meta.title
    } else {
      document.title = config.title
    }
  }
})
```
### 状态管理
状态管理主要用来存储一些全局变量，例如用户信息等。
```
import { ref } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('user', () => {
  let info = ref(null)

  function getInfo() {
    return info.value
  }
  function changeInfo(e) {
    info.value = e
  }

  return { getInfo, changeInfo }
})
```
### 工具类
工具类主要用来封装一些常用的函数，例如获取本地存储数据等。
```
export default {
  isMobile,
  strToBase64,
  base64ToStr,
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  clearLocalStorage,
  getRandomStr,
  formatDate
};
```
### 页面开发
页面开发主要用来开发前端页面，包括登录页面、后台页面、404页面等。
#### 1.登录页面
登录页面主要用来处理用户登录逻辑，包括验证用户名和密码等。
#### 2.后台页面
后台页面主要用来处理后台相关逻辑，包括获取用户信息、获取菜单列表等。
#### 3.404、403页面
404、403页面主要用来处理页面不存在或权限不足等错误。
## 项目后端
后端模块使用Express框架+MySQL。
### 数据库
数据库采用MySQL。
#### mysql操作封装
```
const mysql = require('mysql');
const { access } = require('../units/log')
var databaseConfig = require('./mysql.config');
module.exports = {
  query: function (sql, callback) {
    var connection = mysql.createConnection(databaseConfig);
    connection.connect(function (err) {
      if (err) {
        return err;
      }
      connection.query(sql, function (err, results, fields) {
        if (err) {
          access('数据操作失败：' + sql)
          access(err)
        } else {
          callback && callback(results);
        }
        connection.end(function (err) {
          if (err) {
            return err;
          }
        });
      });
    });
  }
};
```
### json存储
使用json文件来存储角色权限配置。
### logs日志
在logs文件夹中记录所有操作日志。
### 业务模块
业务模块主要用来处理具体业务逻辑，例如用户模块等。
### 前端服务器
前端服务器主要用来渲染打包后的前端项目。前端执行npm run build命令后，会将打包后的文件放到public文件夹中。
### 路由设计
路由设计主要用来处理接口的路由。
#### 路由中间件
路由中间件主要用来处理接口的权限验证、日志记录等。
```
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
```
### 工具类
#### 公共方法
公共方法主要用来处理一些公共的函数，例如日期格式化、加密解密等。
```
module.exports = {
  strToBase64,
  base64ToStr,
  getRandomStr,
  formatDate
};
```
#### 日志工具
日志工具主要用来记录日志信息。
```
const fs = require('fs')
const path = require('path')
const { formatDate } = require('./index')
// 写日志
function writeLog(writeStream, log) {
  writeStream.write(log + ' ' + formatDate(null, "YY-MM-DD hh:mm:ss") + '\n')
}

function createWriteStream(fileName) {
  const fullWriteFilePath = path.resolve(__dirname, '../', 'logs', fileName)
  const writeStream = fs.createWriteStream(fullWriteFilePath, {
    flags: 'a'
  })
  return writeStream
}

function access(log) {
  const accessWriteStream = createWriteStream(formatDate(null, "YYMMDD") + '.log')
  if (typeof log !== 'string') {
    log = JSON.stringify(log)
  }
  writeLog(accessWriteStream, log)

}
module.exports = {
  access
}
```
## 项目部署
项目部署主要用来将项目部署到服务器上，包括配置服务器环境、安装依赖、启动项目等。
1.配置服务器node环境
2.前端npm run build打包前端代码到后端模块的前端服务器中
3.将后端模块部署到服务器上
4.npm i安装依赖
5.npm run start启动后端服务器