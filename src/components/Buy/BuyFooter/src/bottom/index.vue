<script setup lang="ts"></script>
<template>
  <div class="bottom-left">
    <span class="bottom-span">本網站是測試用請勿點擊</span>
    <span class="bottom-span">本網站是測試用請勿點擊</span>
  </div>
  <div class="bottom-right">
    <span class="bottom-span">隱私權政策</span>
    <span class="bottom-span">使用者條款</span>
  </div>
</template>
<style lang="scss" scoped>
.bottom-left {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 水平置中 */

  .bottom-span {
    display: flex;
    margin: 0 0 8px 0;
    color: #fcfcfc;
    font-size: 18px;
  }
}
.bottom-right {
  display: flex;
  justify-content: center; /* 水平置中 */
  align-items: center; /* 垂直置中 */

  .bottom-span {
    margin: 0 0 0 10px;
    color: #fcfcfc;
    font-size: 18px;
  }
}
</style>
