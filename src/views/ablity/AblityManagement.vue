<template>
  <el-row>
    <el-card shadow="hover">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>能力模块库</el-breadcrumb-item>
        <el-breadcrumb-item>能力分类管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-card shadow="hover">
      <el-form :model="form" v-loading="isFetching">
        <el-row>
          <el-col :span="8">
            <el-form-item label="一级分类">
              <el-select v-model="form.level_one" @change="handleClickChangeOne">
                <el-option 
                  v-for="(item, index) in levelone" :key="index"
                  :label="item.name" 
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button @click="dialogVisible = true" type="primary" round>添加一级分类</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="二级分类">
              <el-select v-model="form.level_two">
                <el-option 
                  v-for="(item, index) in two" :key="index"
                  :label="item.name" 
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button @click="dialogVisible2 = true" type="primary" round>添加二级分类</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-button @click="handleClickAdd" type="primary" round>添加能力</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-row>
      <el-button type="info" @click="handleClickGoback">返回</el-button>
    </el-row>

    <el-dialog
      title="添加能力"
      :visible.sync="visible"
      width="30%"
      :before-close="handleClose">
      <el-input placeholder="输入能力名称" v-model="name"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="handleClickAddAblity">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加一级分类"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :model="oneForm">
        <el-form-item>
          <el-input v-model="oneForm.name" placeholder="输入岗位分类名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClickOne">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加二级分类"
      :visible.sync="dialogVisible2"
      width="30%"
      :before-close="handleClose">
      <el-form :model="twoForm">
        <el-row>
          <el-form-item>
            <el-select v-model="twoForm.parent">
              <el-option 
                v-for="(item, index) in levelone" :key="index"
                :label="item.name" 
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-input v-model="twoForm.name" placeholder="输入岗位分类名称"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="handleClickTwo">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
import * as api from "../../api";

export default {
  data() {
    return {
      name: "",
      form: {},
      oneForm: {},
      twoForm: {},
      isFetching: true,
      levelone: [],
      leveltwo: [],
      two: [],
      dialogVisible: false,
      dialogVisible2: false,
      visible: false
    };
  },
  mounted() {
    Promise.all([this.getAblityLevelOne(), this.getAblityLevelTwo()]).then(
      () => {
        this.isFetching = false;
      }
    );
  },
  methods: {
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
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleClickOne() {
      if (this.oneForm.name) {
        this.isFetching = true;
        api.AddLevelOne({ name: this.oneForm.name }).then(res => {
          this.isFetching = false;
          this.dialogVisible = false;
          delete this.oneForm.name;
          this.levelone.push(res);
          this.$notify({
            title: "提示",
            message: "操作成功",
            duration: 2000
          });
        });
      } else {
        this.$notify({
          title: "提示",
          message: "请输入内容",
          duration: 2000
        });
      }
    },
    handleClickTwo() {
      if (this.twoForm.name && this.twoForm.parent) {
        this.isFetching = true;
        api
          .AddLevelTwo({ name: this.twoForm.name, parent: this.twoForm.parent })
          .then(res => {
            this.isFetching = false;
            this.dialogVisible2 = false;
            delete this.twoForm.name;
            delete this.twoForm.parent;
            this.leveltwo.push(res);
            this.$notify({
              title: "提示",
              message: "操作成功",
              duration: 2000
            });
          });
      } else {
        this.$notify({
          title: "提示",
          message: "请输入内容",
          duration: 2000
        });
      }
    },
    handleClickGoback() {
      this.$router.go(-1);
    },
    handleClickAdd() {
      if (!this.form.level_one) {
        this.$notify({
          title: "提示",
          message: "请选择一级标签",
          duration: 2000
        });
      } else if (!this.form.level_two) {
        this.$notify({
          title: "提示",
          message: "请选择二级标签",
          duration: 2000
        });
      } else {
        this.visible = true;
      }
    },
    handleClickAddAblity() {
      if (this.name) {
        let params = {
          name: this.name,
          level_one: this.form.level_one,
          level_two: this.form.level_two
        };
        api.addAblity(params).then(res => {
          this.$notify({
            title: "提示",
            message: "操作成功",
            duration: 2000
          });
          this.visible = false;
        });
      } else {
        this.$notify({
          title: "提示",
          message: "请输入能力名称",
          duration: 2000
        });
      }
    },
    handleClickChangeOne(e) {
      let leveltwo = this.leveltwo.slice();
      delete this.form.level_two;
      this.two = leveltwo.filter(item => item.parent === e);
    }
  }
};
</script>
