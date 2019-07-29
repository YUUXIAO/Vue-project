 <template>
    <el-row class="toolbar">
        <el-col :span="12">
            <slot name="action"></slot>
        </el-col>
        <el-col :span="12" class="flex-x-end">
            <el-button-group>
                <el-button type="primary" icon="el-icon-search" @click="onSubmit()">搜索</el-button>
                <el-button type="warning " icon="el-icon-refresh-left " @click='resetForm()'>重置</el-button>
            </el-button-group>
            <slot name="search"></slot>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data(){
        return{}
    },
    methods:{
        onSubmit(){
            this.$emit('onSubmit')
        },
        resetForm(){
             this.$emit('resetForm')
        }
    }
}
</script>



<style lang="scss" scoped>
.toolbar {
  margin-bottom: 20px;
}
.flex-x-end {
  float: right;
}
</style>
