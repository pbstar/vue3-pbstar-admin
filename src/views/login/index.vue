<template>
  <div class="fapage">
    <div class="login">
      <img class="logo" src="@/assets/imgs/logo.jpg" alt="" />
      <h3 class="title">{{ title }}</h3>
      <el-input
        class="account"
        placeholder="请输入账号"
        prefix-icon="user"
        v-model="account"
      >
      </el-input>
      <el-input
        class="password"
        placeholder="请输入密码"
        :show-password="true"
        type="password"
        prefix-icon="lock"
        v-model="password"
      >
      </el-input>
      <el-button
        class="btn"
        type="primary"
        @click="toLogin"
        :loading="isLoading"
        >登 录</el-button
      >
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import config from "@/config";
const title = ref(config.title);
const isLoading = ref(false);
const account = ref("");
const password = ref("");
onMounted(() => {});
const toLogin = () => {
  console.log(11);
};
</script>
<style scoped lang="scss">
.fapage {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;

  .login {
    width: 400px;
    max-width: calc(100% - 40px);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ccc;

    .logo {
      width: 80px;
      height: 80px;
      margin-bottom: 15px;
      border-radius: 10px;
    }

    .title {
      margin-bottom: 20px;
      font-size: 26px;
    }
    ::v-deep(.el-input__wrapper) {
      height: 45px;
      line-height: 45px;
      background-color: #1f2b3a !important;
      border-color: #1f2b3a !important;
      box-shadow: 0 0 0 1px #1f2b3a !important;
    }
    ::v-deep(.el-input__inner) {
      color: #bbb !important;
    }
    ::v-deep(.el-input__prefix) {
      color: #bbb !important;
    }
    .account {
      margin-bottom: 10px;
    }

    .password {
      margin-bottom: 15px;
    }

    .btn {
      width: 100%;
      margin-bottom: 50px;
      height: 43px;
      line-height: 43px;
    }
  }
}
</style>
