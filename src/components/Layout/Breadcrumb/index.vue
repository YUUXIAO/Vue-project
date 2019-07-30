<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <!-- 当路由配置redirect为'noredirect'或者为当前页面则取消链接跳转 -->
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)" class="redirect">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
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
        let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
        if (matched[0] && matched[0].name != 'dashboard'&&matched[0].name != 'dashboard-home') {
          matched = [{
            path: '/home',
            meta: {
              title: '首页',
            }
          }].concat(matched)
        }
        this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      },
      // 导航链接跳转
      handleLink(item) {
        const { redirect, path } = item
        if (redirect) {
          this.$router.push(redirect)
          return
        }
        this.$router.push(path)
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
  color: #fff;
  .no-redirect {
    cursor: text;
    color: #fff;
  }
  .redirect {
    color: #fff;
    & :hover {
      color: #fff;
    }
  }
}
</style>
