<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container" :menuList="menuList" />
    <div class="main-container">
      <navbar/>
      <topOpenTags :pageTagsList="pageTagsList" />
      <appMain/>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain,TopOpenTags } from './components'
export default {
  name: 'Layout',
  components: { Navbar, Sidebar, AppMain, TopOpenTags },
  computed: {
    menuList() {
      return this.$store.state.app.menuList
    },
    // 获取最近打开页面的页面对象
    pageTagsList() {
      return this.$store.state.app.pageOpenedList
    },
    sidebar() {
      return this.$store.state.app.sidebar
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation
      }
    }
  },
  methods: {},
  created() {
    // 创建历史页面列表
    this.$store.commit('setOpendList')
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
  & .main-container {
    background: #efefef;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
