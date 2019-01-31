<template>
    <div class="login">
        <!-- 登陆表单容器 -->
        <div class="login-wrapper">
            <!-- 登陆标题 -->
            <h1 class="title">
                <Icon type="ios-flower" />
                华联超市管理系统-登陆
                </h1>
                <!-- 登陆表单 -->
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <!-- 账号 -->
                <el-form-item label="账号" prop="pass">
                    <el-input type="text" v-model="ruleForm2.pass" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item label="密码" prop="pass">
                    <el-input type="text" v-model="ruleForm2.pass" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 确认密码 -->
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="text" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>
<style lang="less">
.login{
    height: 100%;
    width: 100%;
    background-color: #2d3a4b;
    .login-wrapper {
        width: 500px;
        height: 350px;
        border-radius: 8px;
        position: fixed;
        background-color: rgba(0, 0, 0, 0.2);
        color: #fff;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        padding: 30px 50px 0 10px;
        .title {
            font-size: 20px;
            margin-left: 60px;
            margin-bottom: 20px;
        }
        .el-form {
            .el-form-item {
                .el-form-item__label {
                    color: #fff;
                }
            }
        }
    }
}
     
</style>


