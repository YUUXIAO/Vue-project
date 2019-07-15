import Cookies from 'js-cookie'
const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) != -1)
  } else {
    return true
  }
}
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

export function setTagsList(authRouter) {
  const tagsList = []
  authRouter.map(item => {
    if (item.children) {
      tagsList.push(...item.children)
    } else {
      tagsList.push(item)
    }
  })
  this.$store.commit('setTagsList', tagsList)
}
