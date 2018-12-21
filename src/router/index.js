import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

const router = [
  {
    path: '/',
    name: 'Home',
    component: _import('Layout/HeaderNav')
  },
  {
    path: '/login',
    name: 'login',
    component: _import('login')
  },
  {
    path: '/page1',
    name: 'page1',
    component: _import('page1')
  },
  {
    path: '/page2',
    name: 'page2',
    component: _import('page2')
  },
  {
    path: '/page3',
    name: 'page3',
    component: _import('page3')
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: router
})
