<template>
  <div class="page">
    <div class="left" :class="isFold ? 'fold' : ''">
      <AdminLeft :isFold="isFold" />
    </div>
    <div class="right">
      <div class="rTop">
        <AdminRightTop @changeFold="changeFold" />
      </div>
      <div class="rMid">
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AdminLeft from "@/components/admin/left.vue"
import AdminRightTop from "@/components/admin/top.vue"
const isFold = ref(false)
onMounted(() => {
})
const changeFold = (e) => {
  isFold.value = e
}
</script>
<style scoped lang="scss">
.page {
  height: 100vh;
  display: flex;

  .left {
    height: 100%;
    background-color: var(--p-bg-color-light);
    width: var(--admin-left-width-show);
    overflow: hidden;
    flex-shrink: 0;
  }

  .left.fold {
    width: var(--admin-left-width-hide);
  }

  .right {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;

    .rTop {
      width: 100%;
      height: var(--admin-top-height);
    }

    .rMid {
      width: 100%;
      flex: 1;
      background-color: #eee;
    }
  }
}
</style>
