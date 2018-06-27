<template>
  <el-row>
    <el-card shadow="hover">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/ablity' }">能力模块库</el-breadcrumb-item>
        <el-breadcrumb-item>编辑能力</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-card shadow="hover">
      <div slot="header">编辑能力</div>
      <el-form :model="form" :rules="rules" ref="ruleForm" v-loading="isFetching">
        <el-row>
          <el-col :span="8" :offset="4">
            <el-form-item label="所属一级分类">
              <el-select v-model="form.level_one">
                <el-option 
                  v-for="(item, index) in levelone" :key="index"
                  :label="item.name" 
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属二级分类">
              <el-select v-model="form.level_two">
                <el-option 
                  v-for="(item, index) in leveltwo" :key="index"
                  :label="item.name" 
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" :offset="4">
            <el-form-item label="沟通能力内容">
              <el-input autosize v-model="form.content" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" :offset="4">
            <el-form-item label="一级定义">
              <el-input autosize v-model="form.one" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" :offset="4">
            <el-form-item label="二级定义">
              <el-input autosize v-model="form.two" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" :offset="4">
            <el-form-item label="三级定义">
              <el-input autosize v-model="form.three" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-button @click="handldClickSave" type="primary">保存</el-button>
          <el-button type="danger">删除</el-button>
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
      rules: {},
      isFetching: true,
      levelone: [],
      leveltwo: []
    };
  },
  created() {
    this.getAblityDetail();
  },
  mounted() {
    this.getAblityLevelOne();
    this.getAblityLevelTwo();
  },
  methods: {
    getAblityDetail() {
      api
        .getAblityDetail(this.$route.params.id)
        .then(res => {
          this.isFetching = false;
          this.form = res;
        })
        .catch(err => {
          this.isFetching = false;
        });
    },
    getAblityLevelOne() {
      api.getAblityLevelOne().then(res => {
        this.levelone = res.results;
      });
    },
    getAblityLevelTwo() {
      api.getAblityLevelTwo().then(res => {
        this.leveltwo = res.results;
      });
    },
    handldClickSave() {
      this.isFetching = true;
      api.updateAblity(this.$route.params.id, this.form).then(res => {
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
