<template>
  <div>
    <div class="topbar-logo topbar-btn">
      <!-- <a href="/">![](../../static/i/logo.png)</a> -->
    </div>

    <div class="topbar-title topbar-btn">
      <span>后台管理系统</span>
    </div>
    <div class="topbar-account topbar-btn">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link userinfo-inner">
          <i class="iconfont icon-user"></i>Admin
          <i class="iconfont icon-down"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="userinfo">个人信息</el-dropdown-item>
          <el-dropdown-item @click.native="editpwd">修改密码</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Header',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      userinfo() {
        console.log('userinfo')
      },
      editpwd() {
        console.log('editpwd')
      },
      logout() {
        console.log('logout')
      }

    },
    created() {
      console.log('HelloWorld')
    }
  }

</script>
