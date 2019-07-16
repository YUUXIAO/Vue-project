<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />
    <!-- <breadcrumb /> -->
    <!-- 最近打开页面 -->
    <TopOpenTags :pageTagsList="pageTagsList" />
    <el-dropdown class="user-container" trigger="click">
      <div class="user-wrapper">
        <span>{{name}}</span>
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item @click="logout">
            退出登陆
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;">修改密码</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import TopOpenTags from './TopOpenTags'

  export default {
    components: {
      Breadcrumb,
      Hamburger,
      TopOpenTags
    },
    data(){
      return{}
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name'
      ]),
      // 获取最近打开页面的页面对象
      pageTagsList(){
        console.log(this.$store.state.app.pageOpenedList)
        return this.$store.state.app.pageOpenedList
      }
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .user-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .user-wrapper {
      cursor: pointer;
      position: relative;
      line-height: initial;
      .el-icon-caret-bottom {
        line-height: 50px;
        font-size: 12px;
      }
    }
  }
}
</style>

