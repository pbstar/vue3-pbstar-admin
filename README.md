# vue3-pbstar-admin

## 开始
```
# Clone the project
git clone https://github.com/pbstar/vue3-pbstar-admin.git

# Enter the project directory
cd vue3-pbstar-admin

# Install dependency
npm install

# Compiles and hot-reloads for development
npm run dev

# Compiles and minifies for production
npm run build

# Enter the server directory
cd server

# Start server
npm run start

```
## 目录结构
```
├── public             # 静态资源
├── server             # 服务端代码 
│ ├── db               # 数据库相关
│ ├── json             # json文件 
│ ├── logs             # 日志 
│ ├── module           # 业务模块 
│ ├── public           # 静态资源服务器
│ ├── router           # 路由
│ ├── utils            # 工具类
│ ├── package.json     # package配置
│ └── app.js           # 服务端入口文件 
├── src                # 源代码 
│ ├── api              # 接口 
│ ├── assets           # 静态资源 
│ ├── components       # 组件 
│ ├── config           # 配置文件
│ ├── router           # 路由 
│ ├── stores           # 状态管理
│ ├── utils            # 工具类
│ ├── views            # 所有页面 
│ ├── App.vue          # 根页面 
│ └── main.js          # 入口文件 
├── .gitignore         # git配置文件 
├── index.html         # html入口文件
├── vite.config.js     # vite配置 
└── package.json       # package配置
```