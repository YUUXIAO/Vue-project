<!--
description: 标签组件
author: yuxiao
create time: 2019-2-21
 -->
<template>
  <span :class="['tag',color]">
    <slot></slot>
  </span>
</template>

<script>
/**
   * color: 标签背景颜色 ['red', 'green', 'orange'],默认green
**/

  export default {
    name: 'tag',
    props: {
      color: {
        type: String,
        default: 'green'
      }
    },
    data() {
      return {

      }
    },
    created() {}
  }
</script>

<style scoped>
.tag {
  height: 20px;
  padding: 2px 8px;
  border-radius: 5px;
  font-size: 12px;
  color: #fff;
  background: #19be6b;
  cursor: pointer;
}

.red {
  background: #ed3f14 !important;
}
</style>

