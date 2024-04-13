import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
// import {isBreakpointMD } from '@/utils/windowSize'

const useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      isCollapse: false,
      refsh: false,
    }
  },
})

export default useLayOutSettingStore
