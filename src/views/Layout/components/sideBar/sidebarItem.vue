<template>
  <div v-if="!item.hidden"
    class="menu-wrapper">
    <!-- 无子菜单 -->
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)">
      <el-menu-item :index="onlyOneChild.name"
        :key="onlyOneChild.name">
        <i :class="onlyOneChild.meta.icon"></i>
        <span>{{onlyOneChild.meta.title}}</span>
      </el-menu-item>
    </template>
    <!-- 有子菜单 -->
    <template v-else>
      <el-submenu :index="item.name"
        :key="item.name">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span v-if="item.meta">{{item.meta.title}}</span>
        </template>
        <sidebar-item v-for="child in item.children"
          :key="child.name"
          :item="child" />
      </el-submenu>
    </template>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'

export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    this.onlyOneChild = null
    return {}
  },
  methods: {
    // 判断二级菜单子菜单的数量 
    hasOneShowingChild(children = [], parent) {
      // console.log(children)
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // onlyOneChild用于此二级菜单只有一个子元素
          this.onlyOneChild = item
          return true
        }
      })
      // 此二级菜单只有一个子元素
      if (showingChildren.length === 1 ) {
        return true
      }
      // 此菜单没有二级菜单,显示父元素
      if (showingChildren.length === 0 ) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    }
  }
}
</script>
