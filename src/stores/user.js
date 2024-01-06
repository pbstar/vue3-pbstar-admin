import { ref } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('user', () => {
  let info = ref(null)

  function getInfo() {
    return info.value
  }
  function changeInfo(e) {
    info.value = e
  }

  return { getInfo, changeInfo }
})