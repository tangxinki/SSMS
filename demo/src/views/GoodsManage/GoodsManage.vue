<template>
  <div class="account-manage">
    <!-- 面板组件 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品管理</span>
      </div>
      <div>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="所属分类">
            <el-select v-model="searchForm.cateName" placeholder="所属分类">
              <el-option label="全部" value="全部"></el-option>
              <el-option label="酒水" value="酒水"></el-option>
              <el-option label="水果" value="水果"></el-option>
              <el-option label="电子" value="电子"></el-option>
              <el-option label="食品" value="食品"></el-option>
              <el-option label="生活用品" value="生活用品"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关键字">
            <el-input v-model="searchForm.keyWord" placeholder="商品名称或条形码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="text item">
        <!-- 账号管理表格 -->
        <el-table
          ref="multipleTable"
          :data="goodsManage"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
         >
          <el-table-column type="selection"></el-table-column>

          <el-table-column prop="barCode" label="商品条形码"></el-table-column>
          <el-table-column prop="goodsName" label="商品名称"></el-table-column>
          <el-table-column prop="cateName" label="所属分类"></el-table-column>
          <el-table-column prop="salePrice" label="售价(元)"></el-table-column>
          <el-table-column prop="promotion" label="是否促销"></el-table-column>
          <el-table-column prop="cdate" label="创建日期">
            <template slot-scope="scope">{{ scope.row.cdate | formatCdate}}</template>
          </el-table-column>
          <el-table-column label="管理">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">
                <i class="el-icon-edit"></i>修改
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
                <i class="el-icon-delete"></i>删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div style="margin-top: 20px; text-align: left;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 3, 5, 10]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
        <!-- 批量删除 -->
        <div style="margin-top: 20px; text-align: left;">
          <el-button @click="batchDelete" type="danger">批量删除</el-button>
          <el-button @click="cancelSelect">取消选择</el-button>
        </div>
        <!-- 修改的弹出模态框 -->
        <el-dialog title="商品修改" width="400px" :visible.sync="flag">
          <!-- 回填表单 -->
          <el-form :model="editForm" label-width="85px">
            <!-- 账号 -->
            <el-form-item label="商品条形码" prop="barcode">
              <el-input
                style="width: 217px;"
                type="text"
                v-model="editForm.barcode"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品名称" prop="goodsname">
              <el-input
                style="width: 217px;"
                type="text"
                v-model="editForm.goodsname"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="请选择分类" prop="cateName">
              <el-select v-model="editForm.cateName" placeholder="请选择分类">
                <el-option label="酒水" value="酒水"></el-option>
                <el-option label="水果" value="水果"></el-option>
                <el-option label="电子" value="电子"></el-option>
                <el-option label="食品" value="食品"></el-option>
                <el-option label="生活用品" value="生活用品"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="售价" prop="saleprice">
              <el-input
                style="width: 217px;"
                type="text"
                v-model="editForm.saleprice"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否促销">
              <el-radio-group v-model="editForm.promotion">
                <el-radio label="促销"></el-radio>
                <el-radio label="不促销"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <!-- 表单的尾部 -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="flag = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
