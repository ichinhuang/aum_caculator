<template>
  <div id="app">
<!--     <nav>-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
<!--    </nav>-->
<!--    <el-menu class="el-menu-demo"
             mode="horizontal"
             text-color="#000"
             active-text-color="#ffd04b">
      <el-menu-item class="menu_tab_text"><router-link to="/yyyqtck" @click.native.prevent="this.$router.push('/yyyqtck');">月月赢七天存款计算器</router-link></el-menu-item>
      <el-menu-item class="menu_tab_text"><router-link to="/yyy" @click.native.prevent="this.$router.push('/yyy');">月月赢计算器</router-link></el-menu-item>
      <el-menu-item class="menu_tab_text"><router-link to="/aum" @click.native.prevent="this.$router.push('/aum');">AUM计算器</router-link></el-menu-item>
    </el-menu>-->
    <Button></Button>

    <router-view/>

    <el-divider>
      <!-- <a class="footer">Fueled by Coffee & Code<br>iKin Huang</a><br> -->
      <a class="footer" href="https://beian.miit.gov.cn/#/Integrated/index">沪ICP备2023017275号</a>
    </el-divider>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a{
  text-decoration: none;
  color: #111111;
}

body{
  margin: 0;
  padding: 0;
}

.haeder-button {
  margin-top: 50px;
}


.nav-list{
  background-color: rgba(0, 0, 0, .9);
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 120px;
  left: 0;
  transform: scaleY(0);
  transition: transform .3s ease-in-out .3s, opacity .3s ease-in-out .3s;
  transform-origin: 50% 0;
  opacity: 0;
  z-index: 3;
}

#toggle:checked ~ .nav-list{
  transform: scaleY(1);
  opacity: 1;
}

ul{
  margin-top: 6em;
  margin-left: 10%;
}

ul li{
  color: #f5f5f7;
  list-style: none;
  font-size: 50px;
  font-family: "SF Pro SC","HanHei SC","SF Pro Text","Myriad Set Pro","SF Pro Icons","PingFang SC","Helvetica Neue","Helvetica","Arial",sans-serif;
  text-align: left;
  margin: 40px;
}

/*nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.menu_tab_text {
  font-weight: bold;
  color: #006fff;
  font-size: 15px;
}*/
.footer {
  color: rgba(236, 236, 236, 0.96);
  font-size: 12px;
}

</style>
<script setup>
import Button from "@/components/Button.vue";
</script>