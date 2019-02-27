/*
  description: 登陆相关请求API
  author: yuxiao
  create time: 2019-2-21
 */
import request from '@/utils/request'

// 登陆
export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
// 获取用户信息
export function getInfo(params) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { params }
  })
}
// 登出
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
