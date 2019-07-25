<template>
    <div>
        <c-table :loading="loading" :fetch="fetchTableData" :pagination="pagination" :select-on-indeterminate='false' :dataSource="tableData" :columns="columns" stripe border size="small" :row-class-name="showRow" show-summary sum-text="合计夺" :summary-method="summaryFun" @selection-change="handleSelectionChange" @filter-change="handleFilterChange" @select="selectChange">
            <template v-slot:action1="slotProp">
                <el-button size="mini" @click="testSlot(slotProp.scope.row)">默认按钮</el-button>
            </template>
        </c-table>
    </div>
</template>

<script>
import axios from 'axios'
// import CommonTable from '@/components/ComTable'
import { getTableList } from '@/api/table'

export default{
  components:{
    // CommonTable,
  },
  data(){
    return { 
      loading: false, 
      columns:[
          {
            type: 'selection',
            width: 100
          },
          {
            label: '姓名',
            prop: 'name',
            width: 120
          },
          {
            label: '单号',
            prop: 'orderNumber',
            width: 120
          },
          {
            label: '时间',
            prop: 'createTime',
            width: 120
          },
          {
            label: '客户',
            prop: 'customer',
            width: 120
          },
           {
            label: '审批状态',
            prop: 'auditStatus',
            width: 120
          },
          {
            label: '客户代码',
            prop: 'customerCode',
            width: 120
          },
          {
            label: '单据状态',
            prop: 'delete',
            width: 120
          },
          {
            label: '已付金额',
            prop: 'paymentAmount',
            width: 120
          }
      ],
    //   columns:[
    //     {
    //         type:'selection',
    //         width: 100,
    //         // 决定这一行的 CheckBox 是否可以勾选[仅对 type=selection 的列有效]
    //         // selectable:(row,index)=>{
    //         //     if(row.name==='王小虎2'){
    //         //         return false
    //         //     }else{
    //         //         return true
    //         //     }
    //         // },
    //     },
    //     {
    //         type:'index',
    //         width: 100,
    //         fixed:'left'
    //     },
    //     {
    //         prop:'name',
    //         label:'姓名',
    //         width: 70,
    //         // 渲染数据
    //         formatter:(row,column)=>{
    //            return row.name
    //         },
    //         // 渲染表头
    //         rendeHead:(h,{ column, $index })=>{
    //             return h(
    //                 'el-tag',
    //                     {
    //                         props: {
    //                         type: 'success'
    //                         },
    //                         on: {
    //                             click:()=>{
    //                                 console.log(column)
    //                             }
    //                         }
    //                     },
    //                     '姓名'
    //             )
    //         }
    //     },
    //      {
    //         prop:'date',
    //         label:'日期',
    //         width:170,
    //         filters:[ { text:'2016-05-02',value:'2016-05-02' }, { text:'2016-05-01',value:'2016-05-01' }],
    //         filterHandler:(value,row,column)=>{
    //             let { property } = column
    //             return row[property] === value;
    //         }
    //     },
    //     {
    //         prop:'price',
    //         label:'价钱',
    //         width: 70,
    //         align:'left',
    //         render:(row,column)=>{
              
    //         }
    //     },
    //     {
    //     prop: 'state',
    //     label: '状态',
    //     align: 'center',
    //     render: (h, params) => {
    //         return h('el-tag', {
    //             props: {
    //                 type: params.row.state === 0 ? 'success' : params.row.state === 1 ? 'info' : 'danger'
    //             } 
    //         }, 
    //         params.row.state === 0 ? '上架' : params.row.state === 1 ? '下架' : '审核中')
    //     }
    //  },
    //      {
    //         prop:'address',
    //         label:'地址',
    //         width: 370,
    //         hiddenOver:true
    //     },
    //     {
    //         action:true,
    //         prop:'action',
    //         label:'操作',
    //         btnGroup:[
    //             {
    //                 name: '详情',
    //                 type:'success',
    //                 onClick:(row,index)=>{
                      
    //                 }
    //             },
    //             {
    //                 name: '编辑',
    //                 type:'success',
    //                 onClick:(row,index)=>{
    //                     console.log(row)
    //                     console.log(index)
    //                 }
    //             }
    //         ],
    //         otherAction:2
    //     }
    //   ],
      tableData:[],
    //   tableData: [
    //     {
    //         id:1,
    //         date: '2016-05-02',
    //         name: '王小虎1',
    //         price:200,
    //         state:1,
    //         address: '上海市普陀区金沙江路 1 弄上海市普陀区金沙江路 1 弄上海市普陀区金沙江路 1 弄上海市普陀区金沙江路 1 弄上海市普陀区金沙江路 1 弄'
    //     }, 
    //     {
    //         id:2,
    //         date: '2016-05-04',
    //         name: '王小虎2',
    //         price:300,
    //         state:0,
    //         address: '上海市普陀区金沙江路 2 弄'
           
    //     }, 
    //     {
    //         id:3,
    //         date: '2016-05-01',
    //         name: '王小虎3',
    //         price:400,
    //         state:0,
    //         address: '上海市普陀区金沙江路 3 弄'
    //     }, 
    //     {
    //         id:4,
    //         date: '2016-05-03',
    //         name: '王小虎4',
    //         price:500,
    //         state:1,
    //         address: '上海市普陀区金沙江路 4 弄'
    //     }
    //   ],
      pagination:{
          total:120,
          pageIndex: 1,
          pageSize:15
      },
    }
  },
  methods: {
      testSlot(row){
          let {id} = row
      },


    selectChange(selection,row){
        // console.log(selection)
    },

    showRow({row,rowIndex}){
       if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
    },
    // 表格底部合计
    summaryFun(param){
        const {columns,data} = param
        const sums = []
        columns.forEach((column, index)=>{
            if(index===0){
                sums[index] = '合计'
                return
            }else if(column.property==='action' || index===1){
                sums[index] = ''
                return
            }
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
    fetchTableData() {
        this.loading = true
        getTableList().then(res=>{
            let { list , totalElement } = res
            this.tableData = list
            this.pagination.total = totalElement
        })

    //    this.options.loading = true
    //    axios.post('https://www.easy-mock.com/mock/5b3f80edfa972016b39fefbf/example/tableData', {
    //     pageIndex: this.pagination.pageIndex,
    //     pageSize: this.pagination.pageSize
    //   }).then(res => {
    //     const { list, total } = res.data.data
    //     this.tableData = list
    //     this.pagination.total = total
    //     this.options.loading = false
    //   }).catch((error) => {
    //     this.options.loading = false
    //   })
    },
    handleSelectionChange(selection){
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
