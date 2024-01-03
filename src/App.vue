<template>
  <RouterView />
</template>
<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
onMounted(() => {
  document.getElementById("p_app_loading_mask").style.display = "none";
})
</script>
<style scoped lang="scss">
</style>
