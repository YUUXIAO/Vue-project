import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'

Vue.use(Router)

/**
* hidden: true                   决定页面是否在左边菜单栏隐藏【 true:隐藏；false: 显示 】
* redirect: noredirect           决定相应页面在面包屑导航中是否需要提供链接跳转【值为'noredirect'则取消链接】
* name:'router-name'             路由名称
* meta : {
    title: 'title'               此字段用于显示相应页面在左侧菜单栏和面包屑导航中的名称【必填】
    icon: 'svg-name'             菜单图标
    role：'[admin]'              决定访问此页面所需的用户权限【根据此字段过滤路由根据不同用户动态加载】
  }
**/

// 静态路由，不需要权限
export const nonAuthRouter = [
  {
    path: '/',
    redirect: '/login'
  },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true }
]
// 动态路由，需要根据用户权限动态加载
export const authRouter = [
  // 首页
  {
    path: '/',
    component: Layout,
    name: 'Dashboard',
    redirect: '/home',
    meta: { title: '首页', icon: 'example', role: ['user'] },
    children: [
      {
        path: 'home',
        name: 'home',
        hidden: false,
        meta: { title: '首页', icon: 'example', role: ['user'] },
        component: () => import('@/views/dashboard/index')
      }
    ]
  },
  // 用户管理
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'User',
    meta: { title: '用户管理', icon: 'example', role: ['user'] },
    children: [
      // 用户列表
      {
        path: 'list',
        name: 'userList',
        meta: { title: '用户列表', icon: 'table', role: ['user_auditing'] },
        component: () => import('@/views/user/user_list')
      },
      // 用户审核列表
      {
        path: 'auditing',
        name: 'Auditing',
        meta: { title: '用户审核', icon: 'table', role: ['user_auditing'] },
        component: () => import('@/views/user/user_auditing_list'),
      },
      // 用户审核编辑/详情
      {
        path: 'auditing/detail/:action/:id',
        name: 'AuditingDetail',
        hidden: true,
        meta: { title: '用户审核', role: ['user_auditing'] },
        component: () => import('@/views/user/user_auditing_detail')
      },
      // 用户审核列表新增
      {
        path: 'auditing/detail/add',
        name: 'auditingAdd',
        hidden: true,
        meta: { title: '用户审核', role: ['user_auditing'] },
        component: () => import('@/views/user/user_auditing_detail')
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '用户开户', icon: 'tree', role: ['user_tree'] }
      },
      {
        path: 'open',
        name: 'Open',
        component: () => import('@/views/tree/index'),
        meta: { title: '用户开户2', icon: 'tree', role: ['user_tree2'] }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/Category',
    name: 'Product',
    meta: { title: '产品管理', icon: 'example', role: ['product'] },
    children: [
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/table/index'),
        meta: { title: '产品分类', icon: 'table', role: ['product_category'] }
      },
      {
        path: 'standard',
        name: 'Standard',
        component: () => import('@/views/tree/index'),
        meta: { title: '产品标准', icon: 'tree', role: ['product_standard'] }
      },
      {
        path: 'price',
        name: 'Price',
        component: () => import('@/views/tree/index'),
        meta: { title: '产品价格', icon: 'tree', role: ['product_price'] }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '订单管理',
      icon: 'nested',
      role: ['nested']
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1', role: ['nested_menu1'] },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1', role: ['nested_menu1_menu1-1'] }
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3', role: ['nested_menu1_menu1-3'] }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2', role: ['nested_menu2'] }
      }
    ]
  },
  {
    path: '/*',
    meta: {
      title: '404'
    },
    component: () => import('@/views/404'),
    hidden: true
  }
]

export default new Router({
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: nonAuthRouter
})
