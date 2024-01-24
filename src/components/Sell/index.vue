<template>
  <div class="common-layout">
    <el-container class="buy">
      <el-header class="buy-header">
        <def-buy-tabBar class="container"></def-buy-tabBar>
      </el-header>
      <el-message class="buy-message">
        <SellTabBar class="container"></SellTabBar>
      </el-message>
      <el-main class="buy-body">
        <Router-view></Router-view>
      </el-main>
      <el-footer class="buy-el-footer">
        <def-buy-footer class=""></def-buy-footer>
      </el-footer>
    </el-container>
  </div>
  <div>
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-icon">Loading...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoadingStore from '@/store/modules/loading'
import { ref, watch } from 'vue'
import SellTabBar from './SellTabBar/src/index.vue'
// import order from '@/components/Buy/BuyTabBar/src/order/index.vue'

const loadingStore = useLoadingStore()

const isLoading = ref(loadingStore.isLoading)
const shopId = ref(0)

watch(
  () => loadingStore.isLoading,
  (newValue) => {
    isLoading.value = newValue
  },
)
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
}

.common-layout {
  // background: url('@/assets/images/fondo.webp');
  background-color: rgba(201, 192, 167, 0.507);
  width: auto;
  height: 500px;
  border-radius: 0 0 100% 100% / 100% 100% 100% 100%;
  //   background-color: #f00; /* 背景顏色為紅色 */
  // font-size: 10px;

  .buy {
    min-height: 100vh;
    display: flex;
    grid-template-rows: auto auto 1fr auto;

    .buy-header {
      height: 80px;
      position: sticky;
      top: 0; /* 元素固定的位置，這裡是頂部 */
      background-color: #f1f1f1; /* 元素的背景色 */
      z-index: 100; /* 可選的，如果有其他元素重疊時可以使用 */
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .buy-message {
      margin: 0;
    }

    .buy-body {
      
      overflow: visible;
      padding: 0px;
      margin: 40px 0;
      @media (min-width: $breakpoint-xs) {
        margin-left: 5px;
        margin-right: 5px;
      }
      @media (min-width: $breakpoint-sm) {
        margin-left: 10px;
        margin-right: 10px;
      }
      @media (min-width: $breakpoint-md) {
        margin-left: 20px;
        margin-right: 20px;
      }
      @media (min-width: $breakpoint-lg) {
        margin-left: 40px;
        margin-right: 40px;
      }
      @media (min-width: $breakpoint-xl) {
        margin-left: 80px;
        margin-right: 80px;
      }

      @media (min-width: $breakpoint-xxl) {
        margin-left: 160px;
        margin-right: 160px;
      }
    }
    .buy-el-footer {
      // margin: 20px 0;
      background-color: black;
      height: 200px;
      padding: 35px 0;
      // height: auto;

      // position: relative;
      @media (min-width: $breakpoint-xs) {
        padding-left: 5px;
        padding-right: 5px;
      }
      @media (min-width: $breakpoint-sm) {
        padding-left: 10px;
        padding-right: 10px;
      }
      @media (min-width: $breakpoint-md) {
        padding-left: 20px;
        padding-right: 20px;
      }
      @media (min-width: $breakpoint-lg) {
        padding-left: 40px;
        padding-right: 40px;
      }
      @media (min-width: $breakpoint-xl) {
        padding-left: 80px;
        padding-right: 80px;
      }

      @media (min-width: $breakpoint-xxl) {
        padding-left: 160px;
        padding-right: 160px;
      }
    }
  }
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-icon {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
