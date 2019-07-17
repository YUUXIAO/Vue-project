<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <!-- Logo -->
    <div class="logo-con" v-if="!isCollapse">
      <img v-if="logo" :src="logo" class="sidebar-logo">
      <h1 class="sidebar-title">{{ title }}</h1>
    </div>
    <div class="logo-con " v-else>
      <img v-if="logo" :src="logo" class="sidebar-logo" style="width: 100%;">
    </div>
    <!-- 菜单列表 -->
    <el-menu :default-active="currentPageName" :collapse="isCollapse" :background-color="variables.menuBg" :text-color="variables.menuText" unique-opened="true" :active-text-color="variables.menuActiveText" :collapse-transition="false" mode="vertical" @select="handleSelect">
      <sidebar-item v-for="route in menuList" :key="route.path" :item="route" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'
  import variables from '@/styles/variables.scss'

  export default {
    name: 'sidebarMenu',  
    components: {
      SidebarItem
    },
    data() {
      return {
        logo:'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
        title:'VUE ELEMENT '
      }
    },
    computed:{
      isCollapse() {
        return !this.sidebar.opened
      }
    },
    methods: {
      // 菜单改变
      handleSelect(name) {
        if (name != 'dashboard-home') {
          // 获取最近打开页面
          let pageOpenedList = this.$store.state.app.pageOpenedList
          let index = pageOpenedList.findIndex(item => {
            return item && item.name == name
          })
          if (index != -1) {
            // 存在最近打开页面,修改数组顺序
            this.$store.commit('moveToSecond', index)
          } else {
            // 新增最近打开页面
            let pageObj = this.tagList.find(item => {
              return item.name == name
            })
            this.$store.commit('increateTag', pageObj)
          }
        }
        this.$router.push({
          name
        })
      }
    },
    computed: {
      ...mapGetters([ 'sidebar' ]),
      variables() {
        return variables
      },
      isCollapse() {
        return !this.sidebar.opened
      },
      menuList() {
        return this.$store.state.app.menuList
      },
      tagList() {
        return this.$store.state.app.tagsList
      },
      // 菜单栏定位
      currentPageName() {
        const route = this.$route,
          {
            meta,
            name
          } = route
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return name
      }
    }
  }

</script>


<style lang="scss" scoped>
.logo-con {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  & .sidebar-logo {
    height: 90%;
    width: auto;
  }

  & .sidebar-title {
    font-size: 14px;
    display: inline-block;
    padding-left: 15px;
  }
}
</style>

