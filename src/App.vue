<template>
  <div id="app">
    <el-button>click</el-button>
    <form name='form' action="">
      <el-input id="username" type="text" placeholder="请输入手机号码或用户名" />

      <el-input id='pwd' type="password" placeholder="请输入密码" />

      <el-button>登录</el-button>

    </form>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
 created(){}
}
</script>

<style>
</style>
