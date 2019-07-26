<template>
    <div class="table">
        <el-table ref="refTable" v-bind="$attrs" v-loading="loading" :data="dataSource" @row-click="handleRowClick" @selection-change="handleSelectionChange" @select="handleSelect" @row-dblclick="handleDbClick" @filter-change="handleFilterChange" style="width: 100%;">
            <template v-for="(column,index) in columns">
                <!-- 序号/选择框 -->
                <el-table-column v-if="column.type" :key="`type${index}`" :type="column.type" :label="column.label||'序号'" :width="column.width||'50'" :align="column.align||'center'" :fixed="column.fixed" :selectable="column.selectable"></el-table-column>
                <!-- 操作栏 -->
                <el-table-column v-else-if="column.action" :key="`action${index}`" :prop="column.prop" :label="column.label" :width="column.width" :fixed="column.fixed||'right'" :align="column.align||'center'">
                    <template slot-scope="scope">
                        <!-- 按钮 -->
                        <template v-for="(btn,index) in column.btnGroup">
                            <el-button :key="`btn${index}`" :type="btn.type||'primary'" :disabled="btn.disabled" :icon="btn.icon" :size="btn.size||'mini'" :plain="btn.plain" :round="btn.round" :circle="btn.circle" @click.stop="btn.onClick(scope.row,scope.$index)">{{btn.name}}</el-button>
                        </template>
                        <!-- slot 定义其他项 -->
                        <div v-for="(item,index) in column.otherAction" :key="index" style="display:inline-block;margin-left:10px;">
                            <slot :name="`other${index+1}`" :scope="scope"></slot>
                        </div>
                    </template>
                </el-table-column>
                <!-- 数据列 -->
                <el-table-column v-else :key="`noraml${index}`" :prop="column.prop" :label="column.label" :width="column.width " :align="column.align|| 'center' " :fixed="column.fixed " :render-header="column.rendeHead" :show-overflow-tooltip="column.hiddenOver" :column-key="column.prop " :filters="column.filters" :filter-method="column.filterHandler">
                    <template slot-scope="scope">
                        <!-- 自定义组件 -->
                        <render-slot v-if="column.render" :render="column.render" :row="scope.row" :index="scope.$index" :column="column"></render-slot>
                        <!-- formatter数据格式化 -->
                        <template v-else-if="column.formatter">
                            <span v-html="column.formatter(scope.row, column)"></span>
                        </template>
                        <span v-else>
                            {{scope.row[column.prop]}}
                        </span>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <!-- 分页 -->
        <template>

            <el-pagination class="flex-x-end" background hide-on-single-page :page-size="formControl.pageSize" :total="pagination.total" layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 15, 20, 50]" @size-change="handleSizeChange" @current-change="handleIndexChange"> </el-pagination>
        </template>
    </div>
</template>

<script>
// ！！！ 在colums的render里面如果是自定义的组件要在这里import
import status from '@/views/user/component/btn_status'

// 自定义函数式组件
let renderSlot = {
    functional: true,
    props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
            type: Object,
            default: null
        }
    },
    render: (h, ctx) => {
        const params = {
            row: ctx.props.row,
            index: ctx.props.index
        }
        if (ctx.props.column) params.column = ctx.props.column
        return ctx.props.render(h, params)
    }
}
export default {
    name:'CommonTable',
     components: {
        renderSlot,
        status
    },
    props:{
        columns: Array,
        dataSource:Array,
        pagination:Object,
        formControl: Object,
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
        // 手动勾选数据行的 Checkbox 时触发的事件
        handleSelect(selection, row){
            this.$emit('select', selection,row)
            // console.log(selection,row)
        },
        // 勾选数据行的 Checkbox发生变化时会触发该事件
        handleSelectionChange(selection){
            this.$emit('selection-change', selection)
        },
        // pageSize 改变时会触发
        handleSizeChange(size) {
			this.formControl.pageSize = size
			this.fetch()
        },
        // 切换页码
        handleIndexChange(current){
            this.formControl.currPage = current
			this.fetch()
        }
    },
    created(){
        this.fetch()
    }
}
</script>

<style lang="scss" scoped>
.el-pagination {
  padding: 20px 0;
}
</style>
