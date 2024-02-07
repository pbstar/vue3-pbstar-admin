<template>
  <div class="fbox">
    <div class="topbox">
      <img class="logo" src="@/assets/imgs/logo.jpg" alt="" />
      <h4 v-show="!isFold">{{ title }}</h4>
    </div>
    <el-menu :default-active="defaultActive" class="midbox" background-color="#545c64" text-color="#fff"
      :collapse="isFold" unique-opened :collapse-transition="false">
      <div v-for="(item, index) in list" :key="index">
        <el-sub-menu :index="item.name" v-if="item.child">
          <template #title>
            <component class="icons" :is="item.icon"></component>
            <span v-show="!isFold">{{ item.title }}</span>
          </template>
          <el-menu-item v-for="(items, indexs) in item.child" :key="indexs + 's'" :index="items.name"
            @click="toPage(items)">{{ items.title }}</el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.name" @click="toPage(item)">
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
import navList from "@/assets/json/nav.json"
import useUserStore from '@/stores/user'
const userStore = useUserStore()
const props = defineProps({
  isFold: Boolean,
})
const title = ref(config.title)
const list = ref([])
const defaultActive = ref("")

watch(() => router.currentRoute.value, (newValue, oldValue) => {
  defaultActive.value = newValue.name
}, { immediate: true })
onMounted(() => {
  let userInfo = userStore.getInfo()
  getList(userInfo.authority)
})
const getList = (authority) => {
  let userAuthorityArr = authority ? authority.split(",") : [];
  let item = "";
  list.value = [];
  for (let i = 0; i < navList.length; i++) {
    if (userAuthorityArr.includes(navList[i].name)) {
      list.value.push(navList[i]);
    } else {
      if (navList[i].child) {
        for (let j = 0; j < navList[i].child.length; j++) {
          if (userAuthorityArr.includes(navList[i].child[j].name)) {
            if (item) {
              item.child.push(navList[i].child[j]);
            } else {
              item = {
                name: navList[i].name,
                icon: navList[i].icon,
                title: navList[i].title,
                child: [navList[i].child[j]],
              };
            }
          }
        }
        if (item) {
          list.value.push(item);
          item = "";
        }
      }
    }
  }
}
const toPage = (e) => {
  defaultActive.value = e.name
  if (e.query) router.push({ name: e.name, query: e.query })
  else router.push({ name: e.name })
}

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

    ::v-deep(.el-sub-menu__title) {
      height: 45px;
      line-height: 45px;
    }

    ::v-deep(.el-menu-item span),
    ::v-deep(.el-sub-menu__title span) {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin-left: 5px;
      color: #fff;
    }


    ::v-deep(.el-menu-item) .icons,
    ::v-deep(.el-sub-menu__title) .icons {
      color: #fff;
    }

    ::v-deep(.el-menu-item.is-active) .icons,
    ::v-deep(.el-sub-menu__title.is-active) .icons,
    ::v-deep(.el-menu-item.is-active) span,
    ::v-deep(.el-sub-menu__title.is-active) span {
      color: var(--p-blue-color);
    }

  }
}
</style>
