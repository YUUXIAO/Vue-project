<template>
  <div :class="classObj" class="app-wrapper">
    <!-- <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" /> -->
    <sidebar class="sidebar-container" :menuList="menuList" />
    <div class="main-container">
      <navbar/>
      <app-main/>
    </div>
  </div>
</template>

<script>
  import {
    Navbar,
    Sidebar,
    AppMain,
  } from './components'

  import ResizeMixin from './mixin/ResizeHandler'
  

  export default {
    name: 'Layout',
    components: {
      Navbar,
      Sidebar,
      AppMain
    },
    mixins: [ResizeMixin],
    computed: {
      menuList() {
        return this.$store.state.app.menuList
      },
      sidebar() {
        return this.$store.state.app.sidebar
      },
      device() {
        return this.$store.state.app.device
      },
      classObj() {
        return {
          hideSidebar: !this.sidebar.opened,
          openSidebar: this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
      }
    },
    methods: {
      handleClickOutside() {
        this.$store.dispatch('CloseSideBar', {
          withoutAnimation: false
        })
      }
    },
    created(){
      // 创建最近打开页面列表
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
