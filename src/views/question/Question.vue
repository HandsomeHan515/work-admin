<template>
  <el-row>
    <el-card shadow="hover">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>面试问题管理</el-breadcrumb-item>
        <el-breadcrumb-item>面试问题列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-card shadow="hover">
      <el-row>
        <el-col :span="12" :offset="4">
          <el-input v-model="keyword" placeholder="输入关键词搜索">
            <el-button @click="handleClickSearch" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button @click="handleClickAdd" type="primary">新增面试问题</el-button>
        </el-col> 
      </el-row>
    </el-card>
    <el-card shadow="hover">
      <el-table :data="tableData" stripe border v-loading="isFetching">
        <el-table-column prop="id" label="问题ID"></el-table-column>
        <el-table-column prop="name" label="面试问题"></el-table-column>
        <el-table-column prop="ablity" label="能力标签"></el-table-column>
        <el-table-column prop="ablity_level" label="能力等级"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClickEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleClickDel(scope.row)" type="text" size="small">删除</el-button>
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
      keyword: "",
      tableData: [],
      page: 1,
      count: 0,
      isFetching: true
    };
  },
  created() {
    this.getQuestions(this.page);
  },
  methods: {
    getQuestions(page) {
      api.getQuestions(page).then(res => {
        this.isFetching = false;
        this.count = res.count;
        this.tableData = res.results;
      });
    },
    handleCurrentChange(page) {
      this.isFetching = true;
      this.page = page;
      this.getQuestions(page);
    },
    formatterLevel(row) {
      if (row.is_level) return "是";
      return "否";
    },
    handleClickSearch() {
      this.isFetching = true;
      api.searchQeustion({ keyword: this.keyword }).then(res => {
        this.isFetching = false;
        this.count = res.count;
        this.tableData = res.results;
      });
    },
    handleClickEdit(row) {
      this.$router.push({
        path: `/question/${row.id}`
      });
    },
    handleClickAdd() {},
    handleClickDel(row) {
      api.delQuestion(row.id).then(res => {
        this.tableData = this.tableData.filter(item => item.id !== row.id);
        this.$notify({
          title: "提示",
          message: "操作成功",
          duration: 2000
        });
      });
    }
  }
};
</script>
