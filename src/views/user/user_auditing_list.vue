<!--
description: 用户审核列表
author: yuxiao
create time: 2019-2-25
 -->
<template>
  <div class="app-container">
    <div class="app-title">
      <h2>用户审核</h2>
    </div>
    <div class="app-content">
      <el-form ref="formControl" :model="formControl" label-width="80px" label-position="left" size='mini'>
        <el-row :gutter="40">
          <el-col :span="6">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formControl.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="formControl.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="公司名称" prop="company">
              <el-input v-model="formControl.company"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="邮箱" prop="mail">
              <el-input v-model="formControl.mail"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select v-model="formControl.status" prop="status" placeholder="请选择状态" style="width: 100%;">
                <el-option label="禁用" value="disable"></el-option>
                <el-option label="启用" value="active"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开始" prop="from">
              <el-date-picker type="date" placeholder="选择日期" v-model="formControl.from" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结束" prop="to">
              <el-date-picker type="date" placeholder="选择日期" v-model="formControl.to" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item style=" float: right ">
            <el-button type="primary" @click="onSubmit()" icon="el-icon-search">搜索</el-button>
            <el-button type="warning " @click='resetForm("formControl")'>重置</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <el-row>
        <el-table :data="tableData" style="width: 100%" stripe border fit highlight-current-row :header-cell-style="{background:'#f5f7fa',color:'#606266'}">
          <el-table-column fixed type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="author" label="姓名" width="150" align="center"></el-table-column>
          <el-table-column prop="code" label="客户代码" width="150" align="center"></el-table-column>
          <el-table-column prop="phone" label="手机号" width="120" align="center"></el-table-column>
          <el-table-column prop="mail" label="邮箱" width="120" align="center"></el-table-column>
          <el-table-column prop="company" label="公司名称" width="120" align="center"></el-table-column>
          <el-table-column prop="status" label="状态" width="300" align="center"></el-table-column>
          <el-table-column prop="createTime" label="注册日期" width="200" align="center"></el-table-column>
          <el-table-column prop="lastTime" label="最近登陆时间" width="200" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" width="340" align="center">
            <template slot-scope="scope">
              <el-button type="danger" size="small" @click.native.prevent="deleteRow(scope.row,scope.$index)">删除</el-button>
              <el-button type="info" size="small" @click.native.prevent="detailRow(scope.row)">详情</el-button>
              <el-button type="success" size="small" @click.native.prevent="editRow(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination ">
          <el-pagination background layout="prev, pager, next" :total="totalNumber"></el-pagination>
        </div>
        <div class="handlAdd">
          <el-button type="primary" @click="add()" icon='el-icon-plus'>新增</el-button>
        </div>
      </el-row>
    </div>
    <!-- 删除确认框 -->
    <el-dialog title="提示" :visible.sync="showDialog" width="30%">
      <span>确定删除这条数据吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog=false">取 消</el-button>
        <el-button type="primary" @click="confirmDialog()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getTableList } from '@/api/table'

  export default {
    data() {
      return {
        listLoading: true,
        formControl: {
          name: '',
          phone: '',
          mail: '',
          company: '',
          status: 'active',
          from: '',
          to: '',
          currPage: 1,
          pageSize: 10
        },
        tableData: [{
            author: 'AAA',
            code: '111'
          },
          {
            author: 'SSS',
            code: '333'
          },
          {
            author: 'DDD',
            code: '222'
          },
          {
            author: 'FFF',
            code: '555'
          },
          {
            author: 'EEE',
            code: '666'
          },
          {
            author: 'HHH',
            code: '777'
          },
        ],
        totalNumber: 1000,
        showDialog: false,
        rowIndex: null
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      fetchData() {
        // this.listLoading = true
        getTableList(this.formControl).then(response => {
          this.tableData = response.list
          // this.listLoading = false
        })
      },
      handleSizeChange(size) {
        this.formControl.pageSize = size
        this.fetchData(this.formItem)
      },
      handleCurrentChange(page) {
        this.formControl.currPage = page
        this.fetchData(this.formItem)
      },
      // 删除
      deleteRow(row, index) {
        this.showDialog = true
        this.rowIndex = index
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
      // 新增
      add() {
        this.$router.push({
          path: '/user/auditing/detail/add'
        })
      },
      confirmDialog() {
        this.tableData.splice(this.rowIndex, 1);
        this.showDialog = false
      },
    }
  }
</script>

