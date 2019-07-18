<template>
    <div>
        <el-col :span="colSpan">
            <slot></slot>
        </el-col>
    </div>
</template> 

<script>
export default {
    name:'searchItem',
    props:{
        colSpan:{
            type: String,
            default: '6'
        }
    },
    data(){
        return{}
    }
}
</script>

<style lang="scss" scoped>
</style>
