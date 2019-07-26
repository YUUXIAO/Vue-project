<!--
description: 用户列表
author: yuxiao
create time: 2019-2-25
 -->
<template>
  <div class="app-container">
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
      <tool-bar>
        <template slot="search">
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="onSubmit()">搜索</el-button>
            <el-button type="warning " icon="el-icon-refresh-left " @click='resetForm("formControl")'>重置</el-button>
          </el-button-group>
        </template>
      </tool-bar>
    </el-form>
    <el-row>
      <el-table :data="tableData " style="width: 100% " stripe border fit highlight-current-row :header-cell-style="{background: '#f5f7fa',color: '#606266'} ">
        <el-table-column fixed type="index" width="50" align="center"></el-table-column>
        <el-table-column prop="author" label="姓名 " width="150" align="center"></el-table-column>
        <el-table-column prop="code" label="客户代码 " width="150" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号 " width="200" align="center"></el-table-column>
        <el-table-column prop="sum" label="金额 " :formatter="sumeFormat " width="200" align="center"></el-table-column>
        <el-table-column label="状态" width="120" align="center">
          <template slot-scope="scope ">
            <el-tag :type="scope.row.status==='active' ? 'success' : 'danger' ">{{scope.row.status=='active'?'启用':'禁用'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop=" createTime " label="注册日期 " :formatter="dateFormat " width="220 " align="center "></el-table-column>
        <el-table-column prop="lastTime " label="最近登陆时间 " :formatter="dateFormat " width="220 " align="center "></el-table-column>
        <el-table-column fixed="right " label="操作 " width="340 " align="center ">
          <template slot-scope="scope ">
            <el-button type="danger " size="small " @click.native.prevent="deleteRow(scope.row,scope.$index) ">
              删除</el-button>
            <el-button type="info " size="small " @click.native.prevent="detailRow(scope.row) ">详情</el-button>
            <el-button type="success " size="small " @click.native.prevent="editRow(scope.row) ">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination ">
        <el-pagination background layout="prev, pager, next " :total="totalNumber "></el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment'
import util from '@/libs/utils'
import enums from '@/common/enums'
import AppTitle from '@/components/Layout/AppTitle'
  

export default {
  components:{ AppTitle },
  data() {
    return {
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
      tableData: [{
          author: 'AAA',
          code: '111',
          status: 'active',
          phone: '13177898765',
          sum: 10000,
          createTime: 1550199699000,
          lastTime: 1550199699000
        },
        {
          author: 'SSS',
          code: 'OOO',
          status: 'disable',
          sum: 98786968,
          phone: '13177898765',
          createTime: 1550199699000,
          lastTime: 1550199699000
        },
        {
          author: 'DDD',
          code: '222',
          sum: 123132,
          status: 'active',
          phone: '13177898765',
          createTime: 1550199699000,
          lastTime: 1550199699000
        },
        {
          author: 'FFF',
          sum: 100,
          code: '555',
          phone: '13177898765',
          status: 'active',
          createTime: 1550199699000,
          lastTime: 1550199699000
        }, {
          author: 'EEE',
          phone: '13177898765',
          code: '666',
          sum: 5555,
          status: 'disable',
          createTime: 1550199699000,
          lastTime: 1550199699000
        }, {
          author: 'HHH',
          phone: '13177898765',
          sum: 666,
          code: '777',
          status: 'active',
          createTime: 1550199699000,
          lastTime: 1550199699000
        }, {
          author: 'HHH',
          phone: '13177898765',
          sum: 666,
          code: '777',
          status: 'active',
          createTime: 1550199699000,
          lastTime: 1550199699000
        }, {
          author: 'HHH',
          phone: '13177898765',
          sum: 666,
          code: '777',
          status: 'disable',
          createTime: 1550199699000,
          lastTime: 1550199699000
        }, {
          author: 'HHH',
          phone: '13177898765',
          sum: 666,
          code: '777',
          status: 'active',
          createTime: 1550199699000,
          lastTime: 1550199699000
        },

      ],
      totalNumber: 78,
      rowIndex: null
    }
  },
  created() {},
  methods: {
    // 重置搜索表单
    resetForm(formName) {
      Object.assign(this.$data, this.$options.data())
    },
    onSubmit(){
      console.log(this.formControl.name)
    },
    // 时间格式化
    sumeFormat(val) {
      return util.numberSeparator(val.sum)
    },
    // 金额格式化
    dateFormat(val) {
      return moment(val.lastTime).format("YYYY-MM-DD");
    },
    // 删除
    deleteRow(row, index) {
      this.rowIndex = index
      util.showConfirm('确定删除这条数据吗？','warning','','','',this.confirmDialog)
    },
    // 详情
    detailRow(row, index) {
      // let id = this.tableData[index].id
      let id = 1
      this.$router.push({
        path: `/user/auditing/detail/show/${id}`
      })
    },
    // 编辑
    editRow(row, index) {
      // let id = this.tableData[index].id
      let id = 1
      this.$router.push({
        path: `/user/auditing/detail/edit/${id}`
      })
    },
    confirmDialog() {
      this.tableData.splice(this.rowIndex, 1);
    },
  }
}
</script>

