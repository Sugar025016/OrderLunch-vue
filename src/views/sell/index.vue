<template>
  <div class="common-layout">
    <el-container style="height: 100vh">
      <!-- <el-aside width="200px">

      </el-aside> -->
      <el-aside
        width="200px"
        :class="{ isCollapse: LayOutSettingStore.isCollapse ? true : false }"
      >
        <el-scrollbar>
          <el-menu
            :default-active="$route.path"
            active-text-color="#fff"
            background-color="#001529"
            text-color="#959ea6"
            :collapse="LayOutSettingStore.isCollapse"
            :router="true"
          >
            <!-- <div class="logo" v-if="setting.logoHidden">
              <img :src="setting.logo" alt="" /> -->
              <!-- <img src="@/assets/icons/line.png" alt="" /> -->
              <!-- <span class="title" @click="">{{ setting.title }}</span> -->
              <!-- <Router-view  class="title">{{ setting.title }}</Router-view> -->
              <router-link class="logo" to="/">
                <img src="@/assets/images/logo.png" alt="" />
                <span class="title">{{ setting.title }}</span>
              </router-link>
            <!-- </div> -->
            <!-- <div class="shop-item">
              <el-form-item>
                <el-select v-model="shopId" placeholder="商店">
                  <el-option
                    v-for="item in shopNameItem"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <div @click.stop="" class="favorite">
                <def-svg-icon
                  class="buy-svg-icon"
                  name="add1"
                  color="white"
                  width="30px"
                  height="30px"
                ></def-svg-icon>
              </div>
            </div> -->

            <def-backstage-Menu
              class=""
              :menuList="userStore.menuSellRoutes"
            ></def-backstage-Menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-container
        :style="{
          left: !LayOutSettingStore.isCollapse ? '200px' : '56px',
          width: LayOutSettingStore.isCollapse
            ? 'calc(100% - 56px)'
            : 'calc(100% - 200px)',
        }"
      >
        <el-header>
          <!-- <def-backstage-tab-bar>111</def-backstage-tab-bar> -->
          <SellTabBar class="container"></SellTabBar>
        </el-header>
        <el-main
          :style="{
            left: !LayOutSettingStore.isCollapse ? '200px' : '56px',
            width: LayOutSettingStore.isCollapse
              ? 'calc(100% - 56px)'
              : 'calc(100% - 200px)',
          }"
        >
          <div class="scroll-container">
            <!-- <el-scrollbar ref="scrollbarRef" always @scroll="scroll"> -->
            <Router-view></Router-view>
            <!-- </el-scrollbar> -->
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
import useLayOutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { useRoute, useRouter } from 'vue-router'
import { getShop, getShopNames } from '@/api/shop'
import {
  ShopData,
  ShopNames,
  ShopNamesResponse,
  ShopResponseData,
} from '@/api/shop/type'
import { computed, onMounted, ref, watch } from 'vue'
import ElMessage from 'element-plus/lib/components/message/index.js'
import drawer from 'element-plus/lib/components/drawer/index.js'
import useSellShopStore from '@/store/modules/sellShop'
import SellTabBar from '@/components/Sell/SellTabBar/src/index.vue'

let LayOutSettingStore = useLayOutSettingStore()
let userStore = useUserStore()
let sellShopStore = useSellShopStore()
let $route = useRoute()
// let $router = useRouter()
const shopNameItem = ref<ShopNames>([])
// const shopId = ref(0)
let shopId: number = parseInt($route.params.shopId as string)
const getItem = async () => {
  drawer.value = true

  let res: ShopNames = await sellShopStore.getShopItem()

  shopNameItem.value = res
  // shopId.value = shopNameItem.value
  // getShopData(shopId.value)
  // await sellShopStore.getSellShop(shopId)
  // if (res.code === 200) {
  //   if (res.data.length === 0) {
  //     // $router.push('/')
  //   }
  //
  //   shopNameItem.value = res.data
  //   shopId.value = shopNameItem.value[0].id
  //   // getShopData(shopId.value)
  //   await getShopData()
  // } else {
  //   drawer.value = false
  //   ElMessage({
  //     type: 'error',
  //     message: '搜尋失败',
  //   })
  // }
}
const shopData = ref<ShopData>()
// const getShopData = async (id: number) => {
//   sellShopStore.getSellShop(id)
//   shopData.value = sellShopStore.shop
// }

const getShopData = async () => {
  await sellShopStore.getSellShop()
  shopData.value = sellShopStore.shop
}

import { ElScrollbar } from 'element-plus'

const max = ref(0)
const value = ref(0)
const innerRef = ref<HTMLDivElement>()
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

const scroll = ({ scrollTop }) => {
  value.value = scrollTop
}

onMounted(() => {
  getItem()
})
// const scrollTop = computed(() => sellShopStore.scrollTop)

// watch(scrollTop, (newVal) => {
//   // scrollbarRef.value!.setScrollTop(newVal + value.value)
//   console.log('///////////////////', sellShopStore.scrollTop)
//   const scrollContainer = document.querySelector('.scroll-container')
//   // sellShopStore.scrollTop = 0;
//   if (scrollContainer) {
//     // 将滚动效果应用到 .scroll-container 元素上
//     scrollContainer.scrollTo({
//       top: scrollTop.value,
//       behavior: 'smooth',
//     })
//   }
// })
</script>

<style lang="scss" scoped>
.common-layout {
  width: auto;
  height: 100%;
  font-size: 10px;
  .shop-item {
    margin: 0 0 0 10px;
    display: flex;
  }
  .isCollapse {
    width: 56px;
  }
  .el-container {
    .el-aside {
      background-color: #001529 !important;
      height: 100%;
      transition: all 0.3s;
      .el-scrollbar {
        .el-scrollbar__view {
          height: 100%;
          .el-menu {
            border-right: none;
            height: 100%;
            transition: all 0.3s;
            height: calc(100vh - 60px);
            .logo {
              width: 95%;
              display: flex;
              align-items: center;
              justify-content: center;
              height: $base-menu-logo-height;
              color: #959ea6;
              font-weight: 700;
              font-size: $base-logo-title-fontSize;
              flex-wrap: nowrap;
              overflow: hidden;
              // padding-left: 17px;
                text-decoration: none;
              img {
                display: inline-block;
                widows: 45px;
                height: 45px;
                border-radius: 10px;
                margin: 5px;
              }
              .title {
                display: inline-block;
                height: 32px;
                margin: 2px 0 0 8px;
                overflow: hidden;
                font-size: 18px;
                font-weight: 600;
                line-height: 32px;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-decoration: none;
                color: $color;
              }
            }
          }
        }
      }
    }
    .el-container {
      .el-main {
        position: absolute;
        padding: 0;
        // padding: 0px  20px;
        left: 200px;
        top: 60px;
        transition: all 0.3s;
        // width: calc(100% - $base-menu-width);
        height: calc(100vh - 60px);
        .scroll-container {
        padding:  20px;
          scroll-behavior: smooth;
          height: 100%; /* 设置容器高度 */
          overflow: auto; /* 让容器产生滚动条 */
        }
      }
      .el-header {
        width: 100%;
      }
    }
  }
}
</style>
