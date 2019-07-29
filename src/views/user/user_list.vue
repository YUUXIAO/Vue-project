<template>
  <div class="app-container">
    <app-title>用户列表</app-title>
    <el-form ref="formControl" :model="formControl" label-width="70px" label-position="left">
      <el-row :gutter="40">
        <search-input-item label="姓名" v-model="formControl.username"></search-input-item>
        <search-input-item label="手机号" v-model="formControl.phone"></search-input-item>
        <search-select-item label="状态" placeholder="请选择状态" filterable :options="options" v-model="formControl.status"></search-select-item>
      </el-row>
      <el-row :gutter="40">
        <search-daterange-item label="时间" v-model="formControl.dateRange"></search-daterange-item>
        <search-radio-item label="是否启用" v-model="formControl.isOpen" :radioList="radioList"></search-radio-item>
      </el-row>
      <tool-bar @onSubmit="onSubmit()" @resetForm="resetForm('formControl')">
        <template v-slot:search></template>
      </tool-bar>
    </el-form>
    <c-table :loading="loading" :formControl="formControl" :columns="columns" :dataSource="tableData" :fetch="fetchTableData" :pagination="pagination" stripe border show-summary sum-text="合计" :summary-method="summaryFun" @select="selectChange">
      <!-- 操作栏自定义【solt的namer按other1开始递增】 -->
      <template v-slot:other1="slotProp">
        <el-input size="mini" style="width:100px" :placeholder="`我是${slotProp.scope.row.name}`"></el-input>
      </template>
    </c-table>
  </div>
</template>

<script>
import util from '@/libs/utils'
import { getTableList } from '@/api/table'

export default{
  data(){
    return { 
      loading: false, 
      formControl: {
        username: '',
        phone: '',
        isOpen: '',
        status: '',
        dateRange: [],
        from: '',
        to: '',
        currPage: 1,
        pageSize: 10
      },
      columns:[
          {
            type: 'selection',
            width: 100,
            // 决定这一行的 CheckBox 是否可以勾选[仅对 type=selection 的列有效]
            selectable:(row,index)=>{
               if(row.name == 'jasmine'){
                   return false
               }else{
                   return true
               }
            },
          },
          {
            label: '姓名',
            prop: 'name',
            width: 120,
            // 渲染表头
            rendeHead:(h,{ column, $index })=>{
                return h(
                    'span',
                        {
                            class:{
                               'el-icon-user':true
                            },
                            style:{
                                'letter-spacing':'5px'
                            }
                        },
                        '姓名'
                )
            }
          },
          {
            label: '单号',
            prop: 'orderNumber',
            width: 150
          },
          {
            label: '时间',
            prop: 'createTime',
            width: 120,
            // 数据过滤的选项[text 和 value 属性必填]
            filters:[
                {
                    text:'2019-07-25',
                    value:'1564019197000'
                },
                 {
                    text:'2019-07-24',
                    value:'2019-07-24'
                }
            ],
            // 数据过滤使用的方法[返回 true 就会显示]
            filterHandler:(value,row,column)=>{
                let { property } = column
                return row[property] == value;
            },
            // 数据简单格式化
            formatter:(row,column)=>{
                return util.formatDate(row.createTime)
            },
          },
          {
            label: '客户',
            prop: 'customer',
            width: 200
          },
          {
            label: '客户代码',
            prop: 'customerCode',
            width: 120
          },
          {
            label: '地址',
            prop: 'address',
            width: 230,
            // 当内容过长被隐藏时显示 tooltip
            hiddenOver:true
          },
           {
            label: '审批状态',
            prop: 'auditStatus',
            width: 120,
            render:(h,params)=>{
                return h('status',{
                    props:{
                        status: params.row.auditStatus
                    }
                })
            }
          },
        
          {
            label: '单据状态',
            prop: 'delete',
            width: 120,
            render:(h, params)=>{
                return h('el-tag', {
                    props: {
                        size: 'small',
                        type: params.row.delete === 0 ? 'danger' : 'success'
                    } 
                }, 
                params.row.state === 0 ? '已删除':'正常数据'
            )}
          },
          {
            label: '已付金额',
            prop: 'paymentAmount',
            width: 120,
            // 数据简单格式化
            formatter:(row,column)=>{
                return util.numberSeparator(row.paymentAmount)
            }
          },
          {
              action: true,
              label:'操作',
              otherAction:1,
              width: 300,
              fixed:'right',
              btnGroup:[
                  {
                      name:'编辑',
                      onClick:(row,index)=>{
                        this.detailRow(row,index)
                        //   util.showMsg(`演示click ${index}`)
                      }
                  },
                  {
                      name:'删除',
                      type:'danger',
                      onClick:(row,index)=>{
                          util.showConfirm('您确定删除当前数据吗？','warning','删除提示','','',this.confirmDelete)
                      }
                  }
              ],
          }
      ],
      tableData:[],
      options:[
        {
          label:'禁用',
          value:'disable'
        },
        {
          label:'启用',
          value:'active'
        }
      ],
      radioList:[
        {
          label:'启用',
          value:'1'
        },
        {
          label:'未启用',
          value:'0'
        }
      ],
      pagination:{
        total:20
      },
    }
  },
  methods: {
   // 重置搜索表单
    resetForm(formName) {
      Object.assign(this.$data.formControl, this.$options.data().formControl)
    },
    onSubmit(){
      this.fetchTableData()
    },
    // 确认删除
    confirmDelete(row,index){
        this.tableData.splice(index,1)
        util.showNotice('删除成功！')
    },
    // 多选操作
    selectChange(selection,row){
        console.log(selection)
    },
    // 表格底部合计
    summaryFun(param){
        const {columns,data} = param
        const sums = []
        columns.forEach((column, index)=>{
            if(index===0){
                sums[index] = '合计'
                return
            }else if(column.property==='action' || column.property==='createTime' || column.property==='delete' ){
                sums[index] = '-'
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
                sums[index] = '-'
            }
        })
        return sums;
    },
     // 详情
    detailRow(row, index) {
      // let id = this.tableData[index].id
      let id = 1
      this.$router.push({
        path: `/user/auditing/detail/edit/${id}`
      })
    },
    // 列表数据查询
    fetchTableData() {
        this.loading = true
        getTableList(this.formControl).then(res=>{
            let { list , totalElement } = res
            this.loading = false
            this.tableData = list
            this.pagination.total = totalElement
        })
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
