<template>
  <router-link :to="'/BuyShops'" class="link">
    <h1 class="title">{{ title }}</h1>
  </router-link>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const title = ref('')

onMounted(() => {
  title.value = document.title
})
</script>
<style lang="scss" scoped>
.link {
  text-decoration: none;
  .title {
    margin: 0 auto;
    vertical-align: middle;
    color: $color;
    font-weight: 700;
    // font-size: 56px;
    font-size: auto;
    white-space: nowrap;
    @media (max-width: $breakpoint-xs) {
      font-size: 22px;
      font-weight: 600;
    }
  }
}
</style>
