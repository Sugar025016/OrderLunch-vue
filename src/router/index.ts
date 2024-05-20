import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute, anyRoute, sellShop } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes: [...constantRoute, anyRoute],
  // 滾動行為
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
