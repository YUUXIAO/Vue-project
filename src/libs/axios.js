import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL = process.env.BASE_API,  // API的base_url
  timeout: 5000  // 请求超时时间
})

// request拦截器
service.interceptors.request.use( config =>{
  // LoadingBar.start()  请求开始的时候可以结合 vuex 开启全屏 loading 动画
  // store.commit('setLoad', true)   提交发起请求信息
  return config
},error =>{
  // Do something with request error
  return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use( response =>{
    // LoadingBar.finish()
    // store.commit('setLoad', false)
    if (response.status === 200) {
      if (response.data == '403') {
        if (location.href.includes('/login')) {
          return
        } else {
          // 回到登陆页面
          if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
          MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // store.dispatch('FedLogOut').then(() => {
            //   location.reload();  // 为了重新实例化vue-router对象 避免bug
            // });
            console.log('重新登录')
          }).catch(() =>{
            console.log('已取消删除')
          });
        }
        return Promise.reject('error');
        }
      } else {
        return response
      }
    }
},error =>{
    // LoadingBar.error()
    // store.commit('setLoad', false)
    if (error.response.status === 500) {
      Message({
        message: error.message,
        type: 'error',
        duration: 5*1000
      })
    }
    return Promise.reject(error)
})

export default service
