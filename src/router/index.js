import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import config from "@/config";
import units from "@/units";
import { getInfoByToken } from "@/api/module/user";
import useUserStore from '@/stores/user'


let lastRequestTime = null;

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/login'
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/home',
      component: () => import('@/views/admin/index.vue'),
      children: [
        {
          path: "home",
          name: "adminHome",
          meta: { title: "首页" },
          component: () => import('@/views/admin/home/index.vue')
        }, {
          path: "editPassword",
          name: "adminEditPassword",
          meta: { title: "修改密码" },
          component: () => import('@/views/admin/editPassword/index.vue')
        }, {
          path: "user",
          name: "adminUser",
          meta: { title: "用户管理" },
          component: () => import('@/views/admin/user/index.vue')
        },
      ]
    },
    {
      path: "/login",
      name: "login",
      meta: { title: "登录" },
      component: () => import('@/views/login/index.vue')
    },
    {
      path: "/403",
      name: "403",
      meta: { title: "无权限访问" },
      component: () => import('@/views/403/index.vue')
    },
    {
      path: "/:path(.*)",
      name: "404",
      meta: { title: "没找到页面" },
      component: () => import('@/views/404/index.vue')
    }
  ]
})
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
const toLogin = (next) => {
  ElNotification({
    title: "提示",
    message: "登录失效，请重新登陆！",
    duration: 3000,
    type: "warning",
    position: "bottom-right",
    dangerouslyUseHTMLString: true,
  });
  NProgress.start()
  next({
    name: "login",
  })
}
const toCheckToken = (next, token, to) => {
  getInfoByToken({ token }).then(res => {
    if (res.code == 200 && res.data) {
      const userStore = useUserStore()
      userStore.changeInfo(res.data.info)
      toCheckAuthority(next, to)
    } else {
      toLogin(next)
    }
  })
}
const toCheckAuthority = (next, to) => {
  const userStore = useUserStore()
  const userInfo = userStore.getInfo()
  let userAuthority = userInfo.authority;
  let userAuthorityArr = userAuthority ? userAuthority.split(",") : [];
  if (!userAuthorityArr.includes(to.name)) {
    NProgress.start()
    next({
      name: "403",
    })
  } else {
    NProgress.start()
    next();
  }
}
export default router
