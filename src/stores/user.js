import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('user', () => {
  let info = ref(null)

  function getInfo() {
    return info.value
  }
  function changeInfo(e) {
    info.value = e
  }

  return { info, getInfo, changeInfo }
})