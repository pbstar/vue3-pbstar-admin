<template>
  <div class="box">
    <el-form label-width="82px" style="width: 400px;margin: 50px 30px;">
      <el-form-item label="账号">
        <el-input v-model="account" readonly placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" required>
        <el-input v-model="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" required>
        <el-input v-model="password1" placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确 认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import useUserStore from '@/stores/user'
import {
  toEditUserPassword
} from "@/api/module/user";
import units from "@/units";
import { useRouter } from "vue-router";
const router = useRouter()
const userStore = useUserStore()
const account = ref("")
const password = ref("")
const password1 = ref("")
const userId = ref("")
onMounted(() => {
  let userInfo = userStore.getInfo()
  account.value = userInfo.account
  userId.value = userInfo.id
})
const onSubmit = () => {
  if (!password.value || !password1.value) {
    ElMessage.error("密码不能为空")
    return;
  }
  if (password.value != password1.value) {
    ElMessage.error("两次密码不一致")
    return;
  }
  toEditUserPassword({
    id: userId.value,
    password: password.value
  }).then(res => {
    if (res.code == 200) {
      ElMessage.success("修改成功")
      units.clearLocalStorage();
      router.push({
        name: "login"
      })
    } else {
      ElMessage.error("修改失败")
    }
  })
}
</script>
<style lang="scss" scoped>
.box {
  background-color: #fff;
  margin: 10px;
  padding: 10px;
  min-height: calc(100% - 20px);

}
</style>