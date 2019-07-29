import router from '../router'
import store from '../store'
import util from './utils'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken, filterAuthRouter } from '@/libs/auth'
import { authRouter } from '@/router/index'

const whiteList = ['/login', '/404']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  util.title(to.meta.title)

  const hsaToken = getToken()
  if (hsaToken) {
    if (to.path === '/login') {
      // 已登陆可跳过登陆进入首页
      next({ path: '/login' })
      // NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 重新拉取用户信息
          const { roles } = await store.dispatch('GetInfo')
          const routers = filterAuthRouter(authRouter, roles)
          router.addRoutes(routers)
          store.commit('SET_MENU', routers)
          next({ ...to })
        } catch (error) {
          // 清空用户信息
          await store.dispatch('resetToken')
          util.showMsg(error || 'Has Error', 'error')
          next('/login')
          NProgress.done()
        }
      }
    }
  } else {
    // has no token
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
