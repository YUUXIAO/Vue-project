/*
  description: 登陆相关请求API
  author: yuxiao
  create time: 2019-2-21
 */
import request from '@/utils/request'

// 登陆
export function login(username, password) {
  // return request({
  //   url: '/user/login',
  //   method: 'post',
  //   data: {
  //     username,
  //     password
  //   }
  // })

  // 模拟假数据
  return new Promise((resolve, reject) => {
    let data = {
      token: 'admin-token'
    }
    resolve(data)
  })

}
// 获取用户信息
export function getInfo(token) {
  // return request({
  //   url: '/user/info',
  //   method: 'get',
  //   params: { token }
  // })

  // 模拟假数据
  return new Promise((resolve, reject) => {
    let data = {
      data: {
        name: 'YU',
        avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3065423701,9584140&fm=27&gp=0.jpg',
        roles: ['user', 'user_auditing', 'product', 'product_category', 'product_standard', 'nested_menu1', 'nested_menu1_menu1-1', 'nested']
      }
    }
    resolve(data)
  })
}
// 登出
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
