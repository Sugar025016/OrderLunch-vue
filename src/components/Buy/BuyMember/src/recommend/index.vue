<template>
  <div class="cards">
    <!-- <card></card> -->
  </div>
</template>
<script setup lang="ts">
import card from '../card/index.vue'
</script>
<style lang="scss" scoped>
.cards {
  margin: 30px 0;
  display: grid; /* 使用CSS Grid布局 */
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}
</style>
