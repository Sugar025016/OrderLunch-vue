<template>
  <div class="cards">
    <template v-for="c1 in userStore.favoriteShop">
      <!-- <Card :shop="c1"></Card> -->
      <def-shop-card :shop="c1"></def-shop-card>
      <!-- <def-shop-card2 :shop="c1"></def-shop-card2> -->
    </template>
  </div>
</template>
<script setup lang="ts">
import Card from '../card/index.vue'

import useUserStore from '@/store/modules/user'
import { onMounted, ref } from 'vue'
import { ProductList } from '@/api/user/type'

let userStore = useUserStore()

let loves = ref<ProductList>([])

onMounted(() => {
  getLove()
})

const getLove = async () => {
  let res: ProductList = await userStore.getLove()
  loves.value = res
}
</script>
<style lang="scss" scoped>
.cards {
  margin: 30px 0;
  display: grid; /* 使用CSS Grid布局 */
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}
</style>
