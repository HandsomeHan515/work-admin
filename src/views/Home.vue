<template>
  <el-container>
    <el-aside width="200px">
      <div class="sub-menu">
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
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>岗位管理</span>
            </template>
            <el-menu-item index="123">
              <i class="el-icon-question"></i>
              <span>岗位列表</span>
            </el-menu-item>
            <el-menu-item index="1234">
              <i class="el-icon-question"></i>
              <span>岗位分类管理</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="5">
            <i class="el-icon-question"></i>
            <span>潜在客户消息</span>
          </el-menu-item>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>面试报告管理</span>
            </template>
            <el-menu-item index="12333">
              <i class="el-icon-question"></i>
              <span>面试报告列表</span>
            </el-menu-item>
            <el-menu-item index="12334">
              <i class="el-icon-question"></i>
              <span>岗位分类管理</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
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
.sub-menu {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 200px;
  background-color: #f4f4ff;
}
</style>
