<template>
  <div class="productCard">
    <div class="products-content">
      <span class="content-title">{{ product.name }}</span>
      <span class="content-description">
        {{ product.description }}
      </span>
      <span class="content-price">{{ product.price }}$</span>
    </div>
    <img :src="product.img" v-if="product.img" alt="AA" />
    <!-- <img src="@/assets/images/product001.jpeg" alt="AA" /> -->
  </div>
</template>
<script setup lang="ts">
defineProps(['product'])
</script>
<style lang="scss" scoped>
.productCard {
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
  display: flex;
  border: 1px solid #8f8f8f54;
  height: 150px;
  width: 100%;
  justify-content: space-between;

  border-radius: 10px;

  .products-content {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 20px 10px;
    width: 100%;
    justify-content: space-between;
    align-content: space-between;
    span {
      max-width: 100%;
      font-size: 20px;
      color: rgba(0, 0, 0, 0.801);
    }

    .content-description {
      color: rgba(134, 134, 134, 0.801);
      font-size: 15px;
    }
  }
  img {
    border-radius: 0 10px 10px 0;

    height: 150px;
    width: 150px;
  }
}
</style>
