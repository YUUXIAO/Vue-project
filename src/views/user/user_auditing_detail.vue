<!--
description: 用户审核详情/编辑
author: yuxiao
create time: 2019-2-25
 -->
<template>
  <div class="app-container">
    <div class="app-title">
      <h2>用户审核详情</h2>
    </div>
    <div class="app-content">
      <el-row>
        <el-col :span="11">
          <el-card>
            <tableItem lineLabel='姓名' lineType='firstLine' singleType='single'>
              <p slot='line-content'>
                <el-input v-model="type" :disabled="actionShow" size="small" placeholder="请输入内容"></el-input>
              </p>
            </tableItem>
            <tableItem lineLabel='类别'>
              <p slot='line-content'>
                <el-input :disabled="actionShow" size="small" placeholder="请输入内容"></el-input>
              </p>
            </tableItem>
            <tableItem lineLabel='品牌' singleType='single'>
              <p slot='line-content'>
                <el-select v-model="brand" :disabled="actionShow" size="small" placeholder="请选择" style="width: 100%">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </p>
            </tableItem>
            <tableItem lineLabel='审核'>
              <p slot='line-content'>
                <el-button :disabled="actionShow" type="primary" size='small' plain>审核通过</el-button>
                <el-button :disabled="actionShow" type="danger" size='small' plain>审核拒绝</el-button>
              </p>
            </tableItem>
          </el-card>
        </el-col>
        <el-col :span="11" :push='1'>
          <el-card>
            <tableItem lineLabel='测试' singleType='single' lineType='firstLine'>
              <p slot='line-content'>
                <el-input :disabled="actionShow" size='small' placeholder="请输入内容"></el-input>
              </p>
            </tableItem>
            <tableItem lineLabel='姓名'>
              <p slot='line-content'>
                <el-input :disabled="actionShow" size='small' placeholder="请输入内容"></el-input>
              </p>
            </tableItem>
            <tableItem lineLabel='审核' singleType='single'>
              <p slot='line-content'>
                <el-button :disabled="actionShow" type="primary" size='small' plain>审核通过</el-button>
                <el-button :disabled="actionShow" type="danger" size='small' plain>审核拒绝</el-button>
              </p>
            </tableItem>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="app-footer">
      <el-button type="primary" @click='handleBack()' icon="el-icon-back">返回</el-button>
      <el-button type="danger" v-show='!actionShow' @click='save()' icon="el-icon-refresh">保存</el-button>
    </div>
  </div>
</template>

<script>
  import tableItem from '@/components/tableComponent'

  export default {
    components: {
      tableItem
    },
    data() {
      return {
        type: '',
        brand: '',
        actionShow: false,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      }
    },
    created() {
      //actionShow:当页面为详情时为true[不可编辑]否则为false[可编辑]
      let show = this.$route.params.action == 'show'
      this.actionShow = show
    },
    methods: {
      // 返回上一页
      handleBack() {
        this.$router.back()
      },
      // 保存修改数据【编辑】
      save() {}
    }
  }
</script>
