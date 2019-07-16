<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <!-- Logo -->
    <div class="logo-con" style="height:50px;padding: 5px 10px;background:red;">
      <!-- <img v-show="!isCollapse" src="../../../../images/logo.png" style="width:100%;height: 100%;"> -->
    </div>
    <!-- 菜单列表 -->
    <el-menu :default-active="currentPage" :collapse="isCollapse" mode="vertical" @select="handleSelect">

      <!-- <template>
        <div :key="item.name"></div>
      </template> -->
      <sidebar-item v-for="route in menuList" :key="route.path" :item="route" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import { mapGetters } from 'vuex'
  import variables from '@/styles/variables.scss'
  import SidebarItem from './SidebarItem'

  export default {
    name: 'sidebarMenu',
    // props:{
    //   menuList:Array
    // },
    components: {
      SidebarItem
    },
    data() {
      return {}
    },
    methods:{
      // 菜单改变
      handleSelect(index){
        console.log(index)
      },
    
    },
    created(){
      console.log(this.$store.state.app.menuList)
    },
    computed: {
      ...mapGetters([
        'sidebar'
        // 'permission_routes'
      ]),
      menuList() {
        // let menuList = this.$store.state.app.menuList
        console.log(this.$store.state.app.menuList)
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
            return this.$route.name
          }
        } else {
          return this.$route.name
        }
      }
    }
  }

</script>
