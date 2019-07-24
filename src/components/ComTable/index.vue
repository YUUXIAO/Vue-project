<template>
    <div>
        <el-table ref="commonTable" v-loading="loading" :data="dataSource" style="width: 100%;" v-bind="$attrs" @row-click="handleRowClick" @selection-change="handleSelectionChange" @row-dblclick="handleDbClick" @filter-change="handleFilterChange">
            <template v-for="(column,index) in columns">
                <!-- 序号/选择框 -->
                <el-table-column v-if="column.type" :key="index" :type="column.type" :label="column.label||'序号'" :width="column.width||'50'" :align="column.align||'center'" :fixed="column.fixed" :selectable="column.selectable"></el-table-column>
                <!-- 操作栏 -->
                <el-table-column :key="index" v-else-if="column.action">
                    <template slot-scope="scope">
                        <!-- 按钮 -->
                        <template v-for="(btn, index) in column.btnGroup">
                            <el-button :key="index" :type="btn.type||'primary'" :disabled="btn.disabled" :icon="btn.icon" :size="btn.size||'mini'" :plain="btn.plain" :round="btn.round" :circle="btn.circle" @click.stop="btn.onClick(scope.row, scope.$index)">{{btn.name}}</el-button>
                        </template>
                    </template>
                </el-table-column>
                <!-- 数据列 -->
                <el-table-column v-else :key=" index " :prop="column.prop " :label="column.label " :width="column.width " :align="column.align|| 'center' " :fixed="column.fixed " :render-header="column.rendeHead " :formatter="column.render " :show-overflow-tooltip="column.hiddenOver " :column-key="column.prop " :filters="column.filters " :filter-method="column.filterHandler"></el-table-column>
            </template>
        </el-table>

        <!-- 分页 -->
        <template v-if="pagination">
            <el-pagination background hide-on-single-page :page-size="pagination.pageSize" :total="pagination.total" layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 15, 20, 50]" @size-change="handleSizeChange" @current-change="handleIndexChange" style="border: 1px solid red;margin:0 20px" class="flex-x-end"> </el-pagination>
        </template>

    </div>
</template>

<script>
export default {
    name:'CommonTable',
    props:{
        columns: Array,
        dataSource:Array,
        pagination: Object,
        fetch: Function, 
        loading:''
    },
    data(){
        return{}
    },
    methods:{
        // 当某一行被点击时会触发该事件
        handleRowClick(row, column, event){
            this.$emit('row-click', row, event, column)
        },
        // 当某一行被双击时会触发该事件
        handleDbClick(row, column, event){
            this.$emit('row-dblclick', row, event, column)
        },
        // 表格的筛选条件发生变化的时候会触发该事件
        handleFilterChange(param){
             this.$emit('filter-change', param)
        },
        // 勾选数据行的 Checkbox 时触发的事件
        handleSelectionChange(selection){
            this.$emit('selection-change', selection)
        },
        // pageSize 改变时会触发
        handleSizeChange(size) {
			this.pagination.pageSize = size
			// this.fetch()
        },
        // 切换页码
        handleIndexChange(current){
            this.pagination.pageIndex = current
			// this.fetch()
        },

        rendeHead(h,{ column, $index }){
            return h(
              'el-button',
              {
                props: {
                  type: 'success'
                },
                on: {
                    click:()=>{
                        console.log(column)
                    }
                }
              },
              '按钮'
            )
        }
    },
    created(){
        // this.fetch()
    }
}
</script>



<style lang="scss" scoped>
</style>
