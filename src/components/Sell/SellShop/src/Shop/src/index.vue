<template>
  <div class="buyShop">
    <div class="header">
      <div class="header-shop">
        <shop></shop>
      </div>
    </div>
    <div class="buy-product-footer">
      <products></products>
    </div>
  </div>
</template>
<script setup lang="ts">
import products from './products/index.vue'
import shop from './shop/index.vue'
</script>
<style lang="scss" scoped>
.buyShop {
  display: block;
  word-wrap: break-word;
  word-break: break-all;
  // break-all
  // max-width: 200px;
  overflow: hidden;

  .header {
    // background-color: aqua;
    margin: 60px;
    // .header-link {
    //   display: flex;
    //   align-items: center;
    //   justify-content: flex-end;
    // }
  }
  .buy-product-footer {
    margin: 30px 0 0 0;
  }
}
</style>
