# 【vue3-pbstar-admin】一款基于vue3和nodejs的简洁后台管理系统
Vue3-pbstar-admin 是一个简洁的后台解决方案，提供了基础的用户体系和页面接口权限配置，方便用户进行自定义开发，避免不必要的代码冗余。该方案结合了 Vue3、Element-Plus、Pinia 和 Vite 等先进技术，实现高效的页面布局、状态管理和构建体验。同时，后端采用基于 Node.js 的 Express 框架和 MySQL 数据库，提供稳定的数据存储和高效的后台服务。这种前后端分离的设计，让开发人员能够更加专注于业务逻辑的实现，提高开发效率和代码质量。

## 项目开始
项目GitHub地址： [https://github.com/pbstar/vue3-pbstar-admin](https://github.com/pbstar/vue3-pbstar-admin)
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
2.安装依赖
npm install
3.运行项目后端模块
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
### 接口封装
#### 1.axios封装
#### 2.接口请求封装
### 组件封装
#### 1.公共组件封装
#### 2.页面组件封装
### 页面开发
#### 1.登录页面
#### 2.首页页面
#### 3.用户管理页面
#### 4.角色管理页面
#### 5.菜单管理页面
#### 6.部门管理页面
## 项目后端
## 项目部署