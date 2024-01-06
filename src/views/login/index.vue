<template>
  <div class="fapage">
    <div class="login">
      <img class="logo" src="@/assets/imgs/logo.jpg" alt="" />
      <h3 class="title">{{ title }}</h3>
      <el-input class="account" placeholder="请输入账号" prefix-icon="user" v-model="account">
      </el-input>
      <el-input class="password" placeholder="请输入密码" :show-password="true" type="password" prefix-icon="lock"
        v-model="password">
      </el-input>
      <el-button class="btn" type="primary" @click="toSend" :loading="isLoading">登 录</el-button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter()
import config from "@/config";
import units from "@/units";
import { toLogin } from "@/api/module/user";
import useUserStore from '@/stores/user'
const userStore = useUserStore()
const title = ref(config.title);
const isLoading = ref(false);
const account = ref("");
const password = ref("");
onMounted(() => { 
console.log(userStore.getInfo());
});
const toSend = () => {
  if (account.value === "" || password.value === "") {
    ElMessage.error("账号或密码不能为空")
    return
  }
  isLoading.value = true;
  toLogin({
    account: account.value,
    password: password.value,
  }).then((res) => {
    isLoading.value = false;
    if (res.code == 200) {
      ElMessage.success("登录成功")
      userStore.changeInfo(res.data.info)
      units.setLocalStorage("token", res.data.token);
      router.push({
        name: res.data.routeName
      })
    } else {
      ElMessage.error(res.msg)
    }
  });

};
</script>
<style scoped lang="scss">
.fapage {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--p-bg-color);

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
