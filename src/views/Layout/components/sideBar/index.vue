<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div class="logo-con" style="height:50px;padding: 5px 10px;background:black;">
      LOGO
      <!-- <img v-show="!isCollapse" src="../../../../images/logo.png" style="width:100%;height: 100%;"> -->
    </div>
    <el-menu :unique-opened='true' :show-timeout="200" :default-active="currentPage" :collapse="isCollapse" :background-color="variables.menuBg" :text-color="variables.menuText" :active-text-color="variables.menuActiveText" mode="vertical">
      <sidebar-item v-for="route in menuList" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import variables from '@/styles/variables.scss'
  import SidebarItem from './SidebarItem'

  export default {
    components: {
      SidebarItem
    },
    data() {
      return {}
    },
    created() {

    },
    computed: {
      ...mapGetters([
        'sidebar'
      ]),
      menuList() {
        return this.$store.state.app.menuList
      },
      variables() {
        return variables
      },
      isCollapse() {
        return !this.sidebar.opened
      },
      currentPage() {
        let arr = this.$route.path.split('/')
        if (arr.length > 3) {
          // 排除三级菜单子页面刷新侧边栏定位问题
          if (arr[3] != 'menu1-1' && arr[3] != 'menu1-3') {
            return `/${arr[1]}/${arr[2]}`
          } else {
            return this.$route.path
          }
        } else {
          return this.$route.path
        }
      }
    }
  }

</script>
