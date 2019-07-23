import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { getToken, hasPermission, filterAuthRouter } from '@/utils/auth'
import { authRouter } from '@/router/index'

const whiteList = ['/login', '/404']
const hasToken = getToken()

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else if (store.state.user.isLogin) {
    if (hasPermission(store.state.user.roles, to)) {
      next()
    } else {
      next({ path: '/404' })
    }
  } else {
    store.dispatch('GetInfo').then(res => {
      const { roles } = res
      const routers = filterAuthRouter(authRouter, roles)
      router.addRoutes(routers)
      store.commit('SET_MENU', routers)
      next({ ...to })
    }).catch(error => {
      next({ path: '/login' })
      NProgress.done()
    })
  }
})

router.afterEach(() => {
  NProgress.done()
})
