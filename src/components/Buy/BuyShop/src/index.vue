<template>
  <div class="buyShop">
    <!-- <div class="buyShop-background"></div> -->
    <rwdBody>
      <template #slotName>
        <div class="header background">
          <!-- <div class="header-link">
            <socialMedia></socialMedia>
          </div> -->
          <div class="header-shop">
            <shop></shop>
          </div>
        </div>
        <div class="buy-product-footer">
          <products></products>
        </div>
      </template>
    </rwdBody>
  </div>
</template>
<script setup lang="ts">
import products from './products/index.vue'
import socialMedia from './socialMedia/index.vue'
import shop from './shop/index.vue'
import rwdBody from '@/components/layout/rwdBody/index.vue'
</script>
<style lang="scss" scoped>
.buyShop {
  display: block;
  word-wrap: break-word;
  word-break: break-all;
  // break-all
  // max-width: 200px;
  // position: relative;

  // .buyShop-background {
  //   overflow: hidden;
  //   // background-image: url('@/assets/images/background2.jpg');
  //   background-image: url('@/assets/images/background.jpeg');
  //   opacity: 0.7;
  //   position: absolute;
  //   background-repeat: no-repeat;
  //   background-size: cover; /* 控制背景图片如何适应元素 */
  //   background-position: center; /* 控制背景图片的位置 */
  //   top: 80px;
  //   left: 0;
  //   right: 0;
  //   width: 100%;
  //   height: 100%;
  //   height: 520px;
  //   height: 520px;
  // }

  .header {
    height: auto;
    margin: 80px 0;
    .header-link {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      z-index: 50;
    }
  }

  .background {
    background-image: url('@/assets/images/background.jpeg');
    // opacity: 0.7;
    position: relative;
    background-repeat: no-repeat;
    background-size: cover; /* 控制背景图片如何适应元素 */
    background-position: center; /* 控制背景图片的位置 */
    padding: 60px 160px;
    margin: -50px -160px;

    @media (max-width: $breakpoint-md) {
      padding: 40px 160px 20px 160px;
      margin: -40px -160px -20px -160px;
    }
  }

  .buy-product-footer {
    margin: 70px 0 0 0;
  }
  @media (max-width: $breakpoint-md) {
    .background {
      padding: 40px 160px 20px 160px;
      margin: -40px -160px -20px -160px;
    }
    .buy-product-footer {
      margin: 30px 0 0 0;
    }
  }
}
</style>
