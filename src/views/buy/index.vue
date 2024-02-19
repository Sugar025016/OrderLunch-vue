<template>
  <div class="common-layout">
    <el-container class="buy">
      <el-header class="buy-header">
        <def-buy-tabBar class="container"></def-buy-tabBar>
      </el-header>
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
const loadingStore = useLoadingStore()

const isLoading = ref(loadingStore.isLoading)

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
  // background-color: rgba(250, 205, 69, 0.1);
  background-color: rgba(214, 164, 13, 0.1);

  width: auto;
  // height: 500px;
  // border-radius: 0 0 100% 100% / 100% 100% 100% 100%;
  // border-radius: 0 0 100% 100% / 100% 100% 100% 100%;

  .buy {
    min-height: 100vh;
    display: flex;
    grid-template-rows: auto auto 1fr auto;

    .buy-header {
      height: 80px;
      position: sticky;
      top: 0; /* 元素固定的位置，這裡是頂部 */
      // background-color: #ffeee000;
      z-index: 100; /* 可選的，如果有其他元素重疊時可以使用 */
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgb(255, 255, 255);
      box-shadow:
        3px 3px 5px #dbdbdb,
        -3px -3px 5px #e2e2e2;
    }
    .buy-message {
      margin: 0;
    }

    .buy-body {
      overflow: visible;
      padding: 0px;
      overflow: hidden;
      z-index: 1;
    }
    .buy-el-footer {
      background-color: black;
      height: 200px;
      padding: 35px 0;
      z-index: 1;

      position: relative;
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
