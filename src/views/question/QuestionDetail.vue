<template>
  <el-row>  
    <el-card shadow="hover">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>面试问题管理</el-breadcrumb-item>
        <el-breadcrumb-item>编辑问题</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-card>
      <el-form :model="form" v-loading="isFetching">
        <el-row>
          <el-col :span="16">
            <el-form-item label="面试问题">
              <el-input placeholder="输入面试问题" v-model="form.name" autosize></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="能力标签">
              
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="能力级别">
              <el-select v-model="form.level">
                <el-option label="一级" value="1"></el-option>
                <el-option label="二级" value="2"></el-option>
                <el-option label="三级" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="问题解析">
              <el-input v-model="form.analysis" placeholder="输入问题解析" autosize></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-button @click="handldClickSave" type="primary">保存</el-button>
        </el-row>
      </el-form>
    </el-card>
  </el-row>
</template>

<script>
import * as api from "../../api";

export default {
  data() {
    return {
      form: {},
      ablitys: [],
      isFetching: true
    };
  },
  created() {
    this.getQuestionDetail();
  },
  methods: {
    handldClickSave() {},
    getQuestionDetail() {
      api
        .getQuestionDetail(this.$route.params.id)
        .then(res => {
          this.isFetching = false;
          this.form = res;
        })
        .catch(err => {
          this.isFetching = false;
        });
    },
    handldClickSave() {
      this.isFetching = true;
      api.updateQuestion(this.$route.params.id, this.form).then(res => {
        this.isFetching = false;
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
