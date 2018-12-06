import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuList: [], //系统菜单
    menuChildList: [], //系统所有children路由
    isLogin: false, //是否登录
    isLoading: false,
    //当前登录用户
    loginUser: {
      roles: [], //用户角色
      name: ''
    },
    // 举例数据
    todos: [
      { id: 1, title: '码代码', done: false },
      { id: 2, title: '看代码', done: true },
      { id: 3, title: '改BUG', done: true }
    ]
  },
  // 相当于store的计算属性
  getters: {
    // 举例数据
    doneTodos: state => {
      return state.todos.filter(todo => {
        todo.done
      })
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    }
  },
  mutations: {
    setMenuChildList(state, list) {
      state.menuChildList.push(...list)
    },
    login(state) {
      state.isLogin = true
    },
    setRoles(state, roles) {
      state.loginUser.roles = roles
    },
    setLoad(state, load) {
      state.isLoading = load
    },
    setUserName(state, name) {
      state.loginUser.name = name
    }
  },
  actions: {}
})
