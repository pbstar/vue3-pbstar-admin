<template>
  <div class="box">
    <div class="tlbox">
      <el-icon @click="toCollapse">
        <Fold v-show="!isCollapse" />
        <Expand v-show="isCollapse" />
      </el-icon>
      <span class="pageName">{{ pageName }}</span>
    </div>
    <div class="trbox">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <el-icon>
            <UserFilled />
          </el-icon>
          <span style="margin-left: 7px;margin-right: 5px;">{{ username }}</span>
          <el-icon size="16px">
            <ArrowDownBold />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="a">修改密码</el-dropdown-item>
            <el-dropdown-item command="b">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted ,watch} from 'vue'
import { useRouter } from "vue-router";
import { toLogout } from "@/api/module/user";
import units from "@/units";
import useUserStore from '@/stores/user'
const userStore = useUserStore()
const router = useRouter()
const emit = defineEmits(['changeFold'])
const username = ref("")
const userId = ref("")
const isCollapse = ref(false)
const pageName=ref("")
watch(() => router.currentRoute.value, (newValue, oldValue) => {
  pageName.value = newValue.meta.title
}, { immediate: true })
onMounted(() => {
  let userInfo = userStore.getInfo()
  username.value = userInfo.name
  userId.value = userInfo.id
})
const toCollapse = () => {
  isCollapse.value = !isCollapse.value
  emit('changeFold', isCollapse.value)
}
const handleCommand = (e) => {
  if (e == 'a') {
    router.push({
      name: "adminEditPassword"
    })
  } else if (e == 'b') {
    logout()
  }
}
const logout = () => {
  toLogout({
    id: userId.value
  }).then(res => {
    units.clearLocalStorage()
    router.push({
      name: "login"
    })
  })
}
</script>
<style scoped lang="scss">
.box {
  line-height: var(--admin-top-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  // color: #fff;
  height: var(--admin-top-height);
  // background-color: #08457e;
  padding: 0 25px;
  border-bottom: 1px solid #eee;

  i {
    font-size: 20px;
    cursor: pointer;
  }

  .tlbox {
    display: flex;
    align-items: center;

    .tlbreadcrumb {
      margin-left: 20px;
    }
    .pageName{
      margin-left: 10px;
      font-size: 14px;
      color: #222;
    }
  }

  .trbox {
    display: flex;
    align-items: center;

    .el-dropdown-link {
      cursor: pointer;
      display: flex;
      align-items: center;
    }
  }
}
</style>
