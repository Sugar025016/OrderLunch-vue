<template>
  <div class="common-layout">
    <el-container class="buy">
      <el-main class="buy-body">
        <!-- <Router-view></Router-view> -->
        <reactive></reactive>
      </el-main>
      <el-footer class="buy-el-footer">
        <def-buy-footer class=""></def-buy-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">

import reactive from '@/components/Register/src/index.vue'
</script>

<script setup lang="ts"></script>
<style lang="scss" scoped>
.common-layout {
  width: auto;
  height: 500px;
  border-radius: 0 0 100% 100% / 100% 100% 100% 100%;

  .buy {
    min-height: 100vh;
    display: flex;
    grid-template-rows: 1fr auto;
    .buy-body {
      margin: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .buy-el-footer {
      background-color: black;
      height: 200px;
      padding: 35px 0;
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
</style>
