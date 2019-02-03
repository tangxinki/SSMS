<template>
  <div class="account-manage">
    <!-- 面板组件 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号管理</span>
      </div>
      <div class="text item">
        <!-- 账号管理表格 -->
        <el-table
          ref="multipleTable"
          :data="accountManage"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>

          <el-table-column prop="username" label="账号"></el-table-column>
          <el-table-column prop="usergroup" label="用户组"></el-table-column>
          <el-table-column prop="date" label="创建日期">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i> 编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i> 删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accountManage: [
        {username: "李寻欢", usergroup: "普通管理员", date:"2019-01-01"},
        {username: "张三", usergroup: "普通管理员", date:"2019-01-01"},
        {username: "李四", usergroup: "普通管理员", date:"2019-01-01"},
        {username: "王麻子", usergroup: "普通管理员", date:"2019-01-01"}
        ]
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit () {},
    handleDelete () {}
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
