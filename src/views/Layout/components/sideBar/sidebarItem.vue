<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">

    <!-- <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon||item.meta.icon" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else :index="resolvePath(item.path)">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
      </template>

      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item v-if="child.children&&child.children.length>0" :is-nest="true" :item="child" :key="child.path" :base-path="resolvePath(child.path)" class="nest-menu" />
        <app-link v-else :to="resolvePath(child.path)" :key="child.name">
          <el-menu-item :index="resolvePath(child.path)">
            <item v-if="child.meta" :icon="child.meta.icon" :title="child.meta.title" />
          </el-menu-item>
        </app-link>
      </template>
    </el-submenu> -->
    <div v-if="!item.hidden" class="menu-wrapper">
      <!-- 无子菜单 -->
      <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)">
        <el-menu-item :index="onlyOneChild.name" :key="item.name">
          <i class="el-icon-share"></i>
          <span>{{onlyOneChild.meta.title}}</span>
        </el-menu-item>
      </template>
      <!-- 有子菜单 -->
      <template v-else>
        <el-submenu :index="item.name" :key="item.name">
          <template slot="title">
            <i class="el-icon-share"></i>
            <span v-if="item.meta">{{item.meta.title}}</span>
          </template>
          <sidebar-item v-for="child in item.children" :key="child.name" :item="child" />
        </el-submenu>
      </template>
    </div>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    // isNest: {
    //   type: Boolean,
    //   default: false
    // },
    // basePath: {
    //   type: String,
    //   default: ''
    // }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    // 判断二级菜单子菜单的数量 
      hasOneShowingChild(children, parent) {
        const showingChildren = children.filter(item => {
          debugger
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
        if (showingChildren.length === 0) {
          this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
          return true
        }
        return false
      },
    resolvePath(routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    },
    isExternalLink(routePath) {
      return isExternal(routePath)
    }
  }
}
</script>
