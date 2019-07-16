<template>
    <div class="topTags">
        <el-tag class="tag" size="large" :type="item.children?(item.children[0].name === currentPageName?'':'info'):(item.name === currentPageName?'':'info')" :closable="item.name !=='home'" v-for="item in pageTagsList" :key="item.path" @close="closePage(item.name)" @click.native="linkTo(item.name)">{{item.meta.title}}</el-tag>
    </div>
</template>

<script>
export default {
    name: 'tagsPageOpened',
    props: {
        pageTagsList: Array
    },
    data(){
        return{
            currentPageName:this.$route.name
        }
    },
    methods:{
        // 关闭标签页面
        closePage(name){
            this.$store.commit('removeTag',name)
            // 关闭的页面为当前页面
            if(this.currentPageName === name){
                 let lastPageName = ''
                 if(this.$store.state.app.pageOpenedList>1){
                    lastPageName = this.$store.state.pageOpenedList[1].name
                 }else{
                    lastPageName = this.$store.state.app.pageOpenedList[0].name
                 }
            }
            this.$router.push({name:lastPageName})
        },
        // 点击跳转相应页面
        linkTo(name){
            this.$router.push({name})
        }
    },
    watch:{
        $route(to){
           this.currentPageName = to.name
        }
    }
}
</script>




<style rel="stylesheet/scss" lang="scss" scoped>
.topTags {
  display: inline-block;
}
</style>
