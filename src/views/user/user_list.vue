<!--
description: 用户列表
author: yuxiao
create time: 2019-2-25
 -->
<template>
  <div class="app-container">
    <!-- <div class="app-title">
      <h2>用户列表</h2>
    </div> -->
    <app-title></app-title>
    <div class="app-content">
      <el-form ref="formControl" :model="formControl" label-width="70px" label-position="left">
        <el-row :gutter="40">
          <search-input-item label="姓名" v-model="formControl.name"></search-input-item>
          <search-input-item label="手机号" v-model="formControl.phone"></search-input-item>
          <search-input-item label="邮箱" v-model="formControl.mail"></search-input-item>
          <search-input-item label="公司名称" v-model="formControl.company"></search-input-item>
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
            <el-button type="primary" @click="onSubmit()">搜索</el-button>
            <el-button type="warning " @click='resetForm("formControl")'>重置</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <el-row>
        <el-table :data="tableData" style="width: 100%" stripe border fit highlight-current-row :header-cell-style="{background:'#f5f7fa',color:'#606266'}">
          <el-table-column fixed type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="author" label="姓名" width="150" align="center"></el-table-column>
          <el-table-column prop="code" label="客户代码" width="150" align="center"></el-table-column>
          <el-table-column prop="phone" label="手机号" width="200" align="center"></el-table-column>
          <el-table-column prop="sum" label="金额" :formatter="sumeFormat" width="200" align="center"></el-table-column>
          <el-table-column label="状态" width="120" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status === 'active' ? 'success' : 'danger'">{{scope.row.status=='active'?'启用':'禁用'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop=" createTime" label="注册日期" :formatter="dateFormat" width="220" align="center"></el-table-column>
          <el-table-column prop="lastTime" label="最近登陆时间" :formatter="dateFormat" width="220" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" width="340" align="center">
            <template slot-scope="scope">
              <el-button type="danger" size="small" @click.native.prevent="deleteRow(scope.row,scope.$index)">
                删除</el-button>
              <el-button type="info" size="small" @click.native.prevent="detailRow(scope.row)">详情</el-button>
              <el-button type="success" size="small" @click.native.prevent="editRow(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination ">
          <el-pagination background layout="prev, pager, next" :total="totalNumber"></el-pagination>
        </div>
      </el-row>
    </div>
    <!-- 提示框 -->
    <el-dialog title="提示 " :visible.sync="showDialog" width="30% ">
      <span>确定删除这条数据吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog=false">取 消</el-button>
        <el-button type="primary" @click="confirmDialog()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import util from '@/utils/utils'
import enums from '@/common/emum'
import SearchInputItem from '@/components/Search/s-input'
import AppTitle from '@/components/Layout/AppTitle'
import { getList } from '@/api/table'
  

export default {
  components:{
    AppTitle,
    SearchInputItem
  },
  data() {
    return {
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
      showDialog: false,
      rowIndex: null
    }
  },
  created() {},
  methods: {
    // 重置搜索表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    confirmDialog() {
      this.tableData.splice(this.rowIndex, 1);
      this.showDialog = false
    },

  }
}
</script>

