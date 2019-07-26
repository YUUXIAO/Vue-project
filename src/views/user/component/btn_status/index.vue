<template>
    <div>
        <el-tag type="info" effect="plain" class="status" @click="handleClick">
            <i class="icon-circle" :style="{ background: color }"></i>
            <span :style="{color:color}">{{text}}</span>
        </el-tag>
    </div>
</template>

<script>
import util from '@/libs/utils'
export default {
    name:'status',
    props:{
        status:{
            type:String,
            default:''
        }
    },
    data(){
        return{
            color: '',
            text:''
        }
    },
    methods:{
        handleClick(){
            util.showConfirm(this.text)
        }
    },
    mounted() {
        this.color =  this.status == 'IN_APPROVAL' ? '#E6A23C' : '#67C23A'
        this.text =  this.status == 'IN_APPROVAL' ? '审批中' : '已审批'
    }
}
</script>


<style lang="scss" scoped>
.icon-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
}
.status {
  cursor: pointer;
  vertical-align: middle;
}
span {
  vertical-align: middle;
}
</style>


