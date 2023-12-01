<template>
  <div class="buyShops">
    <el-row class="row1">
      <el-col
        class="buyCard"
        :span="24"
        :class="{ 'buyCard-height': isExpanded }"
      >
        <div class="title-border">
          <div class="title-div">
            <span class="title-span">餓了就來找美食</span>
            <span class="introducir-span">
              本站所有品相已店內同價，線上定餐免收外送服務費，歡迎線上定餐
            </span>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="body">
      <rwdBody>
        <template #slotName>
          <div class="body-in">
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
              <el-button
                class="buyShops-more-button"
                size="large"
                type="warning"
                round
              >
                載入更多
              </el-button>
            </div>
          </div>
        </template>
      </rwdBody>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Category from './Category/index.vue'

import useShopStore from '@/store/modules/shop'
import rwdBody from '@/components/layout/rwdBody/index.vue'

let categoryStore = useShopStore()
const isExpanded = ref(false)

onMounted(() => {
  // 在组件挂载后添加滚动事件监听器
  window.addEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  // 处理滚动事件的逻辑
  const scrollTop = window.scrollY || document.documentElement.scrollTop

  console.log('Current scroll position:', scrollTop)
  isExpanded.value = scrollTop > 200
}

// 在组件销毁时移除滚动事件监听器，防止内存泄漏
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
<style lang="scss" scoped>
.shadow {
  box-shadow: 0px 0px 0px 20px red inset;
  border: 10px solid transparent;
  border-image: url(border.png) 30 round;
}

.buyShops {
  border-radius: 40px;
  // background-color: rgba(0, 255, 255, 0.753);
  .row1 {
    height: calc(60vh - 0px);
    // height: 60vh ;
    // margin-bottom:-40px ;
    width: 100%;
    // border-radius: 40px;
    top: 1px;
    .buyCard {

      position: fixed;
      z-index: -1000;
      top: 1280;
      width: 100%;
      // height: calc(100vh - 80px);
      height: 60vh;
      transition: height 0.5s ease; /* 添加动画效果 */

      background: url('@/assets/images/food-home.jpg') no-repeat;
      background-size: cover;
      // border-radius: 40px;
      padding: 5px 5px 5px 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      .title-border {
        vertical-align: middle;
        color: white;
        font-size: 100px;
        width: auto;
        height: 100%;
        display: block;
        border-radius: 0 600px;
        border: white 3px solid;
        display: flex;
        .title-div {
          display: flex;
          flex-direction: column;
          justify-content: center;

          padding: 0 18%;
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

    .buyCard-height {
      height: calc(100vh - 80px);
    }
  }

  .body {
    background-color: rgba(255, 242, 224, 0.589);
    margin: 0px 0;

    padding: 10px 0;
    

    .body-in {
      // margin: 10px ;
      // background-color: rgb(209, 21, 21);
      // padding: 40px 0;
      position: relative;
      height: 120%;
      // margin: calc(2% - 10px);

      // top: -40;
      // margin: 40px ;
      // @media (min-width: $breakpoint-xs) {
      //   margin-left: 5px;
      //   margin-right: 5px;
      // }
      // @media (min-width: $breakpoint-sm) {
      //   margin-left: 10px;
      //   margin-right: 10px;
      // }
      // @media (min-width: $breakpoint-md) {
      //   margin-left: 20px;
      //   margin-right: 20px;
      // }
      // @media (min-width: $breakpoint-lg) {
      //   margin-left: 40px;
      //   margin-right: 40px;
      // }
      // @media (min-width: $breakpoint-xl) {
      //   margin-left: 80px;
      //   margin-right: 80px;
      // }

      // @media (min-width: $breakpoint-xxl) {
      //   margin-left: 160px;
      //   margin-right: 160px;
      // }

      .row2 {
        margin: 40px 0 20px 0;
        // margin: 40px ;
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
  }
}
</style>
