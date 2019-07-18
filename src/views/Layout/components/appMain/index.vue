<template>
  <section class="app-main">
    <el-card shadow="always" :body-style="{padding:'10px 0'}">
      <transition name="fade-transform" mode="out-in">
        <router-view/>
      </transition>
    </el-card>
  </section>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>
     
<style scoped>
.app-main {
  /*50 = navbar  */
  background: #fff;
  min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
}
</style>
