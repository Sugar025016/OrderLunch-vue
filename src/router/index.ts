import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute, anyRoute, sellShop } from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...constantRoute, ...sellShop, anyRoute],
  // 滾動行為
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
