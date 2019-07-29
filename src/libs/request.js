import axios from 'axios'
import qs from 'qs'
import store from '../store'
import util from '@/libs/utils'
import { getToken } from '@/libs/auth'

// 创建axios实例
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})


service.interceptors.request.use(config => {
  // post请求序列化参数
  if (config.method === 'post') config.data = qs.stringify(config.data)
  // 让每个请求携带自定义token 
  if (store.getters.token) config.headers['token'] = getToken()

  return config
},
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response 拦截器【code为非200是抛错;50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;】
service.interceptors.response.use(
  response => {
    const { code } = response.data
    if (code !== 200) {
      // 提示报错信息
      util.showMsg(res.message, 'warning')
      if (code === 50008 || code === 50012 || code === 50014) {
        util.showConfirm('你已被登出，可以取消继续留在该页面，或者重新登录', '', 'warning', '重新登录', '', function () {
          store.dispatch('resetToken').then(() => {
            // 为了重新实例化vue - router对象 避免bug
            location.reload()
          })
        })
      }
      return Promise.reject('error')
    } else {
      return Promise.resolve(response)
    }
  },
  error => {
    // 提示报错信息
    util.showMsg(error.message, 'warning')
    return Promise.reject(error)
  }
)

export default service
