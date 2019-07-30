import Cookies from 'js-cookie'
const TokenKey = 'Admin-Token'

// 获取token
export function getToken() {
  return Cookies.get(TokenKey)
}
// 设置token
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
// 清除token
export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 判断是否具有权限
export function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.includes(role))
  } else {
    return true
  }
}
// 权限过滤
export function filterAuthRouter(routers, roles) {
  const accessedRouters = routers.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAuthRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}
