<template>
  <div class="goods-add">
    <!-- 面板组件 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加商品</span>
      </div>
      <div class="text item">
        <!-- 添加账号表单 -->
        <el-form
          :model="goodsAddForm"
          status-icon
          :rules="rules"
          ref="goodsAddForm"
          label-width="100px"
          class="demo-ruleForm"
          size="mini"
        >
          <!-- 所属分类 -->
          <el-form-item label="请选择分类" prop="cateName">
            <el-select v-model="goodsAddForm.cateName" placeholder="请选择分类">
              <el-option label="酒水" value="酒水"></el-option>
              <el-option label="水果" value="水果"></el-option>
              <el-option label="电子" value="电子"></el-option>
              <el-option label="食品" value="食品"></el-option>
              <el-option label="生活用品" value="生活用品"></el-option>
            </el-select>
          </el-form-item>
          <!-- 条形码 -->
          <el-form-item label="条形码" prop="barCode">
            <el-input type="text" v-model="goodsAddForm.barCode" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 商品名称 -->
          <el-form-item label="商品名称" prop="goodsName">
            <el-input type="text" v-model="goodsAddForm.goodsName" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 商品进价 -->
          <el-form-item label="商品进价" prop="costPrice">
            <el-input type="text" v-model="goodsAddForm.costPrice" autocomplete="off" @blur="autoPrice"></el-input>
          </el-form-item>
          <!-- 商品市场价 -->
          <el-form-item label="商品市场价" prop="marketPrice">
            <el-input type="text" v-model="goodsAddForm.marketPrice" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 商品售价 -->
          <el-form-item label="商品售价" prop="salePrice">
            <el-input type="text" v-model="goodsAddForm.salePrice" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 入库数量 -->
          <el-form-item label="入库数量" prop="goodsNum">
            <el-input type="text" v-model="goodsAddForm.goodsNum" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 商品重量 -->
          <el-form-item label="商品重量" prop="goodsWeight">
            <el-input type="text" v-model="goodsAddForm.goodsWeight" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 商品单位 -->
          <el-form-item label="请选择单位" prop="unit">
            <el-select v-model="goodsAddForm.unit" placeholder="请选择商品单位">
              <el-option label="个" value="个"></el-option>
              <el-option label="件" value="件"></el-option>
              <el-option label="盒" value="盒"></el-option>
              <el-option label="斤" value="斤"></el-option>
              <el-option label="袋" value="袋"></el-option>
              <el-option label="瓶" value="瓶"></el-option>
              <el-option label="箱" value="箱"></el-option>
            </el-select>
          </el-form-item>
          <!--会员优惠 -->
          <el-form-item label="会员优惠">
            <el-radio-group v-model="goodsAddForm.discount">
              <el-radio label="享受"></el-radio>
              <el-radio label="不享受"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 是否促销 -->
          <el-form-item label="是否促销">
            <el-radio-group v-model="goodsAddForm.promotion">
              <el-radio label="促销"></el-radio>
              <el-radio label="不促销"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input type="textarea" v-model="goodsAddForm.goodsDesc"></el-input>
          </el-form-item>
          <!-- 登录按钮&重置按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('goodsAddForm')">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //添加商品表单数据
      goodsAddForm: {
        cateName: "",
        barCode: "",
        goodsName: "",
        costPrice: "",
        marketPrice: "",
        salePrice: "",
        goodsNum: "",
        goodsWeight: "",
        unit: "",
        discount: "",
        promotion: "",
        goodsDesc: "",
      },
      //验证规则
      rules: {
        //验证分类名称
        cateName: [
          { required: true, message: "请选择分类", trigger: "change" } //非空验证
        ],
        barCode: [
          { required: true, message: "条形码不能为空", trigger: "blur" } //非空验证
        ],
        goodsName: [
          { required: true, message: "商品名称不能为空", trigger: "blur" } //非空验证
        ],
        costPrice: [
          { required: true, message: "商品价格不能为空", trigger: "blur" } //非空验证
        ],
        marketPrice: [
          { required: true, message: "不能为空", trigger: "blur" } //非空验证
        ],
        salePrice: [
          { required: true, message: "不能为空", trigger: "blur" } //非空验证
        ],
        goodsNum: [
          { required: true, message: "不能为空", trigger: "blur" } //非空验证
        ],
        goodsWeight: [
          { required: true, message: "不能为空", trigger: "blur" } //非空验证
        ],
        unit: [
          { required: true, message: "请选择单位", trigger: "change" } //非空验证
        ]
      }
    };
  },
  methods: {
      //自动填充价格
      autoPrice () {
        this.goodsAddForm.marketPrice = this.goodsAddForm.costPrice * 3;
        this.goodsAddForm.salePrice = this.goodsAddForm.costPrice * 2;
      },
    // 点击登录按钮 触发这个函数
    submitForm(formName) {
      // 获取表单组件 调用验证方法
      this.$refs[formName].validate(valid => {
        // 如果所有验证通过 valid就是true
        if (valid) {
          // alert("前端验证通过 可以提交给后端！");
          // 后续就可以把收集的账号和密码 一起发送给后端 验证用户名和密码的正确性。
          // 获取用户输入要新增的账号数据,用一个参数对象保存
          let params = {
            cateName: this.goodsAddForm.cateName,
            barCode: this.goodsAddForm.barCode,
            goodsName: this.goodsAddForm.goodsName,
            costPrice: this.goodsAddForm.costPrice,
            marketPrice: this.goodsAddForm.marketPrice,
            salePrice: this.goodsAddForm.salePrice,
            goodsNum: this.goodsAddForm.goodsNum,
            goodsWeight: this.goodsAddForm.goodsWeight,
            unit: this.goodsAddForm.unit,
            discount: this.goodsAddForm.discount,
            promotion: this.goodsAddForm.promotion,
            goodsDesc: this.goodsAddForm.goodsDesc
          };
          console.log(params);
          
          // console.log(params);
          //发送ajax请求 把数据发给后端
          //   this.axios
          //     .post("/url", qs.stringify(params), {
          //       headers: { "Content-Type": "appliction/x/www-form-urlencoded" }
          //     })
          //     .then(response => {
          //       console.log(response.data);
          //     });

          //跳转到账号管理
        //   this.$router.push("/goodsManage");
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
.goods-add {
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
        }
      }
    }
  }
}
</style>
