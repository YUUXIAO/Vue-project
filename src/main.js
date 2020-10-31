import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import { authRouter } from '@/router/index'

import '@/icons'
import '@/styles/index.scss'
import 'element-ui/lib/theme-chalk/index.css'

import '@/libs/permission'
import * as filters from '@/libs/filters'
import * as components from '@/components'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(ElementUI, { zhLocale })

import { init, bind } from './libs/custom-life-cycle'

// 全局注册filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 全局注册components
Object.keys(components).forEach(key => {
  Vue.use(components[key])
})

// 阻止显示生产模式的消息
Vue.config.productionTip = false

// 初始化生命周期函数, 必须在Vue实例化之前确定合并策略
init()

const vm = new Vue({
  el: '#app',
  router,
  store,
  created() {
    // 设置最近打开页面
    const tagsList = []
    authRouter.map(item => {
      if (item.children) {
        tagsList.push(...item.children)
      } else {
        tagsList.push(item)
      }
    })
    this.$store.commit('setTagsList', tagsList)
  },
  render: h => h(App)
})

// 将rootVm 绑定到生命周期函数监听里面
bind(vm)

