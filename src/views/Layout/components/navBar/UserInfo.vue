<template>
    <div class="userInfo flex-x-start flex-y-center">
        <div class="user-container">
            <el-dropdown trigger="click">
                <div class="user-wrapper flex-x-start flex-y-center">
                    <img class="avatar" :src="avatar">
                    <span class="name">{{name}}</span>
                    <i class="el-icon-caret-bottom" style="color: #fff;" />
                </div>
                <el-dropdown-menu slot="dropdown" class="user-dropdown">
                    <el-dropdown-item divided>
                        <span style="display:block;">修改密码</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="loginOut-cont">
            <router-link class="inlineBlock" to="/">
                <div @click="logout">
                    <i class="el-icon-switch-button" />
                    <span class="loginOut">退出</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data(){
        return{}
    },
    computed: {
        ...mapGetters([
            'name',
            'avatar'
        ]),
    },
    methods:{
        logout() {
            this.$store.dispatch('LogOut').then(() => {
                // 为了重新实例化vue-router对象 避免bug
                location.reload() 
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';

.userInfo {
  height: 50px;
  float: right;
  margin-right: 30px;
}
.user-container {
  height: 100%;
  .user-wrapper {
    cursor: pointer;
    position: relative;
    .avatar {
      width: 30px;
      height: 30px;
      @include borderRadius;
    }
    .name {
      margin: 0 10px;
      color: #fff;
    }
    .el-icon-caret-bottom {
      line-height: 50px;
      font-size: 12px;
    }
  }
}
.loginOut-cont {
  padding: 0 10px;
  font-size: 14px;
}
</style>


