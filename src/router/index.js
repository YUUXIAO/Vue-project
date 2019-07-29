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
    activeMenu:'router-name'       此页面在菜单栏隐藏，设置菜单栏高亮状态的父级路由
  }
* 
**/

// 静态路由，不需要权限
export const nonAuthRouter = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  }
]
// 动态路由，需要根据用户权限动态加载
export const authRouter = [
  // 首页
  {
    path: '/',
    component: Layout,
    name: 'dashboard',
    redirect: '/home',
    meta: {
      icon: 'el-icon-house',
      role: ['user']
    },
    children: [{
      path: 'home',
      name: 'dashboard-home',
      hidden: false,
      meta: {
        title: '首页',
        icon: 'el-icon-house',
        role: ['user']
      },
      component: () => import('@/views/dashboard/index')
    }]
  },
  // 用户管理
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'user',
    meta: {
      title: '用户管理',
      icon: 'el-icon-user',
      role: ['user']
    },
    children: [
      // 用户列表
      {
        path: 'list',
        name: 'user-list',
        meta: {
          title: '用户列表',
          icon: 'el-icon-user',
          role: ['user_auditing']
        },
        component: () => import('@/views/user/user_list')
      },
      // 用户审核列表
      {
        path: 'auditing',
        name: 'user-auditing',
        meta: {
          title: '用户审核',
          icon: 'el-icon-user',
          role: ['user_auditing']
        },
        component: () => import('@/views/user/user_auditing_list'),
      },
      // 用户审核编辑/详情
      {
        path: 'auditing/detail/:action/:id',
        name: 'user-auditing-detail',
        hidden: true,
        meta: {
          title: '用户审核',
          role: ['user_auditing'],
          icon: 'el-icon-user',
          activeMenu: 'user-auditing'
        },
        component: () => import('@/views/user/user_auditing_detail')
      },
      // 用户审核列表新增
      {
        path: 'auditing/detail/add',
        name: 'user-auditing-add',
        hidden: true,
        meta: {
          title: '用户审核',
          icon: 'el-icon-user',
          role: ['user_auditing'],
          activeMenu: 'user-auditing'
        },
        component: () => import('@/views/user/user_auditing_detail')
      },
      {
        path: 'tree',
        name: 'user-tree',
        component: () => import('@/views/tree/index'),
        meta: {
          title: '用户开户',
          icon: 'el-icon-user',
          role: ['user_tree']
        }
      },
      {
        path: 'open',
        name: 'user-open',
        component: () => import('@/views/tree/index'),
        meta: {
          title: '用户开户2',
          icon: 'el-icon-user',
          role: ['user_tree2']
        }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/Category',
    name: 'product',
    meta: {
      title: '产品管理',
      icon: 'el-icon-goods',
      role: ['product']
    },
    children: [{
      path: 'category',
      name: 'product-category',
      component: () => import('@/views/table/index'),
      meta: {
        title: '产品分类',
        icon: 'el-icon-goods',
        role: ['product_category']
      }
    },
    {
      path: 'standard',
      name: 'product-standard',
      component: () => import('@/views/tree/index'),
      meta: {
        title: '产品标准',
        icon: 'el-icon-goods',
        role: ['product_standard']
      }
    },
    {
      path: 'price',
      name: 'product-price',
      component: () => import('@/views/tree/index'),
      meta: {
        title: '产品价格',
        icon: 'el-icon-goods',
        role: ['product_price']
      }
    }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'nested',
    meta: {
      title: '订单管理',
      icon: 'el-icon-document',
      role: ['nested']
    },
    children: [{
      path: 'menu1',
      name: 'nested-menu1',
      component: () => import('@/views/nested/menu1/index'),
      meta: {
        title: 'Menu1',
        icon: "el-icon-document",
        role: ['nested_menu1']
      },
      children: [{
        path: 'menu1-1',
        name: 'nested-menu1-1',
        component: () => import('@/views/nested/menu1/menu1-1'),
        meta: {
          title: 'Menu1-1',
          role: ['nested_menu1_menu1-1']
        }
      },
      {
        path: 'menu1-3',
        name: 'nested-menu1-3',
        component: () => import('@/views/nested/menu1/menu1-3'),
        meta: {
          title: 'Menu1-3',
          icon: 'el-icon-document',
          role: ['nested_menu1_menu1-3']
        }
      }
      ]
    },
    {
      path: 'menu2',
      name: 'nested-menu1-menu2',
      component: () => import('@/views/nested/menu2/index'),
      meta: {
        title: 'menu2',
        icon: 'el-icon-document',
        role: ['nested_menu2']
      }
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
  scrollBehavior: () => ({
    y: 0
  }),
  routes: nonAuthRouter
})
