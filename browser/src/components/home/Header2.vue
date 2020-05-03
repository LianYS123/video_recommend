<template>
  <header>
      <el-menu mode='horizontal' router :defaultActive='this.$route.path'>
          <el-menu-item index="/home">
              首页
          </el-menu-item>
          <el-menu-item index="/home/1">
              索引
          </el-menu-item>
          <el-menu-item index="/home/article">
              文章
          </el-menu-item>
          <el-menu-item index="/home/ranking">
              榜单
          </el-menu-item>
          <el-menu-item v-show="!isLogin" style="float:right;" index="/user/register">
              注册
          </el-menu-item>
          <el-menu-item v-show="!isLogin" style="float:right;" index="/user/login">
              登录
          </el-menu-item>
          <el-menu-item v-show="isLogin" style="float:right;" index="/home/space">
              个人空间
          </el-menu-item>
          <el-menu-item @click="$store.dispatch('logout')" v-show="isLogin" style="float:right;" index="/">
              退出登录
          </el-menu-item>
      </el-menu>
  </header>
</template>

<script>
import {mapState} from 'vuex';
export default {
    mounted() {
        console.log(this.$route.path);
    },
    computed: {
        ...mapState({
            isLogin: state => state.user_store.isLogin
        })
    },
}
</script>

<style>

</style>