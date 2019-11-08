<template>
  <div class="login">
    <div class="login-main">
      <span class="login-title">管理系统</span>
      <el-input type="text" v-model="username" class="login-input" placeholder="请输入用户名" clearable/>
      <el-input type="password" v-model="password" class="login-input" placeholder="请输入密码" clearable/>
      <el-button class="login-btn" type="primary" @click="login">登陆</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Input, Button } from 'element-ui';
import Common from '../service/common';
import { Message } from 'element-ui';
@Component({
  components: {
    'el-input': Input,
    'el-button': Button,
  },
})
export default class Home extends Vue {
  private username: string = '';
  private password: string = '';
  private async login() {
    if (window.sessionStorage.getItem('token')) {
      window.sessionStorage.removeItem('token');
    }
    const data: any = await Common.login({
      username: this.username,
      password: this.password,
    });
    window.sessionStorage.setItem('token', data.data.token);
    Message({
      type: 'success',
      message: '登录成功',
    });
    this.$router.replace('/system/index');
  }
}
</script>

<style lang="less" scoped>
.login{
  padding-top: 20%;
  width: 100%;
  height: 100%;
  background: #2e363f;
}
.login-main{
  width: 360px;
  margin: 0 auto;
}
.login-title{
  display: inline-block;
  font-size: 36px;
  padding-bottom: 40px;
  color: #fff;
}
.login-input{
  margin-bottom: 30px;
}
.login-btn{
  width: 100%;
  color: #fff;
}
</style>

