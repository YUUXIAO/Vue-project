<template>
  <div class="topOpenTags">
    <div class="topTags">
      <span class="tips">当前所在位置：</span>
      <el-tag class="tag" size="medium" :type="item.children?(item.children[0].name === currentPageName?'info':'success'):(item.name === currentPageName?'':'info')" :closable="item.name !=='dashboard-home'" v-for="item in pageTagsList" :key="item.name" @close="closePage(item.name)" @click.native="linkTo(item.name)">
        {{item.meta.title}}
      </el-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topOpenTags',
  props: {
    pageTagsList: Array
  },
  data() {
    return {
      currentPageName: this.$route.name
    }
  },
  computed: {
    tagsList() {
      return this.$store.state.app.tagsList
    }
  },
  methods: {
    // 关闭标签页面
    closePage(name) {
      this.$store.commit('removeTag', name)
      // 关闭的页面为当前页面
      if (this.currentPageName === name) {
        let lastPageName = ''
        if (this.$store.state.app.pageOpenedList.length > 1) {
          lastPageName = this.$store.state.pageOpenedList[1].name
        } else {
          lastPageName = this.$store.state.app.pageOpenedList[0].name
        }
         this.$router.push({
          name: lastPageName
        })
      }
     
    },
    // 点击跳转相应页面
    linkTo(name) {
      this.$router.push({
        name
      })
    },
    initTags() {
      let tag = this.tagsList.find(item => {
        return item.name == 'dashboard-home'
      })
      this.pageTagsList.push(tag)
    }
  },
  watch: {
    $route(to) {
      this.currentPageName = to.name
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';
.topOpenTags {
  padding: 10px;

  & .tips {
    font-size: 12px;
    color: #606266;
  }

  & .topTags {
    & .tag {
      margin-right: 10px;
      cursor: pointer;
      @include borderRadius(0);
    }
  }
}

.el-icon-close:before {
  border: 1px solid red;
}
</style>
