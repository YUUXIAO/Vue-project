<template>
  <div class="navbar">
    <breadcrumb />
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />
    <div class="right-container">
      <el-dropdown class="user-container" trigger="click">
        <div class="user-wrapper">
          <span>{{name}}</span>
          <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3065423701,9584140&fm=27&gp=0.jpg" class="user-avatar">
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
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import TopOpenTags from './TopOpenTags'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    TopOpenTags
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ]),
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
  overflow: hidden;
  background: #fff;

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
  .right-container {
    height: 50px;
    position: absolute;
    right: 35px;
    display: inline-block;
    border: 1px solid red;
  }
  .user-container {
    height: 50px;
    position: absolute;
    right: 35px;
    // border: 1px solid red;

    .user-avatar {
      width: 40px;
      height: 40px;
      // border: 1px solid red;
      margin-left: 10px;
    }
    .user-wrapper {
      // border: 1px solid green;
      cursor: pointer;
      position: relative;
      line-height: initial;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .el-icon-caret-bottom {
        line-height: 50px;
        font-size: 12px;
        // border: 1px solid blue;
      }
    }
  }
}
</style>
