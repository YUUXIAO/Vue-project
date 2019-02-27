<!--
description: 面包屑导航组件
author: yuxiao
create time: 2019-2-21
 -->

<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <!-- 当路由配置redirect为'noredirect'或者为当前页面则取消链接跳转 -->
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
  // url 字符串的正则表达式
  import pathToRegexp from 'path-to-regexp'

  export default {
    data() {
      return {
        levelList: null
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    },
    created() {
      this.getBreadcrumb()
    },
    methods: {
      // 获取导航名称组
      getBreadcrumb() {
        // 获取当前匹配的路径中所包含的所有片段所对应的配置参数对象。
        let matched = this.$route.matched.filter(item => item.name)
        const first = matched[0]
        if (first && first.name !== 'dashboard') {
          matched = [{
            path: '/dashboard',
            meta: {
              title: '首页'
            }
          }].concat(matched)
        }
        this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      },
      pathCompile(path) {
        const {
          params
        } = this.$route
        let toPath = pathToRegexp.compile(path)
        return toPath(params)
      },
      // 导航链接跳转
      handleLink(item) {
        const {
          redirect,
          path
        } = item
        if (redirect) {
          this.$router.push(redirect)
          return
        }
        this.$router.push(this.pathCompile(path))
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
