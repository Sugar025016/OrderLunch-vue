<template>
  <div class="buyShops">
    <el-row class="row1">
      <el-col class="buyCard" :span="24">
        <div class="title-border">
          <div class="title-div">
            <span class="title-span">全台便當懶人包</span>
            <span class="introducir-span">
              本站所有品相已店內同價，線上定餐免收外送服務費，歡迎線上定餐
            </span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="row2">
      <el-col :span="24">
        <Category></Category>
      </el-col>
    </el-row>

    <el-row class="row3">
      <template v-for="c1 in categoryStore.shopArr">
        <def-shop-card :shop="c1"></def-shop-card>
      </template>
    </el-row>
    <div class="buyShops-more">
      <el-button class="buyShops-more-button" size="large" type="warning" round>
        載入更多
      </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import Category from './Category/index.vue'

import useShopStore from '@/store/modules/shop'

let categoryStore = useShopStore()
</script>
<style lang="scss" scoped>
.shadow {
  box-shadow: 0px 0px 0px 20px red inset;
  border: 10px solid transparent;
  border-image: url(border.png) 30 round;
}

.buyShops {
  border-radius: 40px;
  .row1 {
    border-radius: 40px;
    .buyCard {
      width: 100%;
      height: 50vh;
      background: url('@/assets/images/food.jpg') no-repeat;
      background-size: cover;
      border-radius: 40px;
      padding: 5px 5px 5px 5px;
      .title-border {
        vertical-align: middle;
        color: white;
        font-size: 100px;
        width: auto;
        height: 100%;
        display: block;
        border-radius: 40px;
        border: white 3px solid;
        display: flex;
        .title-div {
          display: flex;
          flex-direction: column;
          justify-content: center;

          padding: 0 100px;
          .title-span {
            display: flex;
            width: auto;
            color: white;
            font-size: 70px;
          }
          .introducir-span {
            display: flex;
            vertical-align: middle;
            margin: 20px 0;
            color: white;
            font-size: 20px;
          }
        }
      }
    }
  }

  .row2 {
    margin: 40px 0 20px 0;
  }
  .row3 {
    display: grid; /* 使用CSS Grid布局 */
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 10px;
    margin: 10px 0;
    padding: 0 5px;
    @media (min-width: $breakpoint-xs) {
      grid-template-columns: repeat(1, 1fr);
    }

    @media (min-width: $breakpoint-sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: $breakpoint-md) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: $breakpoint-xl) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: $breakpoint-xxl) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  .buyShops-more {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .buyShops-more-button {
      background-color: $color;
    }
  }
}
</style>
