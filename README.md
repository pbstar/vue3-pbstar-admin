# vue3-pbstar-admin

## 开始
```
# Clone the project
git clone https://github.com/pbstar/vue3-pbstar-admin.git

# Enter the project directory
cd vue2-pbstar-admin

# Install dependency
npm install

# Compiles and hot-reloads for development
npm run dev

# Compiles and minifies for production
npm run build

# Start server
npm run server

```
## 目录结构
```
├── public             # 静态资源 
│ │── favicon.ico      # 网页图标 
│ │── config.json      # 全局配置文件 
│ └── index.html       # html模板 
├── server             # 服务端代码 
│ ├── json             # json数据库 
│ │ │── role.json      # 角色表
│ │ └── user.json      # 用户表
│ └── app.js           # 服务端入口文件 
├── src                # 源代码 
│ ├── assets           # 静态资源 
│ │ │── css            # 公共css文件 
│ │ │── js             # 公共js文件 
│ │ │── units          # 功能js方法文件 
│ │ └── imgs           # 图片文件 
│ ├── components       # 组件 
│ ├── router           # 路由 
│ ├── views            # 所有页面 
│ ├── App.vue          # 根页面 
│ └── main.js          # 入口文件 
├── .gitignore         # git配置文件 
├── vue.config.js      # vue-cli配置 
└── package.json       # package.json
```