 <template>
    <el-row class="toolbar">
        <el-col :span="12">
            <slot name="action"></slot>
        </el-col>
        <el-col :span="12" class="flex-x-end">
            <slot name="search"></slot>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.toolbar {
  margin-bottom: 20px;
}
.flex-x-end {
  float: right;
}
</style>
