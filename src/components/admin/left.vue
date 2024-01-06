<template>
  <div class="fbox">
    <div class="topbox">
      <img class="logo" src="@/assets/imgs/logo.jpg" alt="" />
      <transition name="show">
        <h4 v-show="!isFold">{{ title }}</h4>
      </transition>
    </div>
    <el-menu :default-active="defaultActive" class="midbox" background-color="#545c64" text-color="#fff"
      :collapse="isFold" unique-opened :collapse-transition="false">
      <div v-for="(item, index) in list" :key="index">
        <el-sub-menu :index="item.index" v-if="item.child">
          <template slot="title">
            <component class="icons" :is="item.icon"></component>
            <span v-show="!isFold">{{ item.title }}</span>
          </template>
          <el-menu-item v-for="(items, indexs) in item.child" :key="indexs + 's'" :index="items.name"
            @click="toPage(items.name)">{{ items.title }}</el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.name" @click="toPage(item.name)">
          <component class="icons" :is="item.icon"></component>
          <span v-show="!isFold">{{ item.title }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from "vue-router";
const router = useRouter()
import config from "@/config";

const props = defineProps({
  isFold: Boolean,
})
const title = ref(config.title)
const list = ref([
  {
    name: "adminHome",
    title: "首页",
    icon: "House",
  },
  {
    name: "adminUser",
    title: "用户管理",
    icon: "User",
  }
])
const defaultActive = ref("")

watch(() => router.currentRoute.value, (newValue, oldValue) => {
  defaultActive.value = newValue.name
}, { immediate: true })

const toPage = (name) => {
  defaultActive.value = name
  router.push({ name })
}
onMounted(() => {
})
</script>
<style scoped lang="scss">
.fbox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .topbox {
    background-color: var(--p-bg-color);
    height: var(--admin-top-height);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    h4 {
      width: 130px;
      font-size: 17px;
      color: #fff;
      margin-left: 10px;
      letter-spacing: -1px;
      overflow: hidden;
      white-space: nowrap;
    }

    .logo {
      width: 30px;
      height: 30px;
      border-radius: 5px;
    }
  }

  .midbox {
    width: 100%;
    flex: 1;
    margin: 10px 0px;
    border-right: 0;

    .icons {
      width: 18px;
    }

    ::v-deep(.el-menu-item) {
      height: 45px;
      line-height: 45px;
      display: flex;
      align-items: center;
    }

    ::v-deep(.el-submenu__title) {
      height: 45px;
      line-height: 45px;
    }

    ::v-deep(.el-menu-item span) {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin-left: 5px;
      color: #fff;
    }

    ::v-deep(.el-menu-item) .icons {
      color: #fff;
    }

    ::v-deep(.el-submenu__title) .icons {
      color: #fff;
    }

    ::v-deep(.el-menu-item.is-active) .icons {
      color: var(--p-blue-color);
    }

    ::v-deep(.el-submenu__title.is-active) .icons {
      color: var(--p-blue-color);
    }

    ::v-deep(.el-menu-item.is-active) span {
      color: var(--p-blue-color);
    }

    ::v-deep(.el-submenu__title.is-active) span {
      color: var(--p-blue-color);
    }


  }
}</style>
