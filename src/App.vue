<template>
  <RouterView />
</template>
<script setup>
import { RouterView } from 'vue-router'
import config from "@/config";
console.log("Version：" + config.version);
</script>
<style scoped lang="scss"></style>
