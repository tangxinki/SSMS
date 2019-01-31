<template>
  <div class="index">
    <!-- 内容容器 -->
    <el-container>
      <!-- 左侧 -->
      <el-aside width="200px">
        <el-menu :default-openeds="['1']"
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      router
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i><span>系统管理</span>
        </template>
            <el-menu-item index="1-1">系统信息1</el-menu-item>
            <el-menu-item index="1-1">系统信息2</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i><span>账号管理</span>
        </template>
            <el-menu-item index="2-1">账号管理</el-menu-item>
            <el-menu-item index="2-2">添加账号</el-menu-item>

          <el-menu-item index="2-3">密码添加</el-menu-item>
      </el-submenu>
    
    </el-menu>
      </el-aside>
      <el-container>
        <!-- 右侧头部 -->
        <el-header>Header</el-header>
        <!-- 右侧中间 -->
        <el-main>Main</el-main>
        <!-- 右侧尾部 -->
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="less">
.index {
  height: 100%;
  .el-container {
    height: 100%;
    //左侧
    .el-aside {
      background-color: #d3dce6;
      color: #333;
      text-align: center;
    }
    //中间
    .el-main {
      background-color: #e9eef3;
      color: #333;
      text-align: center;
    }
    height: 100%;
    //右侧头和尾
    .el-header,
    .el-footer {
      background-color: #b3c0d1;
      color: #333;
      text-align: center;
      line-height: 60px;
    }
  }
}
</style>


