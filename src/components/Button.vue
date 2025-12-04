<script setup>

</script>

<template>
  <el-dropdown>
    <el-button type="primary" class="haeder-button">
      切换计算器<i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <router-link to="/c/newyyy">
        <el-dropdown-item>新月月赢通知存款</el-dropdown-item>
      </router-link>
      <router-link to="/c/yyydqck">
        <el-dropdown-item>月月赢保有短定产品</el-dropdown-item>
      </router-link>
      <router-link to="/c/yyydqck">
        <el-dropdown-item>月月赢保有短定产品</el-dropdown-item>
      </router-link>
      <router-link to="/c/yyyqtck">
        <el-dropdown-item>月月赢保有通知存款</el-dropdown-item>
      </router-link>
        <router-link to="/c/yyy">
          <el-dropdown-item>月月赢通知存款</el-dropdown-item>
        </router-link>
      <router-link to="/c/aum">
        <el-dropdown-item>AUM计算器</el-dropdown-item>
      </router-link>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<style scoped>

</style>