<!--
description: 表格行组件
author: yuxiao
create time: 2019-2-21
 -->
<template>
  <div class="tab-line flex-x-between" :class=" { 'grayLine': singleType == 'single','firstLine': lineType=='firstLine'}">
    <p class="line-label">{{lineLabel}}</p>
    <p class="line-content">
      <slot name="line-content"></slot>
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    props: {
      // 表行名称
      lineLabel: {
        default: ''
      },
      // 当前表行是否为双行【single:单行,double:双行】,单行有灰色背景
      singleType: {
        type: String,
        default: 'double'
      },
      // 判断是否为表格第一行，用于CSS增加border-top
      lineType: {
        type: String,
        default: ''
      }
    },
    created() {},
  }
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
  font-size: 14px;
}

.tab-line {
  height: 45px;
  line-height: 45px;
  border-bottom: 1px solid #e7ecf1;
}

.tab-line:hover {
  background: #eef0f4;
}

.grayLine {
  background: #eef3f7;
}

.firstLine {
  border-top: 1px solid #ddd;
}

.line-label {
  height: 100%;
  width: 35%;
  border-right: 1px solid #ddd;
  border-left: 1px solid #ddd;
  padding-left: 20px;
  font-weight: bold;
}

.line-content {
  padding: 0 20px;
  border-right: 1px solid #ddd;
  height: 100%;
  width: 65%;
}
</style>
