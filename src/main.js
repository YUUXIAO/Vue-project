import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'

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
  render: h => h(App)
})
