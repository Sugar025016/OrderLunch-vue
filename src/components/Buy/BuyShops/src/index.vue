<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Category from './Category/index.vue'

import useShopStore from '@/store/modules/shop'
import useUserStore from '@/store/modules/user'
import rwdBody from '@/components/layout/rwdBody/index.vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'

import ChooseAddressModel from './ChooseAddressModel/index.vue'

let $router = useRouter()
let shopStore = useShopStore()
let userStore = useUserStore()
const isExpanded = ref(false)

onMounted(() => {
  // 在元件掛載後新增滾動事件監聽器
  window.addEventListener('scroll', handleScroll), chooseAddress()
})

const chooseAddress = async () => {
  let isCheckChooseAddress = await userStore.isCheckChooseAddress()

  if (isCheckChooseAddress) {
    chooseAddressRef.value?.open()
  }
}
const chooseAddressRef = ref<typeof ChooseAddressModel>()
const registerShop = () => {
  // 處理滾動事件的邏輯
  if (userStore.token == null || userStore.token == '') {
    ElMessageBox.confirm('你還未登入，請前往登入！', '前往登入！', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        $router.push('/login')
      })
      .catch(() => {
        clearTimeout(timer)
      })

    // 設定定時器，在 10 秒後關閉訊息框
    timer = setTimeout(() => {
      const messageBoxInstance = ElMessageBox
      if (messageBoxInstance) {
        messageBoxInstance.close()

        $router.push('/login')
      }
    }, 5000) // 5000 毫秒即为 5 秒
  } else {
    $router.push(`/Register/shop`)
  }
}

const loading = ref(false)
let timer: any
let loadingMore = false
let aaa = 0
const handleScroll = async () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop

  isExpanded.value = scrollTop > 200
  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 200
  ) {
    if (
      shopStore.shopPage.number < shopStore.shopPage.totalPages - 1 &&
      !loadingMore
    ) {
      loadingMore = true
      requestAnimationFrame(async () => {
        let to = window.innerHeight + window.scrollY
        await shopStore.getShopPage(shopStore.shopPage.number + 1)

        window.scrollTo({ top: to, behavior: 'instant' })
        loadingMore = false
      })
    }
  }
}
// 在組件銷毀時移除滾動事件監聽器，防止記憶體洩漏
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  clearTimeout(timer)
})
</script>

<template>
  <div class="buyShops">
    <div class="row1">
      <div class="buyCard" :span="24" :class="{ 'buyCard-height': isExpanded }">
        <div class="title-border">
          <div class="title-div">
            <span class="title-span">餓了就來找美食</span>
            <span class="introducir-span">
              本站所有品相已店內同價，線上定餐免收外送服務費，歡迎線上定餐
            </span>
          </div>
          <div class="title-shop">
            <el-tooltip
              class="box-item"
              effect="light"
              content="開店"
              placement="top-end"
            >
              <img
                @click="registerShop()"
                src="@/assets/images/openShop3.png"
                class="w-8 h-8 rounded-full"
                loading="lazy"
              />
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
    <div class="body">
      <rwdBody>
        <template #slotName>
          <!-- <div class="overlay"></div> -->
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

  <ChooseAddressModel ref="chooseAddressRef"></ChooseAddressModel>
</template>

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
    // height: calc(60vh - 0px);
    // height:auto;
    // height: 60vh ;
    // margin-bottom:-40px ;
    width: 100%;
    // border-radius: 40px;
    top: 1px;
    .buyCard {
      // position: fixed;
      // z-index: -1000;
      top: 1280;
      width: 100%;
      // height: calc(100vh - 80px);
      // height: 60vh;
      transition: height 0.5s ease; /* 添加动画效果 */

      background: url('@/assets/images/food-home.jpg') no-repeat;
      background-size: cover;
      // border-radius: 40px;
      padding: 5px;
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

        display: grid; /* 使用CSS Grid布局 */
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;
        // margin: 10px 0;
        padding: 0 5px;

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
          padding: 0 8% 0 0;

          img {
            width: auto; /* Ensure image does not exceed container width */
            height: auto; /* Ensure image does not exceed container height */
            max-width: 75%;
            max-height: 75%;

            min-width: 200px;
            min-height: 200px;
            object-fit: contain;
            transition: transform 0.3s ease-in-out; /* 添加过渡效果 */
            cursor: pointer;
          }

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
        @media (max-width: $breakpoint-sm) {
          grid-template-columns: repeat(1, 1fr);

          .title-div {
            padding: 20px calc(20% - 80px) 0 calc(20% - 80px);
          }
          .title-shop {
            padding: 0 20px;
          }
        }
      }
    }
    // .buyCard-height {
    //   height: calc(100vh - 80px);
    // }
  }

  .body {
    margin: 0px 0;

    padding: 10px 0;

    background-color: rgba(253, 237, 213, 0.589);
    background-color: rgb(255, 242, 224);

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
          // margin: 15px 0;
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
