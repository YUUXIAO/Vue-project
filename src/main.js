import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import { authRouter } from '@/router/index'

import '@/icons'
import '@/styles/index.scss'
import 'element-ui/lib/theme-chalk/index.css'

import '@/utils/permission'
import * as filters from '@/utils/filters'
import * as components from '@/components'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale })

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

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    // 设置最近打开页面
    let tagsList = []
    authRouter.map(item => {
      if (item.children) {
        tagsList.push(...item.children)
      } else {
        tagsList.push(item)
      }
    })
    this.$store.commit('setTagsList', tagsList)
  }
})
