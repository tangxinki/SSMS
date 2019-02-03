<template>
  <div class="index">
    <!-- 内容容器 -->
    <el-container>
      <!-- 左侧 -->
      <el-aside width="200px">
        <Nav></Nav>
      </el-aside>

      <!-- 右边 -->
      <el-container>
        <!-- 右侧头部 -->
        <el-header>
          <Top></Top>
        </el-header>
        <!-- 右侧中间 -->
        <el-main>
          <!-- 路由出口 -->
          <router-view></router-view>
        </el-main>
        <!-- 右侧尾部 -->
        <el-footer>
          <Bottom></Bottom>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
//引入导航组件
import Nav from '@/components/Nav/Nav.vue';
import Top from '@/components/Top/Top.vue';
import Bottom from '@/components/Bottom/Bottom.vue';
export default {
    components: {   //注册组件
      Nav,
      Top,
      Bottom
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


