import Vue from 'vue'
import Router from 'vue-router'

// const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

const router = [
  // {
  //   path: '/',
  //   name: 'login',
  //   component: _import('login')
  // }
  // {
  //   path: '/',
  //   name: 'HelloWorld',
  //   component: _import('helloWorld')
  // }
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/login')
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: router
})
