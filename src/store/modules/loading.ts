import { defineStore } from 'pinia'
// import { ElMessage, ElMessageBox } from 'element-plus'
// import type { Action } from 'element-plus'
import { Action, ElMessage, ElMessageBox } from 'element-plus/lib/components/index.js'

const useLoadingStore = defineStore('LoadingStore', {
  state: () => {
    return {
      isLoading: false,
    }
  },
  actions: {
    startLoading() {
      this.isLoading = true
    },
    stopLoading() {
      this.isLoading = false
    },
    open(message: string) {
      ElMessageBox.alert(message, 'Title', {
        confirmButtonText: 'OK',
        callback: (action: Action) => {
          ElMessage({
            type: 'info',
            message: `action: ${action}`,
          })
        },
      })
    },
  },
})

export default useLoadingStore
