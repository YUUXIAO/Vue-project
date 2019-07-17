import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { Message } from 'element-ui'
import { getToken, hasPermission, filterAuthRouter } from '@/utils/auth' // 验权
import { authRouter } from '@/router/index'

const whiteList = ['/login', '/404'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else if (store.state.user.isLogin) {
    if (hasPermission(store.state.user.roles, to)) {
      next()
    } else {
      next({
        path: '/404'
      })
    }
  } else {
    // 模拟假数据
    const data = {
      name: 'YU',
      isAdmin: true,
      avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3065423701,9584140&fm=27&gp=0.jpg',
      authority_list: [
        {
          authority: 'user',
          name: 'user'
        },
        {
          authority: 'user_auditing',
          name: 'user_auditing'
        },
        {
          authority: 'user_tree',
          name: 'user_tree'
        },
        {
          authority: 'user_tree2',
          name: 'user_tree2'
        },
        {
          authority: 'product',
          name: 'product'
        },
        {
          authority: 'product_category',
          name: 'product_category'
        },
        {
          authority: 'product_standard',
          name: 'product_standard'
        },
        {
          authority: 'nested_menu1',
          name: 'nested_menu1'
        },
        {
          authority: 'nested_menu1_menu1-1',
          name: 'nested_menu1_menu1-1'
        },
        {
          authority: 'nested',
          name: 'nested'
        }
      ]
    }
    const roles = data.authority_list.map(auth => {
      return auth.authority
    })
    // 设置用户角色
    if (roles && roles.length > 0) {
      // 验证返回的roles是否是一个非空数组
      store.commit('SET_ROLES', roles)
    } else {
      reject('getInfo: roles must be a non-null array !')
    }
    // 设置登陆状态成功
    store.commit('SET_LOGIN')
    // 设置用户名
    store.commit('SET_NAME', data.name)
    store.commit('SET_AVATAR', data.avatar)
    const routers = filterAuthRouter(authRouter, roles)
    store.commit('setMenu', routers)
    router.addRoutes(routers)
    next({
      ...to
    })
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
