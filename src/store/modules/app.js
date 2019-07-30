import Cookies from 'js-cookie'

/**
 * description:  系统基本配置数据
 **/

const app = {
  state: {
    isLoading: false,
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : false,
      opened: true,
      withoutAnimation: false
    },
    // 系统菜单
    menuList: [],
    // 系统所有路由
    tagsList: [],
    // 最近打开页面的页面对象
    pageOpenedList: []
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    // 设置loading
    SET_LOAD(state, load) {
      state.isLoading = load
    },
    // 设置权限菜单
    SET_MENU(state, menu) {
      state.menuList = menu
    },
    // 系统所有路由
    setTagsList(state, list) {
      state.tagsList.push(...list)
    },
    // 新增最近打开页面
    increateTag(state, tagObj) {
      let length = state.pageOpenedList.length
      if (length >= 4) {
        state.pageOpenedList.splice(3, length - 3)
      }
      state.pageOpenedList.splice(1, 0, tagObj)
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    // 关闭最近打开页面
    removeTag(state, name) {
      state.pageOpenedList.map((item, index) => {
        if (item.name === name) {
          state.pageOpenedList.splice(index, 1)
        }
      })
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    // 最近打开页面位置交换
    moveToSecond(state, index) {
      let openedPage = state.pageOpenedList[index]
      state.pageOpenedList.splice(index, 1)
      state.pageOpenedList.splice(1, 0, openedPage)
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    // 设置最近打开页面列表
    setOpendList(state) {
      state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [state.tagsList[0]]
    },
    // 清空最近打开页面列表
    clearOpenedSubmenu() {
      localStorage.pageOpenedList = ''
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    }
  }
}

export default app
