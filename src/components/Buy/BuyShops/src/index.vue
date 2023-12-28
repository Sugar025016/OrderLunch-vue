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
          <div class="title-shop">
            <!-- <div class="title-shop-img">121</div> -->

            <!-- <img
              @click="openShop()"
              src="@/assets/images/openShop3.png"
              class="w-8 h-8 rounded-full"
              loading="lazy"
            /> -->

            <el-tooltip
              class="box-item"
              effect="light"
              content="開店"
              placement="top-start"
            >
              <img
                @click="openShop()"
                src="@/assets/images/openShop3.png"
                class="w-8 h-8 rounded-full"
                loading="lazy"
              />
            </el-tooltip>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="body">
      <rwdBody>
        <template #slotName>
          <div class="overlay"></div>
          <div class="body-in">
            <el-row class="row2">
              <el-col :span="24">
                <Category></Category>
              </el-col>
            </el-row>
            <el-row class="row3">
              <template v-for="c1 in shopStore.shopArr">
                <def-shop-card :shop="c1"></def-shop-card>
              </template>
            </el-row>
            <div v-if="loading" class="loading" v-loading="loading"></div>
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
import { useRouter } from 'vue-router'

let $router = useRouter()
let shopStore = useShopStore()
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
const openShop = () => {
  // 处理滚动事件的逻辑
  $router.push(`/Register/shop`)
}

const loading = ref(false)
let timer: any
// window.addEventListener('scroll', async () => {
//   if (
//     window.innerHeight + window.scrollY >=
//     document.documentElement.scrollHeight - 200
//   ) {
//     console.log('頁面滾動到了底部')
//     // 觸發加載更多數據的方法
//     if (
//       shopStore.shopPage.number < shopStore.shopPage.totalPages - 1 &&
//       !loading.value
//     ) {
//       let to = window.innerHeight + window.scrollY
//       loading.value = true
//       timer = await setTimeout(() => {
//         shopStore.getShopPage(shopStore.shopPage.number + 1)
//         window.scrollTo({ top: to, behavior: 'instant' })
//         loading.value = false
//       }, 1400)
//     }
//   }
// })
let loadingMore = false // 添加一个标志位来表示是否正在加载更多数据

window.addEventListener('scroll', async () => {
  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 200
  ) {
    console.log('頁面滾動到了底部')
    // 触发加载更多数据的方法
    if (
      shopStore.shopPage.number < shopStore.shopPage.totalPages - 1 &&
      !loadingMore
    ) {
      loadingMore = true // 设置为 true 表示正在加载更多数据
      requestAnimationFrame(async () => {
        let to = window.innerHeight + window.scrollY
        await shopStore.getShopPage(shopStore.shopPage.number + 1)
        window.scrollTo({ top: to, behavior: 'instant' })
        loadingMore = false // 数据加载完成后设置为 false
      })
    }
  }
})
// 在组件销毁时移除滚动事件监听器，防止内存泄漏
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  clearTimeout(timer)
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
      // z-index: -1000;
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

          padding: 0 0 0 18%;
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

        .title-shop {
          display: flex;
          align-items: center;
          justify-content: center;
          // height: 200px;
          padding: 0 8% 0 0;

          // .title-shop-img {
          //   // height: 200px;
          //   background-image: url('@/assets/images/product001.jpeg') !important; /* 設置背景圖片 */
          //   height: 200px;
          //   width: 200px;
          //   border-radius: 20px;
          //   border: 1px solid white;
          //   overflow: hidden;
          //   background-position: center;
          //   max-width: 100%;
          //   background-repeat: no-repeat;
          //   background-attachment: fixed;
          //   background-size: cover;
          //   -webkit-background-size: cover;
          //   -moz-background-size: cover;
          //   zoom: 1;

          //   // position: fixed;
          //   //     z-index: -1000;
          //   //     top: 1280;
          //   //     width: 20vh;
          //   //     // height: calc(100vh - 80px);
          //   //     height: 20vh;
          //   //     transition: height 0.5s ease; /* 添加动画效果 */

          //   //     background: url('@/assets/images/food-home.jpg') no-repeat;
          //   //     background-size: cover;
          //   //     // border-radius: 40px;
          //   //     padding: 5px 5px 5px 5px;
          //   //     box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          // }

          img {
            width: auto; /* Ensure image does not exceed container width */
            height: auto; /* Ensure image does not exceed container height */
            max-width: 75%;
            max-height: 75%;

            min-width: 200px;
            min-height: 200px;
            object-fit: contain;
            transition: transform 0.3s ease-in-out; /* 添加过渡效果 */
            // background-color: bisque;
            cursor: pointer;
          }
          // img:hover {
          //   animation: shake 0.5s ease-in-out infinite; /* 添加摇动动画 */
          // }
          img:hover {
            animation: shake 0.5s ease-in-out infinite; /* 添加摇动动画 */
          }

          @keyframes shake {
            0%,
            100% {
              transform: rotate(0deg);
            }
            25%,
            75% {
              transform: rotate(-8deg);
            }
            50% {
              transform: rotate(18deg);
            }
          }
        }
      }
    }

    .buyCard-height {
      height: calc(100vh - 80px);
    }
  }

  .body {
    position: relative;
    margin: 0px 0;

    padding: 10px 0;
    .overlay {
      /* 遮罩 */
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 242, 224, 0.589);
    }
    .body-in {
      position: relative;
      height: 120%;

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

      .loading {
        margin: 30px 0;
        height: 0px;
      }
    }
  }
}
</style>
