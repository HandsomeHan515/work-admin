<template>
  <el-row>
    <el-card shadow="hover">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>能力模块库</el-breadcrumb-item>
        <el-breadcrumb-item>能力模块库列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-card shadow="hover">
      <el-row>
        <el-col :span="12" :offset="4">
          <el-input v-model="ablity" placeholder="输入能力名称或分类名称进行搜索">
            <el-button @click="handleClickSearch" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button @click="handleClickType" type="primary">能力分类管理</el-button>
        </el-col> 
      </el-row>
    </el-card>
    <el-card shadow="hover">
      <el-table :data="tableData" stripe border v-loading="isFetching">
        <el-table-column prop="name" label="能力模块"></el-table-column>
        <el-table-column prop="level_two" label="归属二级分类"></el-table-column>
        <el-table-column prop="question" label="面试问题"></el-table-column>
        <el-table-column prop="job" label="相关岗位"></el-table-column>
        <el-table-column prop="is_level" :formatter="formatterLevel" label="是否有分级"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClickEdit(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px;"> 
        <el-pagination
          background
          layout="prev, pager, next"
          :total="count">
        </el-pagination>
      </div>
    </el-card>
  </el-row>
</template>
<script>
import * as api from "../../api";

export default {
  data() {
    return {
      ablity: "",
      tableData: [],
      page: 1,
      count: 0,
      isFetching: true
    };
  },
  created() {
    this.getAblitys(this.page);
  },
  methods: {
    getAblitys(page) {
      api.getAblitys(page).then(res => {
        this.isFetching = false;
        this.count = res.count;
        this.tableData = res.results;
      });
    },
    handleCurrentChange(page) {
      this.isFetching = true;
      this.page = page;
      this.getAblitys(page);
    },
    formatterLevel(row) {
      if (row.is_level) return "是";
      return "否";
    },
    handleClickSearch() {
      this.isFetching = true;
      api.searchAblity({ keyword: this.ablity }).then(res => {
        this.isFetching = false;
        this.count = res.count;
        this.tableData = res.results;
      });
    },
    handleClickEdit(row) {
      this.$router.push({
        path: `/ablity/${row.id}`
      });
    },
    handleClickType() {
      this.$router.push({
        path: "/ablitymanagement"
      });
    }
  }
};
</script>
