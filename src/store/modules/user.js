import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, filterAuthRouter } from '@/utils/auth'
import { authRouter } from '@/router'

const user = {
  state: {
    token: getToken(),
    // 用户名
    name: '',
    // 用户角色
    roles: [],
    // 头像
    avatar: '',
    // 是否登录
    isLogin: false
  },

  mutations: {
    // 保存token
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    // 保存用户名
    SET_NAME: (state, name) => {
      state.name = name
    },
    // 保存用户头像
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    // 保存用户权限信息
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    // 设置登陆状态【true】
    SET_LOGIN: state => {
      state.isLogin = true
    },
    // 设置登陆状态【false】
    SET_LOGINOUT: state => {
      state.isLogin = false
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: password })
          .then(response => {
            const { token } = response
            commit('SET_TOKEN', token)
            setToken(token)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          let { data } = response
          let { username, avatar, roles } = data
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          }
          commit('SET_LOGIN')
          commit('SET_ROLES', roles)
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_ROLES', [])
        commit('SET_TOKEN', '')
        commit('SET_LOGINOUT')
        removeToken()
        // logout(state.token)
        //   .then(() => {
        //     commit('SET_TOKEN', '')
        //     commit('SET_ROLES', [])
        //     commit('SET_LOGINOUT')
        //     removeToken()
        //     resolve()
        //   })
        //   .catch(error => {
        //     reject(error)
        //   })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
