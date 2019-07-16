import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'
import { authRouter } from '@/router/index'

import '@/styles/index.scss'
import 'element-ui/lib/theme-chalk/index.css'

import '@/icons'
import '@/permission'
import locale from 'element-ui/lib/locale/lang/en'
import * as filters from '@/utils/filters'

Vue.use(ElementUI, { locale })

// 全局注册filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

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
    console.log(tagsList)
    this.$store.commit('setTagsList', tagsList)
  }
})
