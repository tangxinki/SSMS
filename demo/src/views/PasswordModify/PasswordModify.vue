<template>
  <div class="password-modify">
    <!-- 面板组件 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>密码修改</span>
      </div>
      <div class="text item">
        <!-- 添加账号表单 -->
        <el-form
          :model="passwordModifyForm"
          status-icon
          :rules="rules"
          ref="passwordModifyForm"
          label-width="100px"
          class="demo-ruleForm"
          size="mini"
        >
          <!-- 账号 -->
          <el-form-item label="原密码" prop="OriginalPassword">
            <el-input type="text" v-model="passwordModifyForm.OriginalPassword" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="新密码" prop="newPassword">
            <el-input type="text" v-model="passwordModifyForm.newPassword" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item label="确认密码" prop="checkPwd">
            <el-input type="text" v-model="passwordModifyForm.checkPwd" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 登录按钮&重置按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('passwordModifyForm')">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    //走定义密码的验证
    const pass = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码!"));
      } else if (value.leng < 3 || value.length > 6) {
        callback(new Error("长度在 3 - 6 位"));
      } else {
        if (this.passwordModifyForm.checkPwd !== "") {
          this.$refs.passwordModifyForm.validateField("checkPwd"); // 调用确认密码的验证（一致性验证）
        }
        callback();
      }
    };
    //自定义确认密码的验证
    const checkPass = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码!"));
      } else if (value !== this.passwordModifyForm.newPassword) {
        callback(new Error("两次输入的密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      passwordModifyForm: {
        OriginalPassword: "",
        newPassword: "",
        checkPwd: ""
      },
      rules: {
        OriginalPassword: [
          { required: true, message: "请输入原密码", trigger: "blur" }
        ],
        newPassword: [{ required: true, validator: pass, trigger: "blur" }],
        checkPwd: [{ required: true, validator: checkPass, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 点击登录按钮 触发这个函数
    submitForm(formName) {
      // 获取表单组件 调用验证方法
      this.$refs[formName].validate(valid => {
        // 如果所有验证通过 valid就是true
        if (valid) {
          alert("前端验证通过 可以提交给后端！");
          // 后续就可以把收集的账号和密码 一起发送给后端 验证用户名和密码的正确性。
          // 收集账号和密码
          let params = {
            OriginalPassword: this.passwordModifyForm.OriginalPassword,
            newPassword: this.passwordModifyForm.newPassword,
            checkPwd: this.passwordModifyForm.checkPwd
          };
          console.log(params);
          //跳转到账号管理
          this.$router.push("/accountManage");
        } else {
          // 否则就是false
          alert("前端验证失败 不能提交给后端！");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
.password-modify {
  .el-card {
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
    .el-card__body {
      .el-form {
        width: 290px;
        .el-form-item {
          margin-bottom: 24px;
          .el-form-item__content {
            .el-button {
              float: left;
            }
          }
        }
      }
    }
  }
}
</style>
