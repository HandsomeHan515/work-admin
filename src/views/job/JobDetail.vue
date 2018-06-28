<template>
  <el-row>
    <el-card shadow="hover">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>岗位管理</el-breadcrumb-item>
        <el-breadcrumb-item>编辑岗位</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-card shadow="hover">
      <el-form :model="form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="岗位名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="一级分类">
              <el-select v-model="form.level_one"></el-select>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="二级分类">
              <el-select v-model="form.level_two"></el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-card shadow="hover">
        <el-button type="primary">添加能力</el-button>
      </el-card>
      <el-table :data="form.ablitys" border stripe>
        <el-table-column prop="id" label="排序"></el-table-column>
        <el-table-column prop="name" label="能力名称"></el-table-column>
        <el-table-column prop="level_two" label="二级分类"></el-table-column>
        <el-table-column prop="level" label="能力级别"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClickEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleClickEdit(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </el-row>
</template>
<script>
import * as api from "../../api";

export default {
  data() {
    return {
      form: {},
      isFetching: true
    };
  },
  created() {
    this.getJobDetail();
  },
  methods: {
    getJobDetail() {
      api
        .getJobDetail(this.$route.params.id)
        .then(res => {
          this.isFetching = false;
          this.form = res;
        })
        .catch(err => {
          this.isFetching = false;
        });
    }
  }
};
</script>
