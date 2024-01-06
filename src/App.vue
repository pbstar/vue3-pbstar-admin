<template>
  <RouterView />
</template>
<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import config from "@/config";
onMounted(() => {
  document.getElementById("p_app_loading_mask").style.display = "none";
  console.log("Version："+config.version);
})
</script>
<style scoped lang="scss">
</style>
