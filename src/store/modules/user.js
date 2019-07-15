import { login, logout, getInfo } from '@/api/login'
import { getToken, removeToken, filterAuthRouter } from '@/utils/auth'
import { authRouter } from '@/router/index'

const user = {
  state: {
    token: getToken(),
    name: '', // 用户名
    roles: [], // 用户角色
    isLogin: false // 是否登录
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LOGIN: state => {
      state.isLogin = true
    },
    SET_LOGINOUT: state => {
      state.isLogin = false
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        resolve()

        // login(username, userInfo.password)
        //   .then(response => {
        //     const data = response.data
        //     commit('SET_LOGIN') // 设置登陆状态成功
        //     resolve()
        //   })
        //   .catch(error => {
        //     reject(error)
        //   })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => { })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_ROLES', [])
        commit('SET_LOGINOUT')
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
