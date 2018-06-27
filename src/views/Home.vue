<template>
  <el-container>
    <el-aside width="200px">
      <el-menu :default-active="$route.path" light router>
        <el-menu-item index="/">
          <i class="el-icon-location"></i>
          <span>首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">能力模块库</span>
          </template>
          <el-menu-item index="/ablity">
            <i class="el-icon-tickets"></i>
            <span>能力模块库列表</span>
          </el-menu-item>
          <el-menu-item index="/ablitymanagement">
            <i class="el-icon-tickets"></i>
            <span>能力分类管理</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-question"></i>
            <span>面试问题管理</span>
          </template>
          <el-menu-item index="/question">
            <i class="el-icon-tickets"></i>
            <span>面试问题列表</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">岗位管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style>
.el-menu-item,
.el-submenu__title {
  text-align: left;
}
</style>
