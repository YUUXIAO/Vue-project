import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

const router = [
  {
    path: '/',
    name: 'Header',
    component: _import('Layout/HeaderNav')
  }
  // {
  //   path: '/',
  //   name: 'HelloWorld',
  //   component: _import('helloWorld')
  // },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: _import('home')
  // }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: router
})