//事件格式化插件
import moment from "moment";
import qs from "qs";
export default {
  data() {
    return {
      searchForm: {
        cateName: "",
        keyWord: ""
      },
      goodsManage: [], //商品的数据
      flag: false, //模态框的显示和隐藏
      editForm: {
        barcode: "",
        goodsname: "",
        cateName: "",
        saleprice: "",
        promotion: ""
      },
      editId: "", //要修改的id
      selectedGoods: [], //被选中的账号数据
      currentPage: 1, //当前页
      total: 0, //数据总条数
      pageSize: 3 //每页条数
    };
  },
  methods: {
    //查询
    search() {
      this.getGoodsListByPage();
      // let cateName = this.searchForm.cateName;
      // let keyWord = this.searchForm.keyWord;
      // this.axios.get('http://127.0.0.1:3000/goods/search', {
      //   params: {
      //     cateName,
      //     keyWord
      //   }
      // })
      // .then(response => {
      //   this.goodsManage = response.data;
      // })
      // .catch(err => {
      //   console.log(err);
      // })
    },
    //每页显示条数改变,就会触发这个函数
    handleSizeChange(val) {
      //保存每页显示条数
      this.pageSize = val;
      this.getGoodsListByPage();
    },
    //当前页码改变时,就会触发这个函数
    handleCurrentChange(val) {
      //保存当前页码
      this.currentPage = val;
      this.getGoodsListByPage();
    },
    //当单选框的选中状态改变时,就会触发这个函数 val就是选中的状态 是一个数组,数组里面是数据对象
    handleSelectionChange(val) {
      //被选中的账号,保存到一个变量中
      this.selectedGoods = val;
    },
    //批量删除
    batchDelete() {
      //收集批量删除用户的id
      let selectedId = this.selectedGoods.map(v => v.id);
      console.log(selectedId);
      if (!selectedId.length) {
        this.$message.error("请选择以后再操作");
      } else {
        this.$confirm("你确定要删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.axios
              .get(`http://127.0.0.1:3000/goods/batchdelete`, {
                params: {
                  selectedId
                }
              })
              .then(response => {
                let { error_code, message } = response.data;
                if (error_code === 0) {
                  this.$message({
                    type: "success",
                    message: message
                  });
                  // this.getGoodsList();
                  this.getUserListByPage();
                } else {
                  this.$message.error(response.data.message);
                }
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {});
      }
    },
    //取消选中
    cancelSelect() {
      this.$refs.multipleTable.clearSelection();
    },
    //修改
    handleEdit(id) {
      //把这数据的id保存下来
      this.editId = id;
      this.axios
        .get(`http://127.0.0.1:3000/goods/goodsedit?id=${id}`)
        .then(response => {
          let result = response.data[0];
          this.editForm.barcode = result.barCode;
          this.editForm.goodsname = result.goodsName;
          this.editForm.cateName = result.cateName;
          this.editForm.saleprice = result.salePrice;
          this.editForm.promotion = result.promotion;
          this.flag = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //保存修改
    saveEdit() {
      // 收集新数据 和 一个原来的id
      let params = {
        barCode: this.editForm.barcode,
        goodsName: this.editForm.goodsname,
        cateName: this.editForm.cateName,
        salePrice: this.editForm.saleprice,
        promotion: this.editForm.promotion,
        editId: this.editId
      };

      // 发送ajax请求 把新数据和原来的id一起发送给后端
      this.axios
        .post("http://127.0.0.1:3000/goods/goodseditsave", qs.stringify(params))
        .then(response => {
          console.log(response.data);
          // 接收错误码和提示信息
          let { error_code, message } = response.data;
          if (error_code === 0) {
            // 弹出成功的提示
            this.$message({
              type: "success",
              message: message
            });
            // 刷新列表（重新请求所有账号数据）
            this.getGoodsListByPage();
          } else {
            // 弹出失败的提示
            this.$message.error(message);
          }
          // 关闭模态框
          this.flag = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除
    handleDelete(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get(`http://127.0.0.1:3000/goods/delete?id=${id}`)
            .then(response => {
              if (response.data.error_code === 0) {
                this.$message({
                  type: "success",
                  message: response.data.message
                });
                // this.getGoodsList();
                this.getGoodsListByPage();
              } else {
                this.$message.error(response.data.message);
              }
            });
        })
        .catch(err => {});
    },
    // getGoodsList() {
    //   this.axios.get("http://127.0.0.1:3000/goods/goodslist").then(response => {
    //     this.goodsManage = response.data;
    //   });
    // },
    //请求分页数据
    getGoodsListByPage() {
      //收集当前页码和每页显示条数
      let pageSize = this.pageSize;
      let currentPage = this.currentPage;

      let cateName = this.searchForm.cateName;
      let keyWord = this.searchForm.keyWord;
      this.axios
        .get("http://127.0.0.1:3000/goods/goodslistbypage", {
          params: {
            pageSize,
            currentPage,
            cateName,
            keyWord
          }
        })
        .then(response => {
          let { total, data } = response.data;
          this.total = total;
          this.goodsManage = data;
          if (!data.length && currentPage !== 1) {
            this.currentPage -= 1;
            this.getGoodsListByPage();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  //生命周期
  created() {
    this.getGoodsListByPage();
    // this.getGoodsList();
  },
  //过滤器
  filters: {
    formatCdate(value) {
      return moment(value).format("YY-MM-HH");
    }
  }
};
</script>

<style lang="less">
.account-manage {
  .el-card {
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
  }
}
</style>
