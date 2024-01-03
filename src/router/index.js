import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import config from "@/config";
import units from "@/units";

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
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
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
        NProgress.start()
        next()
      } else {
        lastRequestTime = new Date().getTime();
        toCheckToken(next,token)
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
  next({
    name: "login",
  })
}
const toCheckToken = (next,token) => {
    // let userAuthority = this.$unit.getLocalStorage("userAuthority");
      // let userAuthorityArr = userAuthority ? userAuthority.split(",") : [];
      // if (!userAuthorityArr.includes(to.name)) {
      //   this.$router.push({
      //     name: "403",
      //   });
      // }else{
      //   next();
      // }
  console.log(token);
}
export default router
