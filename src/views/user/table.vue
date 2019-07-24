<template>
    <div>
        <!-- <CommonTable :columns="columns" :dataSource="tableData" :options="options" :fetch="fetchTableData" :pagination="pagination" @row-click="handleRowClick" @selection-change="handleSelectionChange" /> -->
        <div>
            <CommonTable :loading="loading" :pagination="pagination" @select="selectChange()" :select-on-indeterminate='false' :dataSource="tableData" :columns="columns" stripe border size="small" :row-class-name="showRow" show-summary sum-text="合计夺" :summary-method="summaryFun" @selection-change="handleSelectionChange" @filter-change="handleFilterChange" />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import CommonTable from '@/components/ComTable'
// import CommonTable from '@/components/table'
// import { noConflict } from 'q';

export default{
  components:{
    CommonTable,
    // CommonTable2
  },
  data(){
    return { 
      loading: false, 
    //   columns: [
    //      {
    //       prop: 'id',
    //       label: '编号',
    //       width: 60
    //     },
    //     {
    //       prop: 'title',
    //       label: '标题',
    //       render: (row, index) => { 
    //         return (
    //           <span style="color: blue;" onClick={e => this.handleClick(e, row)}>{row.title}</span>
    //         )
    //       }
    //     },
    //     {
    //       prop: 'author',
    //        width: 230,
    //       label: '作者'
    //     },
    //     {
    //       button: true,
    //       width: 330,
    //       label: '按钮组',
    //       group: [{
    //         // you can props => type size icon disabled plain
    //         name: '编辑',
    //         type: 'warning',
    //         icon: 'el-icon-edit',
    //         plain: true,
    //         onClick: (row, index) => { // 箭头函数写法的 this 代表 Vue 实例 
    //           console.log(row, index)
    //         }
    //       }, {
    //         name: '删除',
    //         type: 'danger',
    //         icon: 'el-icon-delete',
    //         disabled: false,
    //         onClick(row) { // 这种写法的 this 代表 group 里的对象
    //           this.disabled = true
    //           console.log(this)
    //         }
    //       }]
    //     }
    //   ],
      columns:[
        {
            type:'index',
            width: 100,
            fixed:'left'
        },
        {
            type:'selection',
            width: 100,
            // 决定这一行的 CheckBox 是否可以勾选[仅对 type=selection 的列有效]
            selectable:(row,index)=>{
                if(row.name==='王小虎2'){
                    return false
                }else{
                    return true
                }
            },
        },
        {
            prop:'name',
            label:'姓名',
            width: 70,
            align:'left',
          
            // 渲染数据
            render:(row,column)=>{
               return row.name
            },
            // 渲染表头
            rendeHead:(h,{ column, $index })=>{
                return h(
                    'el-tag',
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
                        '姓名'
                )
            }
        },
         {
            prop:'date',
            label:'日期',
            width:170,
            align:'center',
            // 数据过滤使用
            filters:[
                 { text:'2016-05-02',value:'2016-05-02' },
                { text:'2016-05-01',value:'2016-05-01' }
                
            ],
            filterHandler:(value,row,column)=>{
                let { property } = column
                return row[property] === value;
            }
        },
        {
            prop:'price',
            label:'价钱',
            width: 70,
            align:'left',
        },
         {
            prop:'address',
            label:'地址',
            width: 270,
            align:'left',
            // 默认情况下若内容过多会折行显示，若需要单行显示
            hiddenOver:true
        },
        {
            action:true,
            btnGroup:[
                {
                    name: '详情',
                    type:'success',
                    onClick:(row,index)=>{
                        console.log(row)
                        console.log(index)
                    }
                }
            ]
        }
      ],
    //   tableData: [
    //     {
    //         id:1,
    //         date: '2016-05-02',
    //         name: '王小虎1',
    //         address: '上海市普陀区金沙江路 1 弄'
    //     }, 
    //     {
    //         id:2,
    //         date: '2016-05-04',
    //         name: '王小虎2',
    //         address: '上海市普陀区金沙江路 2 弄'
    //     }, 
    //     {
    //         id:3,
    //         date: '2016-05-01',
    //         name: '王小虎3',
    //         address: '上海市普陀区金沙江路 3 弄'
    //     }, 
    //     {
    //         id:4,
    //         date: '2016-05-03',
    //         name: '王小虎4',
    //         address: '上海市普陀区金沙江路 4 弄'
    //     }
    //   ],
      tableData: [
        {
            id:1,
            date: '2016-05-02',
            name: '王小虎1',
            price:200,
            address: '上海市普陀区金沙江路 1 弄上海市普陀区金沙江路 1 弄上海市普陀区金沙江路 1 弄上海市普陀区金沙江路 1 弄上海市普陀区金沙江路 1 弄'
        }, 
        {
            id:2,
            date: '2016-05-04',
            name: '王小虎2',
            price:300,
            address: '上海市普陀区金沙江路 2 弄'
        }, 
        {
            id:3,
            date: '2016-05-01',
            name: '王小虎3',
            price:400,
            address: '上海市普陀区金沙江路 3 弄'
        }, 
        {
            id:4,
            date: '2016-05-03',
            name: '王小虎4',
            price:500,
            address: '上海市普陀区金沙江路 4 弄'
        }
      ],
    //   pagination: {
    //     total: 0,
    //     pageIndex: 1,
    //     pageSize: 15
    //   },
      pagination:{
          total:120,
          pageIndex: 1,
          pageSize:15
      },
    //   options: {
    //     mutiSelect: true,
    //     index: true, // 显示序号， 多选则 mutiSelect
    //     loading: false, // 表格动画
    //     initTable: true, // 是否一挂载就加载数据
    //   }
    }
  },
  methods: {
    selectChange(selection,row){
        console.log(selection)
        console.log(row)
    },


    showRow({row,rowIndex}){
       if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
    },
    summaryFun(param){
        const {columns,data} = param
        const sums = []
        columns.forEach((column, index)=>{
            if(index===0){
                sums[index] = '举例合计'
                return
            }
            // 过滤数字列
            const values = data.map(item=>{
                return Number(item[column.property])
            })
            if(!values.every(value => isNaN(value))){
                sums[index] = values.reduce((pre,cur)=>{
                    let value = Number(cur)
                    if(!isNaN(value)){
                        return pre + cur
                    }else{
                        return pre
                    }
                },0)
                sums[index] += ' 元';
            }else{
                sums[index] = 'N/A'
            }
        })
        return sums;
    },


    handleClick(e, row){
      //transform-vue-jsx 的nativeOnClick 失效 , 所以采用 event.cancelBubble 控制点击事件的冒泡... 如果点击事件不影响你的点击行事件，可以不传
      e.cancelBubble = true // 停止冒泡，否则会触发 row-click
      console.log(row)
    },
    fetchTableData() {
       this.options.loading = true
       axios.post('https://www.easy-mock.com/mock/5b3f80edfa972016b39fefbf/example/tableData', {
        pageIndex: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize
      }).then(res => {
        const { list, total } = res.data.data
        this.tableData = list
        this.pagination.total = total
        this.options.loading = false
      }).catch((error) => {
        console.log(error)
        this.options.loading = false
      })
    },
    handleRowClick(row, event, column){ // 点击行的事件，同理可以绑定其他事件
      console.log('click row:',row, event, column)
    },
    handleSelectionChange(selection){
        console.log(13123123)
      console.log(selection)
    },
    handleFilterChange(param){
        console.log(param)
    }
  }
}
</script>



<style>
.el-table .warning-row {
  color: red;
}

.el-table .success-row {
  color: blue;
}
</style>
